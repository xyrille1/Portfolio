export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageId: string;
};

export const PROJECTS: Project[] = [
  {
    title: "SuiCare",
    description:
      "SuiCare is a web application designed to facilitate transparent charitable campaigns and donations, leveraging smart contracts for secure transactions.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostCSS",
      "Shadcn UI",
      "Move",
      "Sui",
      "Firebase",
    ],
    link: "https://suicare-donation.vercel.app/",
    imageId: "project-1",
  },
  {
    title: "SuiProof",
    description:
      "SuiProof is a decentralized application built on the Sui blockchain, designed to provide institutional-grade asset anchoring, verification, and proof management.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostCSS",
      "Shadcn UI",
      "Move",
      "Sui",
      "Pinata IPFS",
      "YAML",
    ],
    link: "https://suiproof-immutable.vercel.app/",
    imageId: "project-2",
  },
];
