/**
 * 正计时用到的日期工具。
 *
 * 服务端组件（Hero）和客户端组件（ElapsedTime）都要用，
 * 所以放在 lib 里，**不要**加 "use client"。
 */

export type ElapsedYMD = {
  years: number;
  months: number;
  days: number;
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
 * 按「自然年月日」算差值（不是简单除以 365 天）。
 *
 * 例：2023-09-01 → 2026-09-23 得 `{ years: 3, months: 0, days: 22 }`
 *
 * 做法：先按月推进，找到最后一个「不超过 to 的起始日同月日」，
 * 剩下的零头再按天算 —— 这样 31 号、闰年、大小月都不会算错。
 */
export function diffYMD(from: Date, to: Date): ElapsedYMD {
  // 先把两边的「时分秒」归零 —— 否则今天的 14:00 会被算成 22.58 天，四舍五入后多出一天
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());

  if (b.getTime() <= a.getTime()) {
    return { years: 0, months: 0, days: 0 };
  }

  /** 从 a 起往后推 n 个月的那一天（自动收窄到当月最后一天） */
  const anchorOf = (n: number) => {
    const totalMonth = a.getMonth() + n;
    const y = a.getFullYear() + Math.floor(totalMonth / 12);
    const m = ((totalMonth % 12) + 12) % 12;
    const lastDayOfMonth = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(a.getDate(), lastDayOfMonth));
  };

  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (months < 0) months = 0;
  while (months > 0 && anchorOf(months).getTime() > b.getTime()) {
    months -= 1;
  }

  const anchor = anchorOf(months);
  const days = Math.round((b.getTime() - anchor.getTime()) / 86_400_000);

  return { years: Math.floor(months / 12), months: months % 12, days };
}
