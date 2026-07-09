"use client";

import { AnimatedSection } from "./AnimatedSection";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  highlight?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Central line */}
      <div className="absolute left-4 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
        style={{
          background: "linear-gradient(180deg, #FF3CAC, #D946EF, #00F0FF, #39FF14)",
        }}
      />

      {events.map((event, index) => {
        const isLeft = index % 2 === 0;

        return (
          <AnimatedSection
            key={`${event.year}-${index}`}
            delay={index * 150}
            direction={isLeft ? "left" : "right"}
            className="relative mb-12 md:mb-16"
          >
            {/* Dot on line */}
            <div
              className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#0a0b12] md:left-1/2"
              style={{
                background: "#fff",
                boxShadow: "0 0 20px rgba(255,255,255,0.5)",
                top: "1.5rem",
              }}
            />

            {/* Content card */}
            <div
              className={`pl-12 md:pl-0 ${
                isLeft ? "md:pr-[55%] md:text-right" : "md:pl-[55%] md:text-left"
              }`}
            >
              <div
                className="rounded-2xl glass-card p-6 transition-all duration-300 hover:border-white/20"
                style={{
                  boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className={`mb-2 flex items-center gap-3 ${
                    isLeft ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <span className="text-2xl font-bold text-[#D946EF]">
                    {event.year}
                  </span>
                  {event.highlight && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[#8b8d9a]">
                      {event.highlight}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8b8d9a]">
                  {event.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
