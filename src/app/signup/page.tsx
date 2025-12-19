// components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";

export default function SignupForm() {  
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSignup(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);

    if (password !== password2) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, phone },
      },
    });

    if (error) {
      setErrMsg(error.message);
      return;
    }

    router.push("/login");
  }

  return (
    <AuthCard
      title="회원가입"
      footer={
        <>
          <span>이미 계정이 있으신가요? </span>
          <a href="/login" className="underline">로그인</a>
        </>
      }
    >
      <form onSubmit={onSignup} className="space-y-3">
        <label className="block text-sm">
          이메일 (로그인 ID)
          <input className="mt-1 w-full rounded border px-3 py-2"
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className="block text-sm">
          비밀번호
          <input className="mt-1 w-full rounded border px-3 py-2"
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label className="block text-sm">
          비밀번호 확인
          <input className="mt-1 w-full rounded border px-3 py-2"
            type="password" required value={password2}
            onChange={(e) => setPassword2(e.target.value)} />
        </label>

        <label className="block text-sm">
          연락처
          <input className="mt-1 w-full rounded border px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
        </label>

        <button className="w-full rounded bg-black px-3 py-2 text-white">
          가입하기
        </button>

        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
      </form>
    </AuthCard>
  );
}
