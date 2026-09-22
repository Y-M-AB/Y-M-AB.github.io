import type { Metadata } from "next";
import { getProfile } from "@/lib/data";
import "./globals.css";

const profile = getProfile();
const siteName = profile.siteName ?? profile.name;

export const metadata: Metadata = {
  title: `${siteName} · 我和朋友们`,
  description: `${siteName}：我和朋友们的个人资料、社交链接、共同经历的时间线与相册。`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <div className="aurora" aria-hidden />
        {children}
      </body>
    </html>
  );
}
