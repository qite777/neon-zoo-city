import { District } from "@/types";
import { AnimatedCard } from "./AnimatedSection";

interface CharacterIntroProps {
  district: District;
  index: number;
}

export function CharacterIntro({ district, index }: CharacterIntroProps) {
  return (
    <AnimatedCard delay={index * 100}>
      <div
        className="group relative overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          boxShadow: `0 0 0 1px ${district.color}20`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${district.color}, transparent)`,
            opacity: 0.6,
          }}
        />

        <div className="flex items-center gap-4">
          <div
            className="relative h-16 w-16 overflow-hidden rounded-xl"
            style={{
              boxShadow: `0 0 20px ${district.color}40`,
            }}
          >
            {district.image ? (
              <img
                src={district.image}
                alt={district.animalName}
                loading="lazy"
                decoding="async"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-3xl"
                aria-hidden="true"
              >
                {district.animal}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold">{district.animalName}</h3>
            <p className="text-sm" style={{ color: district.color }}>
              {district.role}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#8b8d9a]">{district.description}</p>
        <p
          className="mt-3 text-sm font-medium italic"
          style={{ color: `${district.color}cc` }}
        >
          "{district.tagline}"
        </p>
      </div>
    </AnimatedCard>
  );
}
