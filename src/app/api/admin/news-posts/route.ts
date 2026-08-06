import { NextResponse } from "next/server";
import { getAdminContext, hasValidOrigin, readJsonBody } from "@/lib/securityServer";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function POST(req: Request) {
  if (!hasValidOrigin(req)) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const admin = await getAdminContext();
  if (!admin.ok) return NextResponse.json({ message: admin.status === 401 ? "Unauthorized" : "Forbidden" }, { status: admin.status });
  const parsed = await readJsonBody(req, 600_000);
  if (!parsed.ok) return NextResponse.json({ message: parsed.error }, { status: parsed.status });
  const body = parsed.value;

  const slug = String(body.slug ?? "").trim();
  const originalSlug = body.original_slug ? String(body.original_slug).trim() : null;
  const title = String(body.title ?? "").trim();
  const summary = body.summary ? String(body.summary).trim() : null;
  const content = String(body.content_markdown ?? "");
  const status = String(body.status ?? "");
  if (!SLUG_PATTERN.test(slug) || slug.length > 120 ||
      (originalSlug && (!SLUG_PATTERN.test(originalSlug) || originalSlug.length > 120)) ||
      !title || title.length > 200 || (summary && summary.length > 500) ||
      !content.trim() || content.length > 500_000 || !["draft", "published"].includes(status)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const record = {
    slug,
    title,
    summary,
    content_markdown: content,
    status,
    published_at: status === "published" ? now : null,
    updated_at: now,
  };
  const query = originalSlug
    ? admin.adminClient.from("news_posts").update(record).eq("slug", originalSlug).select("slug").maybeSingle()
    : admin.adminClient.from("news_posts").insert(record).select("slug").single();
  const { data, error } = await query;
  if (error?.code === "23505") return NextResponse.json({ message: "이미 사용 중인 뉴스 slug입니다." }, { status: 409 });
  if (error) {
    console.error("admin news save failed", { code: error.code });
    return NextResponse.json({ message: "Save failed" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ message: "News not found" }, { status: 404 });
  return NextResponse.json({ ok: true, slug });
}
