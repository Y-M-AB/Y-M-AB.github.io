import profileJson from "@/data/profile.json";
import friendsJson from "@/data/friends.json";
import timelineJson from "@/data/timeline.json";
import galleryJson from "@/data/gallery.json";
import type { GalleryItem, Person, Profile, TimelineItem } from "./types";

/**
 * 数据访问层：统一从 /data/*.json 读取内容。
 * 想更新网站内容，只需要改 JSON 文件，不需要动任何组件代码。
 */

export function getProfile(): Profile {
  return profileJson as unknown as Profile;
}

export function getFriends(): Person[] {
  return friendsJson as unknown as Person[];
}

export function getTimeline(): TimelineItem[] {
  return timelineJson as unknown as TimelineItem[];
}

export function getGallery(): GalleryItem[] {
  return galleryJson as unknown as GalleryItem[];
}

/** 汇总所有好友的标签，按出现次数从多到少排序 */
export function getAllFriendsTags(): string[] {
  const counter = new Map<string, number>();
  for (const friend of getFriends()) {
    for (const tag of friend.tags ?? []) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return [...counter.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
}

/** 一次取出全部内容，供 /api/content 使用 */
export function getSiteContent() {
  return {
    profile: getProfile(),
    friends: getFriends(),
    timeline: getTimeline(),
    gallery: getGallery(),
  };
}
