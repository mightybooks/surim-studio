import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { UUID_PATTERN } from "@/lib/securityServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const orderId = new URL(req.url).searchParams.get("orderId")?.trim() ?? "";
  if (!UUID_PATTERN.test(orderId)) {
    return NextResponse.json({ ok: false, error: "INVALID_ORDER_ID" }, { status: 400 });
  }

  // RLS is retained as defense in depth; the explicit user_id predicate prevents
  // disclosing whether another user's order exists.
  const { data: order, error } = await supabase
    .from("orders")
    .select("status, product_id")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !order) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    status: String(order.status ?? "").trim(),
    productId: String(order.product_id ?? "").trim(),
  });
}
