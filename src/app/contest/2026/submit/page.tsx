"use client";

import { useState } from "react";

export default function ContestSubmitPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contest/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "투고에 실패했습니다.");
      }

      setMessage("투고가 정상적으로 접수되었습니다.");
      form.reset();
    } catch (err: any) {
      setMessage(err.message || "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* 제목 */}
      <h1 className="text-2xl font-bold tracking-tight">
        문수림배 제3회 문예경연대회 투고하기
      </h1>

      {/* 안내 */}
      <section className="mt-6 rounded-2xl border bg-neutral-50 p-5 space-y-3 text-sm text-neutral-700 leading-relaxed">
        <p>
          본 페이지는 <strong>이메일 접수</strong>를 보조하기 위한 투고
          폼입니다. 실제 원고 접수는 메일을 통해 이루어지며, 형식 미준수
          시 별도 안내 없이 제외될 수 있습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>원고는 반드시 <strong>파일로 첨부</strong>해야 합니다.</li>
          <li>
            허용 형식: <strong>.hwp / .hwpx / .pdf / .doc</strong>
          </li>
          <li>
            <strong>.txt 파일은 인정하지 않습니다.</strong>
          </li>
          <li>메일 본문에 원고를 작성하지 마십시오.</li>
          <li>
            이메일 인증을 완료한 계정만 접수가 인정됩니다.
          </li>
        </ul>
      </section>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            작품명
          </label>
          <input
            name="workTitle"
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            필명
          </label>
          <input
            name="penName"
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            원고 파일
          </label>
          <input
            type="file"
            name="file"
            required
            accept=".hwp,.hwpx,.pdf,.doc"
            className="block w-full text-sm"
          />
          <p className="mt-1 text-xs text-neutral-500">
            허용 형식: hwp, hwpx, pdf, doc (txt 불가)
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-neutral-900 px-6 py-3 text-white disabled:opacity-50"
        >
          {submitting ? "투고 중…" : "투고하기"}
        </button>

        {message && (
          <p className="text-sm text-neutral-700">{message}</p>
        )}
      </form>
    </main>
  );
}
