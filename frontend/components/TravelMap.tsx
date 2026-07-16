"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * 动物旅行者世界地图 — 研学足迹的动态可视化
 * 视频为主视觉，图片作为封面与加载失败回退。
 */
export function TravelMap() {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "200px",
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView) {
      video.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="mb-10">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10"
        style={{ boxShadow: "0 0 60px rgba(255, 149, 0, 0.12)" }}
      >
        {hasError ? (
          <img
            src="/maps/animal-traveler-map.png"
            alt="动物旅行者世界地图"
            loading="lazy"
            decoding="async"
            width={2048}
            height={1152}
            className="h-auto w-full"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src="/videos/animal-traveler-map.mp4"
              poster="/maps/animal-traveler-map.png"
              autoPlay
              muted
              loop
              playsInline
              preload={isInView ? "auto" : "metadata"}
              className={`h-auto w-full transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onError={() => setHasError(true)}
              onLoadedData={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <img
                src="/maps/animal-traveler-map.png"
                alt="动物旅行者世界地图"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
