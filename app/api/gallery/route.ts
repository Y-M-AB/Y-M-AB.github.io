import { NextResponse } from "next/server";
import { getGallery } from "@/lib/data";

/** GET /api/gallery —— 返回相册列表 */
export async function GET() {
  const items = getGallery();
  return NextResponse.json({ total: items.length, gallery: items });
}
