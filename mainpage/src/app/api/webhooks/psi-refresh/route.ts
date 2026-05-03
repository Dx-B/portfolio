import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
import { NextRequest, NextResponse } from "next/server";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TARGET_URL = "https://billyzhang.dev/temp";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl =
    `${PSI_ENDPOINT}?url=${encodeURIComponent(TARGET_URL)}` +
    `&strategy=desktop&category=performance` +
    (process.env.PSI_API_KEY ? `&key=${process.env.PSI_API_KEY}` : "");

  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[psi-refresh] PSI error", res.status, body.slice(0, 300));
    return NextResponse.json(
      { error: `PSI returned ${res.status}`, detail: body.slice(0, 300) },
      { status: 502 }
    );
  }

  const json = await res.json();
  const lhr = json.lighthouseResult;
  const audits = lhr.audits;

  const metrics = {
    perf: Math.round((lhr.categories.performance.score as number) * 100),
    lcp: strip(audits["largest-contentful-paint"].displayValue),
    fcp: strip(audits["first-contentful-paint"].displayValue),
    cls: fmtCLS(audits["cumulative-layout-shift"].displayValue),
    tbt: strip(audits["total-blocking-time"].displayValue),
    measuredAt: new Date().toISOString(),
  };

  await redis.set("psi:metrics", metrics);
  return NextResponse.json({ ok: true, metrics });
}

/** "0.6 s" → "0.6s",  "0 ms" → "0ms" */
function strip(v: string): string {
  return v.replace(/\s+/g, "");
}

/** Normalize CLS to always 2 decimal places: "0" → "0.00" */
function fmtCLS(v: string): string {
  const n = parseFloat(v);
  return isNaN(n) ? v : n.toFixed(2);
}
