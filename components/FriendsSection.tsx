"use client";

import { useState } from "react";
import FriendCard from "./FriendCard";
import Pager from "./Pager";
import Reveal from "./Reveal";
import type { Person } from "@/lib/types";

/** 翻页式：每页显示几位伙伴 */
const PER_PAGE = 4;

type FriendsSectionProps = {
  friends: Person[];
};

/** 好友卡片墙（每页 4 位，翻页浏览） */
export default function FriendsSection({ friends }: FriendsSectionProps) {
  const [page, setPage] = useState(0);

  if (!friends.length) return null;

  const pageCount = Math.max(1, Math.ceil(friends.length / PER_PAGE));
  const slice = friends.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <>
      {/* key={page} 让翻页时整块重新挂载，Reveal 的淡入上移动画才会重播 */}
      <div key={page} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {slice.map((person, index) => (
          <Reveal key={person.id} delay={index * 90} className="h-full">
            <FriendCard person={person} />
          </Reveal>
        ))}
      </div>

      <Pager page={page} pageCount={pageCount} onChange={setPage} />
    </>
  );
}
