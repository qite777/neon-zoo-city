"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface CityLifeVideoProps {
  src: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export function CityLifeVideo({
  src,
  title = "城市脉动",
  subtitle = "City Pulse",
  description = "当五位居民聚在一起，这座城市便有了温度。",
}: CityLifeVideoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, isInView } = useInView<HTMLElement>({
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

  if (hasError) {
    return null;
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={isInView ? "auto" : "metadata"}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onError={() => setHasError(true)}
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12]/95 via-[#0a0b12]/70 to-[#0a0b12]/95" />
      <div className="absolute inset-0 bg-[#0a0b12]/30" />

      {/* Grid pattern */}
      <div className="absolute inset-0 city-grid opacity-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
            {subtitle}
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            <span className="text-gradient bg-gradient-to-r from-[#FF3CAC] via-[#D946EF] to-[#00F0FF]">
              {title}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#8b8d9a]">
            {description}
          </p>

          {/* Decorative indicators */}
          <div className="mt-10 flex justify-center gap-4">
            {["Vex", "Sprint", "Orchid", "Noctis", "Slate"].map((name, index) => {
              const colors = ["#FF3CAC", "#FF9500", "#D946EF", "#00F0FF", "#39FF14"];
              return (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{
                      background: colors[index],
                      boxShadow: `0 0 10px ${colors[index]}`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                  <span className="text-xs text-[#8b8d9a]">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
