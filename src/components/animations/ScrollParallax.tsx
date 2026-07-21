"use client";

import { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { useGsapParallax } from "@/hooks/useGsapReveal";

interface ScrollParallaxProps extends Omit<ImageProps, "ref"> {
  /** Parallax speed in pixels. Negative = slower (behind), positive = faster */
  parallaxSpeed?: number;
  /** Whether to add a subtle scale effect */
  scale?: boolean;
}

/**
 * Image with scroll-based parallax via GSAP ScrollTrigger.
 * The image moves at a different rate than the scroll, creating depth.
 */
export function ScrollParallax({
  parallaxSpeed = -60,
  scale = true,
  className = "",
  ...imageProps
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapParallax(ref, parallaxSpeed);

  return (
    <div ref={ref} className="overflow-hidden">
      <Image
        {...imageProps}
        className={`w-full h-full object-cover ${scale ? "scale-110" : ""} ${className}`}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
