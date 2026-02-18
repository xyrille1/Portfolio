// src/lib/projects-data.ts

export type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS to showcase my projects and skills.",
    link: "https://your-portfolio-link.com",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Portfolio"],
  },
  {
    title: "Chatbot AI Assistant",
    description: "An AI-powered chatbot using OpenAI's GPT-4 API, integrated into a web app for real-time conversations.",
    link: "https://github.com/xyrille1/ai-chatbot",
    tags: ["AI", "OpenAI", "Chatbot", "React"],
  },
  // Add more projects as needed
];
