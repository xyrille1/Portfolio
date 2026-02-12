import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';

export function HeroSection() {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === 'profile-picture'
  );

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0 border border-border shadow-lg">
        {profileImage && (
          <Image
            src={profileImage.imageUrl}
            alt={profileImage.description}
            width={100}
            height={100}
            className="w-full h-full object-cover filter grayscale-[0.2]"
            data-ai-hint={profileImage.imageHint}
            priority
          />
        )}
      </div>

      <div className="flex-1 w-full">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-4xl font-bold tracking-tight">Xyrille Navora</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>Manaoag, Philippines</span>
          </div>
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
