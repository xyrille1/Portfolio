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

export const XYRILLE_PROFILE = `
Name: Xyrille Navora
Location: Manaoag, Philippines
Role: Full-Stack Software Engineer, Web3 Specialist

About:
As a Full-Stack Software Engineer, I specialize in architecting sophisticated web solutions with a primary focus on Front-End excellence and Web3 integration. My expertise lies in building dynamic, data-driven platforms designed for high performance and maximum security.
I distinguish my work by integrating comprehensive SEO strategies directly into the development lifecycle. From optimizing core performance metrics to implementing advanced rendering patterns, I ensure that decentralized platforms are technically robust and discoverable.

Education:
BS Information Technology (2022 — Present)
Colegio de San Juan de Letran - Manaoag
Focused on Software Development, Web Development and Data Structures. Engaged in building practical solutions and exploring emerging technologies.

Technical Skills (Stack):
Web & Frontend: Next.js, TypeScript, React, Tailwind CSS, Bootstrap
Backend & Core: Python, Flask, Node.js, PHP, MySQL, PostgreSQL, Firebase, MongoDB, Sui, Move, RESTful APIs, IPFS (Decentralized Storage), OAuth/Auth0, JWT, Vercel

Speaking:
Available for speaking at events about software development and emerging technologies.

Contact Email: xyrillenavora@email.com
`;
