"use client";

import { useEffect, useState } from "react";
import { diffDHM, msToNextMinute, parseDate, type ElapsedDHM } from "@/lib/elapsed";

/** 起始日期（`data/profile.json` 里没写 `since` 时用这个） */
export const DEFAULT_SINCE = "2023-09-01";

/**
 * 正计时：显示从起始日走到现在，一共多少「天 / 时 / 分」。
 *
 * - 首屏 SSR 出来的值由 Hero（服务端）算好通过 `initial` 传进来，
 *   保证静态 HTML 里就有内容，也不会出现 hydration 不一致
 * - 挂载后立刻用「浏览器的当前时间」重算一次，
 *   之后**精确对齐到每个整分钟**再刷新一次（不空转、不拖时间）
 */
export default function ElapsedTime({
  since = DEFAULT_SINCE,
  initial,
}: {
  since?: string;
  initial: ElapsedDHM;
}) {
  const [elapsed, setElapsed] = useState<ElapsedDHM>(initial);

  useEffect(() => {
    const start = parseDate(since, DEFAULT_SINCE);
    let timer: number | undefined;

    const tick = () => {
      const now = new Date();
      setElapsed(diffDHM(start, now));
      timer = window.setTimeout(tick, msToNextMinute(now) + 30);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [since]);

  return (
    <p className="mt-2 text-center text-2xl font-semibold tracking-tight tabular-nums">
      <span className="text-gradient">
        {elapsed.days} 天 {elapsed.hours} 时 {elapsed.minutes} 分
      </span>
    </p>
  );
}
