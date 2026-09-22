import { NextResponse } from "next/server";
import { getTimeline } from "@/lib/data";

/** GET /api/timeline —— 按文件里的顺序返回（时间格式不统一，不做字符串排序，避免把 Jun 排到 Mar 前面） */
export async function GET() {
  const items = getTimeline();
  return NextResponse.json({ total: items.length, timeline: items });
}
