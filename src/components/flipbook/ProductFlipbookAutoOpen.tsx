"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FlipbookModal from "./FlipbookModal";

export default function ProductFlipbookAutoOpen({
  productId,
  title,
  cleanPath,
}: {
  productId: string;
  title: string;
  cleanPath: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedOpen = searchParams.get("open") === "reader";
  const [open, setOpen] = useState(requestedOpen);
  const cleanedRef = useRef(false);

  useEffect(() => {
    if (!requestedOpen || cleanedRef.current) return;
    cleanedRef.current = true;
    router.replace(cleanPath, { scroll: false });
  }, [cleanPath, requestedOpen, router]);

  return (
    <FlipbookModal
      open={open}
      productId={productId}
      title={title}
      onClose={() => setOpen(false)}
    />
  );
}
