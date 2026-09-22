import { NextResponse } from "next/server";
import { getFriends } from "@/lib/data";

/** GET /api/friends —— 返回好友列表，支持 ?tag= 与 ?q= 过滤 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const query = searchParams.get("q")?.toLowerCase();

  let friends = getFriends();

  if (tag) friends = friends.filter((friend) => friend.tags?.includes(tag));
  if (query) {
    friends = friends.filter((friend) =>
      [friend.name, friend.role, friend.bio, ...(friend.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  return NextResponse.json({ total: friends.length, friends });
}
