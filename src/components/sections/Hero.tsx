"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "../animations/MagneticButton";
import {
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Phone,
} from "lucide-react";

/* ── WhatsApp SVG ────────────────────────────────────── */
const WhatsAppIcon = React.memo(function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
});

/* ── Instagram SVG ──────────────────────────────────── */
const InstagramIcon = React.memo(function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
});

/* ── Particles ───────────────────────────────────────── */
const Particles = React.memo(function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * -25,
        drift: (Math.random() - 0.5) * 80,
        opacity: Math.random() * 0.35 + 0.05,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 4 === 0
                ? "radial-gradient(circle, #C7A14A 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          }}
          animate={{
            y: [0, -100 - Math.random() * 150, 0],
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.4, 1.3, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

/* ── Main Hero ───────────────────────────────────────── */
export function Hero() {
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mouseTarget.current.x, 0.06);
      currentPos.current.y = lerp(currentPos.current.y, mouseTarget.current.y, 0.06);
      smoothX.set(currentPos.current.x);
      smoothY.set(currentPos.current.y);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [smoothX, smoothY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseTarget.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  const blob1X = useTransform(smoothX, (v) => v * 50);
  const blob1Y = useTransform(smoothY, (v) => v * 50);
  const blob2X = useTransform(smoothX, (v) => v * -35);
  const blob2Y = useTransform(smoothY, (v) => v * -35);
  const portraitRotateY = useTransform(smoothX, (v) => v * 7);
  const portraitRotateX = useTransform(smoothY, (v) => v * -7);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ═══════════════ Background ═══════════════ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-bg" />

        {/* Primary gold blob — follows mouse */}
        <motion.div
          className="absolute top-[-15%] left-[-8%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #C7A14A 0%, transparent 60%)", x: blob1X, y: blob1Y }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 25, damping: 18 },
            y: { type: "spring", stiffness: 25, damping: 18 },
            scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Secondary gold blob — opposite drift */}
        <motion.div
          className="absolute bottom-[-15%] right-[-8%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full opacity-[0.025]"
          style={{ background: "radial-gradient(circle, #C7A14A 0%, transparent 60%)", x: blob2X, y: blob2Y }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 25, damping: 18 },
            y: { type: "spring", stiffness: 25, damping: 18 },
            scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(199,161,74,0.5) 0.7px, transparent 0)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Drifting horizontal lines */}
        <motion.div
          className="absolute top-[18%] left-0 h-px w-[240px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(199,161,74,0.12), transparent)" }}
          animate={{ x: [-250, 200, -250] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[25%] right-0 h-px w-[180px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(199,161,74,0.08), transparent)" }}
          animate={{ x: [250, -180, 250] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbital rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.025]"
            style={{ width: 340 + ring * 200, height: 340 + ring * 200 }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 45 + ring * 18, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <Particles />
      </div>

      {/* ═══════════════ Main Layout ═══════════════ */}
      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-16 w-full pt-36 pb-20 sm:pt-40 sm:pb-28 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[72vh]">

          {/* ─── Left: Typography ─── */}
          <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-10 lg:mb-12"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-gold/80 text-[10px] font-semibold tracking-[0.22em] uppercase">
                Available for Projects
              </span>
            </motion.div>

            {/* Name — Apple-scale typography */}
            <div className="mb-6 lg:mb-8">
              <div className="overflow-hidden pb-1">
                <motion.h1
                  className="font-display font-bold leading-[0.88] tracking-[-0.04em] text-[clamp(3.5rem,9vw,8.5rem)]"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.45, ease }}
                >
                  <span className="text-white">SAYAK</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.h1
                  className="font-display font-bold leading-[0.88] tracking-[-0.04em] text-[clamp(3.5rem,9vw,8.5rem)]"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease }}
                >
                  <span className="text-gradient-gold">SARKAR</span>
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82, ease }}
              className="font-display italic text-[clamp(1.15rem,2.4vw,1.7rem)] text-white/40 tracking-wide mb-8 lg:mb-10"
            >
              3D Designer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease }}
              className="text-[15px] leading-[1.8] text-white/30 font-light tracking-wide max-w-md mb-12 lg:mb-14"
            >
              I create photorealistic Interior Visualizations, Luxury
              Residential Designs, Commercial Spaces, and Exhibition Stall
              Designs.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {/* View Projects */}
              <MagneticButton>
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-bg font-semibold text-[13px] tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(199,161,74,0.28)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    View Projects
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </Link>
              </MagneticButton>

              {/* Download Resume */}
              <MagneticButton>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white/50 border border-white/[0.07] text-[13px] font-medium tracking-wide rounded-full hover:bg-white/[0.04] hover:text-white/80 hover:border-white/[0.14] active:bg-white/[0.08] active:text-white/90 active:border-white/[0.2] active:scale-[0.97] transition-all duration-500"
                >
                  <Download size={14} />
                  Resume
                </a>
              </MagneticButton>

              {/* Contact */}
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white/50 border border-white/[0.07] text-[13px] font-medium tracking-wide rounded-full hover:bg-white/[0.04] hover:text-white/80 hover:border-white/[0.14] active:bg-white/[0.08] active:text-white/90 active:border-white/[0.2] active:scale-[0.97] transition-all duration-500"
                >
                  Contact
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Social icons row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease }}
              className="flex items-center gap-3"
            >
              {[
                {
                  icon: <Mail size={15} />,
                  href: "mailto:sayaks462@gmail.com",
                  label: "Email",
                },
                {
                  icon: <WhatsAppIcon size={15} />,
                  href: "https://wa.me/918972804284",
                  label: "WhatsApp",
                },
                {
                  icon: <Linkedin size={15} />,
                  href: "https://www.linkedin.com/in/sayak-sarkar-54399833b/",
                  label: "LinkedIn",
                },
                {
                  icon: <InstagramIcon size={15} />,
                  href: "https://www.instagram.com/_.sayak.__0/",
                  label: "Instagram",
                },
                {
                  icon: <Phone size={15} />,
                  href: "tel:+918972804284",
                  label: "Phone",
                },
              ].map((s) => (
                <MagneticButton key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/25 hover:text-gold hover:bg-gold/[0.06] hover:border-gold/[0.18] active:bg-gold/[0.12] active:border-gold/[0.25] active:scale-95 transition-all duration-400"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                </MagneticButton>
              ))}

              {/* Separator dot */}
              <div className="w-1 h-1 rounded-full bg-white/10 mx-1" />

              {/* Tiny "sayak@example.com" */}
              <span className="text-white/15 text-[11px] tracking-wide hidden sm:inline">
                sayaks462@gmail.com
              </span>
            </motion.div>
          </div>

          {/* ─── Right: Portrait ─── */}
          <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(24px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.5, ease }}
              className="relative"
            >
              {/* ── Layered gold glow (3 layers) ── */}
              {/* Deep diffuse */}
              <div
                className="absolute inset-[-80px] rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, rgba(199,161,74,0.18) 0%, rgba(199,161,74,0.06) 35%, transparent 65%)",
                }}
              />
              {/* Mid pulse */}
              <motion.div
                className="absolute inset-[-40px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(199,161,74,0.14) 0%, rgba(199,161,74,0.03) 50%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner bright */}
              <motion.div
                className="absolute inset-[-15px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(199,161,74,0.1) 0%, transparent 60%)",
                }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Rotating gold ring (inner) ── */}
              <motion.div
                className="absolute inset-[-8px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #C7A14A 10%, transparent 20%, transparent 50%, #C7A14A 60%, transparent 70%)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              {/* ── Rotating gold ring (outer, opposite) ── */}
              <motion.div
                className="absolute inset-[-20px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 180deg, transparent 0%, rgba(199,161,74,0.25) 8%, transparent 16%, transparent 45%, rgba(199,161,74,0.25) 53%, transparent 61%)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100% - 1px))",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100% - 1px))",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              />

              {/* ── Circular portrait ── */}
              <motion.div
                className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[370px] md:h-[370px] lg:w-[430px] lg:h-[430px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  perspective: "900px",
                  transformStyle: "preserve-3d",
                  rotateY: portraitRotateY,
                  rotateX: portraitRotateX,
                  boxShadow:
                    "0 0 100px rgba(199,161,74,0.1), 0 0 200px rgba(199,161,74,0.05)",
                }}
              >
                {/* Gold inset border */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none z-10"
                  style={{
                    boxShadow:
                      "inset 0 0 0 2.5px rgba(199,161,74,0.3), inset 0 0 0 4px rgba(199,161,74,0.08)",
                  }}
                />

                <Image
                  src="/images/about/portrait.jpeg"
                  alt="Sayak Sarkar — 3D Designer"
                  width={680}
                  height={680}
                  className="w-full h-full object-cover"
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 370px, (max-width: 1280px) 430px, 500px"
                />

                {/* Vignette */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 32%, transparent 45%, rgba(9,9,9,0.55) 100%)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════ Scroll Indicator ═══════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <span className="text-white/15 text-[9px] tracking-[0.35em] uppercase font-body">
          Scroll
        </span>
        <motion.div
          className="w-[18px] h-[28px] rounded-full border border-white/[0.1] flex items-start justify-center pt-[6px]"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          <motion.div
            className="w-[3px] h-[3px] rounded-full bg-gold"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
