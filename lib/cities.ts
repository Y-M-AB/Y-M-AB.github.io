import type { Person } from "./types";

/** 城市 → 经纬度（够用即可，用于在地图上打点） */
export const CITY_COORDS: Record<string, [number, number]> = {
  北京: [39.9042, 116.4074],
  天津: [39.0842, 117.2009],
  合肥: [31.8206, 117.2272],
  武汉: [30.5928, 114.3055],
  广州: [23.1291, 113.2644],
  南京: [32.0603, 118.7969],
  香港: [22.3193, 114.1694],
  深圳: [22.5431, 114.0579],
  长春: [43.8171, 125.3235],
  上海: [31.2304, 121.4737],
  成都: [30.5728, 104.0668],
  杭州: [30.2741, 120.1551],
  西安: [34.3416, 108.9398],
  重庆: [29.563, 106.5516],
  海口: [20.0442, 110.1999],
};

export type MapPoint = {
  name: string;
  city: string;
  lat: number;
  lng: number;
  color: string;
};

/** 地点为空或没写的（未知 / 我忘了…）单独拿出来，不在地图上打点 */
export function isUnknownCity(city: string | undefined): boolean {
  if (!city) return true;
  const text = city.trim();
  return text === "" || text.includes("未知") || text.includes("忘了") || text.includes("待定");
}

/**
 * 地图光点专用调色板：12 个互不相同的颜色（跟卡片配色无关，只求相邻/同城能分清）。
 */
export const MAP_PALETTE = [
  "#e11d48", // 朱红
  "#f97316", // 橙
  "#eab308", // 黄
  "#16a34a", // 绿
  "#0d9488", // 青绿
  "#0891b2", // 蓝青
  "#2563eb", // 蓝
  "#7c3aed", // 紫
  "#c026d3", // 品红
  "#db2777", // 玫红
  "#78350f", // 棕
  "#475569", // 石板灰
];

/** 用质数步长取色，让相邻/同城的几个光点色差尽量大 */
export function mapColor(index: number): string {
  const stride = 5;
  return MAP_PALETTE[(index * stride) % MAP_PALETTE.length];
}

/**
 * 光点去重叠：两两距离小于 minDistance（单位：度）时互相推开，
 * 反复迭代到不再重叠为止。会稍微偏离真实坐标，但仍在原地附近。
 */
function spreadPoints(points: MapPoint[], minDistance = 2.3): MapPoint[] {
  const result = points.map((point) => ({ ...point }));

  for (let iteration = 0; iteration < 120; iteration++) {
    let moved = false;
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const a = result[i];
        const b = result[j];
        let dx = b.lng - a.lng;
        let dy = b.lat - a.lat;
        let distance = Math.hypot(dx, dy);

        // 完全重合时给一个固定方向，避免除零
        if (distance === 0) {
          dx = 0.02;
          dy = 0.02;
          distance = Math.hypot(dx, dy);
        }

        if (distance < minDistance) {
          const shift = (minDistance - distance) / 2;
          const ux = dx / distance;
          const uy = dy / distance;
          a.lng -= ux * shift;
          a.lat -= uy * shift;
          b.lng += ux * shift;
          b.lat += uy * shift;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  return result;
}

/**
 * 把好友数据转成地图光点：
 * - 同一个城市的多人会以一个中心点为中心稍微错开，避免光点重叠
 * - 找不到经纬度的城市会被忽略（并在返回值里报告）
 * - 传入 owner 时，也会给站长本人打一个光点（名字取站长的 name）
 */
export function buildMapPoints(
  friends: Person[],
  owner?: { name: string; city?: string }
): {
  points: MapPoint[];
  unknown: string[];
  missing: string[];
} {
  const everyone = [...friends];
  if (owner?.city && !isUnknownCity(owner.city)) {
    everyone.push({
      id: "__owner__",
      name: owner.name,
      location: owner.city,
      avatar: "",
      bio: "",
      tags: [],
      socials: [],
    });
  }

  const known = everyone.filter((friend) => !isUnknownCity(friend.location));
  const unknown = everyone
    .filter((friend) => isUnknownCity(friend.location))
    .map((friend) => friend.name);

  const missing: string[] = [];
  const groups = new Map<string, Person[]>();
  for (const friend of known) {
    const city = (friend.location as string).trim();
    if (!CITY_COORDS[city]) {
      missing.push(`${city}（${friend.name}）`);
      continue;
    }
    groups.set(city, [...(groups.get(city) ?? []), friend]);
  }

  const points: MapPoint[] = [];
  let colorIndex = 0;
  for (const [city, members] of groups) {
    const [lat, lng] = CITY_COORDS[city];
    members.forEach((member, index) => {
      // 单人直接用城市坐标；多人则以小圆环铺开
      const radius = members.length === 1 ? 0 : 0.3;
      const angle = (Math.PI * 2 * index) / members.length;
      points.push({
        name: member.name,
        city,
        lat: lat + radius * Math.cos(angle),
        lng: lng + radius * Math.sin(angle),
        // 颜色按顺序从调色板取，保证每个光点都不同
        color: mapColor(colorIndex++),
      });
    });
  }

  return { points: spreadPoints(points), unknown, missing };
}
