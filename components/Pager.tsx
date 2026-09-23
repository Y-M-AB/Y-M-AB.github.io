"use client";

import Icon from "./Icon";

type PagerProps = {
  /** 当前页（0 基） */
  page: number;
  /** 总页数 */
  pageCount: number;
  /** 翻页回调，收到的是 setState 的 updater 形式 */
  onChange: (updater: (prev: number) => number) => void;
  /** 无障碍标签后缀，默认「页」→ aria-label="上一页" / "下一页" */
  label?: string;
};

/**
 * 翻页控件：上一页 / 当前页数 / 下一页。
 * 只有一页时按钮自动禁用（保留位置，避免布局跳动）。
 */
export default function Pager({ page, pageCount, onChange, label = "页" }: PagerProps) {
  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-sky-200 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500";

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange((p) => (p - 1 + pageCount) % pageCount)}
        disabled={pageCount <= 1}
        aria-label={`上一${label}`}
        className={btn}
      >
        <Icon name="arrowUp" className="h-4 w-4 -rotate-90" />
      </button>

      <span className="min-w-[3.5rem] text-center text-xs tabular-nums text-slate-400">
        {page + 1} / {pageCount}
      </span>

      <button
        type="button"
        onClick={() => onChange((p) => (p + 1) % pageCount)}
        disabled={pageCount <= 1}
        aria-label={`下一${label}`}
        className={btn}
      >
        <Icon name="arrowUp" className="h-4 w-4 rotate-90" />
      </button>
    </div>
  );
}
