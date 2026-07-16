import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDistrictBySlug, getProjectBySlug, projects } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimalAvatar } from "@/components/AnimalAvatar";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const district = getDistrictBySlug(project.districtSlug);

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Neon Zoo City`,
      description: project.summary,
      images: district?.image ? [district.image] : [],
    },
    twitter: {
      title: `${project.title} | Neon Zoo City`,
      description: project.summary,
      images: district?.image ? [district.image] : [],
    },
    alternates: {
      canonical: `/project/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const district = getDistrictBySlug(project.districtSlug);

  if (!district) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Project Hero */}
        <section className="relative overflow-hidden py-20">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${district.color}, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 city-grid opacity-20" />

          <div className="relative mx-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/district/${district.slug}/`}
                className="text-sm text-[#8b8d9a] transition-colors hover:text-white"
              >
                {district.name}
              </Link>
              <span className="text-[#8b8d9a]">/</span>
              <span className="text-sm" style={{ color: district.color }}>
                {project.location}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-[#8b8d9a]">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-medium text-black"
                style={{ background: district.color }}
              >
                {project.year}
              </span>
              {project.startDate && (
                <span className="text-sm text-[#8b8d9a]">
                  {project.startDate} — {project.endDate || "至今"}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-sm text-[#8b8d9a]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-3xl border border-white/10 bg-[#0d0e15] p-8 md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <AnimalAvatar district={district} size="md" animate={false} />
                <div>
                  <p className="text-sm text-[#8b8d9a]">街区馆长</p>
                  <p className="font-bold" style={{ color: district.color }}>
                    {district.animalName} · {district.role}
                  </p>
                </div>
              </div>

              <div className="max-w-none">
                <p className="text-lg leading-relaxed text-[#b0b2bf]">
                  {project.description}
                </p>

                {(project.xiaohongshu || project.douyin) && (
                  <div className="mt-10">
                    <h3 className="mb-4 text-lg font-bold text-white">相关作品</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.xiaohongshu && (
                        <a
                          href={project.xiaohongshu}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[#FF2442]/30 bg-[#FF2442]/10 px-5 py-2.5 text-sm text-[#FF2442] transition-colors hover:bg-[#FF2442]/20"
                        >
                          <span>📕</span>
                          <span>小红书</span>
                        </a>
                      )}
                      {project.douyin && (
                        <a
                          href={project.douyin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[#00F2EA]/30 bg-[#00F2EA]/10 px-5 py-2.5 text-sm text-[#00F2EA] transition-colors hover:bg-[#00F2EA]/20"
                        >
                          <span>🎵</span>
                          <span>抖音</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Link
                href={`/district/${district.slug}/`}
                className="rounded-full border border-white/10 px-5 py-2 text-sm transition-colors hover:bg-white/5"
              >
                ← 返回 {district.name}
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/10 px-5 py-2 text-sm transition-colors hover:bg-white/5"
              >
                返回城市
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
