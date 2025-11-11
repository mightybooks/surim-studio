"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

const CONTEST_SLUG = "2025";

type Row = { id: string; title: string; body: string; status: string; created_at: string };

export default function MySubmissions() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string|null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [notice, setNotice] = useState<string|null>(null);

  const load = async () => {
    setLoading(true);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user.id ?? null;
    setUserId(uid);
    if (uid) {
      const { data: contest } = await supabase.from("contests").select("id,status").eq("slug", CONTEST_SLUG).single();
      const { data } = await supabase
        .from("submissions")
        .select("id,title,body,status,created_at")
        .eq("author_id", uid)
        .eq("contest_id", contest?.id)
        .order("created_at", { ascending: false });
      setRows((data ?? []) as Row[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (!userId) return <div className="p-8">로그인이 필요합니다.</div>;
  if (loading) return <div className="p-8">불러오는 중…</div>;

  const startEdit = (r: Row) => {
    setEditingId(r.id);
    setEditTitle(r.title);
    setEditBody(r.body);
    setNotice(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setNotice(null);
    const { error } = await supabase.from("submissions").update({ title: editTitle, body: editBody }).eq("id", editingId);
    if (error) setNotice("수정 실패: " + error.message);
    else {
      setNotice("수정되었습니다.");
      await load();
      cancelEdit();
    }
  };

  const remove = async (id: string) => {
    setNotice(null);
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) setNotice("삭제 실패: " + error.message);
    else {
      setNotice("삭제되었습니다.");
      await load();
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">내 제출물</h1>
      {notice && <p className="text-sm text-zinc-500 mb-3">{notice}</p>}

      {rows.length === 0 ? (
        <p className="text-zinc-600">제출한 원고가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map(r => (
            <li key={r.id} className="border rounded-lg p-4">
              {editingId === r.id ? (
                <div className="space-y-2">
                  <input
                    value={editTitle}
                    onChange={e=>setEditTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                  <textarea
                    value={editBody}
                    onChange={e=>setEditBody(e.target.value)}
                    rows={10}
                    className="w-full border px-3 py-2 rounded-md leading-7"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="px-3 py-1 border rounded-md text-sm">저장</button>
                    <button onClick={cancelEdit} className="px-3 py-1 border rounded-md text-sm">취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{r.title}</h3>
                    <span className="text-xs text-zinc-500">{r.status}</span>
                  </div>
                  <details className="mt-2">
                    <summary className="text-sm text-zinc-600 cursor-pointer">본문 열기</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-sm text-zinc-800">{r.body}</pre>
                  </details>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>startEdit(r)} className="px-3 py-1 border rounded-md text-sm">수정</button>
                    <button onClick={()=>remove(r.id)} className="px-3 py-1 border rounded-md text-sm">삭제</button>
                  </div>
                </>
              )}
              <p className="text-xs text-zinc-400 mt-1">{new Date(r.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
