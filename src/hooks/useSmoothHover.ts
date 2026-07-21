"use client";

import { useCallback, useRef } from "react";

interface SmoothHoverOptions {
  /** Scale factor on hover (default 1.02) */
  scale?: number;
  /** Transition duration in ms (default 400) */
  duration?: number;
  /** CSS easing function */
  easing?: string;
}

/**
 * Returns event handlers for a luxury smooth hover effect.
 * Applies GPU-accelerated transform transitions.
 *
 * Usage:
 * ```tsx
 * const hover = useSmoothHover({ scale: 1.03 });
 * <div {...hover.props} className="rounded-2xl">...</div>
 * ```
 */
export function useSmoothHover(options: SmoothHoverOptions = {}) {
  const { scale = 1.02, duration = 400, easing = "cubic-bezier(0.16, 1, 0.3, 1)" } =
    options;
  const ref = useRef<HTMLElement | null>(null);

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${duration}ms ${easing}`;
    el.style.willChange = "transform";
    el.style.transform = `scale(${scale})`;
  }, [scale, duration, easing]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${duration}ms ${easing}`;
    el.style.transform = "scale(1)";
    setTimeout(() => {
      if (el) el.style.willChange = "auto";
    }, duration);
  }, [duration, easing]);

  return {
    ref,
    onMouseEnter,
    onMouseLeave,
    props: {
      ref,
      onMouseEnter,
      onMouseLeave,
    },
  };
}
