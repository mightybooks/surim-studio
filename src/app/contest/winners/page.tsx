"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

const CONTEST_SLUG = "2025";

type Winner = {
  id: string;
  title: string;
  body: string;
  profiles: { display_name: string | null } | null;
};

export default function WinnersPage() {
  const supabase = createClient();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    // 1) 컨테스트 조회
    const { data: contest, error: cErr } = await supabase
      .from("contests")
      .select("id")
      .eq("slug", CONTEST_SLUG)
      .single();

    if (cErr || !contest?.id) {
      console.warn("Contest not found:", CONTEST_SLUG, cErr);
      setWinners([]);
      setLoading(false);
      return;
    }

    // 2) 수상작 조회
    const { data, error } = await supabase
      .from("submissions")
      .select("id,title,body,profiles(display_name)")
      .eq("contest_id", contest.id)
      .eq("status", "winner")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setWinners([]);
      setLoading(false);
      return;
    }

    // 3) Supabase 응답 → 화면용 Winner로 안전 매핑
    const mapped: Winner[] = (data ?? []).map((d: any) => ({
      id: String(d.id),
      title: String(d.title ?? ""),
      body: String(d.body ?? ""),
      profiles: Array.isArray(d.profiles)
        ? d.profiles[0]
          ? { display_name: d.profiles[0].display_name ?? null }
          : null
        : d.profiles
        ? { display_name: d.profiles.display_name ?? null }
        : null,
    }));

    setWinners(mapped);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="p-8">불러오는 중…</div>;
  if (winners.length === 0) return <div className="p-8">아직 수상작이 발표되지 않았습니다.</div>;

  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-8">문수림배 소설 창작대회 수상작</h1>
      <ul className="space-y-10">
        {winners.map((w, i) => (
          <li key={w.id} className="border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">🏆 {i + 1}위: {w.title}</h2>
            <p className="text-sm text-zinc-500 mb-4">{w.profiles?.display_name ?? "익명 참가자"}</p>
            <pre className="whitespace-pre-wrap text-zinc-800 leading-relaxed">{w.body}</pre>
          </li>
        ))}
      </ul>
    </main>
  );
}
