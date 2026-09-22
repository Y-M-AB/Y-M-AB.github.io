import { NextResponse } from "next/server";
import { getProfile } from "@/lib/data";

/** GET /api/profile —— 返回站长个人资料 */
export async function GET() {
  return NextResponse.json(getProfile());
}
