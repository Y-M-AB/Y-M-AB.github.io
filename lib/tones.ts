import type { ToneKey } from "./types";

/**
 * 好友卡片的配色方案。
 * 每个 tone 都把整张卡片的颜色配齐：主文字 / 次要文字 / 头像圈 / 分隔线 / 小条 / 悬停柔光 / 社交图标。
 * 注意：类名必须写成完整字符串（不要拼接），否则 Tailwind 扫描不到、样式不会生成。
 */
export const cardTones: Record<
  ToneKey,
  {
    text: string;
    textSoft: string;
    ring: string;
    divider: string;
    bar: string;
    glow: string;
    social: string;
  }
> = {
  pink: {
    text: "text-rose-400",
    textSoft: "text-rose-300",
    ring: "ring-rose-200",
    divider: "border-rose-100",
    bar: "bg-gradient-to-r from-rose-300 to-rose-100",
    glow: "bg-rose-200/70",
    social:
      "border-rose-200 bg-white/80 text-rose-300 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500",
  },
  green: {
    text: "text-emerald-500",
    textSoft: "text-emerald-300",
    ring: "ring-emerald-200",
    divider: "border-emerald-100",
    bar: "bg-gradient-to-r from-emerald-400 to-emerald-100",
    glow: "bg-emerald-200/70",
    social:
      "border-emerald-200 bg-white/80 text-emerald-400 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600",
  },
  sky: {
    text: "text-sky-600",
    textSoft: "text-sky-500",
    ring: "ring-sky-300",
    divider: "border-sky-200",
    bar: "bg-gradient-to-r from-sky-500 to-sky-200",
    glow: "bg-sky-300/70",
    social:
      "border-sky-300 bg-white/80 text-sky-500 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700",
  },
  violet: {
    text: "text-violet-600",
    textSoft: "text-violet-500",
    ring: "ring-violet-300",
    divider: "border-violet-200",
    bar: "bg-gradient-to-r from-violet-500 to-violet-200",
    glow: "bg-violet-300/70",
    social:
      "border-violet-300 bg-white/80 text-violet-500 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700",
  },
  amber: {
    text: "text-amber-500",
    textSoft: "text-amber-300",
    ring: "ring-amber-200",
    divider: "border-amber-100",
    bar: "bg-gradient-to-r from-amber-400 to-amber-100",
    glow: "bg-amber-200/70",
    social:
      "border-amber-200 bg-white/80 text-amber-400 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600",
  },
  /**
   * 黄色：页面底色本身是米黄，所以这一套整体加深（用 yellow-500/600 而不是 100~300），
   * 分隔线和头像圈也用 -300，避免糊在背景里看不出来。
   */
  yellow: {
    text: "text-yellow-600",
    textSoft: "text-yellow-500",
    ring: "ring-yellow-300",
    divider: "border-yellow-300",
    bar: "bg-gradient-to-r from-yellow-500 to-yellow-200",
    glow: "bg-yellow-300/70",
    social:
      "border-yellow-300 bg-white/80 text-yellow-500 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700",
  },
  /** 青色：同样因为米黄底比较浅，文字用 -600、圈和线用 -200/-300 保证看得清 */
  cyan: {
    text: "text-cyan-600",
    textSoft: "text-cyan-500",
    ring: "ring-cyan-300",
    divider: "border-cyan-200",
    bar: "bg-gradient-to-r from-cyan-500 to-cyan-200",
    glow: "bg-cyan-300/70",
    social:
      "border-cyan-300 bg-white/80 text-cyan-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700",
  },
  red: {
    text: "text-red-600",
    textSoft: "text-red-500",
    ring: "ring-red-300",
    divider: "border-red-200",
    bar: "bg-gradient-to-r from-red-500 to-red-200",
    glow: "bg-red-300/70",
    social:
      "border-red-300 bg-white/80 text-red-500 hover:border-red-400 hover:bg-red-50 hover:text-red-700",
  },
  /** 玫红：比 pink（珊瑚粉）更偏洋红、更深，用 Tailwind 的 pink 色阶 */
  magenta: {
    text: "text-pink-600",
    textSoft: "text-pink-500",
    ring: "ring-pink-300",
    divider: "border-pink-200",
    bar: "bg-gradient-to-r from-pink-500 to-pink-200",
    glow: "bg-pink-300/70",
    social:
      "border-pink-300 bg-white/80 text-pink-500 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700",
  },
  /** 墨绿：比 green（翠绿）更深更沉，用 Tailwind 的 green 深色阶 */
  forest: {
    text: "text-green-800",
    textSoft: "text-green-700",
    ring: "ring-green-400",
    divider: "border-green-300",
    bar: "bg-gradient-to-r from-green-700 to-green-300",
    glow: "bg-green-400/60",
    social:
      "border-green-300 bg-white/80 text-green-700 hover:border-green-500 hover:bg-green-50 hover:text-green-900",
  },
  /** 金色：比 amber（亮橙）更深、更偏古铜，跟 yellow/amber 拉开区别 */
  gold: {
    text: "text-amber-700",
    textSoft: "text-amber-600",
    ring: "ring-amber-400",
    divider: "border-amber-300",
    bar: "bg-gradient-to-r from-amber-600 to-amber-300",
    glow: "bg-amber-400/60",
    social:
      "border-amber-300 bg-white/80 text-amber-600 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-800",
  },
  /** 银色：冷调灰，文字保证可读用 slate-500 及以下 */
  silver: {
    text: "text-slate-500",
    textSoft: "text-slate-400",
    ring: "ring-slate-200",
    divider: "border-slate-100",
    bar: "bg-gradient-to-r from-slate-300 to-slate-100",
    glow: "bg-slate-200/70",
    social:
      "border-slate-200 bg-white/80 text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600",
  },
  /** 浅紫（丁香紫）：比 violet（深紫）浅一档，用 Tailwind 的 purple 色阶 */
  lilac: {
    text: "text-purple-400",
    textSoft: "text-purple-300",
    ring: "ring-purple-200",
    divider: "border-purple-100",
    bar: "bg-gradient-to-r from-purple-300 to-purple-100",
    glow: "bg-purple-200/70",
    social:
      "border-purple-200 bg-white/80 text-purple-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-500",
  },
};

export const toneKeys = Object.keys(cardTones) as ToneKey[];

/** 每个配色的代表色（十六进制）—— 给地图光点等非 Tailwind 场景用 */
export const toneHex: Record<ToneKey, string> = {
  pink: "#fb7185",
  magenta: "#db2777",
  green: "#10b981",
  forest: "#166534",
  sky: "#0284c7",
  cyan: "#0891b2",
  violet: "#7c3aed",
  lilac: "#c084fc",
  amber: "#f59e0b",
  gold: "#b45309",
  yellow: "#ca8a04",
  red: "#dc2626",
  silver: "#64748b",
};

/** 取配色，非法值回落到粉色 */
export function toneOf(key: string | undefined) {
  if (key && key in cardTones) return cardTones[key as ToneKey];
  return cardTones.pink;
}
