// src/app/api/funding/progress/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/funding/progress?source=funding_500
 * Response: { currentBooks: number, targetBooks?: number }
 *
 * 전제:
 * - orders 테이블에 source(text) 컬럼 존재
 * - ✅ RPC로 SUM(quantity) 집계 (권수 기준)
 * - 결제 완료 상태값(status)은 기본 "paid"로 가정 (프로젝트에 맞게 조정 가능)
 */

const supabaseUrl = process.env.SUPABASE_URL!;
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

    // ✅ 임시 디버그: 어떤 Supabase를 보고 있는지 식별
    const supaHost = (() => {
      try { return new URL(supabaseUrl).host; } catch { return "invalid-url"; }
    })();

    // ✅ RPC: DB에서 SUM(quantity) 수행
    // public.funding_current_books(p_source, p_paid_status) -> bigint
    const { data, error } = await supabase.rpc("funding_current_books", {
      p_source: source,
      p_paid_status: PAID_STATUS,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // rpc returns bigint -> JS에서는 number로 변환
    // (목표가 150~수천 수준이면 안전)
    const currentBooks =
      typeof data === "number"
        ? data
        : Number(data ?? 0);

    return NextResponse.json(
      { currentBooks, targetBooks: TARGET_BOOKS, },
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
