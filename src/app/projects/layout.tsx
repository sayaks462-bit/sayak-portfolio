import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Sayak Sarkar — 3D Designer",
  description:
    "Browse the portfolio of Sayak Sarkar — interior visualizations, exhibition stall designs, luxury residential renders, and commercial space concepts crafted with 3ds Max, V-Ray, and AutoCAD.",
  openGraph: {
    title: "Projects | Sayak Sarkar",
    description:
      "A curated collection of photorealistic 3D renders — interior designs, exhibition stalls, and commercial spaces.",
    url: "https://sayaksarkar.com/projects",
  },
  alternates: {
    canonical: "https://sayaksarkar.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
