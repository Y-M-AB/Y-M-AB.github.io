/**
 * 正计时用到的日期工具。
 *
 * 服务端组件（Hero）和客户端组件（ElapsedTime）都要用，
 * 所以放在 lib 里，**不要**加 "use client"。
 */

export type ElapsedDHM = {
  days: number;
  hours: number;
  minutes: number;
};

/** 解析 "YYYY-MM-DD"（也容忍 "2023-9-1"），失败时用 fallback */
export function parseDate(value: string | undefined, fallback: string): Date {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec((value ?? "").trim());
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));

  const f = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(fallback.trim());
  const [, y, mo, d] = f ?? ["", "2023", "9", "1"];
  return new Date(Number(y), Number(mo) - 1, Number(d));
}

/**
 * 从 from 到 to 一共走过多少「天 / 时 / 分」。
 *
 * 例：2023-09-01 00:00 → 2026-09-23 14:30 得 `{ days: 1118, hours: 14, minutes: 30 }`
 *
 * 直接拿毫秒差换算总分钟数，再拆成天 / 时 / 分 —— 不涉及月份折算，没有闰年、大小月的坑。
 * 起始时刻取自 `parseDate()`，即当天本地时间 00:00:00。
 */
export function diffDHM(from: Date, to: Date): ElapsedDHM {
  const ms = to.getTime() - from.getTime();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0 };

  const totalMinutes = Math.floor(ms / 60_000);
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor(totalMinutes / 60) % 24,
    minutes: totalMinutes % 60,
  };
}

/** 距离下一个整分钟还有多少毫秒（用来安排下一次刷新，既准时又不空转） */
export function msToNextMinute(now: Date): number {
  return 60_000 - (now.getTime() % 60_000);
}
