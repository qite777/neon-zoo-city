import { District, Project, CityStats } from "@/types";
import { generatedProjects } from "./generated-data";

export const districts: District[] = [
  {
    slug: "theater",
    name: "光影剧场",
    nameEn: "Neon Theater",
    animal: "🦊",
    animalName: "Vex",
    role: "光影剧场主理人",
    color: "#FF3CAC",
    gradient: "from-[#FF3CAC] via-[#784BA0] to-[#2B86C5]",
    description: "AIGC 短片、摄影创作与视觉实验的展映空间。",
    tagline: "能进剧场的，没有废片。",
    icon: "🎬",
    image: "/characters/vex.jpg",
  },
  {
    slug: "arena",
    name: "远行竞技场",
    nameEn: "Expedition Arena",
    animal: "🐆",
    animalName: "Sprint",
    role: "远行竞技场领主",
    color: "#FF9500",
    gradient: "from-[#FF9500] via-[#FF512F] to-[#DD2476]",
    description: "研学足迹、国际交流、公益项目的远征记录。",
    tagline: "我跑过的地方，比你想的多。",
    icon: "🌍",
    image: "/characters/sprint.jpg",
  },
  {
    slug: "gallery",
    name: "高级画廊",
    nameEn: "Orchid Gallery",
    animal: "🌸",
    animalName: "Orchid",
    role: "高级画廊馆长",
    color: "#D946EF",
    gradient: "from-[#D946EF] via-[#9D4EDD] to-[#5A189A]",
    description: "商业考察、艺术家市集与策展观察的精选展厅。",
    tagline: "廉价的东西不会出现在我的墙上。",
    icon: "🖼️",
    image: "/characters/orchid.jpg",
  },
  {
    slug: "tower",
    name: "记忆高塔",
    nameEn: "Chronicle Tower",
    animal: "🦉",
    animalName: "Noctis",
    role: "时间高塔守夜人",
    color: "#00F0FF",
    gradient: "from-[#00F0FF] via-[#0096C7] to-[#023E8A]",
    description: "按时间线串联成长、项目与关键转折。",
    tagline: "时间从不撒谎。",
    icon: "⏳",
    image: "/characters/noctis.jpg",
  },
  {
    slug: "archive",
    name: "慢闪档案馆",
    nameEn: "Slow Archive",
    animal: "🦥",
    animalName: "Slate",
    role: "档案馆馆长",
    color: "#39FF14",
    gradient: "from-[#39FF14] via-[#00C853] to-[#009624]",
    description: "技能、经历、简历与个人资料的沉淀空间。",
    tagline: "资料很多，但核心只有几行。",
    icon: "📚",
    image: "/characters/slate.jpg",
  },
];

// Convert generated data to Project type
export const projects: Project[] = generatedProjects.projects.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  districtSlug: p.districtSlug,
  location: p.location,
  summary: p.summary,
  description: p.description,
  tags: p.tags,
  year: p.year,
  coverImage: undefined,
  assets: [],
  xiaohongshu: p.xiaohongshu,
  douyin: p.douyin,
}));

export function getDistrictBySlug(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

export function getProjectsByDistrict(slug: string): Project[] {
  return projects.filter((p) => p.districtSlug === slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export const cityStats: CityStats = {
  totalProjects: projects.length,
  totalCountries: new Set(projects.map((p) => p.location).filter(Boolean)).size,
  totalFiles: generatedProjects.projects.reduce(
    (sum, p) => sum + (p.fileCount || 0),
    0
  ),
  yearSpan: "2024 — 2026",
};
