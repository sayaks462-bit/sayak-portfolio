"use client";

import { FadeIn, ScaleIn } from "../animations/FadeIn";
import { RevealTextWords } from "../animations/RevealText";
import { counters } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-gold">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-6 sm:p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-gold/[0.04] blur-[80px] rounded-full" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {counters.map((counter, i) => (
              <ScaleIn key={counter.label} delay={i * 0.1}>
                <div className="text-center">
                  <AnimatedCounter
                    value={counter.value}
                    suffix={counter.suffix}
                  />
                  <p className="text-white/30 text-[11px] tracking-[0.1em] uppercase mt-2">{counter.label}</p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
