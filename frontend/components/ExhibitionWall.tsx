import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { AnimatedCard } from "./AnimatedSection";

interface ExhibitionWallProps {
  projects: Project[];
}

export function ExhibitionWall({ projects }: ExhibitionWallProps) {
  return (
    <div className="relative">
      {/* Background frame lines */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] border border-white/5 bg-white/[0.02]" />
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-white/[0.03]" />

      <div className="p-6 md:p-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedCard key={project.id} delay={index * 120}>
              <ProjectCard project={project} />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
