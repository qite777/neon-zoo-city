"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView();

  const initialTransform = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0, 0)" : initialTransform[direction],
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <AnimatedSection className={className} delay={delay} direction="up">
      {children}
    </AnimatedSection>
  );
}
