/**
 * 把一张图处理成圆形头像：裁掉水印 → 裁成正方形 → 缩放 → 裁成圆形（圆形外透明）。
 *
 * 为什么这么做：
 *   头像显示在 128px 的圆形里，但很多图源（比如小红书保存的图）右下角带水印。
 *   水印落在图片的角上，先切掉底部一条、再按圆裁切，基本上就彻底看不见了。
 *
 * 用法：
 *   node scripts/make-avatar.mjs <源图路径> [输出文件名] [--crop=left,top,size]
 *
 *   --crop 用来手动指定正方形裁切区（默认是「切掉底部 8% 后居中裁最大正方形」）。
 *   横构图、或者主体不在正中的图，必须用它，否则会把主体裁掉。
 *
 * 例：
 *   node scripts/make-avatar.mjs "$env:APPDATA\...\image-xxx.jpeg" me.webp
 *   node scripts/make-avatar.mjs "$env:APPDATA\...\image-yyy.jpeg" cat.webp --crop=400,370,440
 *   → 生成 public/avatars/*.webp
 *
 * 输出格式按扩展名决定：.webp（默认，带透明的圆形图比 PNG 小一个数量级）/ .png
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/** 默认从底部切掉的百分比（用来去掉右下角水印） */
const BOTTOM_CUT = 0.08;
/** 输出尺寸（正方形，够 128px 头像在高分屏显示） */
const SIZE = 512;
/** WebP 质量 */
const WEBP_QUALITY = 82;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = process.argv[2];
const outName = process.argv[3] ?? "me.webp";
const cropArg = process.argv.find((arg) => arg.startsWith("--crop="));

if (!src) {
  console.error(
    "用法: node scripts/make-avatar.mjs <源图路径> [输出文件名] [--crop=left,top,size]"
  );
  process.exit(1);
}

const dst = path.join(root, "public", "avatars", outName);

const meta = await sharp(src).metadata();
const { width, height } = meta;
if (!width || !height) {
  console.error(`读不出图片尺寸：${src}`);
  process.exit(1);
}

// 决定正方形裁切区：
//   1) 手动 --crop=left,top,size
//   2) 默认：先切掉底部一条（去水印），再居中裁最大的正方形
// 两种都归结成一次 extract 搞定（默认情况下的区域本来就落在底部裁切线之上）
let region;
if (cropArg) {
  const [left, top, size] = cropArg.slice("--crop=".length).split(",").map(Number);
  if (![left, top, size].every(Number.isFinite) || size <= 0) {
    console.error("--crop 格式应为 --crop=left,top,size（例如 --crop=400,370,440）");
    process.exit(1);
  }
  if (left < 0 || top < 0 || left + size > width || top + size > height) {
    console.error(
      `--crop 超出图片范围：图片是 ${width}x${height}，` +
        `裁切区 ${size}x${size} @(${left},${top}) 会越界。` +
        `记得 left+size ≤ ${width}、top+size ≤ ${height}。`
    );
    process.exit(1);
  }
  region = { left, top, width: size, height: size, how: "手动指定" };
} else {
  const keepHeight = Math.round(height * (1 - BOTTOM_CUT));
  const side = Math.min(width, keepHeight);
  region = {
    left: Math.round((width - side) / 2),
    top: Math.round((keepHeight - side) / 2),
    width: side,
    height: side,
    how: `切底 ${(BOTTOM_CUT * 100).toFixed(0)}% 后居中裁 ${side}x${side}`,
  };
}

// 圆形遮罩（dest-in 只保留遮罩不透明的地方）
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${
    SIZE / 2
  }" fill="#ffffff"/></svg>`
);

await mkdir(path.dirname(dst), { recursive: true });

const pipeline = sharp(src)
  .extract(region)
  .resize(SIZE, SIZE)
  .composite([{ input: mask, blend: "dest-in" }]);

const info = /\.webp$/i.test(dst)
  ? await pipeline.webp({ quality: WEBP_QUALITY }).toFile(dst)
  : await pipeline.png({ compressionLevel: 9 }).toFile(dst);

const srcSize = (await stat(src)).size;
console.log(
  `${path.basename(src)}  ${width}x${height}  ${(srcSize / 1024).toFixed(0)} KB\n` +
    `  ✂️  ${region.how} → ${region.width}x${region.height} @(${region.left},${region.top})\n` +
    `  ⭕ 缩放 ${SIZE}x${SIZE} + 圆形遮罩 → ${info.width}x${info.height}\n` +
    `  ✅ ${path.relative(root, dst)}  ${(info.size / 1024).toFixed(0)} KB`
);
