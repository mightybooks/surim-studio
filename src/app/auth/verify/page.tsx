'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

type Status = 'loading' | 'success' | 'error';

export default function AuthVerifyPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [status, setStatus] = useState<Status>('loading');

  // 🔑 실패 공통 처리
  const redirectToLogin = () => {
    setTimeout(() => {
      router.replace('/login?from=verify');
    }, 3000);
  };

  useEffect(() => {
    const checkVerification = async () => {
      try {
        // 1. 세션 확인
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setStatus('error');
          redirectToLogin();
          return;
        }

        // 2. 유저 정보 재조회
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setStatus('error');
          redirectToLogin();
          return;
        }

        // 3. 이메일 인증 여부 확인
        if (user.email_confirmed_at) {
          setStatus('success');

          setTimeout(() => {
            router.replace('/my');
          }, 2000);
        } else {
          setStatus('error');
          redirectToLogin();
        }
      } catch {
        setStatus('error');
        redirectToLogin();
      }
    };

    checkVerification();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      {status === 'loading' && (
        <p className="text-sm text-gray-500">
          이메일 인증 상태를 확인 중입니다…
        </p>
      )}

      {status === 'success' && (
        <div>
          <p className="text-lg font-semibold">
            이메일 인증이 완료되었습니다.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            잠시 후 계정 페이지로 이동합니다.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            모바일 메일 앱에서 인증하신 경우,
            로그인이 반영되지 않을 수 있습니다.
            크롬, 사파리 등의 기본 브라우저에서 다시 접속해 주세요.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <p className="text-lg font-semibold text-red-600">
            이메일 인증 확인에 실패했습니다.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            잠시 후 로그인 화면으로 이동합니다.
          </p>
        </div>
      )}
    </div>
  );
}
