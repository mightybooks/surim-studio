import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await req.json().catch(() => null);

    return NextResponse.json({ ok: true, disabled: true });
  } catch (err) {
    console.error("DEBUG API ERROR", err);
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}
