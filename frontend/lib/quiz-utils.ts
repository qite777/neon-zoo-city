import { ArchetypeSlug } from "@/types/quiz";

export const ARCHETYPE_ORDER: ArchetypeSlug[] = [
  "builder",
  "scout",
  "curator",
  "keeper",
];

export function calculateResult(
  answers: Record<string, Partial<Record<ArchetypeSlug, number>>>
): ArchetypeSlug {
  const scores: Record<ArchetypeSlug, number> = {
    builder: 0,
    scout: 0,
    curator: 0,
    keeper: 0,
  };

  Object.values(answers).forEach((optionScore) => {
    (Object.entries(optionScore) as [ArchetypeSlug, number][]).forEach(
      ([slug, value]) => {
        if (slug in scores) {
          scores[slug] += value;
        }
      }
    );
  });

  const maxScore = Math.max(...Object.values(scores));
  const winners = (Object.entries(scores) as [ArchetypeSlug, number][])
    .filter(([, score]) => score === maxScore)
    .map(([slug]) => slug);

  const orderedWinner = ARCHETYPE_ORDER.find((slug) => winners.includes(slug));
  return orderedWinner ?? winners[0];
}

export function getProgress(
  currentIndex: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round(((currentIndex + 1) / total) * 100);
}
