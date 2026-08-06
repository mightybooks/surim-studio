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
  const title = String(body.title ?? "").trim();
  const subtitle = String(body.subtitle ?? "").trim();
  const content = String(body.content_md ?? "");
  const status = String(body.status ?? "");
  const section = String(body.section ?? "").trim();
  const heroImageUrl = body.hero_image_url ? String(body.hero_image_url).trim() : null;
  const tags = Array.isArray(body.tags) ? body.tags.map(String).map((tag) => tag.trim()) : [];

  if (!SLUG_PATTERN.test(slug) || slug.length > 120 || !title || title.length > 200 || subtitle.length > 300 ||
      !content.trim() || content.length > 500_000 || !["draft", "published"].includes(status) ||
      section.length > 40 || tags.length > 20 || tags.some((tag) => !tag || tag.length > 40)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }
  if (heroImageUrl && heroImageUrl.length > 500) return NextResponse.json({ message: "Invalid image URL" }, { status: 400 });

  const now = new Date().toISOString();
  const record = {
    slug,
    title,
    subtitle: subtitle || null,
    content_md: content,
    hero_image_url: heroImageUrl,
    tags,
    section: section || null,
    status,
    updated_at: now,
    ...(status === "published" ? { published_at: now } : {}),
  };
  const { error } = await admin.adminClient.from("blog_posts").upsert(record, { onConflict: "slug" });
  if (error) {
    console.error("admin blog save failed", { code: error.code });
    return NextResponse.json({ message: "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
