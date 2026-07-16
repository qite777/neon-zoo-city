import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { districts, getDistrictBySlug, getProjectsByDistrict } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimalAvatar } from "@/components/AnimalAvatar";
import { CharacterGuide } from "@/components/CharacterGuide";
import { ExhibitionWall } from "@/components/ExhibitionWall";
import { Timeline } from "@/components/Timeline";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArchiveContent } from "@/components/ArchiveContent";
import { TravelMap } from "@/components/TravelMap";

export async function generateStaticParams() {
  return districts.map((district) => ({
    slug: district.slug,
  }));
}

interface DistrictPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DistrictPageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    return {};
  }

  return {
    title: district.name,
    description: `${district.description} ${district.tagline}`,
    openGraph: {
      title: `${district.name} | Neon Zoo City`,
      description: district.tagline,
      images: district.image ? [district.image] : [],
    },
    twitter: {
      title: `${district.name} | Neon Zoo City`,
      description: district.tagline,
      images: district.image ? [district.image] : [],
    },
    alternates: {
      canonical: `/district/${slug}`,
    },
  };
}

const districtVideos: Record<string, string> = {
  theater: "/videos/vex-idle.mp4",
  arena: "/videos/sprint-idle.mp4",
  gallery: "/videos/orchid-idle.mp4",
  tower: "/videos/noctis-idle.mp4",
  archive: "/videos/slate-idle.mp4",
};

const districtQuotes: Record<string, { title: string; quote: string }> = {
  theater: {
    title: "光影剧场",
    quote: "能进剧场的，没有废片。这些是我的光影精选。",
  },
  arena: {
    title: "远征展厅",
    quote: "我跑过的地方，比你想的多。这些是我精挑细选的远征记录。",
  },
  gallery: {
    title: "高级画廊",
    quote: "廉价的东西不会出现在我的墙上。这里只陈列值得停留的作品。",
  },
  tower: {
    title: "时间档案室",
    quote: "时间从不撒谎。每一层都记录着成长的刻度。",
  },
  archive: {
    title: "慢闪档案馆",
    quote: "资料很多，但核心只有几行。慢慢来，我不赶。",
  },
};

const towerTimelineEvents = [
  {
    year: 2014,
    title: "0-6 岁亲子家庭教育探索",
    description:
      "参与 0-6 岁亲子家庭教育课程设计与服务，积累早期教育场景下的课程研发与服务经验。",
    highlight: "起点",
  },
  {
    year: 2019,
    title: "从家庭教育到世界课堂",
    description:
      "将 3-8 岁家庭教育延伸至世界课堂，重点参与澳洲游学产品、云南西双版纳游学产品、大理生态营地课程等内容。",
    highlight: "延伸",
  },
  {
    year: 2023,
    title: "乡村少年社会实践公益项目",
    description:
      "操盘 8-15 岁乡村少年独立社会实践公益项目，覆盖云南、贵州、湖南等地，搭建乡村公益与社会实践框架。",
    highlight: "扎根",
  },
  {
    year: 2025,
    title: "海外研学拓展项目",
    description:
      "拓展海外研学项目版图，操盘英国夏校、新加坡未来城市研学、芬兰极光探索营等国际项目。",
    highlight: "出海",
  },
  {
    year: 2026,
    title: "开启个人 OPC 新纪元",
    description:
      "从服务型业务转向数字资产创作，用 AI 探索一切可能，把多年研学经验沉淀为可复制的数字产品。",
    highlight: "新纪元",
  },
];

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const projects = getProjectsByDistrict(slug);
  const videoSrc = districtVideos[district.slug];
  const exhibition = districtQuotes[district.slug] || {
    title: "街区展厅",
    quote: district.tagline,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* District Hero */}
        <section className="relative overflow-hidden py-20">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${district.color}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 city-grid opacity-30" />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:text-left">
            <AnimalAvatar district={district} size="xl" animate />

            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                {district.nameEn} · {district.role}
              </p>
              <h1 className="mt-2 text-5xl font-bold md:text-6xl">
                {district.name}
              </h1>
              <p className="mt-4 text-xl text-[#8b8d9a]">
                {district.description}
              </p>
              <blockquote
                className="mt-6 inline-block rounded-2xl border-l-4 px-6 py-4 text-lg font-medium italic"
                style={{
                  borderColor: district.color,
                  background: `${district.color}10`,
                }}
              >
                "{district.tagline}"
              </blockquote>
            </div>
          </div>
        </section>

        {/* Exhibition Hall Layout */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                  Exhibition Hall
                </p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl"
                >
                  {district.animalName} 的{exhibition.title}
                </h2>
              </div>
              <Link
                href="/"
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
              >
                ← 返回城市
              </Link>
            </div>

            {/* 动物旅行者世界地图 — 远行竞技场专属，占满整行 */}
            {district.slug === "arena" && (
              <div className="mb-12">
                <TravelMap />
              </div>
            )}

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
              {/* Character guide */}
              <div className="lg:sticky lg:top-28">
                <CharacterGuide
                  district={district}
                  subtitle="展厅馆长"
                  quote={exhibition.quote}
                  videoSrc={videoSrc}
                  posterSrc={district.image}
                  position="left"
                />
              </div>

              {/* Exhibition wall */}
              <div className="flex-1">
                {district.slug === "archive" ? (
                  <ArchiveContent />
                ) : projects.length > 0 ? (
                  <ExhibitionWall projects={projects} />
                ) : district.slug === "theater" ? (
                  /* Theater curtain empty state */
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e15] p-16 text-center">
                    {/* Curtain glow */}
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-full w-1/2 opacity-20 blur-2xl"
                      style={{
                        background:
                          "linear-gradient(90deg, #FF3CAC, transparent)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20 blur-2xl"
                      style={{
                        background:
                          "linear-gradient(270deg, #FF3CAC, transparent)",
                      }}
                    />
                    {/* Top stage light */}
                    <div className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-[#FF3CAC] to-transparent" />

                    <span className="text-5xl" aria-hidden="true">🎬</span>
                    <h3 className="mt-6 text-2xl font-bold text-white">
                      剧场布展中
                    </h3>
                    <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#8b8d9a]">
                      Vex 正在剪辑下一批 AIGC 短片与视觉实验。
                      幕布拉开之前，这里保持黑暗。
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FF3CAC]/30 bg-[#FF3CAC]/10 px-5 py-2 text-sm text-[#FF3CAC]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF3CAC]" />
                      即将上映
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
                    <p className="text-lg text-[#8b8d9a]">
                      {district.animalName} 还在整理这里的档案。
                    </p>
                    <p className="mt-2 text-sm text-[#8b8d9a]">
                      敬请期待。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tower Timeline */}
        {district.slug === "tower" && (
          <section className="border-t border-white/5 py-24">
            <div className="mx-auto max-w-7xl px-6">
              <AnimatedSection className="mb-16 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                  Timeline
                </p>
                <h2 className="mt-3 text-4xl font-bold">成长时间轴</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8b8d9a]">
                  从亲子家庭教育到海外研学，再到 AI 数字产品探索，每一层都是一座里程碑。
                </p>
              </AnimatedSection>

              <Timeline events={towerTimelineEvents} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
