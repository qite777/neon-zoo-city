"use client";

import { useRef, useState } from "react";
import { Archetype, QuizCTA } from "@/types/quiz";

interface SharePosterButtonProps {
  archetype: Archetype;
  cta: QuizCTA;
}

export function SharePosterButton({ archetype, cta }: SharePosterButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);

    try {
      await document.fonts.ready;
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: "#0a0b12",
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File(
          [blob],
          `opc-type-${archetype.slug}.png`,
          { type: "image/png" }
        );

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `我的 OPC 人格是：${archetype.name}`,
              text: archetype.teamFit,
              files: [file],
            });
          } catch {
            downloadBlob(blob, archetype.slug);
          }
        } else {
          downloadBlob(blob, archetype.slug);
        }
      }, "image/png");
    } catch (error) {
      console.error("海报生成失败", error);
      alert("海报生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-black transition-transform hover:scale-105 disabled:opacity-70"
        style={{
          background: `linear-gradient(90deg, ${archetype.color}, ${archetype.color}DD)`,
        }}
      >
        {isGenerating ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            生成中…
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            保存结果海报
          </>
        )}
      </button>

      {/* Hidden poster source for html2canvas */}
      <div
        ref={posterRef}
        className="fixed left-[-9999px] top-0"
        aria-hidden="true"
      >
        <PosterSource archetype={archetype} cta={cta} />
      </div>
    </>
  );
}

function PosterSource({ archetype, cta }: { archetype: Archetype; cta: QuizCTA }) {
  return (
    <div
      className="flex h-[667px] w-[375px] flex-col overflow-hidden bg-[#0a0b12] p-8 text-white"
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

      <div className="relative z-10 flex flex-1 flex-col text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b8d9a]">
          Neon Zoo City
        </p>
        <h2 className="mt-2 text-4xl font-bold" style={{ color: archetype.color }}>
          {archetype.name}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-widest text-[#8b8d9a]">
          {archetype.nameEn}
        </p>

        <div className="mt-6 flex justify-center"
        >
          <img
            src={archetype.image}
            alt={archetype.name}
            className="h-40 w-40 rounded-2xl object-cover"
            style={{ border: `3px solid ${archetype.color}` }}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
        >
          <p className="text-sm leading-relaxed text-white/90">{archetype.description}</p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
        >
          <p className="text-xs uppercase tracking-wider text-[#8b8d9a]">组队建议</p>
          <p className="mt-1 text-sm leading-relaxed text-white/90">{archetype.teamFit}</p>
        </div>

        <div className="mt-auto pt-6"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left"
          >
            {cta.qrImage ? (
              <img
                src={cta.qrImage}
                alt="二维码"
                className="h-20 w-20 rounded-xl bg-white p-1.5 object-contain"
              />
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
  );
}

function downloadBlob(blob: Blob, slug: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `opc-type-${slug}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
