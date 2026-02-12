import { Github, Instagram, Linkedin, type LucideIcon } from "lucide-react";

export const SKILLS = {
  "Web & Frontend": ["Next.js", "TypeScript", "React", "Tailwind CSS", "Bootstrap"],
  "Backend & Core": ["Python", "Flask", "Node.js", "PHP", "MySQL", "PostgreSQL", "Firebase", "MongoDB", "Sui", "Move"],
};

export type SocialLink = {
  name: string;
  icon: LucideIcon;
  url: string;
  hoverColor: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#",
    hoverColor: "group-hover:text-primary",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "#",
    hoverColor: "group-hover:text-primary",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "#",
    hoverColor: "group-hover:text-primary",
  },
];
