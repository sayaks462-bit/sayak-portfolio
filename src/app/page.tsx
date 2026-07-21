"use client";

import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <StatsSection />
      <CTASection />
    </>
  );
}
