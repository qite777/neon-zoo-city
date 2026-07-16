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
    <section ref={ref} className="relative overflow-hidden">
      {/* Full-bleed video */}
      <div className="relative h-[62vh] min-h-[420px] w-full md:h-[78vh]">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={isInView ? "auto" : "metadata"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onError={() => setHasError(true)}
          onLoadedData={() => setIsLoaded(true)}
        />

        {/* Bottom-only gradient so the video stays visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-[#0a0b12]/25 to-transparent" />

        {/* Caption anchored to the bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-7xl px-6 pb-8 md:pb-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-white/70 drop-shadow-md">
                {subtitle}
              </p>
              <h2 className="mt-2 text-4xl font-bold drop-shadow-lg md:text-6xl">
                <span className="text-gradient bg-gradient-to-r from-[#FF3CAC] via-[#D946EF] to-[#00F0FF]">
                  {title}
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/80 drop-shadow-md md:text-lg">
                {description}
              </p>

              {/* Resident indicators */}
              <div className="mt-6 flex justify-center gap-4 md:gap-6">
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
                      <span className="text-xs text-white/70 drop-shadow">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
