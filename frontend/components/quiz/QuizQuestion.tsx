"use client";

import { useEffect, useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { getProgress } from "@/lib/quiz-utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentIndex: number;
  total: number;
  onAnswer: (score: Record<string, number>) => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  total,
  onAnswer,
}: QuizQuestionProps) {
  const [show, setShow] = useState(false);
  const progress = getProgress(currentIndex, total);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, [question.id]);

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-[#8b8d9a]">
          <span>
            问题 {currentIndex + 1} / {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF3CAC] to-[#00F0FF] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2
        className={`mb-8 text-2xl font-bold leading-snug transition-all duration-500 md:text-3xl ${
          show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.score)}
            className={`group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] ${
              show
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: show ? `${index * 80}ms` : "0ms",
            }}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-medium text-[#8b8d9a] transition-colors group-hover:border-white/20 group-hover:text-white">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-base leading-relaxed text-white/90 md:text-lg">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
