import { NextRequest, NextResponse } from "next/server";
import { fetchAndStoreLiveData } from "@/lib/fetchLiveData";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await fetchAndStoreLiveData();
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[refresh-psi]", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
