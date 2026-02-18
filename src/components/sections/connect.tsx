"use client";
import { useState } from "react";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/data";
import { Calendar, ChevronRight, Mail } from "lucide-react";
import { InquiryModal } from "@/components/inquiry-modal";

export function ConnectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Social
          </h3>
          <div className="border border-border rounded-xl h-full divide-y divide-border bg-background/50 overflow-hidden">
            {SOCIAL_LINKS.map((link: SocialLink) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted"
              >
                <link.icon className="w-5 h-5 text-muted-foreground/50" />
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
            Let's Connect
          </h3>
          <div className="border border-border rounded-xl overflow-hidden bg-background/50 divide-y divide-border">
            <a
              href="mailto:xyrillenavora@email.com"
              className="w-full text-left flex items-center justify-between p-4 transition-colors hover:bg-muted group"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-muted-foreground/50" />
                <div>
                  <h4 className="font-semibold text-foreground text-[14px]">
                    Email
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    xyrillenavora02@email.com
                  </p>
                </div>
              </div>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left flex items-center justify-between p-4 transition-colors hover:bg-muted group"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-muted-foreground/50" />
                <div>
                  <h4 className="font-semibold text-foreground text-[14px]">
                    Let's Talk
                  </h4>
                  <p className="text-xs text-muted-foreground">
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
