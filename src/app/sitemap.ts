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
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async function fetchBlogPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published");

    if (error) {
      console.error("sitemap: blog fetch failed", error);
      return [] as Row[];
    }
    return (data ?? []) as Row[];
  }

  async function fetchNewsPosts() {
    const { data, error } = await supabase
      .from("news_posts")
      .select("slug, updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());

    if (error) {
      console.error("sitemap: news fetch failed", error);
      return [] as Row[];
    }
    return (data ?? []) as Row[];
  }

  const [newsPosts, blogPosts] = await Promise.all([
    fetchNewsPosts(),
    fetchBlogPosts(),
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
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/news`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    {
      url: `${base}/research/500-character-fiction/examples`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/edition/surimji`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/edition/surimji/issue-0`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...newsUrls,
    ...blogUrls,
  ];
}
