"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import type { GalleryItem } from "@/lib/types";

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((index) => (index === null ? null : (index - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setOpenIndex((index) => (index === null ? null : (index + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, prev, next]);

  const current = openIndex === null ? null : items[openIndex];

  // 相册为空时给个友好提示（照片还没放进来）
  if (!items.length) {
    return (
      <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
        <Icon name="image" className="h-8 w-8 text-slate-300" />
        <p className="text-sm text-slate-500">照片还在整理中，很快就补上～</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={`card card-hover group overflow-hidden p-0 text-left ${
              index % 3 === 1 ? "gallery-offset" : ""
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {item.type === "video" ? (
                <>
                  <video
                    src={item.image}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-900/25 transition-colors duration-500 group-hover:bg-slate-900/40">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg">
                      <Icon name="play" className="ml-0.5 h-5 w-5" />
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </>
              )}
            </div>
            <div className="flex items-start justify-between gap-3 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-xs leading-6 text-slate-400">{item.description}</p>
                )}
              </div>
              {item.date && (
                <span className="shrink-0 text-xs text-slate-400">{item.date}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="card w-full max-w-3xl overflow-hidden p-0"
            onClick={(event) => event.stopPropagation()}
          >
            {current.type === "video" ? (
              <video
                key={current.id}
                src={current.image}
                controls
                autoPlay
                playsInline
                className="max-h-[68vh] w-full bg-black object-contain"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={current.image}
                alt={current.title}
                className="max-h-[68vh] w-full bg-slate-100 object-contain"
              />
            )}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{current.title}</h3>
                {current.description && (
                  <p className="mt-1 text-xs leading-6 text-slate-500">{current.description}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="上一张"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-sky-200 hover:text-sky-600"
                >
                  <Icon name="arrowUp" className="h-4 w-4 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="下一张"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-sky-200 hover:text-sky-600"
                >
                  <Icon name="arrowUp" className="h-4 w-4 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="关闭"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-transform hover:scale-105"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
