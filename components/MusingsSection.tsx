import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Musings } from "@/lib/types";

/** 写在最后的碎碎念：一条小字备注（支持多段） */
export default function MusingsSection({ data }: { data: Musings }) {
  // note 可以写成单个字符串（单段），也可以写成字符串数组（多段）
  // 数组里某项是空字符串时，当成“空一行”处理
  const paragraphs = Array.isArray(data.note) ? data.note : [data.note];

  return (
    <>
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
    </>
  );
}
