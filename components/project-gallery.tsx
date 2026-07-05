"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconX } from "./icons";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((index) =>
      index !== null && index > 0 ? index - 1 : index
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index !== null && index < images.length - 1 ? index + 1 : index
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  if (images.length === 0) return null;

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-[20px] font-bold text-main">결과물 이미지</h2>
          <p className="mt-1 text-[12px] text-muted">
            {images.length}장의 결과 이미지가 등록되어 있습니다. 이미지를
            클릭하면 크게 볼 수 있습니다.
          </p>
        </div>
        <div
          className={`grid gap-4 ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group overflow-hidden rounded-xl border border-border bg-bg text-left transition-colors hover:border-accent"
              aria-label={`${title} 결과 이미지 ${index + 1} 크게 보기`}
            >
              <div className="relative aspect-video">
                <Image
                  src={url}
                  alt={`${title} 결과 이미지 ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-main/0 transition-colors group-hover:bg-main/10">
                  <span className="rounded-full bg-main/80 px-3 py-1 text-[12px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    크게 보기
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="결과물 이미지 확대 보기"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="닫기"
          >
            <IconX size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                disabled={activeIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="이전 이미지"
              >
                <IconArrowLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                disabled={activeIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 sm:right-14"
                aria-label="다음 이미지"
              >
                <IconArrowRight size={24} />
              </button>
            </>
          )}

          <div
            className="relative flex h-full max-h-[85vh] w-full max-w-5xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={`${title} 결과 이미지 ${activeIndex + 1}`}
              width={1600}
              height={900}
              className="max-h-[85vh] w-auto max-w-full object-contain"
              unoptimized
              priority
            />
          </div>

          {images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/80">
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
