import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const [profileRes, submissionsRes, ordersRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("contact_email_pending, contact_email_verified_at")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("contest_submissions")
      .select("id, contest_year, work_title, pen_name, status, submitted_at")
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false }),
    supabase
      .from("orders")
      .select(
        "id, product_name, amount_minor, currency, status, created_at, shipping_carrier, tracking_number, shipped_at, is_digital",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  if (profileRes.error || submissionsRes.error || ordersRes.error) {
    console.error("my summary fetch failed", {
      profile: profileRes.error?.code,
      submissions: submissionsRes.error?.code,
      orders: ordersRes.error?.code,
    });

    return NextResponse.json({ error: "FETCH_FAILED" }, { status: 500 });
  }

  return NextResponse.json({
    profile: profileRes.data,
    submissions: submissionsRes.data ?? [],
    orders: ordersRes.data ?? [],
  });
}
