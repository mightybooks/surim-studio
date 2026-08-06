import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
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
