"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { MapPoint } from "@/lib/cities";

type MapPanelProps = {
  points: MapPoint[];
};

/**
 * 中国地图：本地 GeoJSON 轮廓（不依赖在线瓦片），每个人的位置一个彩色光点，
 * 点击光点弹出「地点·姓名」并在左上角显示定位卡片。
 */
export default function MapPanel({ points }: MapPanelProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, import("leaflet").CircleMarker>>(new Map());
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<MapPoint | null>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    const run = async () => {
      try {
        const L = (await import("leaflet")).default;
        // 本地中国轮廓数据，不依赖任何在线瓦片（国内网络也能正常显示）
        const response = await fetch("/china.json");
        const china = await response.json();
        if (cancelled || !boxRef.current) return;

        const leafletMap = L.map(boxRef.current, {
          center: [34, 108], // 大致中国中心
          zoom: 3,
          minZoom: 2,
          maxZoom: 8,
          scrollWheelZoom: false, // 避免滚页面时被地图吃掉滚轮
          attributionControl: false,
          zoomControl: false,
        });
        map = leafletMap;

        // 缩放按钮放右上角，免得压住左上角的定位卡片
        L.control.zoom({ position: "topright" }).addTo(leafletMap);

        // 中国轮廓（含海岸线），淡粉描边 + 米白填充，跟站点主题一致
        const outline = L.geoJSON(china, {
          interactive: false,
          style: {
            color: "#f9a8d4",
            weight: 1.2,
            fillColor: "#fffaef",
            fillOpacity: 1,
          },
        }).addTo(leafletMap);

        // 先确定视野（框住整个中国轮廓）
        leafletMap.invalidateSize();
        leafletMap.fitBounds(outline.getBounds(), { padding: [6, 6] });

        // 光点：默认不显示标签，点击才弹出「地点·姓名」
        markersRef.current.clear();
        points.forEach((point) => {
          const key = `${point.city}·${point.name}`;
          const marker = L.circleMarker([point.lat, point.lng], {
            radius: 7,
            color: "#ffffff",
            weight: 2,
            fillColor: point.color,
            fillOpacity: 1,
          }).addTo(leafletMap);

          marker.bindTooltip(key, {
            direction: "top",
            offset: [0, -8],
            className: "map-label",
            opacity: 1,
          });

          // 点击光点：选中（tooltip 的开关由下面的 effect 统一处理）
          marker.on("click", () => setSelected(point));
          markersRef.current.set(key, marker);
        });

        // 点击空白处取消定位（点到光点上时不处理）
        leafletMap.on("click", (event) => {
          const target = event.originalEvent?.target as Element | null | undefined;
          if (target && typeof target.closest === "function" && target.closest("path.leaflet-interactive")) {
            return;
          }
          setSelected(null);
        });
      } catch {
        setFailed(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
      markersRef.current.clear();
      map?.remove();
      map = null;
    };
  }, [points]);

  // 选中项变化时：只打开被点中的那个标签，其余关掉
  useEffect(() => {
    const markers = markersRef.current;
    if (!markers.size) return;
    markers.forEach((marker, key) => {
      if (selected && key === `${selected.city}·${selected.name}`) marker.openTooltip();
      else marker.closeTooltip();
    });
  }, [selected]);

  return (
    <div className="card overflow-hidden p-0">
      <div className="relative">
        <div ref={boxRef} className="h-[550px] w-full sm:h-[750px]" />

        {/* 点击光点后左上角显示定位卡片 */}
        {selected && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-rose-100">
            <p className="text-[10px] uppercase tracking-widest text-slate-400">定位</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-rose-500">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: selected.color }}
              />
              {selected.city}·{selected.name}
            </p>
          </div>
        )}

        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/85 px-6 text-center text-sm text-slate-500">
            地图加载失败，刷新页面试试～
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
        <p className="text-xs leading-6 text-slate-400">
          点击光点可查看是谁（格式「地点·姓名」），点空白处取消；每个光点颜色都不同。
        </p>
        <p className="text-xs text-slate-400">共 {points.length} 个光点</p>
      </div>
    </div>
  );
}
