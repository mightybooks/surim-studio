// src/lib/postsNav.ts

export type PostMeta = {
  slug: string;               // supabase blog_posts.slug
  title: string;              // supabase blog_posts.title
  published_at: string | null; // supabase blog_posts.published_at
};

export function getPrevNextPost(posts: PostMeta[], currentSlug: string) {
  // published_at 기준 최신순
  const sorted = [...posts].sort((a, b) => {
    const aDate = a.published_at ? new Date(a.published_at).getTime() : 0;
    const bDate = b.published_at ? new Date(b.published_at).getTime() : 0;
    return bDate - aDate;
  });

  const index = sorted.findIndex((p) => p.slug === currentSlug);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  return { prev, next };
}
