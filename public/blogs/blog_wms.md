# How I Tried to Automate My Warehouse Job (And What the Server Had to Say About It)

A few weeks into working at a fulfillment warehouse, I started noticing the same pattern every shift. Open the WMS. Click the hot items dashboard. Read the top SKU. Type it into the search bar. Select all. Filter by carrier. Print. Repeat. The whole thing took maybe 20 minutes per batch and required enough attention that you couldn't do anything else while doing it. It was boring in exactly the way that makes you want to write a script.

The system was LingXing, a Chinese WMS popular with cross-border ecommerce warehouses. Web app, reasonably modern, built on Vue. I started wondering what it would take to automate the workflow entirely.

This is the story of how that went.

---

## What the Workflow Actually Looks Like

The job is to process outbound orders in batches. The goal is to group similar items together, ideally 30 to 40 orders per run, then print shipping labels sorted by logistics carrier so the physical sticker stack comes out organized.

The steps, in order: open the Parcel Outbound page, click the SKU * Quantity search field to open the hot items dashboard (which shows all pending SKUs ranked by order count), pick enough SKUs from the top of that list to land in the 30-40 order range, confirm. The main table filters to just those orders. Read the carrier column. For each carrier, filter the table, select all orders cross-page, click "Manage shipping label" then "Print shipping label," confirm twice, and print. After all carriers are done, select everything and create a wave. Print the wave summary.

On a slow day that's two or three repetitions of this loop. On a heavy day it's ten. Each repetition is the same clicks in the same order.

---

## Attempt 1: PowerShell Against the API

The first thing I did was capture a HAR file during a normal session. A HAR (HTTP Archive) is a JSON dump of every network request the browser makes. Chrome's DevTools exports them in a few clicks.

Parsing the HAR revealed the full API surface right away:

```
POST /gateway/wms/blDelivery/listSkuQtyGroup
POST /gateway/wms/blDelivery/page
POST /gateway/wms/blDelivery/deliveryList/batchDownloadExpress
POST /gateway/wms/blDelivery/createWaveDir
POST /gateway/wms/blWave/waveList/download
```

The payloads were clean JSON with readable field names. The hot items endpoint accepted `sortName: "pendingOrderQty"` and returned exactly what the dashboard showed. The page endpoint took a `skuQtyStrList` filter and a `logisticsChannel` field. The download endpoint returned a PDF blob. The whole workflow was there, readable, reproducible.

I wrote a PowerShell script to call these endpoints using the Bearer token from the HAR. It returned `401 请求未授权`.

The token in the HAR was two days old. I grabbed a fresh one from DevTools, made sure cache was disabled so the headers were real and not provisional, pasted it in. Still 401.

---

## The Track-Key Problem

Looking more carefully at the request headers, I noticed a field missing from my script: `Track-Key`. One example:

```
Track-Key: w3DNpobwAN1daEL/Ze1zWgfd617f4f738613ab05a8257787962755c370cda686f000dd5d6842ff65ed735a
```

Across three different requests, the Track-Key values were all different. Static credential ruled out. I pulled all three and ran some analysis:

```python
keys = [
    'HMtqHnM6/Q5On3JzsYISLQb01ae1aef84762ba4d87d97920d1715b1ccb6a1e733afd0e4e9f7273b182122d',
    'UCeLhQtPIz+asGCGsu4/GQacebdffdbe35d2a7f025743bbf1bf34250278b850b4f233f9ab06086b2ee3f19',
    'w3DNpobwAN1daEL/Ze1zWgfd617f4f738613ab05a8257787962755c370cda686f000dd5d6842ff65ed735a'
]
```

Each key is 86 characters. The first 22 decode as base64 to 16 bytes. The remaining 64 are a hex string, which is 32 bytes, the length of a SHA-256 hash. The base64-decoded prefix matches the last 16 bytes of the hex hash exactly, for all three:

```python
prefix_bytes = base64.b64decode(prefix + '==').hex()
suffix_end   = hex_suffix[-32:]
print(prefix_bytes == suffix_end)  # True, for all three
```

The structure is `base64(sha256[-16:]) + sha256_hex`. The Track-Key is a SHA-256 hash of something, with the last 16 bytes also prepended in base64. The hash input is generated client-side by LingXing's JavaScript bundle and changes per request. Without finding the signing key inside their minified JS, it can't be replicated externally.

This is where the direct API approach stopped making sense.

---

## Attempt 2: Chrome Extension

If replicating the auth externally wasn't going to work, the next option was running requests from inside the browser where the session already exists. A Chrome extension can make `fetch()` calls with `credentials: "include"` and the browser attaches session state automatically.

I built a Manifest V3 extension with a popup UI: run confirmation table, carrier breakdown, multi-item order flagging. The background service worker made the API calls.

Still 401.

Service workers run in a separate context from the page. Even with `credentials: "include"`, the Track-Key generation that LingXing's JavaScript performs on the page doesn't happen in the service worker. Cookies are present but the server is rejecting the request anyway.

Moving the fetch calls into a content script should fix that, since content scripts actually run inside the LingXing page. I rewrote the architecture: popup talks to background, background routes to content script via `chrome.tabs.sendMessage`, content script makes the fetch calls from inside the page and posts results back.

Still 401.

The Track-Key header still has to be set explicitly, and even from inside the page a content script doesn't get it automatically. So I tried hooking `window.fetch` from an injected script tag, before LingXing's code runs, to capture the Track-Key from outgoing page requests and reuse it in subsequent calls.

This worked for capture, but created a new problem: the extension popup closes the moment you click anywhere on the page, making it impossible to trigger a page request while the popup is open. I rewrote the extension as an injected floating panel instead of a popup so it stays visible during page interaction. The hook ran. The Track-Key was captured.

The captured key still 401'd on the extension's own requests. The server validates each Track-Key against the request that generated it, probably binding it to some combination of timestamp, session state, and request parameters. Reusing a captured key on a different request doesn't pass that check.

---

## A Note on the JWT

While debugging, I decoded the Bearer token. JWT payloads are base64-encoded JSON with no encryption:

```python
import base64, json
payload_b64 = token.split('.')[1]
payload_b64 += '=' * (4 - len(payload_b64) % 4)
payload = json.loads(base64.b64decode(payload_b64))
```

The decoded payload showed `"exp": 1779026335`. Converting that timestamp: the token expires exactly 24 hours after login. The HAR I initially used was two days old, which explained the first 401. But expiry wasn't the whole story, since a fresh token also failed.

The JWT also revealed something else: LingXing issues two different tokens depending on where you are in the application. The OMP token has `"businessType": "omp"`, the WMS token has `"businessType": "wms"`. They route to different gateways. Using the wrong one for a WMS endpoint returns 401 regardless of the Track-Key.

---

## Attempt 3: Playwright

After enough time on the auth problem, I stepped back. The goal was to automate the workflow, not specifically to call the API. Browser automation via Playwright does the same thing by controlling Chrome directly. It reads the DOM and clicks on the actual page. No auth headers involved, because no requests are made outside the existing browser session.

Reading the DOM is also more reliable than OCR and more stable than positional clicking. I captured screenshots of every step of the workflow and mapped exact selectors. A few worth noting:

The hot items dashboard opens from `input[placeholder*='SKU']`, the search field in the top filter bar. SKU rows in the modal are `.el-table__body tr.el-table__row` with the pending count at cell index 1. The Logistics Channel column sits at index 6 in the main table. "Cross-page Select All" is a labeled checkbox at the bottom of the table. The "Manage shipping label" dropdown has exactly three options: "Create shipping label," "Replace shipping label," and "Print shipping label." The middle one should never be clicked. The print flow has two confirmation dialogs: a count check and a per-order waybill status table.

The script supports `--dry-run` to read and display the full order manifest without making any write actions, `--step N` to stop at any point in the workflow, and a terminal breakpoint before every step that changes state.

The warehouse PC doesn't have Python installed. One install session and it runs from there.

---

## Why This Took Three Attempts

The LingXing auth design, session-bound JWTs combined with per-request signing keys generated client-side, isn't accidental. SaaS platforms that want to control integration access build exactly this kind of friction into their internal APIs, separate from any official developer offering. LingXing does have an open API with AppId/AppSecret credentials that generates stable, long-lived tokens without these constraints. Getting those credentials means going through the account admin and requesting API access, which is the right path for a production integration.

For a warehouse worker automating their own repetitive task, that path involves too many people. Playwright is the more direct answer: it needs nothing beyond an active login, works with whatever session auth the browser already holds, and survives most UI changes without touching request-level code. It's slower than direct API calls and somewhat brittle to layout changes, but for something running a handful of times a day, that's an acceptable tradeoff.

The script that exists now is about 800 lines of Python. It opens Chrome, navigates to the right page, reads the hot items list, selects enough SKUs to hit the order count target, shows a confirmation table with carrier breakdown and multi-item flagging, prints labels per carrier, creates a wave by selection, and prints the summary picking list. Testing on the actual warehouse PC is still pending.

