import Icon from "./Icon";
import type { SocialLink } from "@/lib/types";

type SocialLinksProps = {
  links: SocialLink[];
  size?: "sm" | "md";
  /** 图标按钮的配色类名；不传就用默认的灰/蓝配色 */
  toneClass?: string;
  className?: string;
};

const DEFAULT_TONE =
  "border-slate-200 bg-white/80 text-slate-500 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600";

/** 社交链接按钮组 */
export default function SocialLinks({
  links,
  size = "sm",
  toneClass = DEFAULT_TONE,
  className = "",
}: SocialLinksProps) {
  if (!links?.length) return null;

  const dimension = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map((link) => (
        <li key={`${link.label}-${link.url}`}>
          <a
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            title={link.label}
            aria-label={link.label}
            className={`group inline-flex ${dimension} items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${toneClass}`}
          >
            <Icon name={link.icon} className={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  );
}
