import Image from 'next/image';
import { PROJECTS, type Project } from '@/lib/projects-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ProjectsSection() {
  const getProjectImage = (projectId: string) => {
    const image = PlaceHolderImages.find((p) => p.id === projectId);
    return (
      image || {
        imageUrl: `https://placehold.co/600x400/221c32/e0e0e0?text=Image+${projectId}`,
        imageHint: 'placeholder',
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-20">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold pt-1">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PROJECTS.map((project: Project) => {
          const { imageUrl, imageHint } = getProjectImage(project.imageId);
          return (
            <Card
              key={project.title}
              className="flex flex-col group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={imageHint}
                  />
                </div>
              </CardHeader>
              <div className="flex flex-col flex-grow p-6">
                <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground flex-grow mb-4">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <CardFooter className="mt-auto p-6 pt-0">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
