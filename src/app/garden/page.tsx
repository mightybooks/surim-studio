"use client";
import { useEffect, useState } from "react";

export default function Garden() {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchStories() {
    const res = await fetch("/api/stories");
    const json = await res.json();
    setItems((json.items || []).map((x: any) => x.content));
  }

  useEffect(() => { fetchStories(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.trim() }),
    });
    setText("");
    setLoading(false);
    fetchStories();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">〈그날의 토실이〉 정원</h1>
      <form onSubmit={submit} className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} maxLength={50}
               placeholder="오늘의 돌봄 한 줄 (50자)" className="w-full rounded-xl border px-4 py-3"/>
        <button disabled={loading} className="rounded-xl bg-emerald-800 px-5 py-3 text-white" type="submit">
          {loading ? "심는 중..." : "심기"}
        </button>
      </form>
      <ul className="grid gap-3 md:grid-cols-3">
        {items.map((t, i) => <li key={i} className="rounded-2xl border p-4">{t}</li>)}
      </ul>
    </section>
  );
}
