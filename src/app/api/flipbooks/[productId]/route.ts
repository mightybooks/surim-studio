import { NextResponse } from "next/server";
import {
  getFlipbookByProductId,
  getFlipbookPagePaths,
} from "@/lib/flipbookCatalog";
import { serviceRoleClient } from "@/lib/securityServer";
import { supabaseServer } from "@/lib/supabase/server";

const SIGNED_URL_EXPIRES_IN = 60 * 10;
const PRIVATE_NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
};

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: PRIVATE_NO_STORE_HEADERS,
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const flipbook = getFlipbookByProductId(productId);
  if (!flipbook) return json({ message: "플립북을 찾을 수 없습니다." }, 404);

  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json({ message: "로그인이 필요합니다." }, 401);
  }

  const { data: paidOrder, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", flipbook.productId)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();

  if (orderError) {
    console.error("flipbook entitlement lookup failed", { code: orderError.code });
    return json({ message: "열람 권한을 확인하지 못했습니다." }, 500);
  }
  if (!paidOrder) {
    return json({ message: "플립북을 찾을 수 없습니다." }, 404);
  }

  const pagePaths = getFlipbookPagePaths(flipbook);
  const { data: signedPages, error: signedUrlError } = await serviceRoleClient()
    .storage
    .from(flipbook.bucket)
    .createSignedUrls(pagePaths, SIGNED_URL_EXPIRES_IN);

  if (
    signedUrlError ||
    !signedPages ||
    signedPages.length !== flipbook.pageCount ||
    signedPages.some(
      (item, index) => item.error || !item.signedUrl || item.path !== pagePaths[index],
    )
  ) {
    console.error("flipbook signed URL creation failed", {
      code: signedUrlError?.name ?? "SIGNED_URL_ITEM_ERROR",
    });
    return json({ message: "플립북 페이지를 불러오지 못했습니다." }, 500);
  }

  return json(
    {
      productId: flipbook.productId,
      pageCount: flipbook.pageCount,
      expiresIn: SIGNED_URL_EXPIRES_IN,
      pages: signedPages.map((item, index) => ({
        page: index + 1,
        url: item.signedUrl,
      })),
    },
    200,
  );
}
