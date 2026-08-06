import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import NewsEditorClient from "../NewsEditorClient";

export const dynamic = "force-dynamic";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
};

function normalizeSaved(value: string | undefined) {
  return value === "created" || value === "updated" ? value : undefined;
}

export default async function AdminNewsEditPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const { data, error } = await adminSupabase
    .from("news_posts")
    .select("slug, title, summary, content_markdown, status, published_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <NewsEditorClient
      initialPost={data as {
        slug: string;
        title: string;
        summary: string | null;
        content_markdown: string;
        status: "draft" | "published";
        published_at: string | null;
      }}
      saved={normalizeSaved(query.saved)}
    />
  );
}
