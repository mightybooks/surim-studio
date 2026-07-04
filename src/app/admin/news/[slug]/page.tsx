import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import NewsEditorClient from "../NewsEditorClient";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type Props = {
  params: { slug: string };
};

export default async function AdminNewsEditPage({ params }: Props) {
  const { data, error } = await adminSupabase
    .from("news_posts")
    .select("slug, title, summary, content_markdown, status, published_at")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return <NewsEditorClient initialPost={data as any} />;
}
