// src/components/ShareButtons.tsx
"use client";

import { useCallback } from "react";

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({ title }: ShareButtonsProps) {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://surimstudio.com";

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다. 원하시는 곳에 붙여넣어 주세요.");
    } catch (e) {
      console.error(e);
      alert("복사에 실패했습니다. 주소창의 링크를 직접 복사해 주세요.");
    }
  }, [url]);

  const openPopup = (shareUrl: string) => {
    if (typeof window === "undefined") return;
    window.open(shareUrl, "_blank", "width=600,height=600");
  };

  // X 공유
  const handleShareX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    openPopup(shareUrl);
  };

  // 페이스북 공유
  const handleShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    openPopup(shareUrl);
  };

  // Threads: 링크 복사 후 붙여넣기
  const handleShareThreads = () => {
    handleCopyLink();
  };

  // 카카오톡: Kakao JS SDK 사용 (안 되면 링크 복사로 폴백)
  const handleShareKakao = () => {
    if (typeof window === "undefined") return;
    const w = window as any;

    // Kakao SDK가 없거나 초기화 안 된 경우 → 그냥 링크 복사로 대체
    if (!w.Kakao || !w.Kakao.Share) {
      console.warn("Kakao SDK not loaded, fallback to copy link.");
      handleCopyLink();
      return;
    }

    try {
      w.Kakao.Share.sendDefault({
        objectType: "text",
        text: title,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
        buttonTitle: "자세히 보기",
      });
    } catch (e) {
      console.error(e);
      // 실패 시에도 사용자 입장에서는 뭔가 되게 해줘야 하니 링크 복사
      handleCopyLink();
    }
  };

  const baseBtn =
    "flex h-9 w-9 items-center justify-center rounded-full border text-[13px] font-semibold " +
    "transition-colors transition-transform duration-150 " +
    "hover:-translate-y-[1px] hover:shadow-sm";

  return (
    <div className="flex items-center justify-end gap-2 text-[11px]">
      <span className="mr-2 text-[11px] text-slate-500">공유하기</span>

      {/* 카카오톡 */}
      <button
        type="button"
        onClick={handleShareKakao}
        className={
          baseBtn +
          " border-yellow-300 bg-yellow-300/90 text-slate-900 hover:bg-yellow-200"
        }
        title="카카오톡으로 공유"
      >
        톡
      </button>

      {/* Threads */}
      <button
        type="button"
        onClick={handleShareThreads}
        className={
          baseBtn +
          " border-black bg-black text-white hover:bg-white hover:text-black hover:border-black"
        }
        title="Threads에 공유 (링크 복사 후 붙여넣기)"
      >
        @
      </button>

      {/* X */}
      <button
        type="button"
        onClick={handleShareX}
        className={
          baseBtn +
          " border-black bg-black text-white hover:bg-white hover:text-black hover:border-black"
        }
        title="X(트위터)에 공유"
      >
        𝕏
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={handleShareFacebook}
        className={
          baseBtn +
          " border-[#1877F2] bg-[#1877F2] text-white hover:bg-white hover:text-[#1877F2]"
        }
        title="페이스북에 공유"
      >
        f
      </button>

      {/* 링크 복사 */}
      <button
        type="button"
        onClick={handleCopyLink}
        className={
          baseBtn +
          " border-slate-300 bg-[var(--bg-elev)] text-slate-700 hover:bg-white"
        }
        title="링크 복사"
      >
        🔗
      </button>
    </div>
  );
}
