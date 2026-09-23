import type { IconName } from "@/lib/types";

type IconProps = {
  name: IconName;
  className?: string;
};

/** 轻量内联图标集（不依赖任何图标库） */
export default function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const stroke = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...stroke}>
          <rect x="2.75" y="5" width="18.5" height="14" rx="3.5" />
          <path d="m4.5 8 6.3 4.6c.7.5 1.7.5 2.4 0L19.5 8" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...stroke}>
          <path d="M4.5 4.5 19 19.5M19.5 4.5 5 19.5" />
        </svg>
      );
    case "bilibili":
      return (
        <svg {...stroke}>
          <rect x="2.8" y="7" width="18.4" height="12.5" rx="3.4" />
          <path d="m7 3.4 2.8 3.4M17 3.4l-2.8 3.4M8.6 11.3v3.2M15.4 11.3v3.2" />
        </svg>
      );
    case "weibo":
      return (
        <svg {...stroke}>
          <circle cx="9.5" cy="14.5" r="4.8" />
          <path d="M15.5 6.6c1.7.4 2.9 1.8 3.1 3.5M17 3.4c2.6.9 4.3 3.3 4.4 6" />
        </svg>
      );
    case "zhihu":
      return (
        <svg {...stroke}>
          <rect x="3" y="4.5" width="18" height="15" rx="4" />
          <path d="M7.6 9h4.6M9.9 9v6.2M7.6 15.2h4.6M17.2 8.4c0 3.2-1.1 5.6-3.2 7.4" />
        </svg>
      );
    case "steam":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="8.6" />
          <circle cx="14.8" cy="9.6" r="2.6" />
          <path d="M3.8 15.4 8.9 12.4" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...stroke}>
          <rect x="2.5" y="6" width="19" height="12.5" rx="4" />
          <path d="m10.6 9.6 4.2 2.7-4.2 2.7z" />
        </svg>
      );
    case "wechat":
      return (
        <svg {...stroke}>
          <path d="M9.4 4.6C5.8 4.6 3 6.9 3 9.7c0 1.6.9 3 2.4 3.9L5 16.6l2.5-1.2c.6.2 1.2.3 1.9.3" />
          <path d="M20.9 15.3c0-2.4-2.4-4.3-5.4-4.3s-5.4 1.9-5.4 4.3c0 1.4.7 2.6 1.9 3.4l-.4 2 2.1-1.1c.6.1 1.2.2 1.8.2 3 0 5.4-1.9 5.4-4.5Z" />
        </svg>
      );
    case "link":
      return (
        <svg {...stroke}>
          <path d="M10.2 13.4a4.6 4.6 0 0 0 6.6 0l2.1-2.1a4.7 4.7 0 0 0-6.6-6.6l-1.1 1.1" />
          <path d="M13.8 10.6a4.6 4.6 0 0 0-6.6 0l-2.1 2.1a4.7 4.7 0 0 0 6.6 6.6l1.1-1.1" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...stroke}>
          <rect x="3" y="5.5" width="18" height="15.5" rx="3.5" />
          <path d="M8 3v4.5M16 3v4.5M3 10.5h18" />
        </svg>
      );
    case "location":
      return (
        <svg {...stroke}>
          <path d="M12 21.2s6.8-6.2 6.8-10.9a6.8 6.8 0 1 0-13.6 0C5.2 15 12 21.2 12 21.2Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case "search":
      return (
        <svg {...stroke}>
          <circle cx="11" cy="11" r="6.4" />
          <path d="m15.8 15.8 4.4 4.4" />
        </svg>
      );
    case "close":
      return (
        <svg {...stroke}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "users":
      return (
        <svg {...stroke}>
          <circle cx="9.2" cy="8.2" r="3.6" />
          <path d="M2.6 20c0-3.6 2.9-6.1 6.6-6.1s6.6 2.5 6.6 6.1" />
          <path d="M16.2 5a3.6 3.6 0 0 1 0 6.6M17.6 14.5c2.3.7 3.8 2.6 3.8 5.5" />
        </svg>
      );
    case "image":
      return (
        <svg {...stroke}>
          <rect x="3" y="4.5" width="18" height="15" rx="3.5" />
          <circle cx="8.5" cy="10" r="1.6" />
          <path d="m4 17.2 4.9-4.4 3.6 3.2 3-2.6 4.5 3.8" />
        </svg>
      );
    case "play":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5.2v13.6L19 12z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...stroke}>
          <path d="M12 3.5 13.5 9l5.5 1.5-5.5 1.5L12 17.5 10.5 12 5 10.5 10.5 9z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...stroke}>
          <path d="M4 20C4 11.2 11.2 4 20 4c0 8.8-7.2 16-16 16Z" />
          <path d="M4 20c3.6-5.6 8.2-10.2 13.6-13.6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="M12 7.6V12l3.1 2" />
        </svg>
      );
    case "arrowUp":
      return (
        <svg {...stroke}>
          <path d="M12 19.5V5M6.2 10.8 12 5l5.8 5.8" />
        </svg>
      );
    default:
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="8.4" />
        </svg>
      );
  }
}
