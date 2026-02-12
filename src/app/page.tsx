import { AboutSection } from '@/components/sections/about';
import { ConnectSection } from '@/components/sections/connect';
import { EducationSection } from '@/components/sections/education';
import { HeroSection } from '@/components/sections/hero';
import { SkillsSection } from '@/components/sections/skills';
import { FadeInSection } from '@/components/fade-in-section';
import { ThemeToggle } from '@/components/theme-toggle';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <ThemeToggle />
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

        <FadeInSection className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
          <ConnectSection />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
}
