import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const SITE_URL = "https://sayaksarkar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
