import { AboutSection } from '@/components/sections/about';
import { ConnectSection } from '@/components/sections/connect';
import { EducationSection } from '@/components/sections/education';
import { HeroSection } from '@/components/sections/hero';
import { SkillsSection } from '@/components/sections/skills';
import { FadeInSection } from '@/components/fade-in-section';
import { Footer } from '@/components/footer';
import { ProjectsSection } from '@/components/sections/projects';

export default function Home() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-8 pt-32 pb-16 md:pb-32">
        <FadeInSection className="mb-16">
          <HeroSection />
        </FadeInSection>

        <FadeInSection className="mb-16 md:mb-40">
          <AboutSection />
        </FadeInSection>

        <FadeInSection className="mb-16 md:mb-40">
          <EducationSection />
        </FadeInSection>

        <FadeInSection className="mb-16 md:mb-40">
          <SkillsSection />
        </FadeInSection>

        <FadeInSection className="mb-16 md:mb-40">
          <ProjectsSection />
        </FadeInSection>

        <FadeInSection className="pt-24 border-t border-border">
          <ConnectSection />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
}
