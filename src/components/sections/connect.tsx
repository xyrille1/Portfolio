'use client';
import { useState } from 'react';
import { SOCIAL_LINKS, type SocialLink } from '@/lib/data';
import {
  Calendar,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { InquiryModal } from '@/components/inquiry-modal';

export function ConnectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Social
          </h3>
          <div className="border border-border p-3 rounded-xl h-full space-y-1 bg-background/50">
            {SOCIAL_LINKS.map((link: SocialLink) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-all group"
              >
                <link.icon
                  className="w-5 h-5 text-muted-foreground"
                />
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Let's Connect
          </h3>
          <div className="border border-border rounded-xl overflow-hidden bg-background/50 divide-y divide-border">
            <a
              href="mailto:xyrillenavora@email.com"
              className="w-full text-left flex items-center justify-between p-4 transition-colors hover:bg-muted/50 group"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Email
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    xyrillenavora@email.com
                  </p>
                </div>
              </div>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left flex items-center justify-between p-4 transition-colors hover:bg-muted/50 group"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Let's Talk
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule a Call
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <InquiryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
