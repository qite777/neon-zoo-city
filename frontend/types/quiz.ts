export type ArchetypeSlug = "builder" | "scout" | "curator" | "keeper";

export interface Archetype {
  slug: ArchetypeSlug;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  image: string;
  description: string;
  superpower: string;
  teamFit: string;
  watchOut: string;
}

export interface QuizOption {
  label: string;
  score: Partial<Record<ArchetypeSlug, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizCTA {
  label: string;
  description: string;
  qrImage?: string;
  wechatId?: string;
  link?: string;
}

export type QuizPhase = "welcome" | "question" | "result";
