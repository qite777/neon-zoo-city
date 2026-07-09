"use client";

import { useState } from "react";

export function AboutAvatarVideo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center text-4xl">
        👩‍🎨
      </div>
    );
  }

  return (
    <video
      src="/videos/creator-xiaomei-idle.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="h-full w-full object-cover object-top"
      onError={() => setHasError(true)}
    />
  );
}
