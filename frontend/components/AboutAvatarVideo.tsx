"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

export function AboutAvatarVideo() {
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

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden="true">
        👩‍🎨
      </div>
    );
  }

  return (
    <div ref={ref} className="h-full w-full">
      <video
        ref={videoRef}
        src="/videos/creator-xiaomei-idle.mp4"
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
    </div>
  );
}
