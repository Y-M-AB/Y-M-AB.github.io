"use client";

import { useEffect, useState } from "react";
import { diffYMD, parseDate, type ElapsedYMD } from "@/lib/elapsed";

/** 起始日期（`data/profile.json` 里没写 `since` 时用这个） */
export const DEFAULT_SINCE = "2023-09-01";

/**
 * 正计时：显示从起始日到今天，一共走过多少年 / 月 / 日。
 *
 * - 首屏 SSR 出来的值由 Hero（服务端）算好通过 `initial` 传进来，
 *   保证静态 HTML 里就有内容，也不会出现 hydration 不一致
 * - 挂载后立刻用「浏览器的当前时间」重算一次，之后每分钟校准一次
 *   → 页面一直开着跨过午夜，天数会自动 +1
 */
export default function ElapsedTime({
  since = DEFAULT_SINCE,
  initial,
}: {
  since?: string;
  initial: ElapsedYMD;
}) {
  const [elapsed, setElapsed] = useState<ElapsedYMD>(initial);

  useEffect(() => {
    const start = parseDate(since, DEFAULT_SINCE);
    const tick = () => setElapsed(diffYMD(start, new Date()));

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [since]);

  return (
    <p className="mt-2 text-center text-2xl font-semibold tracking-tight tabular-nums">
      <span className="text-gradient">
        {elapsed.years} 年 {elapsed.months} 月 {elapsed.days} 日
      </span>
    </p>
  );
}
