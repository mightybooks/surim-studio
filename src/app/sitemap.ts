import { createClient } from "@supabase/supabase-js";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://surimstudio.com";

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버 전용
  );

  /* =========================
     NEWS
  ========================= */
  const { data: newsPosts, error: newsError } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("type", "news")
    .eq("published", true);

  if (newsError) {
    console.error("sitemap: news fetch failed", newsError);
  }

  const newsUrls =
    newsPosts?.map((post) => ({
      url: `${base}/news/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(),
    })) ?? [];

  /* =========================
     BLOG
  ========================= */
  const { data: blogPosts, error: blogError } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("type", "blog")
    .eq("published", true);

  if (blogError) {
    console.error("sitemap: blog fetch failed", blogError);
  }

  const blogUrls =
    blogPosts?.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(),
    })) ?? [];

  /* =========================
     STATIC / INDEX PAGES
  ========================= */
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/news`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },

    ...newsUrls,
    ...blogUrls,
  ];
}
