# How I Tried to Automate My Warehouse Job, Part 2: Getting the Extension to Actually Work

*This is a continuation of [Part 1](link), which covered the initial HAR analysis, Track-Key reverse engineering, and the pivot from direct API calls to Playwright. Part 2 covers what happened after — building a Chrome extension that could actually read live order data from the WMS.*

After the Playwright automation script was working well enough to handle the core printing workflow, a new problem emerged. The script could automate the clicking, but I still had to manually watch the screen to know when each carrier group was fully printed. The table updates after each label prints, but there was no way to know you were done without counting rows yourself — exactly the kind of cognitive load I was trying to eliminate.

What I wanted was a live counter: carrier by carrier, how many orders are printed, how many are left, and a clear signal when the whole batch was ready to wave. Something I could glance at without stopping the workflow.

The natural answer was a Chrome extension. It could read the page DOM in real time and show a floating panel with the numbers I cared about.

---

## Attempt 1: Just Read the DOM

The first version was simple. A content script runs inside the LingXing page, reads the order table every two seconds, counts rows by carrier and print status, and updates a floating panel in the corner.

This worked. Sort of.

The problem is that LingXing virtualizes the table. Even when the page size is set to 1000, only the rows currently in the viewport are actually in the DOM. Scrolling renders new rows and removes old ones. The extension was reading maybe 20 rows at a time regardless of the actual order count.

For a batch of 40 orders this was acceptable. For a Monday batch of 400, the counts were meaningless.

The fix required getting the full dataset some other way.

---

## Attempt 2: Calling the API from the Extension

The API approach that failed earlier had a new angle worth trying. A content script runs inside the page itself — inside the same origin, sharing the same cookies and session state. If I made the API call from the content script with `credentials: "include"`, the browser would attach all the session cookies automatically.

Still 401.

The Track-Key header is what the server actually validates, and the content script doesn't get that automatically — it would have to be set explicitly. To get a valid Track-Key, I needed to intercept one from the page's own requests.

The first attempt at interception used an injected script tag to hook `window.fetch` before LingXing's code ran. This worked for capture: I could see the Track-Key values as the page made requests. But using a captured key in a subsequent request still returned 401. The server appears to bind each Track-Key to the specific request that generated it — request parameters, timestamp, session context, something — and reusing it on a different request fails validation.

Then there was the CSP problem. LingXing's page has a strict Content Security Policy:

```
Content-Security-Policy: script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules'
```

Injected script tags are blocked entirely. The hook approach stopped working entirely once I looked at the console errors more carefully. The hook code was being silently dropped before it ran.

---

## The Debugger API

The Chrome Extensions API has a `debugger` permission that lets an extension attach Chrome's DevTools protocol to a tab. Once attached, it can listen to network events at the protocol level — below CSP, below the page's JavaScript, at the raw HTTP request layer.

This is what the DevTools Network tab uses internally. The extension becomes DevTools.

```json
// manifest.json
{
  "permissions": ["debugger", "tabs", "storage"]
}
```

```javascript
// background service worker
await chrome.debugger.attach({ tabId }, "1.3");
await chrome.debugger.sendCommand({ tabId }, "Network.enable");

chrome.debugger.onEvent.addListener((source, method, params) => {
  if (method !== "Network.requestWillBeSent") return;
  const headers = params.request.headers;
  const tk   = headers["Track-Key"];
  const auth = headers["Authorization"];
  // ...
});
```

Every request the LingXing tab makes passes through this listener. The Track-Key and Authorization headers are captured before they hit the network. No injection required. No CSP interaction. The page never knows it's being listened to.

The downside: Chrome shows a yellow "DevTools is debugging this tab" banner at the top of the browser. This is visible and permanent while the extension is attached. For a personal tool running on a work PC, this is fine.

With credentials captured in the background service worker, the extension can now make its own API calls — from the service worker context, using the captured credentials explicitly. The service worker doesn't share the page's session, but it doesn't need to anymore because it has the actual headers.

---

## The Track-Key Expiry Problem

Getting credentials to work opened the next problem: Track-Keys expire.

From watching the background logs, each Track-Key is valid for approximately 7 API calls before returning 401. The page generates a new one with each user interaction. If the extension makes API calls faster than the page generates new keys, it burns through them and falls into a 401 loop.

The first approach — polling the API every 2 seconds — failed for exactly this reason. By the time the third or fourth poll fired, the key was stale.

The fix was an event-driven architecture. Instead of polling on a timer:

1. Background captures a new Track-Key when the page makes a request
2. Background pushes `new_tk` message to the content script
3. Content script starts a runner: 20 attempts at 500ms intervals
4. On success: cache the result, stop the runner
5. On 401: mark the key as `lastFailedTK`, stop the runner, wait for the next push

The runner never fires more than 20 times per key. It stops the moment it succeeds or confirms the key is dead. New keys arrive naturally as the user interacts with the page.

```javascript
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "new_tk") {
    if (!msg.tk || msg.tk === lastFailedTK) return;
    capturedTrackKey = msg.tk;
    // poll() will trigger the runner on next tick
  }
});
```

---

## The Payload Problem

The API call needs to match what the page actually sends. The WMS `blDelivery/page` endpoint takes a large JSON payload with around 40 fields — filters for date range, status, SKU list, logistics channel, and more.

The background captures the payload from the page's own requests alongside the credentials. This gives us an exact copy of what LingXing's frontend sends, which means the API call is indistinguishable from a legitimate page request.

One problem: when a logistics channel filter is active on the page (the user has drilled into a specific carrier), the captured payload includes `logisticsChannel: "CBT-hxhwc"` or similar. If the extension reuses this payload, the API returns only orders for that carrier — not the full batch.

The fix is to strip all logistics-related fields before making the call:

```javascript
const base = {
  ...capturedPayload,
  current: 1,
  size: 1000,
  logisticsChannel:     "",
  logisticsChannelName: "",
  logisticsCarrier:     "",
};
```

This ensures the extension always sees the full picture regardless of what the user is currently filtered to.

---

## The Batch Cache Model

With reliable API access, the next question was when to call it and what to do with the results.

The workflow has a clear structure. The user selects a set of SKUs — a "batch" — and works through all the carriers in that batch. The batch doesn't change until the user explicitly selects different SKUs or returns to the unfiltered view.

The extension detects the current batch by reading the SKU input field at the top of the filter bar. When the input has a value, a batch is active. When it's empty, the user is on the main unfiltered view.

The cache model:

- **No batch active**: show nothing, no API calls
- **New batch detected**: trigger one API fetch, cache the result
- **Batch active, no carrier filter**: show full carrier list from cache, poll every 15 seconds to update printed counts
- **Carrier filter active**: freeze the cache, use DOM rows to determine which carrier is currently visible, dim all others
- **Carrier filter cleared**: immediately trigger a fresh API fetch to capture any newly printed orders
- **Batch changed**: invalidate cache, start over

The freeze during carrier filtering is the key design decision. When the user is printing CBT orders, the extension shows the full list — CBT at full opacity, USPS and GOFO dimmed. If the API poll fired during this time and overwrote the cache with a fresh fetch, the display would flicker. Freezing the cache during filter operations prevents that.

The carrier filter detection uses the same approach as the SKU detection: find the input whose `placeholder === "Logistics Channel"` and check whether it has a value.

```javascript
for (const inp of document.querySelectorAll("input")) {
  if (inp.closest(".el-dialog")) continue;
  if (inp.placeholder === "Logistics Channel") {
    carrierFilter = inp.value.trim() || null;
    break;
  }
}
```

---

## Print Status

The API response includes an `expressPrintStatus` field per order. Discovering the correct values required a debug dump:

```
Field expressPrintStatus: {"10": 772}
Field waybillPrintStatus: {"MISSING": 772}
Field waybillPrinting:    {"MISSING": 772}
```

`expressPrintStatus: "10"` means unprinted. The field name for printed status is exclusively `expressPrintStatus` — the other candidates (`waybillPrintStatus`, `waybillPrinting`) don't exist in this API response. The printed value appears to be `"20"` or `"30"` based on the field naming convention, but this is inferred — a batch with all printed orders would confirm it.

```javascript
function apiCarriers(records) {
  records.forEach(o => {
    const status  = String(o.expressPrintStatus || "");
    const printed = status !== "" && status !== "10";
    // ...
  });
}
```

---

## Multi-Client Support

The warehouse handles orders for multiple clients on different warehouse codes. LingXing uses `whCode` as a parameter on every API request to route to the right warehouse.

The extension hardcoded `08879` initially — the main warehouse. When a second client on `PC07` needed support, the simplest fix was a toggle in the panel header.

Two spans styled as a pill toggle, switching a `activeWH` variable in the background service worker on click:

```javascript
function setWH(code) {
  currentWH = code;
  chrome.runtime.sendMessage({ type: "set_wh", code }, () => {
    // Invalidate cache — new warehouse, new data
    batchCache     = null;
    batchFetchDone = false;
  });
}
```

---

## What the Extension Actually Shows

The final panel, rebuilt in Google Material Design:

- **Batch tag**: the current SKU filter value, pulsing dot while active
- **Stats row**: global pending orders (highest count seen this session), batch total from pagination, printed percentage
- **Carrier table**: all carriers in the batch, total / done / left columns, dimmed when not currently filtered
- **Progress bar**: blue-to-green gradient filling as orders print
- **Wave ready banner**: appears when all carriers reach zero unprinted
- **Force refresh button**: clears cache and triggers immediate API fetch
- **Warehouse toggle**: HX / PC07 pill in the header

The "global pending" stat uses a max-ever approach rather than current value. Because the unfiltered count is only visible when no SKU filter is active, the extension tracks the highest value it's seen and never decrements it. This gives a stable reference for total queue size even when drilling into a specific batch.

---

## What's Still Pending

Testing the Playwright script's print and wave creation steps on the actual warehouse PC with live orders. These steps involve physical printer interaction and wave state that can't be verified in a dry-run environment.

The orchestrator — a Claude agent that reads the pending order state and decides which SKUs to batch, handed to Playwright for execution — is the next thing to build. The detection and automation infrastructure for the full workflow already exists. The AI decision layer is a thin wrapper on top of it.

