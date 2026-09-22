import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/data";

/** GET /api/content —— 返回整站数据（profile / friends / timeline / gallery） */
export async function GET() {
  return NextResponse.json(getSiteContent(), {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
  });
}
