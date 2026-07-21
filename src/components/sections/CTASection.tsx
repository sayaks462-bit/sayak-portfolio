"use client";

import Link from "next/link";
import { FadeIn } from "../animations/FadeIn";
import { RevealTextWords } from "../animations/RevealText";
import { MagneticButton } from "../animations/MagneticButton";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-6 sm:p-8 lg:p-20 text-center">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.04] blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <p className="text-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                Let&apos;s Work Together
              </p>
            </FadeIn>

            <RevealTextWords
              text="Have a project in mind?"
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
            />

            <FadeIn delay={0.3}>
              <p className="text-white/40 text-[15px] max-w-lg mx-auto mb-10 font-light">
                Let&apos;s bring your vision to life with photorealistic 3D
                visualization and premium design.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bg font-semibold text-[13px] tracking-wide rounded-full hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-400 group"
                >
                  Start a Project
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
