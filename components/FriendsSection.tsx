import FriendCard from "./FriendCard";
import Reveal from "./Reveal";
import type { Person } from "@/lib/types";

type FriendsSectionProps = {
  friends: Person[];
};

/** 好友卡片墙 */
export default function FriendsSection({ friends }: FriendsSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {friends.map((person, index) => (
        <Reveal key={person.id} delay={(index % 3) * 90} className="h-full">
          <FriendCard person={person} />
        </Reveal>
      ))}
    </div>
  );
}
