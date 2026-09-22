import Icon from "./Icon";
import Reveal from "./Reveal";
import { accentOf } from "@/lib/accents";
import type { TimelineItem } from "@/lib/types";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-1 border-l border-dashed border-slate-200 pl-6 sm:ml-3 sm:pl-10">
      {items.map((item, index) => {
        const accent = accentOf(item.accent);
        return (
          <li key={`${item.date}-${item.title}`} className="relative pb-9 last:pb-0">
            <Reveal delay={index * 60}>
              <span
                className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full ${accent.dot} ring-4 ring-white sm:-left-[47px]`}
              />
              <div className="card card-hover p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  {item.tag && (
                    <span className={`chip ring-1 ${accent.badge}`}>{item.tag}</span>
                  )}
                </div>
                <h3 className="mt-2.5 text-base font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{item.description}</p>
                <span className={`mt-4 block h-1 w-12 rounded-full bg-gradient-to-r ${accent.bar}`} />
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
