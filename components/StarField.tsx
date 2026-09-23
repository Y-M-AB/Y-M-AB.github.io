import type { CSSProperties } from "react";

/**
 * 背景星星：统一黄色（#eab308），共 14 颗，散布在页面两侧的空白区域。
 *
 * - 位置用视口百分比（x / y），整层是 `position: fixed`，所以滚动时星星不动
 * - x 收在两侧边缘带（左 3%~8.5% / 右 91.5%~97%）：
 *   内容栏最宽 72rem，在 ≥1280px 的屏幕上这段正好是内容之外的留白
 * - 想增减数量：直接增删数组项即可；想换颜色：改 `app/globals.css` 里的 `.starfield-star`
 */
const STARS: {
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
  delay: number;
}[] = [
  // ── 左侧带 ──
  { x: 3.5, y: 7, size: 12, rotate: 0, opacity: 0.55, delay: 0 },
  { x: 6.5, y: 18, size: 18, rotate: 18, opacity: 0.68, delay: 1.2 },
  { x: 3, y: 31, size: 10, rotate: -12, opacity: 0.5, delay: 2.4 },
  { x: 8.5, y: 45, size: 23, rotate: 26, opacity: 0.6, delay: 0.6 },
  { x: 4.5, y: 58, size: 14, rotate: -20, opacity: 0.66, delay: 3.1 },
  { x: 7.5, y: 72, size: 10, rotate: 10, opacity: 0.48, delay: 1.8 },
  { x: 3.5, y: 86, size: 18, rotate: -8, opacity: 0.6, delay: 4.2 },

  // ── 右侧带 ──
  { x: 96.5, y: 10, size: 15, rotate: -15, opacity: 0.62, delay: 2.7 },
  { x: 93.5, y: 25, size: 10, rotate: 12, opacity: 0.5, delay: 0.9 },
  { x: 97, y: 38, size: 21, rotate: 22, opacity: 0.6, delay: 3.6 },
  { x: 91.5, y: 52, size: 12, rotate: -25, opacity: 0.54, delay: 1.5 },
  { x: 95.5, y: 66, size: 17, rotate: 8, opacity: 0.68, delay: 4.8 },
  { x: 92.5, y: 80, size: 9, rotate: -18, opacity: 0.46, delay: 2.1 },
  { x: 96, y: 93, size: 14, rotate: 16, opacity: 0.58, delay: 3.3 },
];

export default function StarField() {
  return (
    <div className="starfield" aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="starfield-star"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              "--star-o": s.opacity,
              animationDelay: `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
