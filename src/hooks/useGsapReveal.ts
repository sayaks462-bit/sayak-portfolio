"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  /** Animation from props */
  from?: gsap.TweenVars;
  /** Animation to props */
  to?: gsap.TweenVars;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Whether to scrub with scroll */
  scrub?: boolean | number;
  /** Stagger delay between elements */
  stagger?: number;
  /** Custom selector for children */
  children?: string;
  /** ToggleAction configuration */
  toggleActions?: string;
}

/**
 * GSAP-powered scroll reveal hook.
 * Attach to a container ref — animates children on scroll entry.
 *
 * Usage:
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGsapReveal(ref, { from: { y: 40, opacity: 0 } });
 * ```
 */
export function useGsapReveal<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: RevealOptions = {}
) {
  const {
    from = { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
    to = { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
    start = "top 85%",
    end = "top 20%",
    scrub = false,
    stagger = 0.08,
    children: childSelector,
    toggleActions = "play none none none",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            toggleActions,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, start, end, scrub, stagger, childSelector, toggleActions]);
}

/**
 * GSAP parallax hook — moves an element at a different scroll speed.
 * Negative values move slower (parallax behind), positive move faster.
 */
export function useGsapParallax<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  speed: number = -80,
  start: string = "top bottom",
  end: string = "bottom top"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, speed, start, end]);
}

/**
 * GSAP batch reveal — stagger-reveals a group of elements as they enter viewport.
 * Call once on a container, it auto-discovers matching children.
 */
export function useGsapBatch(
  selector: string,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    y = 30,
    opacity = 0,
    duration = 0.7,
    stagger = 0.06,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(targets, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y, opacity },
            {
              y: 0,
              opacity: 1,
              duration,
              stagger,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
        start,
      });
    });

    return () => ctx.revert();
  }, [selector, y, opacity, duration, stagger, start]);
}
