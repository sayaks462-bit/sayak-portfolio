"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { getProjectsByCategory } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "interior", label: "Interior" },
  { id: "exhibition", label: "Exhibition" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <div className="pt-28 sm:pt-32">
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-16 sm:mb-20">
            <FadeIn>
              <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
                Portfolio
              </p>
            </FadeIn>
            <RevealTextWords
              text="Selected Projects"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            />
            <FadeIn delay={0.3}>
              <p className="text-white/30 mt-7 max-w-xl mx-auto text-[15px] leading-relaxed font-light">
                A curated collection of photorealistic visualizations,
                interior designs, and exhibition stall concepts crafted with
                precision and attention to detail.
              </p>
            </FadeIn>
          </div>

          {/* ── Filter Buttons ── */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-6 py-2.5 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-500 ${
                    activeCategory === cat.id
                      ? "bg-gold text-bg shadow-lg shadow-gold/20"
                      : "bg-white/[0.03] text-white/35 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60 hover:border-white/[0.1] active:bg-white/[0.08] active:text-white/70 active:scale-95"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* ── Project Grid ── */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Empty State ── */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-white/20 text-sm">
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
