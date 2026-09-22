import Icon from "./Icon";
import SocialLinks from "./SocialLinks";
import { toneOf } from "@/lib/tones";
import type { Person } from "@/lib/types";

export default function FriendCard({ person }: { person: Person }) {
  const tone = toneOf(person.tone);

  // 名字是纯 emoji / 符号（没有中英文数字）时，字号放大一号，
  // 否则 emoji 在 18px 下看起来比文字名字小很多。
  const isEmojiOnly = !/[A-Za-z0-9\u4e00-\u9fa5]/.test(person.name);

  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-6">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${tone.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative flex items-center gap-4">
        <div className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-4 ${tone.ring}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.avatar}
            alt={person.name}
            className="h-full w-full object-cover"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <h3
            className={`flex items-baseline gap-1.5 font-semibold ${tone.text} ${
              isEmojiOnly ? "text-3xl leading-9" : "text-lg"
            }`}
          >
            {person.name}
            {person.englishName && (
              <span className={`text-xs font-normal ${tone.textSoft}`}>
                {person.englishName}
              </span>
            )}
          </h3>
          {person.role && <p className={`mt-1 text-sm leading-6 ${tone.text}`}>
            {person.role}
          </p>}
        </div>
      </div>

      <p className={`relative mt-4 flex-1 text-sm leading-7 ${tone.text}`}>
        {person.bio}
      </p>

      {person.location && (
        <p className={`relative mt-3 inline-flex items-center gap-1.5 text-xs ${tone.textSoft}`}>
          <Icon name="location" className="h-3.5 w-3.5" />
          {person.location}
        </p>
      )}

      <div className={`relative mt-5 flex items-center justify-between border-t pt-4 ${tone.divider}`}>
        <span className={`h-1 w-10 rounded-full ${tone.bar}`} />
        <SocialLinks links={person.socials} toneClass={tone.social} />
      </div>
    </article>
  );
}
