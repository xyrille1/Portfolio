import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0 border border-border shadow-lg">
        <Image
          src="/profile.jpg"
          alt="Xyrille Navora"
          width={100}
          height={100}
          className="w-full h-full object-cover filter grayscale-[0.2]"
          priority
          data-ai-hint="profile picture"
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-4xl font-bold tracking-tight">
                Xyrille Navora
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Manaoag, Philippines</span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground/70">
            Full-Stack Software Engineer
          </span>
          <span className="opacity-20">—</span>
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground/70">
            Web3 Specialist
          </span>
        </div>
      </div>
    </div>
  );
}
