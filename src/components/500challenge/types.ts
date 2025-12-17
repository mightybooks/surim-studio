// components/500challenge/types.ts

export type FictionEntry = {
  id: string;
  title: string;
  content: string;
  ogImageSrc: string;
  email: string; // ✅ 추가
};

export type ArcanaCard = {
  id: string;
  ogImageSrc: string;
};
