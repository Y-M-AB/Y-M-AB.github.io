/** 站点内容类型定义 —— 所有数据都来自 /data 目录下的 JSON 文件 */

export type IconName =
  | "github"
  | "mail"
  | "twitter"
  | "bilibili"
  | "weibo"
  | "zhihu"
  | "steam"
  | "youtube"
  | "wechat"
  | "link"
  | "calendar"
  | "location"
  | "search"
  | "close"
  | "users"
  | "image"
  | "play"
  | "sparkle"
  | "leaf"
  | "clock"
  | "arrowUp";

export type AccentKey = "sky" | "mint" | "violet" | "amber" | "rose" | "indigo";

/** 好友卡片的配色方案（见 lib/tones.ts） */
export type ToneKey =
  | "pink"
  | "magenta"
  | "green"
  | "sky"
  | "violet"
  | "amber"
  | "yellow"
  | "cyan"
  | "red"
  | "forest"
  | "gold"
  | "silver"
  | "lilac";

export type SocialLink = {
  label: string;
  url: string;
  icon: IconName;
};

export type FocusItem = {
  title: string;
  /** 说明文字，不填就只显示标题 */
  description?: string;
  icon: IconName;
  /** 特殊样式行：居中 + 行楷 + 红色渐变（用于「未完待续」这类收尾） */
  highlight?: boolean;
};

export type Profile = {
  name: string;
  /** 左上角显示的站点名称，不填就用 name */
  siteName?: string;
  englishName?: string;
  title: string;
  location?: string;
  avatar: string;
  greeting?: string;
  /** 本人所在城市（会作为首屏定位的第一项，并在地图上打点） */
  city?: string;
  /** 本人在地图上的光点颜色，不填默认粉色 */
  tone?: ToneKey;
  bio: string;
  tags: string[];
  /** 正计时的起始日期，格式 "YYYY-MM-DD"（不填默认 2023-09-01） */
  since?: string;
  socials: SocialLink[];
  focus?: FocusItem[];
};

export type Person = {
  id: string;
  name: string;
  englishName?: string;
  /** 身份 / 职业，不填就不显示这一行 */
  role?: string;
  location?: string;
  avatar: string;
  bio: string;
  tags: string[];
  /** 卡片配色，不填默认粉色 */
  tone?: ToneKey;
  /** 旧字段，已不影响卡片外观（时间线仍在用同名字段） */
  accent?: AccentKey;
  socials: SocialLink[];
};

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  tag?: string;
  accent: AccentKey;
};

export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  /** 图片或视频的路径（视频填 mp4 等文件路径，并把 type 设为 video） */
  image: string;
  /**
   * 缩略图路径（可选）。列表里显示用，不填就用 `image`。
   * 原图动辄几 MB，建议用 `npm run thumbs` 生成压缩版再填这里。
   */
  thumb?: string;
  /** 不填默认按图片处理 */
  type?: "image" | "video";
  date?: string;
};
