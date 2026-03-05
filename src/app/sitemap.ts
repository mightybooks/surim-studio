import { createClient } from "@supabase/supabase-js";
import type { MetadataRoute } from "next";

type Row = {
  slug: string;
  updated_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://surimstudio.com";

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버 전용
  );

  async function fetchSection(section: "news" | "blog") {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("section", section)
      .eq("status", "published");

    if (error) {
      console.error(`sitemap: ${section} fetch failed`, error);
      return [] as Row[];
    }
    return (data ?? []) as Row[];
  }

  const [newsPosts, blogPosts] = await Promise.all([
    fetchSection("news"),
    fetchSection("blog"),
  ]);

  const newsUrls: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
  }));

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