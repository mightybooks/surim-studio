import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json(
      { message: "권한이 없습니다." },
      { status: 403 }
    );
  }

  const { orderId, status, trackingNumber } = await req.json();

  if (!orderId || !status) {
    return NextResponse.json(
      { message: "필수 값 누락" },
      { status: 400 }
    );
  }

  const updateData: any = { status };

  if (status === "shipped") {
    updateData.shipped_at = new Date();
    updateData.tracking_number = trackingNumber ?? null;
  }

  const { error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (error) {
    return NextResponse.json(
      { message: "상태 변경 실패", error },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
