import type { ReactNode } from "react";
import Icon from "./Icon";
import type { IconName } from "@/lib/types";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: IconName;
  children?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  icon = "sparkle",
  children,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sky-600">
          <Icon name={icon} className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
