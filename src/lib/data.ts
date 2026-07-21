import { Project, GalleryItem, Skill, TimelineItem, CounterItem } from "@/types";

// Projects and gallery are auto-generated from public/images/projects/* at build time.
// Run: npm run generate  (also runs automatically via prebuild)
// To add a new project: drop images into public/images/projects/<category>/ and re-run.
import manifest from "./manifest.json";

const softwareMap: Record<string, string[]> = {
  "spa-bathroom": ["3ds Max", "V-Ray", "Photoshop"],
  "master-bedroom-suite": ["3ds Max", "V-Ray", "Photoshop"],
  "luxury-modern-kitchen": ["3ds Max", "V-Ray", "AutoCAD"],
  "elegant-living-room": ["3ds Max", "V-Ray", "Photoshop"],
  "calvin-klein-exhibition": ["3ds Max", "V-Ray", "AutoCAD", "Photoshop"],
  "elan-exhibition": ["3ds Max", "V-Ray", "AutoCAD"],
  "rare-beauty-exhibition": ["3ds Max", "V-Ray", "Photoshop"],
  "titan-exhibition": ["3ds Max", "V-Ray", "AutoCAD", "CorelDRAW"],
};

export const projects: Project[] = (manifest.projects as Array<
  Omit<Project, "category" | "software"> & { category: string }
>).map((p) => ({
  ...p,
  category: p.category as Project["category"],
  software: softwareMap[p.slug] ?? ["3ds Max", "V-Ray"],
}));

export const galleryItems: GalleryItem[] = manifest.gallery;

export const skills: Skill[] = [
  { name: "3ds Max", percentage: 95, icon: "box" },
  { name: "V-Ray", percentage: 92, icon: "sparkles" },
  { name: "AutoCAD", percentage: 85, icon: "ruler" },
  { name: "Photoshop", percentage: 88, icon: "image" },
  { name: "CorelDRAW", percentage: 80, icon: "pen-tool" },
];

export const timeline: TimelineItem[] = [
  {
    year: "2020",
    title: "Started Freelancing",
    description: "Began independent 3D visualization projects for residential and commercial clients.",
  },
  {
    year: "2021",
    title: "Exhibition Design",
    description: "Expanded into exhibition stall design, creating immersive brand experiences.",
  },
  {
    year: "2023",
    title: "Studio Founded",
    description: "Established a professional 3D visualization studio serving premium clients.",
  },
  {
    year: "2025",
    title: "Industry Recognition",
    description: "Recognized for excellence in photorealistic rendering and luxury interior visualization.",
  },
];

export const counters: CounterItem[] = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 80, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Awards Won", value: 12, suffix: "" },
];

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
