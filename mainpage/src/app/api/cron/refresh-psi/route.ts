import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TARGET_URL = "https://billyzhang.dev/temp";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl =
    `${PSI_ENDPOINT}?url=${encodeURIComponent(TARGET_URL)}` +
    `&strategy=mobile&category=performance` +
    (process.env.PSI_API_KEY ? `&key=${process.env.PSI_API_KEY}` : "");

  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[refresh-psi] PSI error", res.status, body.slice(0, 300));
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

function strip(v: string): string {
  return v.replace(/\s+/g, "");
}

function fmtCLS(v: string): string {
  const n = parseFloat(v);
  return isNaN(n) ? v : n.toFixed(2);
}
