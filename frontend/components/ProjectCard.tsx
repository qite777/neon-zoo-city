import Link from "next/link";
import { Project } from "@/types";
import { districts } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const district = districts.find((d) => d.slug === project.districtSlug);

  return (
    <Link
      href={`/project/${project.slug}/`}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
      style={{
        boxShadow: district
          ? `0 0 0 1px ${district.color}15, 0 12px 40px ${district.color}10`
          : undefined,
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute left-0 right-0 top-0 z-10 h-px -translate-x-full transition-transform duration-700 group-hover:translate-x-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${district?.color || "#fff"}, transparent)`,
          boxShadow: `0 0 20px ${district?.color || "#fff"}`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0e15]">
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
          aria-hidden="true"
        >
          {district?.icon || "📁"}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium text-black transition-transform duration-300 group-hover:scale-105"
            style={{ background: district?.color }}
          >
            {project.location}
          </span>
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/80">
            {project.year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold transition-colors group-hover:text-white">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-[#8b8d9a]">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#8b8d9a] transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
