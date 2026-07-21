"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FadeIn, ScaleIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useEffect, useRef, useState } from "react";
import {
  Download,
  Box,
  Sparkles,
  Image as ImageIcon,
  Ruler,
  PenTool,
  ArrowUpRight,
  Briefcase,
  Award,
  Clock,
  Users,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */
const skills = [
  { name: "3ds Max", percentage: 95, icon: "box" },
  { name: "V-Ray", percentage: 92, icon: "sparkles" },
  { name: "AutoCAD", percentage: 85, icon: "ruler" },
  { name: "Photoshop", percentage: 88, icon: "image" },
  { name: "CorelDRAW", percentage: 80, icon: "pen-tool" },
];

const specializations = [
  {
    title: "Interior Visualization",
    description:
      "Photorealistic renders that capture lighting, materials, and atmosphere — turning floor plans into immersive visual experiences that sell spaces before they are built.",
    icon: <ImageIcon size={20} />,
  },
  {
    title: "Exhibition Stall Design",
    description:
      "Bold, immersive stall concepts for trade shows and brand activations — blending spatial storytelling with striking 3D visuals that command attention.",
    icon: <Briefcase size={20} />,
  },
  {
    title: "Photorealistic Rendering",
    description:
      "Hyper-real imagery with physically accurate lighting, reflections, and textures — indistinguishable from photography, crafted entirely in 3D.",
    icon: <Sparkles size={20} />,
  },
];

const counters = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 80, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Awards Won", value: 12, suffix: "" },
];

const timeline = [
  {
    year: "2020",
    title: "Started Freelancing",
    description:
      "Began independent 3D visualization work, partnering with architects and developers on residential and commercial projects across India.",
  },
  {
    year: "2021",
    title: "Exhibition Design",
    description:
      "Expanded into exhibition stall design, creating immersive brand experiences for trade shows and corporate events.",
  },
  {
    year: "2023",
    title: "Studio Founded",
    description:
      "Established a dedicated 3D visualization studio, building a team and process framework to serve premium clients at scale.",
  },
  {
    year: "2025",
    title: "Industry Recognition",
    description:
      "Recognized for excellence in photorealistic rendering and luxury interior visualization, with a portfolio spanning 150+ projects.",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  box: <Box size={16} />,
  sparkles: <Sparkles size={16} />,
  image: <ImageIcon size={16} />,
  ruler: <Ruler size={16} />,
  "pen-tool": <PenTool size={16} />,
};

/* ── Animated Counter ────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl md:text-5xl font-bold text-gold"
    >
      {count}
      {suffix}
    </span>
  );
}

/* ── Skill Bar ───────────────────────────────────────── */
function SkillBar({
  name,
  percentage,
  icon,
}: {
  name: string;
  percentage: number;
  icon: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12] flex items-center justify-center text-gold/70 group-hover:bg-gold/[0.15] group-hover:text-gold transition-all duration-400">
            {iconMap[icon]}
          </div>
          <span className="text-white/90 font-medium text-sm tracking-wide">
            {name}
          </span>
        </div>
        <span className="text-gold/60 text-xs font-semibold tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="h-[6px] bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #A8873A, #C7A14A, #D4B366)",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
}

/* ── Timeline Entry ──────────────────────────────────── */
function TimelineEntry({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-16 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute left-0 top-1 w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/[0.2] flex items-center justify-center">
        <span className="text-gold text-[11px] font-bold tracking-wide">
          {item.year}
        </span>
      </div>
      <motion.div
        className="absolute left-[17px] top-[14px] w-[6px] h-[6px] rounded-full bg-gold"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
      />
      <h4 className="font-display text-lg font-bold text-white mb-1.5">
        {item.title}
      </h4>
      <p className="text-white/40 text-[13px] leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

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

                  <motion.div
                    className="absolute -bottom-3 -left-4 sm:-bottom-5 sm:-left-8 px-5 py-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="font-display font-bold text-xl text-gold">
                      5<span className="text-gold/50">+</span>
                    </p>
                    <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase mt-0.5">
                      Years
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 px-5 py-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]"
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="font-display font-bold text-xl text-gold">
                      150<span className="text-gold/50">+</span>
                    </p>
                    <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase mt-0.5">
                      Projects
                    </p>
                  </motion.div>
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
                      text="Crafting Digital Spaces with Precision and Passion"
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
                    />

                    <FadeIn delay={0.2}>
                      <div className="space-y-4 text-white/40 text-[15px] leading-[1.8] font-light">
                        <p>
                          I&apos;m{" "}
                          <span className="text-white/70 font-medium">
                            Sayak Sarkar
                          </span>
                          , a professional 3D Designer specializing in
                          photorealistic interior visualizations, luxury
                          residential designs, commercial spaces, and
                          exhibition stall designs.
                        </p>
                        <p>
                          With over 5 years of hands-on experience, I transform
                          architectural concepts into striking visual realities
                          that help architects, interior designers, and brands
                          communicate their vision with clarity and impact.
                        </p>
                        <p>
                          My workflow blends technical precision with artistic
                          sensibility — from accurate material studies and
                          lighting setups to final post-production. Every
                          render is crafted to evoke the feeling of being
                          inside the space, not just looking at it.
                        </p>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                      <div className="flex flex-wrap gap-4 mt-8 mb-8">
                        {[
                          { label: "Experience", value: "5+ Years" },
                          { label: "Projects", value: "150+" },
                          { label: "Clients", value: "80+" },
                          { label: "Awards", value: "12" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                          >
                            <span className="text-gold font-display font-bold text-sm">
                              {stat.value}
                            </span>
                            <span className="text-white/30 text-[11px] ml-2">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                      <MagneticButton>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-bg text-[13px] font-semibold tracking-wide rounded-full hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-400 group"
                        >
                          <Download size={15} />
                          Download CV
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                          />
                        </a>
                      </MagneticButton>
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

      {/* ═══════════════════════════════════════════════
          STATS COUNTERS
          ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-gold/[0.04] blur-[80px] rounded-full" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {counters.map((counter, i) => (
                <ScaleIn key={counter.label} delay={i * 0.1}>
                  <div className="text-center">
                    <AnimatedCounter
                      value={counter.value}
                      suffix={counter.suffix}
                    />
                    <p className="text-white/30 text-[11px] tracking-[0.1em] uppercase mt-2">
                      {counter.label}
                    </p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SPECIALIZATIONS
          ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12] flex items-center justify-center">
                <Award size={14} className="text-gold/70" />
              </div>
              <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase">
                Specialization
              </p>
            </div>
          </FadeIn>
          <RevealTextWords
            text="What I Do Best"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-14"
          />

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {specializations.map((spec) => (
              <motion.div
                key={spec.title}
                className="group relative rounded-3xl p-8 sm:p-10 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] overflow-hidden transition-all duration-500 hover:border-gold/[0.12] hover:bg-white/[0.03]"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Gold glow on hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/20 transition-all duration-700" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[60px] bg-gold/0 group-hover:bg-gold/[0.04] blur-[40px] rounded-full transition-all duration-700" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gold/[0.06] border border-gold/[0.1] flex items-center justify-center text-gold/60 group-hover:text-gold group-hover:bg-gold/[0.1] transition-all duration-400 mb-6">
                    {spec.icon}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors duration-400">
                    {spec.title}
                  </h3>

                  <p className="text-white/35 text-[14px] leading-[1.75] font-light">
                    {spec.description}
                  </p>
                </div>

                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(199,161,74,0.03)",
                  }}
                />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SKILLS + TIMELINE
          ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">

            {/* Skills */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12] flex items-center justify-center">
                    <Briefcase size={14} className="text-gold/70" />
                  </div>
                  <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase">
                    Skills
                  </p>
                </div>
              </FadeIn>
              <RevealTextWords
                text="Tools & Expertise"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-10"
              />

              <StaggerChildren className="space-y-5" staggerDelay={0.08}>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </StaggerChildren>
            </div>

            {/* Timeline */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12] flex items-center justify-center">
                    <Sparkles size={14} className="text-gold/70" />
                  </div>
                  <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase">
                    Journey
                  </p>
                </div>
              </FadeIn>
              <RevealTextWords
                text="Experience Timeline"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-10"
              />

              <div className="relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/10 to-transparent" />
                {timeline.map((item, i) => (
                  <TimelineEntry key={item.year} item={item} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
