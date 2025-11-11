"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
};

export default function AccountPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 이니셜 아바타
  const initials = useMemo(() => {
    if (!userEmail) return "U";
    const base = userEmail.split("@")[0]?.trim();
    if (!base) return "U";
    const parts = base.replace(/[^a-zA-Z0-9가-힣 ]/g, " ").split(" ").filter(Boolean);
    const head = parts[0] || base;
    const a = head.charAt(0).toUpperCase();
    const b = head.charAt(1)?.toUpperCase() ?? "";
    return (a + b).slice(0, 2);
  }, [userEmail]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      setNotice(null);

      // 1) 유저 세션
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData.user) {
        setError("로그인 상태가 아닙니다. 다시 로그인해 주세요.");
        setLoading(false);
        return;
      }
      const id = userData.user.id;
      const email = userData.user.email ?? null;
      if (!mounted) return;
      setUserId(id);
      setUserEmail(email);

      // 2) profiles 로드(있으면)
      try {
        const { data, error: pErr, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (pErr) {
          // 테이블 없음(42P01) 같은 경우 메시지 처리
          const code = (pErr as any)?.code;
          if (code === "42P01") {
            setNotice("프로필 테이블이 아직 없습니다. 저장 시 자동 생성은 안 됩니다. 콘솔에서 프로필 테이블 SQL을 먼저 실행해 주세요.");
          } else if (status === 406) {
            // PostgREST 특정 응답: 행 없음
            setNotice("프로필 정보가 없습니다. 닉네임 저장 시 생성됩니다.");
          } else {
            setNotice("프로필을 불러오지 못했습니다. 그래도 로그인은 정상입니다.");
          }
        }

        if (data) {
          setProfile(data as Profile);
          setDisplayName(data.display_name ?? "");
        } else {
          setProfile({ id, email, display_name: null, avatar_url: null });
          setDisplayName("");
        }
      } catch (e: any) {
        setNotice("프로필을 불러오지 못했습니다. 그래도 로그인은 정상입니다.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const payload: Profile = {
        id: userId,
        email: userEmail,
        display_name: displayName || null,
        avatar_url: profile?.avatar_url ?? null,
      };
      const { error: upErr } = await supabase.from("profiles").upsert(payload);
      if (upErr) {
        const code = (upErr as any)?.code;
        if (code === "42P01") {
          setError("프로필 테이블이 없습니다. Supabase 콘솔에서 profiles 테이블·RLS 정책을 먼저 생성해 주세요.");
        } else {
          setError(`저장 실패: ${upErr.message}`);
        }
        return;
      }
      setProfile(payload);
      setNotice("저장되었습니다.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    location.href = "/login";
  }

  return (
    <div className="min-h-dvh flex flex-col">
      {/* 헤더 */}
      <header className="border-b px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">마이 페이지</h1>
          <div className="text-xs text-gray-500">{userEmail || "로그인 확인 중"}</div>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-3">
          {/* 프로필 카드 */}
          <section className="md:col-span-1 border rounded-2xl p-4">
            <div className="w-20 h-20 rounded-full border flex items-center justify-center text-lg font-semibold">
              {initials}
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-500">이메일</div>
              <div className="text-sm">{userEmail ?? "-"}</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-500">사용자 ID</div>
              <div className="text-xs break-all text-gray-600">{userId ?? "-"}</div>
            </div>
          </section>

          {/* 프로필 편집 */}
          <section className="md:col-span-2 border rounded-2xl p-4">
            <h2 className="text-base font-medium mb-3">프로필</h2>

            {loading ? (
              <p className="text-sm text-gray-500">불러오는 중입니다. 인터넷의 인내심이 필요합니다.</p>
            ) : (
              <>
                <label className="block text-sm mb-2">
                  닉네임
                  <input
                    className="mt-1 w-full border rounded px-3 py-2"
                    type="text"
                    placeholder="표시할 이름을 입력하세요"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="border rounded px-3 py-2 text-sm disabled:opacity-60"
                  >
                    {saving ? "저장 중..." : "저장하기"}
                  </button>
                  {notice && <span className="text-xs text-emerald-700">{notice}</span>}
                  {error && <span className="text-xs text-red-600">{error}</span>}
                </div>
              </>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">계정</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>로그인 방식: 이메일 매직링크</li>
                <li>보안: 비밀번호 없음, 세션 쿠키 유지</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* 푸터: 로그아웃 하단 배치 */}
      <footer className="border-t px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <p className="text-xs text-gray-500">© 수림 스튜디오. 콘텐츠가 왕이라더니, 왕은 늘 배고픕니다.</p>
          <button onClick={handleLogout} className="text-sm underline">
            로그아웃
          </button>
        </div>
      </footer>
    </div>
  );
}
