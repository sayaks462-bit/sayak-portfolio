import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Sayak Sarkar — 3D Designer",
  description:
    "Visual showcase of Sayak Sarkar's finest 3D renders — photorealistic interior visualizations, exhibition stall concepts, and architectural walkthroughs.",
  openGraph: {
    title: "Gallery | Sayak Sarkar",
    description:
      "A curated visual showcase of photorealistic 3D renders and design projects.",
    url: "https://sayaksarkar.com/gallery",
  },
  alternates: {
    canonical: "https://sayaksarkar.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
