"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Archetype, QuizCTA } from "@/types/quiz";
import { QuizPoster } from "./QuizPoster";
import { SharePosterButton } from "./SharePosterButton";

interface QuizResultProps {
  archetype: Archetype;
  cta: QuizCTA;
  onRestart: () => void;
}

export function QuizResult({ archetype, cta, onRestart }: QuizResultProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-10"
          style={{ boxShadow: `0 0 60px ${archetype.color}10` }}
        >
          <div
            className="absolute left-0 right-0 top-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${archetype.color}, transparent)`,
              boxShadow: `0 0 20px ${archetype.color}`,
            }}
          />

          <div className="flex flex-col items-center text-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 md:h-40 md:w-40"
              style={{ borderColor: archetype.color }}
            >
              <Image
                src={archetype.image}
                alt={archetype.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>

            <div className="mt-6 text-5xl">{archetype.icon}</div>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl"
              style={{ color: archetype.color }}
            >
              {archetype.name}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-widest text-[#8b8d9a]">
              {archetype.nameEn}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b8d9a]">
                你的核心优势
              </h3>
              <p className="mt-2 text-lg font-medium"
                style={{ color: archetype.color }}
              >
                {archetype.superpower}
              </p>
              <p className="mt-2 leading-relaxed text-[#8b8d9a]">
                {archetype.description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b8d9a]">
                组队建议
              </h3>
              <p className="mt-2 leading-relaxed text-white/90">
                {archetype.teamFit}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8b8d9a]">
                给你的提醒
              </h3>
              <p className="mt-2 leading-relaxed text-white/90">
                {archetype.watchOut}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF3CAC]/10 via-transparent to-[#00F0FF]/10 p-6 md:p-8"
        >
          <h3 className="text-center text-xl font-bold">{cta.label}</h3>
          <p className="mt-2 text-center text-sm text-[#8b8d9a]">{cta.description}</p>

          {cta.qrImage && (
            <div className="mt-6 flex flex-col items-center"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-white/10 bg-white p-2"
              >
                <Image
                  src={cta.qrImage}
                  alt="微信二维码"
                  fill
                  className="rounded-xl object-contain"
                  sizes="160px"
                />
              </div>
              {cta.wechatId && (
                <p className="mt-3 text-sm text-[#8b8d9a]">
                  微信号：
                  <span className="font-mono text-white">{cta.wechatId}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <SharePosterButton archetype={archetype} cta={cta} />
            <button
              onClick={onRestart}
              className="flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium transition-colors hover:bg-white/5"
            >
              重新测试
            </button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <div className="mt-8"
        >
          <p className="mb-4 text-center text-sm text-[#8b8d9a]">结果海报预览</p>
          <QuizPoster archetype={archetype} cta={cta} />
        </div>
      </AnimatedSection>
    </div>
  );
}
