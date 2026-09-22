import type { AccentKey } from "./types";

/**
 * 每个 accent 对应一整套 Tailwind 类名。
 * 注意：类名必须写成完整字符串（不要再拼接），这样 Tailwind 才能扫描到并生成样式。
 */
export const accents: Record<
  AccentKey,
  { chip: string; avatarRing: string; glow: string; bar: string; dot: string; badge: string }
> = {
  sky: {
    chip: "bg-sky-50 text-sky-700 ring-sky-100",
    avatarRing: "ring-sky-100",
    glow: "bg-sky-200/60",
    bar: "from-sky-400 to-cyan-300",
    dot: "bg-sky-400",
    badge: "bg-sky-50 text-sky-600 ring-sky-100",
  },
  mint: {
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    avatarRing: "ring-emerald-100",
    glow: "bg-emerald-200/60",
    bar: "from-emerald-400 to-teal-300",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
  violet: {
    chip: "bg-violet-50 text-violet-700 ring-violet-100",
    avatarRing: "ring-violet-100",
    glow: "bg-violet-200/60",
    bar: "from-violet-400 to-fuchsia-300",
    dot: "bg-violet-400",
    badge: "bg-violet-50 text-violet-600 ring-violet-100",
  },
  amber: {
    chip: "bg-amber-50 text-amber-700 ring-amber-100",
    avatarRing: "ring-amber-100",
    glow: "bg-amber-200/60",
    bar: "from-amber-400 to-orange-300",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600 ring-amber-100",
  },
  rose: {
    chip: "bg-rose-50 text-rose-700 ring-rose-100",
    avatarRing: "ring-rose-100",
    glow: "bg-rose-200/60",
    bar: "from-rose-400 to-pink-300",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-600 ring-rose-100",
  },
  indigo: {
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    avatarRing: "ring-indigo-100",
    glow: "bg-indigo-200/60",
    bar: "from-indigo-400 to-blue-300",
    dot: "bg-indigo-400",
    badge: "bg-indigo-50 text-indigo-600 ring-indigo-100",
  },
};

export const accentKeys = Object.keys(accents) as AccentKey[];

export function accentOf(key: string | undefined) {
  if (key && key in accents) return accents[key as AccentKey];
  return accents.sky;
}
