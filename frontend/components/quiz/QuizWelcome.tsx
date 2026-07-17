"use client";

import { useEffect, useState } from "react";
import { QUIZ_SUBTITLE, QUIZ_TITLE } from "@/lib/quiz-data";

interface QuizWelcomeProps {
  onStart: () => void;
}

export function QuizWelcome({ onStart }: QuizWelcomeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#8b8d9a]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF3CAC]" />
          8 道题 · 约 2 分钟
        </div>

        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          <span className="text-gradient bg-gradient-to-r from-[#FF3CAC] via-[#D946EF] to-[#00F0FF]">
            {QUIZ_TITLE}
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#8b8d9a]">
          {QUIZ_SUBTITLE}
        </p>

        <p className="mt-4 text-sm text-[#8b8d9a]/70">
          测完即可生成你的专属结果海报，还能找到适合组队的人。
        </p>

        <button
          onClick={onStart}
          className="mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-105 md:w-auto"
        >
          开始测试
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
