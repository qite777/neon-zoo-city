export interface District {
  slug: string;
  name: string;
  nameEn: string;
  animal: string;
  animalName: string;
  role: string;
  color: string;
  gradient: string;
  description: string;
  tagline: string;
  icon: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  districtSlug: string;
  location: string;
  country?: string;
  summary: string;
  description: string;
  tags: string[];
  startDate?: string;
  endDate?: string;
  year: number;
  coverImage?: string;
  assets: string[];
  xiaohongshu?: string;
  douyin?: string;
  fileCount?: number;
  docCount?: number;
  mediaCount?: number;
  sourceDir?: string;
}

export interface CityStats {
  totalProjects: number;
  totalCountries: number;
  totalFiles: number;
  yearSpan: string;
}
