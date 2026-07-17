"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchetypeSlug, QuizPhase } from "@/types/quiz";
import { ARCHETYPES, GLOBAL_CTA, QUESTIONS } from "@/lib/quiz-data";
import { calculateResult } from "@/lib/quiz-utils";
import { QuizWelcome } from "./QuizWelcome";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";

export function QuizContainer() {
  const [phase, setPhase] = useState<QuizPhase>("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, Partial<Record<keyof typeof ARCHETYPES, number>>>
  >({});
  const [preloadedType, setPreloadedType] = useState<ArchetypeSlug | null>(null);

  // Handle direct result link: ?type=builder
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as ArchetypeSlug | null;
    if (type && type in ARCHETYPES) {
      setPreloadedType(type);
      setPhase("result");
    }
  }, []);

  const handleStart = () => {
    setPreloadedType(null);
    setAnswers({});
    setCurrentIndex(0);
    setPhase("question");
    window.history.replaceState(null, "", "/opc-quiz/");
  };

  const handleAnswer = (score: Record<string, number>) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentIndex].id]: score };
    setAnswers(nextAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const resultSlug = calculateResult(nextAnswers);
      window.history.replaceState(null, "", `/opc-quiz/?type=${resultSlug}`);
      setPhase("result");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    window.history.replaceState(null, "", "/opc-quiz/");
    setPhase("welcome");
  };

  const resultSlug = preloadedType ?? calculateResult(answers);
  const archetype = ARCHETYPES[resultSlug];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex flex-1 flex-col overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[#0a0b12]" />
        <div className="absolute inset-0 -z-10 city-grid opacity-20" />
        <div
          className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "#FF3CAC", opacity: 0.08 }}
        />
        <div
          className="absolute -right-40 bottom-20 -z-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "#00F0FF", opacity: 0.08 }}
        />

        {phase === "welcome" && <QuizWelcome onStart={handleStart} />}

        {phase === "question" && (
          <QuizQuestion
            question={QUESTIONS[currentIndex]}
            currentIndex={currentIndex}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}

        {phase === "result" && archetype && (
          <QuizResult
            archetype={archetype}
            cta={GLOBAL_CTA}
            onRestart={handleRestart}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
