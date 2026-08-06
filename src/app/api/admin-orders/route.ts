import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/securityServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const admin = await getAdminContext();
  if (!admin.ok) {
    return NextResponse.json({ message: admin.status === 401 ? "Unauthorized" : "Forbidden" }, { status: admin.status });
  }
  const { data: orders, error } = await admin.adminClient
    .from("orders")
    .select("id, product_name, amount, amount_minor, currency, pg, status, created_at, recipient_name, phone, quantity, source")
    .eq("status", "paid")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("admin orders fetch failed", { code: error.code });
    return NextResponse.json({ message: "주문 조회 실패" }, { status: 500 });
  }
  return NextResponse.json({ orders });
}
