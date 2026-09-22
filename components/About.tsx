import Reveal from "./Reveal";
import Icon from "./Icon";
import type { Profile } from "@/lib/types";

export default function About({ profile }: { profile: Profile }) {
  const focus = profile.focus ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal className="h-full">
        <div className="card h-full p-7 sm:p-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sky-600">
            <Icon name="sparkle" className="h-3.5 w-3.5" />
            关于我
          </span>
          <p className="mt-4 text-[0.95rem] leading-8 text-slate-600">{profile.bio}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
            {profile.tags.map((tag) => (
              <span key={tag} className="chip bg-slate-50 text-slate-600 ring-1 ring-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="h-full">
        <div className="card h-full p-7 sm:p-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-teal-600">
            <Icon name="clock" className="h-3.5 w-3.5" />
            我们一起做过的事
          </span>

          <ul className="mt-5 space-y-4">
            {focus.map((item) =>
              item.highlight ? (
                <li key={item.title} className="flex justify-center pt-1">
                  <p className="text-gradient-red text-xl">{item.title}</p>
                </li>
              ) : (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 text-sky-600 ring-1 ring-sky-100">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink-900">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-xs leading-6 text-slate-500">{item.description}</p>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
