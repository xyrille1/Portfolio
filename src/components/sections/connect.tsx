'use client';
import { useState } from 'react';
import { SOCIAL_LINKS, type SocialLink } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BookOpen, Calendar, ChevronRight, Mail } from 'lucide-react';
import { InquiryModal } from '@/components/inquiry-modal';

export function ConnectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Social Links
          </h3>
          <div className="border border-border p-3 rounded-xl h-full space-y-1 bg-background/50 transition-colors hover:border-border/30">
            {SOCIAL_LINKS.map((link: SocialLink) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-all group"
              >
                <link.icon
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-colors',
                    link.hoverColor
                  )}
                />
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Speaking
          </h3>
          <div className="border border-border p-5 rounded-xl h-full flex flex-col justify-between bg-background/50 transition-colors hover:border-border/30">
            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              Available for speaking at events about software development and
              emerging technologies.
            </p>
            <a
              href="mailto:xyrillenavora@email.com"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group text-primary"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Inquiries
          </h3>
          <div className="border border-border rounded-xl overflow-hidden bg-background/50">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Email
                  </span>
                </div>
                <a
                  href="mailto:xyrillenavora@email.com"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  xyrillenavora@email.com
                </a>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left flex items-center justify-between p-4 border-b border-border transition-colors hover:bg-muted/30 group"
            >
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Let's Talk
                  </span>
                </div>
                <span className="text-sm font-medium">Schedule a Call</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#"
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30 group"
            >
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Blog
                  </span>
                </div>
                <span className="text-sm font-medium">Read my blog</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      <InquiryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
