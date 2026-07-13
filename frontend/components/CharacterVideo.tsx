"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface CharacterVideoProps {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
}

export function CharacterVideo({
  src,
  poster,
  alt = "Character",
  className = "",
}: CharacterVideoProps) {
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
      video.playbackRate = 1;
      video.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [isInView]);

  if (hasError) {
    return null;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={isInView ? "auto" : "metadata"}
        className={`h-full w-full object-contain transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={() => setHasError(true)}
        onLoadedData={() => setIsLoaded(true)}
      />
      {!isLoaded && poster && (
        <img
          src={poster}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
