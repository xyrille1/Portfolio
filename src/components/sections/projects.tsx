import { PROJECTS, type Project } from '@/lib/projects-data';
import { ArrowUpRight } from 'lucide-react';

export function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-20">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold pt-1">
        Projects
      </h2>
      <div className="flex flex-col gap-10">
        {PROJECTS.map((project: Project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group transition-all"
          >
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
