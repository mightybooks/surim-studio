// src/app/api/funding/progress/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/funding/progress?source=funding_500
 * Response: { currentBooks: number, targetBooks?: number }
 *
 * 전제:
 * - orders 테이블에 source(text), quantity(int) 컬럼이 존재
 * - 결제 완료 상태값(status)은 기본 "paid"로 가정 (프로젝트에 맞게 조정 가능)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 결제 완료로 집계할 상태값(프로젝트에 맞게 하나로 통일 권장)
const PAID_STATUS = process.env.FUNDING_PAID_STATUS ?? "paid";

// 타깃은 화면에서 props로도 주지만, API에서 함께 주고 싶으면 여기에 상수로 둬도 됩니다.
const TARGET_BOOKS = 150;

export async function GET(req: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server env is not configured (SUPABASE keys missing)." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source");

    if (!source || source.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing required query param: source" },
        { status: 400 }
      );
    }

    // Service Role로 조회 (RLS 영향 없이 집계)
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Supabase 쿼리로 SUM(quantity) 집계
    // head:false 로 실제 데이터 row(집계 결과)를 받습니다.
    const { data, error } = await supabase
      .from("orders")
      .select("quantity")
      .eq("source", source)
      .eq("status", PAID_STATUS);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // quantity 합산 (기본값 1이 들어가도록 컬럼 정의하는 것을 전제로 함)
    const currentBooks =
      (data ?? []).reduce((sum, row: any) => sum + (row?.quantity ?? 1), 0) || 0;

    return NextResponse.json(
      { currentBooks, targetBooks: TARGET_BOOKS },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown server error" },
      { status: 500 }
    );
  }
}
