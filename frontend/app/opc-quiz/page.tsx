import type { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "测测你的 OPC 人格",
  description:
    "8 道题测出你的一人公司人格类型，找到适合组队的互补搭子。",
  openGraph: {
    title: "测测你的 OPC 人格 | Neon Zoo City",
    description:
      "8 道题测出你的一人公司人格类型，找到适合组队的互补搭子。",
    images: ["/hero/team-banner.jpg"],
  },
};

export default function OPCQuizPage() {
  return <QuizContainer />;
}
