"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { FadeIn } from "../animations/FadeIn";
import { RevealTextWords } from "../animations/RevealText";
import { ProjectCard } from "../ui/ProjectCard";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.slice(0, 4);

  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div>
            <FadeIn>
              <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                Selected Work
              </p>
            </FadeIn>
            <RevealTextWords
              text="Featured Projects"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            />
          </div>
          <FadeIn delay={0.3}>
            <Link
              href="/projects"
              className="text-white/40 hover:text-gold active:text-gold transition-colors text-sm flex items-center gap-2 group shrink-0"
            >
              View All Projects
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
