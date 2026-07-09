"use client";

import { useState, useRef, useEffect } from "react";

interface HeroVideoProps {
  src: string;
  poster?: string;
}

export function HeroVideo({ src, poster }: HeroVideoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's ok
      });
    }
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`h-full w-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={() => setHasError(true)}
        onLoadedData={() => setIsLoaded(true)}
      />
      {!isLoaded && poster && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
    </div>
  );
}
