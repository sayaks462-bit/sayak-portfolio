"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FadeIn, ScaleIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useRef } from "react";
import { Download, ArrowUpRight, ArrowRight } from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */
const skillTags = [
  "3ds Max",
  "V-Ray",
  "Photoshop",
  "CorelDRAW",
  "Interior Design",
  "Exhibition Stall Design",
  "3D Visualization",
];

/* ── Page ─────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32">

      {/* ═══════════════════════════════════════════════
          HERO — Portrait + Bio
          ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">

            {/* Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <ScaleIn>
                <div className="relative">
                  <div
                    className="absolute inset-[-30px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(199,161,74,0.1) 0%, transparent 65%)",
                    }}
                  />
                  <motion.div
                    className="absolute inset-[-10px] rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0%, #C7A14A 10%, transparent 20%, transparent 50%, #C7A14A 60%, transparent 70%)",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div
                    className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden"
                    style={{
                      boxShadow:
                        "0 0 60px rgba(199,161,74,0.08), 0 0 120px rgba(199,161,74,0.04)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none z-10"
                      style={{
                        boxShadow:
                          "inset 0 0 0 2px rgba(199,161,74,0.3), inset 0 0 0 3px rgba(199,161,74,0.08)",
                      }}
                    />
                    <Image
                      src="/images/about/portrait.jpeg"
                      alt="Sayak Sarkar — 3D Designer"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
                    />
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, transparent 40%, rgba(9,9,9,0.4) 100%)",
                      }}
                    />
                  </div>
                </div>
              </ScaleIn>
            </div>

            {/* Bio */}
            <div className="lg:col-span-7">
              <ScaleIn delay={0.1}>
                <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/[0.03] blur-[60px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/[0.02] blur-[50px] rounded-full" />

                  <div className="relative z-10">
                    <FadeIn>
                      <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
                        About Me
                      </p>
                    </FadeIn>

                    <RevealTextWords
                      text="Interior & Exhibition Stall Designer"
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
                    />

                    <FadeIn delay={0.2}>
                      <div className="space-y-4 text-white/40 text-[15px] leading-[1.8] font-light">
                        <p>
                          Hi, I&apos;m{" "}
                          <span className="text-white/70 font-medium">
                            Sayak Sarkar
                          </span>
                          , a 3D Interior and Exhibition Stall Designer
                          passionate about creating realistic, functional,
                          and visually striking spaces.
                        </p>
                        <p>
                          I specialize in Interior Visualization, Exhibition
                          Stall Design, Commercial Spaces, Residential
                          Interiors, and 3ds Max + V-Ray Rendering.
                        </p>
                        <p>
                          My focus is to transform ideas into photorealistic
                          3D experiences that help clients visualize their
                          projects before execution.
                        </p>
                      </div>
                    </FadeIn>

                    {/* ── Skills Tags ── */}
                    <FadeIn delay={0.3}>
                      <div className="flex flex-wrap gap-2.5 mt-8 mb-8">
                        {skillTags.map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.4 + i * 0.06,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-[12px] font-medium text-white/50 tracking-wide hover:border-gold/[0.2] hover:text-gold/70 hover:bg-gold/[0.04] transition-all duration-400 cursor-default"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </FadeIn>

                    {/* ── Buttons ── */}
                    <FadeIn delay={0.4}>
                      <div className="flex flex-wrap items-center gap-3">
                        <MagneticButton>
                          <a
                            href="#"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-bg text-[13px] font-semibold tracking-wide rounded-full hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-400 group"
                          >
                            <Download size={15} />
                            Download Resume
                            <ArrowUpRight
                              size={14}
                              className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                            />
                          </a>
                        </MagneticButton>

                        <MagneticButton>
                          <Link
                            href="/projects"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent text-white/50 border border-white/[0.07] text-[13px] font-medium tracking-wide rounded-full hover:bg-white/[0.04] hover:text-white/80 hover:border-white/[0.14] active:bg-white/[0.08] active:text-white/90 active:border-white/[0.2] active:scale-[0.97] transition-all duration-500 group"
                          >
                            View Projects
                            <ArrowRight
                              size={15}
                              className="group-hover:translate-x-0.5 transition-transform duration-300"
                            />
                          </Link>
                        </MagneticButton>
                      </div>
                    </FadeIn>
                  </div>

                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(199,161,74,0.04)",
                    }}
                  />
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
