"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { Archetype, QuizCTA } from "@/types/quiz";

interface QuizPosterProps {
  archetype: Archetype;
  cta: QuizCTA;
}

export const QuizPoster = forwardRef<HTMLDivElement, QuizPosterProps>(
  function QuizPoster({ archetype, cta }, ref) {
    return (
      <div className="mx-auto w-fit overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b12] p-2"
      >
        <div
          ref={ref}
          className="relative flex h-[667px] w-[375px] flex-col overflow-hidden bg-[#0a0b12] p-8 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        >
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
            style={{ background: archetype.color, opacity: 0.15 }}
          />

          <div className="relative z-10 flex flex-1 flex-col"
          >
            <div className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b8d9a]">
                Neon Zoo City
              </p>
              <h2 className="mt-2 text-3xl font-bold"
                style={{ color: archetype.color }}
              >
                {archetype.name}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#8b8d9a]">
                {archetype.nameEn}
              </p>
            </div>

            <div className="mt-6 flex justify-center"
            >
              <div
                className="relative h-40 w-40 overflow-hidden rounded-2xl border-2"
                style={{ borderColor: archetype.color }}
              >
                <Image
                  src={archetype.image}
                  alt={archetype.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-sm leading-relaxed text-white/90">
                {archetype.description}
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-xs uppercase tracking-wider text-[#8b8d9a]">
                组队建议
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/90">
                {archetype.teamFit}
              </p>
            </div>

            <div className="mt-auto pt-6"
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                {cta.qrImage ? (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white p-1.5"
                  >
                    <Image
                      src={cta.qrImage}
                      alt="二维码"
                      fill
                      className="rounded-lg object-contain"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-center text-xs text-[#8b8d9a]"
                  >
                    二维码
                    <br />占位
                  </div>
                )}
                <div className="min-w-0"
                >
                  <p className="text-sm font-bold text-white">{cta.label}</p>
                  <p className="mt-1 text-xs text-[#8b8d9a]">{cta.description}</p>
                  <p className="mt-1 text-xs text-[#8b8d9a]">
                    neon-zoo-city.vercel.app/opc-quiz/
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
