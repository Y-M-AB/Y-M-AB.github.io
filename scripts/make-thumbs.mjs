/**
 * 给 public/gallery 里的照片生成缩略图，输出到 public/gallery/thumbs/。
 *
 * 为什么需要：
 *   原图单张最大 8.6 MB、16 张合计约 37 MB。相册页面若直接加载原图，
 *   访客滚一遍就要下载几十 MB，手机流量直接爆掉。
 *   缩略图统一压到 900px 宽 / quality 78，体积约为原图的 1~3%；
 *   只有点开大图（lightbox）时才加载原图。
 *
 * 用法：npm run thumbs
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public", "gallery");
const outDir = path.join(srcDir, "thumbs");

const MAX_WIDTH = 900;
const QUALITY = 78;
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => IMAGE_RE.test(f));
if (!files.length) {
  console.log("public/gallery 里没有图片");
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(srcDir, file);
  const dst = path.join(outDir, file.replace(IMAGE_RE, ".jpg"));

  const info = await sharp(src)
    // rotate() 会把 EXIF 里的方向烤进像素，避免手机竖拍照片被放倒
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(dst);

  const srcSize = (await stat(src)).size;
  before += srcSize;
  after += info.size;

  console.log(
    `${file}\n    ${(srcSize / 1048576).toFixed(2)} MB -> ${(info.size / 1024).toFixed(0)} KB` +
      `  (${info.width}x${info.height})`
  );
}

console.log(
  `\n合计 ${files.length} 张: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(2)} MB`
);
