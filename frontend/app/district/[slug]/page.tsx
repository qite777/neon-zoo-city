import { notFound } from "next/navigation";
import Link from "next/link";
import { districts, getDistrictBySlug, getProjectsByDistrict } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimalAvatar } from "@/components/AnimalAvatar";
import { CharacterGuide } from "@/components/CharacterGuide";
import { ExhibitionWall } from "@/components/ExhibitionWall";

export async function generateStaticParams() {
  return districts.map((district) => ({
    slug: district.slug,
  }));
}

interface DistrictPageProps {
  params: Promise<{ slug: string }>;
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
                {projects.length > 0 ? (
                  <ExhibitionWall projects={projects} />
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
      </main>

      <Footer />
    </div>
  );
}
