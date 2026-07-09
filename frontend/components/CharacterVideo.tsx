"use client";

import { useState, useRef, useEffect } from "react";

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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1;
    }
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
