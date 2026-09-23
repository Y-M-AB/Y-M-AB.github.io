import type { Metadata } from "next";
import { getProfile } from "@/lib/data";
import StarField from "@/components/StarField";
import "./globals.css";

const profile = getProfile();
const siteName = profile.siteName ?? profile.name;

export const metadata: Metadata = {
  title: `${siteName} · 我和朋友们`,
  description: `${siteName}：我和朋友们的个人资料、社交链接、共同经历的时间线与相册。`,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <div className="aurora" aria-hidden />
        <StarField />
        {children}
      </body>
    </html>
  );
}
