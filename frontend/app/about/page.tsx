import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "关于",
  description:
    "Lilia — 城市探索者，在国际教育、AIGC 与城市探索之间记录成长轨迹。",
  alternates: {
    canonical: "/about",
  },
};

// About 内容已融合到首页的「城市探索者」板块，这里直接跳转到首页对应锚点
export default function AboutPage() {
  redirect("/#about-explorer");
}
