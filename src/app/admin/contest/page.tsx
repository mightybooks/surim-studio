"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// 클라이언트에서 쓸 환경변수는 NEXT_PUBLIC 접두어만 노출됩니다.
const CONTEST_SLUG = process.env.NEXT_PUBLIC_CONTEST_SLUG ?? "2025";

// 상태 리터럴 유니온 고정
const STATUSES = ["all", "submitted", "eligible", "rejected", "winner"] as const;
type StatusFilter = typeof STATUSES[number];

type Row = {
  id: string;
  title: string;
  body: string;
  status: "submitted" | "eligible" | "rejected" | "winner";
  created_at: string;
  profiles: { display_name: string | null } | null;
};

export default function AdminContestPage() {
  const supabase = createClient();
  const router = useRouter();

  // 접근 가드 단계: 권한 확인 전/허용/차단
  const [gate, setGate] = useState<"checking" | "allowed" | "denied">("checking");

  // 데이터 상태
  const [rows, setRows] = useState<Row[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState<boolean>(true);

// 접근 가드: RPC로 관리자 여부 확인 (admins 테이블 직접 조회 X)
useEffect(() => {
  const run = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/");
      return;
    }

    // RLS에 막히지 않는 SECURITY DEFINER 함수 호출
    const { data: isAdmin, error } = await supabase.rpc("is_admin");
    if (error || !isAdmin) {
      router.replace("/");
      return;
    }

    setGate("allowed");  // 허용되면 이후 effect에서 load()가 호출됩니다.
  };
  run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // 목록 로딩 함수 (useCallback으로 고정)
  const load = useCallback(async () => {
    setLoading(true);

    // 1) 컨테스트 ID 조회
    const { data: contest, error: contestErr } = await supabase
      .from("contests")
      .select("id")
      .eq("slug", CONTEST_SLUG)
      .single();

    if (contestErr || !contest?.id) {
      console.warn("Contest not found:", CONTEST_SLUG, contestErr);
      setRows([]);
      setLoading(false);
      return;
    }

    // 2) 제출물 조회
    const { data, error } = await supabase
      .from("submissions")
      .select("id,title,body,status,created_at,profiles(display_name)")
      .eq("contest_id", contest.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setRows([]);
    } else {
      setRows((data ?? []) as Row[]);
    }

    setLoading(false);
  }, [supabase]);

  // 접근 허용된 뒤에만 데이터 로딩
  useEffect(() => {
    if (gate === "allowed") load();
  }, [gate, load]);

  // 필터링
  const filtered = useMemo(() => {
    if (statusFilter === "all") return rows;
    return rows.filter(r => r.status === statusFilter);
  }, [rows, statusFilter]);

  // 상태 업데이트
  const updateStatus = async (id: string, status: Row["status"]) => {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (error) {
      console.error(error);
      alert("업데이트에 실패했습니다.");
      return;
    }
    await load();
  };

  // 게이트 단계 렌더
  if (gate === "checking") return <div className="p-8">접근 권한 확인 중…</div>;
  if (gate === "denied") return null;

  // 데이터 로딩
  if (loading) return <div className="p-8">불러오는 중…</div>;

  return (
    <main className="max-w-5xl mx-auto py-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">대회 제출물(관리)</h1>
          <p className="text-sm text-zinc-500 mt-1">
            총 {rows.length}건 · 필터 {statusFilter !== "all" ? `"${statusFilter}"` : "전체"}
          </p>
        </div>
        <button
          onClick={load}
          className="px-3 py-1 border rounded-md text-sm"
          title="새로고침"
        >
          새로고침
        </button>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 border rounded-md text-sm ${
              statusFilter === s ? "bg-zinc-100 font-medium" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 border rounded-lg text-sm text-zinc-600">
          조건에 맞는 제출물이 없습니다.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map(r => (
            <li key={r.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{r.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {r.profiles?.display_name ?? "익명"} · {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    r.status === "winner"
                      ? "bg-amber-50 border-amber-300 text-amber-700"
                      : r.status === "eligible"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : r.status === "rejected"
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-zinc-50 border-zinc-300 text-zinc-600"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <details className="mt-3">
                <summary className="text-sm text-zinc-600 cursor-pointer">본문 열기</summary>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">{r.body}</pre>
              </details>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus(r.id, "eligible")}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  통과
                </button>
                <button
                  onClick={() => updateStatus(r.id, "rejected")}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  탈락
                </button>
                <button
                  onClick={() => updateStatus(r.id, "winner")}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  수상
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
