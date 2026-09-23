import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Musings } from "@/lib/types";

/**
 * 卡片右侧的星光点缀（复用页面背景那套 `.starfield-star` 的四角星形状 + 闪烁动画）。
 *
 * x / y 是相对右侧那条 10rem 宽的装饰列（`w-40`）的百分比，
 * 这条列贴住卡片右边缘，只在 `lg` 以上显示——因为文案最宽 48rem（`max-w-3xl`），
 * 屏幕不够宽时右侧没有富余空间，星星会压到字上。
 */
const CARD_STARS: {
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
  delay: number;
}[] = [
  { x: 14, y: 10, size: 14, rotate: 8, opacity: 0.55, delay: 0.3 },
  { x: 64, y: 20, size: 22, rotate: -16, opacity: 0.62, delay: 1.5 },
  { x: 30, y: 33, size: 10, rotate: 20, opacity: 0.45, delay: 2.7 },
  { x: 76, y: 45, size: 13, rotate: -10, opacity: 0.5, delay: 3.9 },
  { x: 18, y: 56, size: 18, rotate: 14, opacity: 0.58, delay: 0.9 },
  { x: 58, y: 67, size: 9, rotate: -22, opacity: 0.42, delay: 4.6 },
  { x: 30, y: 80, size: 16, rotate: 12, opacity: 0.54, delay: 2.1 },
  { x: 70, y: 90, size: 11, rotate: -8, opacity: 0.48, delay: 5.2 },
];

/** 写在最后的碎碎念：一张小字备注卡片（支持多段） */
export default function MusingsSection({ data }: { data: Musings }) {
  // note 可以写成单个字符串（单段），也可以写成字符串数组（多段）
  // 数组里某项是空字符串时，当成“空一行”处理
  const paragraphs = Array.isArray(data.note) ? data.note : [data.note];

  return (
    <div className="card relative overflow-hidden p-7 sm:p-10">
      {/* 右上角的柔光 */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-sky-100 opacity-70 blur-3xl"
      />

      {/* 右侧星光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 lg:block"
      >
        {CARD_STARS.map((s, i) => (
          <span
            key={i}
            className="starfield-star"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
                "--star-o": s.opacity,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* 正文要盖在装饰之上 */}
      <div className="relative">
        <SectionHeading
          eyebrow={data.eyebrow ?? "Epilogue"}
          title={data.title}
          icon="leaf"
        />

        <Reveal>
          <div className="max-w-3xl">
            {data.noteLabel && (
              <p className="text-xs font-medium tracking-[0.14em] text-slate-500">
                {data.noteLabel}
              </p>
            )}
            {paragraphs.length > 0 && (
              <div className="mt-2.5 space-y-2">
                {paragraphs.map((paragraph, index) =>
                  paragraph?.trim() ? (
                    <p key={index} className="text-xs leading-7 text-slate-400">
                      {paragraph}
                    </p>
                  ) : (
                    /* 空字符串 = 空一行 */
                    <div key={index} aria-hidden className="h-3" />
                  )
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
