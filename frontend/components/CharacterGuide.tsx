"use client";

import { District } from "@/types";
import { CharacterVideo } from "./CharacterVideo";

interface CharacterGuideProps {
  district: District;
  quote?: string;
  subtitle?: string;
  videoSrc?: string;
  posterSrc?: string;
  position?: "left" | "right";
}

export function CharacterGuide({
  district,
  quote,
  subtitle,
  videoSrc,
  posterSrc,
  position = "left",
}: CharacterGuideProps) {
  const alignClass = position === "left" ? "items-start" : "items-end";
  const textAlign = position === "left" ? "text-left" : "text-right";

  return (
    <div className={`flex flex-col ${alignClass} gap-4`}>
      {/* Character video or image */}
      <div
        className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-[#0d0e15]"
        style={{
          boxShadow: `0 0 40px ${district.color}30`,
          borderColor: `${district.color}40`,
        }}
      >
        {videoSrc ? (
          <CharacterVideo
            src={videoSrc}
            poster={posterSrc}
            alt={district.animalName}
            className="h-64 w-48 md:h-80 md:w-60"
          />
        ) : district.image ? (
          <img
            src={district.image}
            alt={district.animalName}
            loading="lazy"
            decoding="async"
            width={240}
            height={320}
            className="h-64 w-48 object-cover object-top md:h-80 md:w-60"
          />
        ) : (
          <div className="flex h-64 w-48 items-center justify-center md:h-80 md:w-60">
            <span className="text-6xl" aria-hidden="true">{district.animal}</span>
          </div>
        )}

        {/* Name tag */}
        <div
          className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-black"
          style={{ background: district.color }}
        >
          {district.animalName}
        </div>
      </div>

      {/* Speech bubble */}
      <div
        className={`relative max-w-xs rounded-2xl p-4 ${textAlign}`}
        style={{
          background: `${district.color}15`,
          border: `1px solid ${district.color}40`,
        }}
      >
        {subtitle && (
          <p className="mb-1 text-xs uppercase tracking-wider text-[#8b8d9a]">
            {subtitle}
          </p>
        )}
        {quote && (
          <blockquote className="text-sm font-medium leading-relaxed text-white">
            "{quote}"
          </blockquote>
        )}

        {/* Triangle pointer */}
        <div
          className={`absolute -top-2 h-4 w-4 rotate-45 ${
            position === "left" ? "left-8" : "right-8"
          }`}
          style={{
            background: `${district.color}15`,
            borderTop: `1px solid ${district.color}40`,
            borderLeft: `1px solid ${district.color}40`,
          }}
        />
      </div>
    </div>
  );
}
