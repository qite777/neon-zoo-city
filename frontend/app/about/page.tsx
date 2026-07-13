import type { Metadata } from "next";
import { districts } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/Timeline";
import { CharacterIntro } from "@/components/CharacterIntro";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AboutAvatarVideo } from "@/components/AboutAvatarVideo";

export const metadata: Metadata = {
  title: "关于",
  description:
    "Lilia — 研学×AI数字产品创作者，在国际教育、AIGC 与城市探索之间记录成长轨迹。",
  openGraph: {
    title: "关于 | Neon Zoo City",
    description:
      "了解 Neon Zoo City 的建造者：一位研学×AI数字产品创作者的城市档案。",
  },
  twitter: {
    title: "关于 | Neon Zoo City",
    description:
      "了解 Neon Zoo City 的建造者：一位研学×AI数字产品创作者的城市档案。",
  },
  alternates: {
    canonical: "/about",
  },
};

const timelineEvents = [
  {
    year: 2024,
    title: "开始国际教育探索",
    description:
      "进入研学与国际教育领域，开始带队参与新加坡、英国等海外项目，积累项目设计与执行经验。",
    highlight: "起点",
  },
  {
    year: 2025,
    title: "AIGC 与乡村科创融合",
    description:
      "在云南惠通村落地 AIGC 三生融合科创营，尝试把 AI 工具与乡村教育、生态设计结合。",
    highlight: "突破",
  },
  {
    year: 2025,
    title: "多国家项目并行",
    description:
      "同时推进英国夏校、新加坡未来城市研学、芬兰极光营、港深项目，建立系统的项目管理框架。",
    highlight: "扩展",
  },
  {
    year: 2026,
    title: "构建 Neon Zoo City",
    description:
      "把过往研学、创作、考察项目整理成一座未来数字动物城，用五只动物居民代表不同维度的成长。",
    highlight: "归档",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 city-grid opacity-20" />
          <div
            className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-10 blur-[120px]"
            style={{
              background: "radial-gradient(circle, #D946EF, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-10 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #00F0FF, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-10 text-center md:flex-row md:text-left">
              {/* Avatar / Video */}
              <AnimatedSection className="shrink-0">
                <div
                  className="relative h-64 w-48 overflow-hidden rounded-3xl border-2 md:h-80 md:w-60"
                  style={{
                    borderColor: "#D946EF60",
                    boxShadow: "0 0 50px #D946EF30",
                  }}
                >
                  <AboutAvatarVideo />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-[#8b8d9a]">Digital Creator</p>
                    <p className="text-lg font-bold">Xiao Mei</p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="flex-1">
                <AnimatedSection delay={100}>
                  <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                    About the Creator
                  </p>
                  <h1 className="mt-3 text-4xl font-bold md:text-6xl">
                    城市探索者 ·{" "}
                    <span className="text-gradient bg-gradient-to-r from-[#D946EF] to-[#00F0FF]">
                      Lilia
                    </span>
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-[#8b8d9a]">
                    一名在国际教育、AIGC 创作与城市探索之间游走的记录者。
                    我相信每个项目都是一座待挖掘的城市，每个经历都是值得归档的街区。
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-[#8b8d9a]">
                    Neon Zoo City 是我为自己建造的数字档案馆——五只动物，五座街区，
                    记录着我的研学足迹、创作实验、商业观察与成长轨迹。
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                    {["研学设计", "AIGC 创作", "项目管理", "国际交流", "乡村公益"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#8b8d9a]"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection className="mb-16 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                Timeline
              </p>
              <h2 className="mt-3 text-4xl font-bold">成长时间轴</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8b8d9a]">
                从第一次带队到建造这座城市，每一步都是一块拼图。
              </p>
            </AnimatedSection>

            <Timeline events={timelineEvents} />
          </div>
        </section>

        {/* Characters Section */}
        <section className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection className="mb-16 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                Residents
              </p>
              <h2 className="mt-3 text-4xl font-bold">五位城市居民</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8b8d9a]">
                他们不只是头像，而是这座城市不同面向的化身。
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {districts.map((district, index) => (
                <CharacterIntro
                  key={district.slug}
                  district={district}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-4xl px-6">
            <AnimatedSection className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#D946EF]/10 via-transparent to-[#00F0FF]/10 p-10 text-center md:p-16"
            >
              <h2 className="text-3xl font-bold md:text-4xl">
                想要一起探索这座城市？
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[#8b8d9a]">
                如果你有研学合作、AIGC 项目或创意想法，欢迎来找我聊聊。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hello@example.com"
                  className="flex h-14 items-center gap-2 rounded-full bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-105"
                >
                  发送邮件
                </a>
                <a
                  href="/"
                  className="flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  返回城市
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
