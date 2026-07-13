"use client";

import Link from "next/link";
import { District } from "@/types";
import { getProjectsByDistrict } from "@/lib/data";

interface CityMapProps {
  districts: District[];
}

function DistrictTower({ district, index }: { district: District; index: number }) {
  const projects = getProjectsByDistrict(district.slug);
  const projectCount = projects.length;

  // Position towers in a pentagon around the center
  const angleStep = (2 * Math.PI) / 5;
  const angle = index * angleStep - Math.PI / 2;
  const radius = 34; // percentage from center
  const left = 50 + radius * Math.cos(angle);
  const top = 50 + radius * Math.sin(angle) * 0.7; // flatten vertically for perspective

  // Tower height based on project count, min 80px max 180px
  const towerHeight = Math.max(80, Math.min(180, 60 + projectCount * 18));

  return (
    <Link
      href={`/district/${district.slug}/`}
      className="group absolute flex flex-col items-center transition-transform duration-300 hover:-translate-y-2"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10 + index,
      }}
    >
      {/* Avatar on top */}
      <div
        className="relative z-20 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 md:h-16 md:w-16"
        style={{
          boxShadow: `0 0 30px ${district.color}80`,
          background: `linear-gradient(135deg, ${district.color}, #13151f)`,
        }}
      >
        {district.image ? (
          <img
            src={district.image}
            alt={district.animalName}
            loading="lazy"
            decoding="async"
            width={56}
            height={56}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-2xl" aria-hidden="true">{district.animal}</span>
        )}
      </div>

      {/* Tower body */}
      <div
        className="relative -mt-2 w-10 overflow-hidden rounded-b-lg transition-all duration-300 group-hover:w-12 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] md:w-12 md:group-hover:w-14"
        style={{
          height: `${towerHeight}px`,
          background: `linear-gradient(180deg, ${district.color}40 0%, ${district.color}20 50%, ${district.color}05 100%)`,
          boxShadow: `0 0 25px ${district.color}40, inset 0 0 20px ${district.color}20`,
          borderLeft: `1px solid ${district.color}60`,
          borderRight: `1px solid ${district.color}60`,
          borderBottom: `1px solid ${district.color}60`,
        }}
      >
        {/* Vertical neon line */}
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{ background: district.color }}
        />

        {/* Floating windows */}
        {Array.from({ length: Math.min(5, Math.max(2, projectCount)) }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full animate-pulse-glow"
            style={{
              top: `${20 + i * 18}%`,
              background: district.color,
              boxShadow: `0 0 8px ${district.color}`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Connection line to center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-px w-32 origin-left opacity-30 md:block"
        style={{
          background: `linear-gradient(90deg, ${district.color}, transparent)`,
          transform: `rotate(${-angle * (180 / Math.PI) + 180}deg)`,
        }}
      />

      {/* Label */}
      <div className="mt-3 text-center">
        <p className="text-sm font-bold text-white transition-colors group-hover:text-[#f0f0f5]">
          {district.name}
        </p>
        <p className="text-xs text-[#8b8d9a]">
          {district.animalName}
        </p>
        <p className="mt-1 text-xs" style={{ color: district.color }}>
          {projectCount} 个项目
        </p>
      </div>
    </Link>
  );
}

export function CityMap({ districts }: CityMapProps) {
  return (
    <section aria-label="城市地图" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
            City Map
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            城市地图
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8b8d9a]">
            五座街区，由五位动物居民掌管。点击建筑，进入他们的领地。
          </p>
        </div>

        <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d0e15] city-grid">
          {/* Ground glow */}
          <div
            className="absolute bottom-0 left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, #D946EF 0%, transparent 70%)",
            }}
          />

          {/* Central tower */}
          <div
            className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24"
              style={{
                background: "linear-gradient(135deg, #D946EF, #5A189A)",
                boxShadow: "0 0 50px #D946EF60",
              }}
            >
            <span className="text-3xl md:text-4xl" aria-hidden="true">🌃</span>
              <div className="absolute inset-0 animate-ping rounded-full opacity-20 bg-[#D946EF]" />
            </div>
            <div
              className="-mt-2 h-24 w-8 rounded-b-lg md:h-32 md:w-10"
              style={{
                background:
                  "linear-gradient(180deg, #D946EF40 0%, #D946EF10 100%)",
                boxShadow: "0 0 30px #D946EF40",
                borderLeft: "1px solid #D946EF60",
                borderRight: "1px solid #D946EF60",
                borderBottom: "1px solid #D946EF60",
              }}
            />
            <p className="mt-3 text-sm font-medium text-[#8b8d9a]">城市中枢</p>
          </div>

          {/* District towers */}
          {districts.map((district, index) => (
            <DistrictTower key={district.slug} district={district} index={index} />
          ))}

          {/* Decorative orbital rings */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
          />
        </div>
      </div>
    </section>
  );
}
