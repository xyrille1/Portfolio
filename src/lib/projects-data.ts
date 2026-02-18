export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageId: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Decentralized Finance Dashboard',
    description:
      'A comprehensive dashboard for tracking and managing assets across various DeFi protocols, providing real-time data and analytics.',
    tags: ['Next.js', 'Web3', 'Tailwind CSS', 'Firebase'],
    link: 'https://github.com/xyrille1',
    imageId: 'project-1',
  },
  {
    title: 'NFT Marketplace Platform',
    description:
      'A full-featured marketplace for creating, buying, and selling Non-Fungible Tokens with a focus on user experience and security.',
    tags: ['React', 'Solidity', 'IPFS', 'Node.js'],
    link: 'https://github.com/xyrille1',
    imageId: 'project-2',
  },
  {
    title: 'Portfolio Website V2',
    description:
      'A personal portfolio website built with modern web technologies to showcase skills, projects, and professional experience.',
    tags: ['Next.js', 'TypeScript', 'Genkit', 'ShadCN UI'],
    link: 'https://github.com/xyrille1',
    imageId: 'project-3',
  },
  {
    title: 'AI-Powered Content Generator',
    description:
      'A tool that leverages generative AI to create high-quality written content for blogs, articles, and social media posts.',
    tags: ['Python', 'Flask', 'Google AI', 'React'],
    link: 'https://github.com/xyrille1',
    imageId: 'project-4',
  },
];
