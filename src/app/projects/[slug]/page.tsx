"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectBySlug, projects } from "@/lib/data";
import { FadeIn, ScaleIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className="pt-28 sm:pt-32">
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/40 hover:text-gold active:text-gold transition-colors text-sm mb-8 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Projects
            </Link>
          </FadeIn>

          <div className="mb-12">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  {project.category}
                </span>
                <span className="text-white/25 text-[11px] tracking-wide">
                  &mdash; {project.year}
                </span>
              </div>
            </FadeIn>
            <RevealTextWords
              text={project.title}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            />
          </div>

          <ScaleIn>
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] mb-16 group">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={700}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
            </div>
          </ScaleIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="font-display text-2xl font-bold mb-6">
                  About This Project
                </h2>
                <p className="text-white/40 leading-relaxed text-[15px] font-light">
                  {project.details}
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <p className="text-gold text-sm font-medium mb-1">
                      Category
                    </p>
                    <p className="text-white capitalize">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-gold text-sm font-medium mb-1">Year</p>
                    <p className="text-white">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-gold text-sm font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/60 text-[11px] font-medium tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="mb-20">
              <FadeIn>
                <h2 className="font-display text-2xl font-bold mb-8">
                  Project Gallery
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((img, i) => (
                  <ScaleIn key={i} delay={i * 0.1}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.04] group">
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${i + 2}`}
                        width={800}
                        height={500}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/[0.05] pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:border-gold/[0.15] transition-all duration-500"
              >
                <p className="text-white/25 text-[11px] tracking-[0.1em] uppercase mb-2 flex items-center gap-2">
                  <ArrowLeft
                    size={14}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Previous Project
                </p>
                <p className="font-display font-bold text-white group-hover:text-gold transition-colors">
                  {prevProject.title}
                </p>
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:border-gold/[0.15] transition-all duration-500 text-right"
              >
                <p className="text-white/25 text-[11px] tracking-[0.1em] uppercase mb-2 flex items-center justify-end gap-2">
                  Next Project
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </p>
                <p className="font-display font-bold text-white group-hover:text-gold transition-colors">
                  {nextProject.title}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
