"use client";

import Link from "next/link";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ReaderPage = {
  page: number;
  url: string;
};

type ReaderPayload = {
  productId: string;
  pageCount: number;
  expiresIn: number;
  pages: ReaderPage[];
};

type ReaderError = {
  status: number;
  message: string;
};

type PageFlipController = {
  flip: (pageIndex: number, corner?: "top" | "bottom") => void;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
};

type FlipBookHandle = {
  pageFlip: () => PageFlipController | undefined;
};

type PageResources = {
  activePages: Set<number>;
  urls: Map<number, string>;
};

const PageResourceContext = createContext<PageResources | null>(null);
const PREFETCH_BEHIND = 3;
const PREFETCH_AHEAD = 5;
const REFRESH_EARLY_SECONDS = 60;
const MIN_REFRESH_DELAY_MS = 30_000;
const ZOOM_MIN = 0.75;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.25;
const PAGE_TURN_SOUND_PATH = "/sound/page-turn.mp3";

function isReaderPayload(value: unknown): value is ReaderPayload {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ReaderPayload>;
  return (
    typeof candidate.productId === "string" &&
    Number.isSafeInteger(candidate.pageCount) &&
    Number(candidate.pageCount) > 0 &&
    Number.isSafeInteger(candidate.expiresIn) &&
    Number(candidate.expiresIn) > 0 &&
    Array.isArray(candidate.pages) &&
    candidate.pages.length === candidate.pageCount &&
    candidate.pages.every(
      (item, index) =>
        item?.page === index + 1 &&
        typeof item.url === "string" &&
        item.url.length > 0,
    )
  );
}

function readerError(status: number): ReaderError {
  if (status === 401) return { status, message: "로그인이 필요합니다." };
  if (status === 404) return { status, message: "이 콘텐츠를 열람할 수 없습니다." };
  return { status, message: "콘텐츠를 불러오지 못했습니다." };
}

const FlipbookPage = forwardRef<HTMLDivElement, { page: number }>(function FlipbookPage(
  { page },
  ref,
) {
  const resources = useContext(PageResourceContext);
  const url = resources?.urls.get(page);
  const shouldLoad = Boolean(url && resources?.activePages.has(page));

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden border border-black/10 bg-[#fffdf8] shadow-inner"
      data-density={page === 1 ? "hard" : "soft"}
    >
      {shouldLoad && url ? (
        <Image
          src={url}
          alt={`${page}페이지`}
          fill
          unoptimized
          sizes="(max-width: 640px) 94vw, 50vw"
          loading="lazy"
          draggable={false}
          className="h-full w-full select-none object-contain"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#fffdf8] to-[#f1ead9] text-xs text-zinc-400">
          {page}페이지
        </div>
      )}
      <span className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-white/75 px-2 py-0.5 text-[10px] text-zinc-500">
        {page}
      </span>
    </div>
  );
});

export default function FlipbookModal({
  open,
  productId,
  title,
  onClose,
}: {
  open: boolean;
  productId: string;
  title: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<FlipBookHandle | null>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const pageTurnAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentIndexRef = useRef(0);
  const [reader, setReader] = useState<ReaderPayload | null>(null);
  const [loadError, setLoadError] = useState<ReaderError | null>(null);
  const [refreshError, setRefreshError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expiresAt, setExpiresAt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageInput, setPageInput] = useState("1");
  const [pageInputError, setPageInputError] = useState(false);
  const [jumpTargetIndex, setJumpTargetIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const audio = new Audio(PAGE_TURN_SOUND_PATH);
    audio.preload = "auto";
    pageTurnAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      pageTurnAudioRef.current = null;
    };
  }, []);

  const closeModal = useCallback(() => {
    const audio = pageTurnAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setImmersive(false);
    onClose();
  }, [onClose]);

  const loadReader = useCallback(
    async (refresh: boolean) => {
      requestControllerRef.current?.abort();
      const controller = new AbortController();
      requestControllerRef.current = controller;

      if (refresh) {
        setRefreshing(true);
        setRefreshError(false);
      } else {
        setLoading(true);
        setLoadError(null);
      }

      try {
        const response = await fetch(`/api/flipbooks/${encodeURIComponent(productId)}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          if (refresh) setRefreshError(true);
          else setLoadError(readerError(response.status));
          return;
        }

        const payload: unknown = await response.json();
        if (!isReaderPayload(payload) || payload.productId !== productId) {
          if (refresh) setRefreshError(true);
          else setLoadError(readerError(500));
          return;
        }

        setReader(payload);
        setExpiresAt(Date.now() + payload.expiresIn * 1000);
        setRefreshError(false);
        setCurrentIndex((index) => Math.min(index, payload.pageCount - 1));
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (refresh) setRefreshError(true);
        else setLoadError(readerError(500));
      } finally {
        if (!controller.signal.aborted) {
          if (refresh) setRefreshing(false);
          else setLoading(false);
        }
      }
    },
    [productId],
  );

  useEffect(() => {
    if (!open) {
      requestControllerRef.current?.abort();
      return;
    }

    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setReader(null);
      setLoadError(null);
      setRefreshError(false);
      currentIndexRef.current = 0;
      setCurrentIndex(0);
      setPageInput("1");
      setPageInputError(false);
      setJumpTargetIndex(null);
      setZoom(1);
      setImmersive(false);
      void loadReader(false);
    });

    return () => {
      active = false;
      requestControllerRef.current?.abort();
    };
  }, [loadReader, open]);

  const goPrevious = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev("top");
  }, []);

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext("top");
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => dialogRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, goNext, goPrevious, open]);

  useEffect(() => {
    if (!open || !reader || !expiresAt || refreshError || refreshing) return;
    const refreshDelay = Math.max(
      expiresAt - Date.now() - REFRESH_EARLY_SECONDS * 1000,
      MIN_REFRESH_DELAY_MS,
    );
    const timer = window.setTimeout(() => {
      void loadReader(true);
    }, refreshDelay);
    return () => window.clearTimeout(timer);
  }, [expiresAt, loadReader, open, reader, refreshError, refreshing]);

  const urls = useMemo(
    () => new Map(reader?.pages.map((item) => [item.page, item.url]) ?? []),
    [reader],
  );

  const activePages = useMemo(() => {
    const active = new Set<number>();
    if (!reader) return active;
    const currentPage = currentIndex + 1;
    const addRange = (centerPage: number) => {
      const first = Math.max(1, centerPage - PREFETCH_BEHIND);
      const last = Math.min(reader.pageCount, centerPage + PREFETCH_AHEAD);
      for (let page = first; page <= last; page += 1) active.add(page);
    };
    addRange(currentPage);
    if (jumpTargetIndex !== null) addRange(jumpTargetIndex + 1);
    return active;
  }, [currentIndex, jumpTargetIndex, reader]);

  const pageResources = useMemo(() => ({ activePages, urls }), [activePages, urls]);
  const pageElements = useMemo(
    () =>
      Array.from({ length: reader?.pageCount ?? 0 }, (_, index) => (
        <FlipbookPage key={index + 1} page={index + 1} />
      )),
    [reader?.pageCount],
  );

  const handleFlip = useCallback((event: { data: number }) => {
    if (!Number.isSafeInteger(event.data)) return;

    const previousIndex = currentIndexRef.current;
    currentIndexRef.current = event.data;
    setCurrentIndex(event.data);
    setPageInput(String(event.data + 1));
    setPageInputError(false);
    setJumpTargetIndex(null);

    if (event.data === previousIndex) return;
    const audio = pageTurnAudioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Browser autoplay policies may reject playback before a user gesture.
    });
  }, []);

  const goToPage = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!reader) return;

      const requestedPage = Number(pageInput);
      if (
        !Number.isSafeInteger(requestedPage) ||
        requestedPage < 1 ||
        requestedPage > reader.pageCount
      ) {
        setPageInputError(true);
        return;
      }

      const targetIndex = requestedPage - 1;
      setPageInputError(false);
      setPageInput(String(requestedPage));
      if (targetIndex === currentIndexRef.current) {
        setJumpTargetIndex(null);
        return;
      }

      setJumpTargetIndex(targetIndex);
      window.requestAnimationFrame(() => {
        bookRef.current?.pageFlip()?.flip(targetIndex, "top");
      });
    },
    [pageInput, reader],
  );

  const setZoomLevel = useCallback((nextZoom: number) => {
    setZoom(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextZoom)));
  }, []);

  if (!open) return null;

  const currentPage = Math.min(currentIndex + 1, reader?.pageCount ?? 1);
  const pageCount = reader?.pageCount ?? 0;
  const progress = pageCount > 0 ? (currentPage / pageCount) * 100 : 0;
  const progressPercent = Math.round(progress);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = Boolean(reader && currentIndex < reader.pageCount - 1);

  return (
    <div
      className={`fixed inset-0 z-[100] flex min-w-0 items-center justify-center overflow-x-hidden [overflow-x:clip] backdrop-blur-sm ${
        immersive ? "bg-black/90 p-0" : "bg-black/70 p-2 sm:p-5"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} 플립북`}
        tabIndex={-1}
        className={`flex min-w-0 w-full flex-col overflow-hidden bg-[#f7f3e8] shadow-2xl outline-none ${
          immersive
            ? "h-[100dvh] max-w-none rounded-none border-0"
            : "h-[calc(100dvh-1rem)] max-w-[1400px] rounded-2xl border border-white/20 sm:h-[calc(100dvh-2.5rem)]"
        }`}
      >
        <header className="border-b border-black/10 bg-white/90 px-3 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-semibold text-emerald-950">{title}</p>
              <p className="text-xs text-zinc-500">구매자 전용 디지털 플립북</p>
            </div>
            <button
              type="button"
              aria-pressed={immersive}
              onClick={() => setImmersive((value) => !value)}
              className="shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50"
            >
              {immersive ? "기본 보기" : "뷰어 확대"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50"
            >
              닫기
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              type="button"
              onClick={goPrevious}
              disabled={!canGoPrevious}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전
            </button>
            <form onSubmit={goToPage} className="flex items-center gap-1">
              <label htmlFor="flipbook-page-input" className="sr-only">
                이동할 페이지
              </label>
              <input
                id="flipbook-page-input"
                type="number"
                inputMode="numeric"
                min={1}
                max={pageCount || undefined}
                step={1}
                value={pageInput}
                onChange={(event) => {
                  setPageInput(event.target.value);
                  setPageInputError(false);
                }}
                aria-invalid={pageInputError}
                className={`w-16 rounded-lg border bg-white px-2 py-2 text-center tabular-nums outline-none ${
                  pageInputError
                    ? "border-red-400 ring-2 ring-red-100"
                    : "border-zinc-300 focus:border-emerald-600"
                }`}
              />
              <span className="text-zinc-500">/ {pageCount || "-"}</span>
              <button
                type="submit"
                disabled={!reader}
                className="rounded-lg border border-zinc-300 bg-white px-2.5 py-2 font-medium disabled:opacity-40"
              >
                이동
              </button>
            </form>
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              다음
            </button>
            <span className="mx-1 hidden h-5 w-px bg-zinc-300 sm:block" />
            <button
              type="button"
              aria-label="축소"
              onClick={() => setZoomLevel(zoom - ZOOM_STEP)}
              disabled={zoom <= ZOOM_MIN}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 disabled:opacity-40"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="min-w-16 rounded-lg border border-zinc-300 bg-white px-3 py-2 tabular-nums"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="확대"
              onClick={() => setZoomLevel(zoom + ZOOM_STEP)}
              disabled={zoom >= ZOOM_MAX}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 disabled:opacity-40"
            >
              +
            </button>
          </div>

          <div className="mx-auto mt-3 flex w-full max-w-xl items-center gap-3">
            <div
              role="progressbar"
              aria-label="열람 진행률"
              aria-valuemin={0}
              aria-valuemax={pageCount}
              aria-valuenow={pageCount > 0 ? currentPage : 0}
              className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200"
            >
              <div
                className="h-full rounded-full bg-emerald-700 transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="min-w-11 text-right text-xs font-medium tabular-nums text-zinc-600">
              {progressPercent}%
            </span>
          </div>
        </header>

        <main
          className={`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden [overflow-x:clip] ${
            immersive ? "bg-zinc-950" : ""
          }`}
        >
          {refreshError && (
            <div className="z-10 flex flex-wrap items-center justify-center gap-2 border-b border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
              <span>열람 정보를 갱신하지 못했습니다. 다시 시도해 주세요.</span>
              <button
                type="button"
                onClick={() => void loadReader(true)}
                disabled={refreshing}
                className="rounded-md border border-amber-400 bg-white px-2 py-1 font-medium disabled:opacity-50"
              >
                {refreshing ? "갱신 중" : "다시 시도"}
              </button>
            </div>
          )}

          {loading && !reader ? (
            <div className="flex flex-1 items-center justify-center p-6 text-sm text-zinc-600">
              플립북을 불러오는 중입니다…
            </div>
          ) : loadError && !reader ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <div className="max-w-sm space-y-4 text-center">
                <p className="text-zinc-700">{loadError.message}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {loadError.status === 401 ? (
                    <Link
                      href="/login?returnTo=%2Fmy%2Flibrary"
                      onClick={closeModal}
                      className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      로그인하기
                    </Link>
                  ) : loadError.status !== 404 ? (
                    <button
                      type="button"
                      onClick={() => void loadReader(false)}
                      className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      다시 시도
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          ) : reader ? (
            <div
              className={`min-h-0 min-w-0 flex-1 overflow-y-auto p-3 [scrollbar-gutter:stable] sm:p-5 ${
                zoom > 1
                  ? "overflow-x-auto"
                  : "overflow-x-hidden [overflow-x:clip]"
              }`}
            >
              <div className="flex min-h-full w-full min-w-0 items-center justify-center overflow-x-hidden [overflow-x:clip]">
                <div
                  className={`max-w-full overflow-x-hidden [overflow-x:clip] w-[min(500px,94vw)] transition-transform duration-200 ease-out ${
                    immersive
                      ? "h-[min(750px,calc(100dvh-12rem))]"
                      : "h-[min(750px,calc(100dvh-15rem))]"
                  }`}
                  style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                >
                  <PageResourceContext.Provider value={pageResources}>
                    <HTMLFlipBook
                      ref={bookRef}
                      className="mx-auto"
                      style={{ margin: "0 auto" }}
                      startPage={0}
                      size="stretch"
                      width={530}
                      height={750}
                      minWidth={260}
                      maxWidth={530}
                      minHeight={368}
                      maxHeight={750}
                      drawShadow
                      flippingTime={700}
                      usePortrait
                      startZIndex={0}
                      autoSize
                      maxShadowOpacity={0.35}
                      showCover={false}
                      mobileScrollSupport
                      clickEventForward
                      useMouseEvents
                      swipeDistance={24}
                      showPageCorners
                      disableFlipByClick={false}
                      renderOnlyPageLengthChange
                      onFlip={handleFlip}
                    >
                      {pageElements}
                    </HTMLFlipBook>
                  </PageResourceContext.Provider>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
