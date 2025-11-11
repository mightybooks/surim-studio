'use client';
import { createClient } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const supabase = createClient();
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [userId, setUserId] = useState<string|null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notice, setNotice] = useState<string|null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id ?? null;
      setUserId(id);
      setSessionChecked(true);
    });
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setNotice(null);
  if (!userId) { 
    setNotice('로그인이 필요합니다.'); 
    return; 
  }

  // 현재 회차 slug: '2025'
  const { data: contest, error: contestErr } = await supabase
    .from('contests')
    .select('id, status')
    .eq('slug','2025')
    .single();

  if (contestErr || !contest) { 
    setNotice('대회 정보를 찾지 못했습니다.'); 
    return; 
  }
  if (contest.status !== 'open') { 
    setNotice('접수 기간이 아닙니다.'); 
    return; 
  }

  // 프로필 보장
  await supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id' });

  // 1인 1편: 기존 제출 여부 확인 (count만 가져옴)
  const { count, error: countErr } = await supabase
    .from('submissions')
    .select('id', { count: 'exact', head: true })
    .eq('author_id', userId)
    .eq('contest_id', contest.id);

  if (countErr) {
    setNotice('중복 제출 확인 중 오류가 발생했습니다.');
    return;
  }
  if ((count ?? 0) > 0) {
    setNotice('이미 제출한 원고가 있습니다. /contest/my 에서 확인해주세요.');
    return;
  }

  // 신규 제출
  const { error } = await supabase.from('submissions').insert({
    contest_id: contest.id,
    author_id: userId,
    title,
    body
  });

  if (error) {
    setNotice('제출 실패: ' + error.message);
  } else {
    setNotice('제출 완료되었습니다.');
    // 필요하면 이동
    // router.push('/contest/my');
  }
};

  if (!sessionChecked) return <div className="p-8">확인 중…</div>;
  if (!userId) return <div className="p-8">로그인이 필요합니다. /contest 에서 메일 로그인 해주세요.</div>;

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">원고 제출</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          maxLength={120}
          placeholder="제목"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
        <textarea
          required
          placeholder="본문을 여기에 입력하세요"
          value={body}
          onChange={e=>setBody(e.target.value)}
          rows={16}
          className="w-full border px-3 py-2 rounded-md leading-7"
        />
        <button className="px-4 py-2 rounded-md border">제출하기</button>
        {notice && <p className="text-sm text-zinc-500">{notice}</p>}
      </form>
    </main>
  );
}
