"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface ExplorerAvatarProps {
  src: string;
  alt: string;
  name?: string;
  title?: string;
}

export function ExplorerAvatar({
  src,
  alt,
  name = "Lilia",
  title = "City Explorer",
}: ExplorerAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = src.endsWith(".mp4");
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

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="relative hidden h-64 w-48 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl md:block md:h-96 md:w-72"
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={isInView ? "auto" : "metadata"}
          className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onError={() => setHasError(true)}
          onLoadedData={() => setIsLoaded(true)}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={288}
          height={384}
          className="h-full w-full object-cover object-top"
          onError={() => setHasError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12]/60 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4">
        <p className="text-xs text-white/70 md:text-sm">{title}</p>
        <p className="text-sm font-bold text-white md:text-lg">{name}</p>
      </div>
    </div>
  );
}
