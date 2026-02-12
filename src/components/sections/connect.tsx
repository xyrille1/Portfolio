'use client';
import { useState } from 'react';
import { SOCIAL_LINKS, type SocialLink } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BookOpen, Calendar, ChevronRight, MessageSquareHeart, Users } from 'lucide-react';
import { InquiryModal } from '@/components/inquiry-modal';

export function ConnectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Social & Speaking
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
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-colors',
                    link.hoverColor
                  )}
                />
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
             <a
              href="mailto:xyrillenavora@email.com"
              className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-all group"
            >
              <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Speaking Engagements</span>
            </a>
          </div>
        </div>


        <div className="flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Inquiries
          </h3>
          <div className="border border-border rounded-xl overflow-hidden bg-background/50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left flex items-center justify-between p-4 border-b border-border transition-colors hover:bg-muted/50 group"
            >
              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <MessageSquareHeart className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">
                    Draft a Message
                  </span>
                </div>
                <span className="text-sm font-medium">Let AI help you connect</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#"
              className="flex items-center justify-between p-4 border-b border-border transition-colors hover:bg-muted/50 group"
            >
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">
                    Collaboration
                  </span>
                </div>
                <span className="text-sm font-medium">Join forces on a project</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50 group"
            >
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">
                    Blog
                  </span>
                </div>
                <span className="text-sm font-medium">Read my latest articles</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      <InquiryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
