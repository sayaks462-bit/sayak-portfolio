import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sayak Sarkar — 3D Designer",
  description:
    "Learn about Sayak Sarkar, a professional 3D Designer with 5+ years of experience in photorealistic interior visualizations, exhibition stall designs, and luxury residential projects.",
  openGraph: {
    title: "About Sayak Sarkar | 3D Designer",
    description:
      "Professional 3D Designer with 5+ years of experience specializing in photorealistic interior visualizations and exhibition stall designs.",
    url: "https://sayaksarkar.com/about",
  },
  alternates: {
    canonical: "https://sayaksarkar.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
