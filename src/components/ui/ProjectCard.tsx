"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Project } from "@/types";
import { ArrowUpRight, Eye } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard = React.memo(function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 900 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] transition-all duration-700 hover:border-gold/[0.15]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* ── Image Container ── */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Blur placeholder */}
            <div
              className={`absolute inset-0 bg-white/[0.03] transition-opacity duration-700 ${
                imageLoaded ? "opacity-0" : "opacity-100"
              }`}
            />

            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Gold top-edge line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-700" />

            {/* Category pill — top left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase bg-black/40 backdrop-blur-xl text-white/60 border border-white/[0.08] group-hover:bg-gold/15 group-hover:text-gold group-hover:border-gold/25 transition-all duration-500">
                {project.category}
              </span>
            </div>

            {/* Arrow icon — top right */}
            <div className="absolute top-4 right-4 z-10">
              <div className="w-9 h-9 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 group-hover:delay-75">
                <ArrowUpRight size={14} className="text-gold" />
              </div>
            </div>

            {/* Center "View Project" button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold/90 backdrop-blur-sm text-bg text-[11px] font-bold tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-600 group-hover:delay-100 shadow-lg shadow-gold/20">
                <Eye size={13} />
                View Project
              </div>
            </div>

            {/* Bottom content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              {/* Year */}
              <span className="inline-block text-[10px] font-medium text-white/25 tracking-[0.15em] uppercase mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {project.year}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-white/90 group-hover:text-white transition-colors duration-500 mb-2">
                {project.title}
              </h3>

              {/* Description — fades in */}
              <p className="text-[13px] leading-relaxed text-white/0 group-hover:text-white/45 max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-600 delay-75 font-light">
                {project.description}
              </p>

              {/* Software — slides up */}
              <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-150">
                {project.software.map((sw) => (
                  <span
                    key={sw}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/[0.06] text-[10px] text-gold/70 font-medium tracking-wide"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Info Bar ── */}
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="font-display text-[15px] font-bold text-white/70 group-hover:text-white truncate transition-colors duration-500">
                {project.title}
              </h3>
              <p className="text-[11px] text-white/25 tracking-wide mt-0.5 capitalize">
                {project.category}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.software.slice(0, 2).map((sw) => (
                <span
                  key={sw}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[9px] text-white/30 font-medium tracking-wide"
                >
                  {sw}
                </span>
              ))}
              {project.software.length > 2 && (
                <span className="text-[9px] text-white/20">
                  +{project.software.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* ── Glass glow on hover ── */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              boxShadow:
                "0 0 0 1px rgba(199,161,74,0.08), 0 8px 40px -12px rgba(199,161,74,0.15), 0 0 80px -20px rgba(199,161,74,0.08)",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
});
