// app/contest/page.tsx
'use client';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function ContestHome() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState<string|null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: window.location.origin + '/contest/submit' }});
    if (error) setNotice('로그인 메일 전송 실패: ' + error.message);
    else setNotice('로그인 링크를 이메일로 전송했습니다.');
  };

  return (
    <main className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-4">문수림배 소설 창작 대회</h1>
      <p className="text-zinc-600 mb-6 leading-relaxed">
        접수 기간 동안 1인 1편 제출. 본문은 텍스트로 입력하며 표절 시 전량 무효 처리됩니다.
      </p>

      <div className="rounded-2xl border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">참가 방법</h2>
        <ol className="list-decimal pl-5 space-y-1 text-zinc-700">
          <li>이메일로 로그인 링크 수신</li>
          <li>로그인 후 제출 폼에서 제목/본문 입력</li>
          <li>제출 후 ‘내 제출물’에서 확인</li>
        </ol>
        <form onSubmit={handleMagicLink} className="mt-4 flex gap-2">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-md"
          />
          <button className="px-4 py-2 rounded-md border">로그인 링크 받기</button>
        </form>
        {notice && <p className="text-sm text-zinc-500 mt-2">{notice}</p>}
      </div>

      <div className="flex gap-3">
        <Link href="/contest/submit" className="px-4 py-2 rounded-md border">제출하기</Link>
        <Link href="/contest/my" className="px-4 py-2 rounded-md border">내 제출물</Link>
        <Link href="/contest/winners" className="px-3 py-2 border rounded-md">수상작 보기</Link>
      </div>
    </main>
  );
}
