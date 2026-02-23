"use client";

import { useState } from "react";

export default function ContestSubmitForm() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
      setFileName(null);
    } catch (err: any) {
      setMessage(err.message || "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">문수림배 500자 문예경연대회 투고하기</h1>

      <section className="mt-6 space-y-3 rounded-2xl border bg-neutral-50 p-5 text-sm leading-relaxed text-neutral-700">
        <p>
          본 페이지는 <strong>이메일 접수</strong>를 보조하기 위한 투고 폼입니다. 실제 원고 접수는 메일을
          통해 이루어지며, 형식 미준수 원고는 별도 안내 없이 제외될 수 있습니다.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>원고는 반드시 <strong>파일로 첨부</strong>해야 합니다</li>
          <li>
            허용 형식: <strong>.hwp / .hwpx / .pdf / .doc</strong>
          </li>
          <li>
            <strong>.txt 파일은 인정하지 않습니다.</strong>
          </li>
          <li>메일 본문에 원고를 작성하지 마십시오.</li>
          <li>이메일 인증이 완료된 계정만 접수가 인정됩니다.</li>
        </ul>
      </section>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" encType="multipart/form-data">
        <div>
          <label className="mb-1 block text-sm font-medium">작품명</label>
          <input name="workTitle" required className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">필명</label>
          <input name="penName" required className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">원고 파일</label>
          <input
            id="manuscript-file"
            type="file"
            name="file"
            required
            accept=".hwp,.hwpx,.pdf,.doc"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file ? file.name : null);
            }}
          />

          <label
            htmlFor="manuscript-file"
            className="inline-flex cursor-pointer items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            원고 파일 선택
          </label>

          {fileName && (
            <p className="mt-2 text-sm text-neutral-700">
              선택된 파일: <strong>{fileName}</strong>
            </p>
          )}

          <p className="mt-1 text-xs text-neutral-500">허용 형식: hwp, hwpx, pdf, doc (txt 불가)</p>
        </div>

        <button
          type="submit"
          disabled={submitting || !fileName}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md active:translate-y-0 active:shadow-sm disabled:cursor-not-allowed disabled:transform-none disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none"
        >
          {submitting ? "투고 중..." : "투고하기"}
        </button>

        {message && <p className="text-sm text-neutral-700">{message}</p>}
      </form>
    </main>
  );
}
