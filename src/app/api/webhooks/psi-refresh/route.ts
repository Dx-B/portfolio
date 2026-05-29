import { NextRequest, NextResponse } from "next/server";
import { fetchAndStoreLiveData } from "@/lib/fetchLiveData";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await fetchAndStoreLiveData();
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[psi-refresh]", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
