import Icon from "./Icon";
import SocialLinks from "./SocialLinks";
import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="section-anchor mt-24 px-5 pb-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-100 opacity-70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-teal-100 opacity-60 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sky-600">
                <Icon name="mail" className="h-3.5 w-3.5" />
                Contact
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                想一起做点什么？随时找我们聊聊
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                无论是合作、交流技术，还是单纯想打个招呼，都欢迎通过下面的方式联系我们。
              </p>
              <SocialLinks links={profile.socials} size="md" className="mt-6" />
            </div>

            <div className="shrink-0 rounded-3xl bg-slate-50/80 p-6 ring-1 ring-slate-100">
              <p className="text-sm font-medium text-slate-700">{profile.name}</p>
              <p className="mt-1 text-xs text-slate-400">{profile.title}</p>
              {profile.location && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Icon name="location" className="h-3.5 w-3.5" />
                  {profile.location}
                </p>
              )}
              <a href="#hero" className="btn btn-ghost mt-5 w-full justify-center">
                <Icon name="arrowUp" className="h-4 w-4" />
                回到顶部
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          © {year} {profile.siteName ?? profile.name} · 用 Next.js 搭建
        </p>
      </div>
    </footer>
  );
}
