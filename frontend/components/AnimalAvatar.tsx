"use client";

import { useState } from "react";
import { District } from "@/types";

interface AnimalAvatarProps {
  district: District;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
  xl: "h-32 w-32 md:h-40 md:w-40",
};

const textSizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export function AnimalAvatar({ district, size = "md", animate = false }: AnimalAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = district.image && !imageError;

  return (
    <div
      className={`
        ${sizeClasses[size]}
        relative flex items-center justify-center overflow-hidden rounded-2xl
        bg-gradient-to-br ${district.gradient}
        shadow-lg transition-transform duration-300 hover:scale-110
        ${animate ? "animate-float" : ""}
      `}
      style={{ boxShadow: `0 0 30px ${district.color}40` }}
    >
      {hasImage ? (
        <img
          src={district.image}
          alt={district.animalName}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={textSizes[size]}>{district.animal}</span>
      )}
    </div>
  );
}
