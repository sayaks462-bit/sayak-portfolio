/** Shared motion constants for luxury easing across the site */

/* ── Easing curves ────────────────────────────────────── */
/** Deceleration — the primary luxury ease used everywhere */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Gentle acceleration into a smooth stop */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Soft overshoot then settle — for playful elements */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/** Silky smooth deceleration — for page transitions */
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

/* ── Durations (seconds) ──────────────────────────────── */
export const DUR = {
  fast: 0.3,
  base: 0.5,
  medium: 0.7,
  slow: 0.9,
  reveal: 1.1,
  page: 0.45,
} as const;

/* ── Stagger delays ───────────────────────────────────── */
export const STAGGER = {
  tight: 0.04,
  base: 0.06,
  relaxed: 0.1,
  slow: 0.15,
} as const;

/* ── Viewport margins (for useInView / ScrollTrigger) ─── */
export const VIEWPORT = {
  near: "-30px",
  base: "-60px",
  far: "-100px",
} as const;

/* ── Framer Motion transition presets ─────────────────── */
export const spring = {
  stiff: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
  slow: { type: "spring" as const, stiffness: 120, damping: 20 },
};
