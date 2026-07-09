import { districts, projects, cityStats } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DistrictCard } from "@/components/DistrictCard";
import { CityMap } from "@/components/CityMap";
import { ProjectCard } from "@/components/ProjectCard";
import { ExplorerAvatar } from "@/components/ExplorerAvatar";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { HeroVideo } from "@/components/HeroVideo";
import { CityLifeVideo } from "@/components/CityLifeVideo";

export default function Home() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-20">
          {/* Background video */}
          <HeroVideo src="/videos/hero-main.mp4" poster="/hero/team-banner.jpg" />

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b12]/85 via-[#0a0b12]/50 to-[#0a0b12]" />
          <div className="absolute inset-0 city-grid opacity-20" />

          {/* Top content */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 md:pt-24">
            <div className="max-w-2xl rounded-3xl glass-card p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#8b8d9a]">
                <span className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
                一座正在生长的数字动物城
              </div>

              <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                <span className="text-gradient bg-gradient-to-r from-[#FF3CAC] via-[#D946EF] to-[#00F0FF]">
                  Neon Zoo City
                </span>
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-[#8b8d9a]">
                五只动物，五座街区，一座记录创作、研学、考察与成长的未来城市。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#city-map"
                  className="group flex h-14 items-center gap-2 rounded-full bg-white px-8 text-lg font-bold text-black transition-transform hover:scale-105"
                >
                  进入城市
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/district/arena"
                  className="flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  查看研学日志
                </a>
              </div>
            </div>
          </div>

          {/* Explorer avatar */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 md:pb-32"
          >
            <div className="flex items-end justify-end"
            >
              <ExplorerAvatar
                src="/videos/explorer-lilia-idle-v2.mp4"
                alt="City Explorer"
                title="City Explorer"
                name="Lilia"
              />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="h-6 w-6 text-[#8b8d9a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-white/5 bg-[#0a0b12] py-12">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#FF9500]">{cityStats.totalProjects}</p>
                  <p className="mt-1 text-sm text-[#8b8d9a]">项目</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#00F0FF]">{cityStats.totalCountries}</p>
                  <p className="mt-1 text-sm text-[#8b8d9a]">国家/地区</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#D946EF]">5</p>
                  <p className="mt-1 text-sm text-[#8b8d9a]">街区</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#39FF14]">{cityStats.yearSpan}</p>
                  <p className="mt-1 text-sm text-[#8b8d9a]">时间跨度</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* City Life Video */}
        <CityLifeVideo
          src="/videos/team-interaction.mp4"
          title="城市脉动"
          subtitle="City Pulse"
          description="当五位居民聚在一起，这座城市便有了温度。"
        />

        {/* City Map */}
        <div id="city-map">
          <CityMap districts={districts} />
        </div>

        {/* District Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection className="mb-16 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                Districts
              </p>
              <h2 className="mt-3 text-4xl font-bold">五座街区，五位居民</h2>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {districts.map((district, index) => (
                <AnimatedCard key={district.slug} delay={index * 100}>
                  <DistrictCard district={district} index={index} />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection className="mb-12 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                  Featured
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Sprint 的精选足迹
                </h2>
              </div>
              <a
                href="/district/arena"
                className="hidden rounded-full border border-white/10 px-5 py-2 text-sm transition-colors hover:bg-white/5 md:block"
              >
                查看全部 →
              </a>
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProjects.map((project, index) => (
                <AnimatedCard key={project.id} delay={index * 100}>
                  <ProjectCard project={project} />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
