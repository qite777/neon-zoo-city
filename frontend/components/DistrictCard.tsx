import Link from "next/link";
import { District } from "@/types";
import { AnimalAvatar } from "./AnimalAvatar";

interface DistrictCardProps {
  district: District;
  index: number;
}

export function DistrictCard({ district, index }: DistrictCardProps) {
  return (
    <Link
      href={`/district/${district.slug}`}
      className="group relative overflow-hidden rounded-3xl glass-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/30"
      style={{
        boxShadow: `0 0 0 1px ${district.color}20, 0 20px 60px ${district.color}15`,
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute left-0 right-0 top-0 h-px -translate-x-full transition-transform duration-700 group-hover:translate-x-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${district.color}, transparent)`,
          boxShadow: `0 0 20px ${district.color}`,
        }}
      />

      {/* Background glow */}
      <div
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: district.color }}
      />

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${district.color}15, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <AnimalAvatar district={district} size="lg" animate={false} />
        <span
          className="text-3xl opacity-50 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-80"
          aria-hidden="true"
        >
          {district.icon}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-medium uppercase tracking-widest text-[#8b8d9a]">
          {district.nameEn}
        </p>
        <h3 className="mt-1 text-2xl font-bold">{district.name}</h3>
        <p className="mt-2 text-sm text-[#8b8d9a]">{district.description}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: district.color }}>
            {district.animalName}
          </span>
          <span className="text-sm text-[#8b8d9a]">· {district.role}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-[#8b8d9a]">
          <span className="rounded-full bg-white/5 px-3 py-1">
            0{index + 1}
          </span>
          <span className="transition-colors group-hover:text-white">
            进入街区 →
          </span>
        </div>
      </div>
    </Link>
  );
}
