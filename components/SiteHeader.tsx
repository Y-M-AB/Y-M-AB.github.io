"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#about", label: "关于我" },
  { href: "#friends", label: "伙伴" },
  { href: "#timeline", label: "时间线" },
  { href: "#gallery", label: "相册" },
  { href: "#map", label: "地图" },
  { href: "#contact", label: "联系" },
];

export default function SiteHeader({
  siteName,
  logoChar,
}: {
  siteName: string;
  /** 蓝绿色圆圈里显示的字，默认取站点名首字 */
  logoChar?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (el): el is Element => Boolean(el)
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-300 text-sm font-semibold text-white shadow-lg shadow-sky-200/70 transition-transform duration-300 group-hover:rotate-6">
            {logoChar ?? siteName.slice(0, 1)}
          </span>
          <span className="text-base font-semibold tracking-tight text-ink-900">{siteName}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                active === item.href
                  ? "bg-sky-50 font-medium text-sky-700"
                  : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="切换菜单"
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 md:hidden"
        >
          <Icon name={menuOpen ? "close" : "users"} className="h-5 w-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-5 pb-4 pt-2 backdrop-blur-xl md:hidden">
          <nav className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
