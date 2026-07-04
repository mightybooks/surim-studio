"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["hwp", "hwpx", "doc", "docx", "pdf", "txt"];
const CATEGORY_GUIDES = {
  novel: {
    label: "단편소설",
    count: "1편",
    length: "200자 원고지 70매 내외",
    file: "원고 파일 1개 제출 권장",
  },
  poetry: {
    label: "시",
    count: "2편 이상",
    length: "자유",
    file: "여러 편을 하나의 파일로 정리해 제출 권장",
  },
  essay: {
    label: "수필",
    count: "2편",
    length: "각 200자 원고지 20매 내외",
    file: "두 편을 하나의 파일로 정리해 제출 권장",
  },
} as const;

type Category = keyof typeof CATEGORY_GUIDES;

type Contest2027ApplyFormProps = {
  userEmail: string;
};

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  }

  return `${Math.ceil(size / 1024)}KB`;
}

export default function Contest2027ApplyForm({
  userEmail,
}: Contest2027ApplyFormProps) {
  const [category, setCategory] = useState<Category>("novel");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const categoryGuide = CATEGORY_GUIDES[category];
  const fileLabel = useMemo(() => {
    if (!file) return "원고 파일을 선택해 주세요";
    return `${file.name} (${formatFileSize(file.size)})`;
  }, [file]);

  function validateFile(nextFile: File | null) {
    if (!nextFile) {
      return "원고 파일을 선택해 주세요.";
    }

    const extension = getExtension(nextFile.name);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      if (["zip", "7z", "rar"].includes(extension)) {
        return "zip 등의 압축파일은 접수하지 않습니다.";
      }

      return "허용하지 않는 파일 형식입니다. hwp, hwpx, doc, docx, pdf, txt 파일만 접수할 수 있습니다.";
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      return "파일 용량이 5MB를 초과했습니다. 이미지를 제거하고 원고 본문 중심으로 정리한 뒤 다시 제출해 주세요.";
    }

    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const nextFileError = validateFile(file);
    if (nextFileError) {
      setFileError(nextFileError);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);

    try {
      const res = await fetch("/api/contest/2027/apply", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "접수 처리 중 오류가 발생했습니다.");
      }

      setSubmitted(true);
      form.reset();
      setFile(null);
      setFileError(null);
      setCategory("novel");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
        <p className="text-sm font-medium text-emerald-700">
          접수가 완료되었습니다
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-emerald-950">
          제4회 문수림배 문예경연대회 접수가 완료되었습니다.
        </h1>
        <p className="mt-4 leading-8 text-zinc-700">
          접수 내용과 원고 파일이 정상적으로 제출되었습니다. 발표는 2026년
          11월 25일 이후 수림 스튜디오를 통해 안내합니다.
        </p>
        <Link
          href="/contest/2027"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          공모전 공고로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-950">기본 정보</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-zinc-900">
              응모 부문
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {Object.entries(CATEGORY_GUIDES).map(([value, guide]) => (
                <label
                  key={value}
                  className={[
                    "cursor-pointer rounded-2xl border p-4 transition",
                    category === value
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-zinc-200 bg-white hover:bg-zinc-50",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    checked={category === value}
                    onChange={() => setCategory(value as Category)}
                    className="sr-only"
                  />
                  <span className="block font-semibold text-zinc-950">
                    {guide.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-600">
                    {guide.count} · {guide.length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="penName"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              필명 또는 SNS 닉네임
            </label>
            <input
              id="penName"
              name="penName"
              required
              minLength={2}
              maxLength={50}
              placeholder="2~50자"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              실명 입력은 요구하지 않습니다.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900">
              연락 가능한 이메일
            </label>
            <input
              value={userEmail}
              readOnly
              className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-700"
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              사이트 로그인 과정에서 인증된 이메일을 접수 확인에 사용합니다.
            </p>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="referenceLink"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              참고 링크
            </label>
            <input
              id="referenceLink"
              name="referenceLink"
              maxLength={300}
              placeholder="SNS, 블로그, 웹페이지 등 선택 입력"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              대표 작품 제목
            </label>
            <input
              id="title"
              name="title"
              required
              maxLength={100}
              placeholder="시/수필 복수 제출 시 대표 제목 또는 첫 작품 제목"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6">
        <h2 className="text-xl font-semibold text-zinc-950">제출 기준</h2>
        <dl className="mt-5 grid gap-4 text-sm leading-6 text-zinc-700 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-zinc-950">제출 편수</dt>
            <dd>{categoryGuide.count}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-950">분량</dt>
            <dd>{categoryGuide.length}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-950">원고 파일</dt>
            <dd>{categoryGuide.file}</dd>
          </div>
        </dl>
        <p className="mt-5 leading-8 text-zinc-700">
          시와 수필은 여러 편의 작품을 통해 응모자의 평균적인 작품 감각을 함께
          살피기 위한 기준입니다.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-950">원고 파일 업로드</h2>
        <p className="mt-3 leading-8 text-zinc-700">
          원고는 hwp, hwpx, doc, docx, pdf, txt 형식의 파일로 제출해 주세요.
          파일 용량은 1개당 최대 5MB까지 접수합니다. 이미지가 포함된 원고는 용량
          초과 또는 열람 오류가 발생할 수 있으므로 원고 파일에는 본문 중심의
          텍스트만 정리해 주세요. zip 등의 압축파일은 접수하지 않습니다.
        </p>

        <div className="mt-5">
          <input
            id="manuscriptFile"
            type="file"
            name="file"
            required
            accept=".hwp,.hwpx,.doc,.docx,.pdf,.txt"
            className="hidden"
            onChange={(e) => {
              const nextFile = e.target.files?.[0] ?? null;
              const nextError = validateFile(nextFile);
              setFile(nextError ? null : nextFile);
              setFileError(nextError);
            }}
          />
          <label
            htmlFor="manuscriptFile"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
          >
            원고 파일 선택
          </label>
          <p className="mt-3 text-sm text-zinc-700">{fileLabel}</p>
          {fileError && (
            <p className="mt-2 text-sm font-medium text-red-700">{fileError}</p>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
        <h2 className="text-xl font-semibold text-zinc-950">확인 사항</h2>
        <label className="flex gap-3 text-sm leading-7 text-zinc-700">
          <input name="consentOriginal" type="checkbox" required className="mt-1" />
          <span>응모작은 본인이 창작한 작품입니다.</span>
        </label>
        <label className="flex gap-3 text-sm leading-7 text-zinc-700">
          <input name="consentCopyright" type="checkbox" required className="mt-1" />
          <span>
            타인의 저작권을 침해한 작품은 심사 및 수상에서 제외될 수 있으며,
            수상 이후에도 취소될 수 있음을 확인했습니다.
          </span>
        </label>
        <label className="flex gap-3 text-sm leading-7 text-zinc-700">
          <input name="consentPublication" type="checkbox" required className="mt-1" />
          <span>
            응모작과 수상작의 저작권은 창작자에게 있으며, 수상작은 공모전 결과
            발표와 소개를 위해 수림지에 게재될 수 있음을 확인했습니다.
          </span>
        </label>
      </section>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-900 px-6 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400 sm:w-auto"
      >
        {submitting ? "원고 파일을 업로드하고 있습니다..." : "공모전 접수하기"}
      </button>
    </form>
  );
}
