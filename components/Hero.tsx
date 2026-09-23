import SocialLinks from "./SocialLinks";
import Icon from "./Icon";
import ElapsedTime, { DEFAULT_SINCE } from "./ElapsedTime";
import { diffYMD, parseDate } from "@/lib/elapsed";
import type { Profile } from "@/lib/types";

export default function Hero({ profile }: { profile: Profile }) {
  const since = profile.since ?? DEFAULT_SINCE;
  // 构建时先算一份，写进静态 HTML；客户端挂载后会自己重算并持续更新
  const initialElapsed = diffYMD(parseDate(profile.since, DEFAULT_SINCE), new Date());

  return (
    <section id="hero" className="section-anchor relative px-5 pb-4 pt-14 sm:px-8 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
          {profile.greeting && (
            <span className="chip mb-5 bg-white/80 text-slate-500 ring-1 ring-slate-200/80">
              <Icon name="sparkle" className="h-3.5 w-3.5 text-sky-500" />
              {profile.greeting}
            </span>
          )}

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            <span className="text-gradient">{profile.name}</span>
            {profile.englishName && (
              <span className="ml-3 align-middle text-lg font-normal text-slate-400 sm:text-xl">
                / {profile.englishName}
              </span>
            )}
          </h1>

          <p className="mt-3 text-lg font-medium text-slate-600">{profile.title}</p>

          {profile.location && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-400">
              <Icon name="location" className="h-4 w-4" />
              {profile.location}
            </p>
          )}

          <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-slate-500">{profile.bio}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#friends" className="btn btn-primary">
              <Icon name="users" className="h-4 w-4" />
              认识我的伙伴
            </a>
            <a href="#gallery" className="btn btn-ghost">
              <Icon name="image" className="h-4 w-4" />
              看看相册
            </a>
          </div>

          <SocialLinks links={profile.socials} size="md" className="mt-7" />
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky-100 via-teal-50 to-violet-100 opacity-80 blur-2xl" />
          <div className="card relative overflow-hidden p-6">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
                width={160}
                height={160}
              />
            </div>
            <p className="mt-5 text-center text-base font-semibold text-ink-900">{profile.name}</p>
            <p className="mt-1 text-center text-sm text-slate-400">{profile.title}</p>

            <div className="mt-6 rounded-2xl bg-slate-50/70 px-4 py-4">
              <p className="text-center text-xs tracking-wide text-slate-400">我们一起走过了</p>
              <ElapsedTime since={since} initial={initialElapsed} />
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {profile.tags.slice(0, 6).map((tag) => (
                <span key={tag} className="chip bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
