import Link from "next/link";

export default function LoginGate() {
  return (
    <div className="mb-6 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
      <p className="mb-2">
        댓글을 작성하려면 로그인이 필요합니다.
      </p>
      <Link
        href="/login"
        className="inline-block text-zinc-800 underline underline-offset-2 hover:text-black"
      >
        로그인하기
      </Link>
    </div>
  );
}
