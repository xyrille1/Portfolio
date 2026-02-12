import { Github, Instagram, Linkedin, type LucideIcon } from "lucide-react";

export const SKILLS = {
  "Web & Frontend": ["Next.js", "TypeScript", "React", "Tailwind CSS", "Bootstrap"],
  "Backend & Core": ["Python", "Flask", "Node.js", "PHP", "MySQL", "PostgreSQL", "Firebase", "MongoDB", "Sui", "Move", "RESTful APIs", "IPFS (Decentralized Storage)", "OAuth/Auth0", "JWT", "Vercel"],
};

export type SocialLink = {
  name: string;
  icon: LucideIcon;
  url: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/edgar-xyrille-jr-navora-5733492b5/",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/xyrille1",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/xrllefleur/?hl=en",
  },
];
