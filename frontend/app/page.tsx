import { districts, cityStats } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DistrictCard } from "@/components/DistrictCard";
import { CityMap } from "@/components/CityMap";
import { ExplorerAvatar } from "@/components/ExplorerAvatar";
import { AnimatedSection, AnimatedCard } from "@/components/AnimatedSection";
import { HeroVideo } from "@/components/HeroVideo";
import { CityLifeVideo } from "@/components/CityLifeVideo";
import { CharacterIntro } from "@/components/CharacterIntro";
import { AboutAvatarVideo } from "@/components/AboutAvatarVideo";

export default function Home() {
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
                  href="#about-explorer"
                  className="flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  认识建造者
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

        {/* About Explorer — moved from /about */}
        <section id="about-explorer" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-10 text-center md:flex-row md:text-left">
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
                    <p className="text-lg font-bold">Lilia</p>
                  </div>
                </div>
              </AnimatedSection>

              <div className="flex-1">
                <AnimatedSection delay={100}>
                  <p className="text-sm font-medium uppercase tracking-widest text-[#8b8d9a]">
                    About the Explorer
                  </p>
                  <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                    城市探索者 ·{" "}
                    <span className="text-gradient bg-gradient-to-r from-[#D946EF] to-[#00F0FF]">
                      Lilia
                    </span>
                  </h2>
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

        {/* Characters Section — moved from /about */}
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

        {/* Contact CTA — moved from /about */}
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
                  href="#city-map"
                  className="flex h-14 items-center gap-2 rounded-full border border-white/20 px-8 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  进入城市
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
