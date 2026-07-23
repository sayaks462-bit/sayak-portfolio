"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { galleryItems } from "@/lib/data";
import dynamic from "next/dynamic";
import { ZoomIn } from "lucide-react";

const GalleryLightbox = dynamic(
  () => import("@/components/ui/GalleryLightbox").then((m) => m.GalleryLightbox),
  { ssr: false }
);

/* ── Aspect ratios for Pinterest feel ──────────────────── */
const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]"];

function deriveCategories(items: typeof galleryItems) {
  const set = new Set(items.map((i) => i.category));
  return ["All", ...Array.from(set).filter((c) => c !== "All")];
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const preloadRef = useRef<Set<string>>(new Set());

  const categories = useMemo(() => deriveCategories(galleryItems), []);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? galleryItems
        : galleryItems.filter((i) => i.category === activeFilter),
    [activeFilter]
  );

  /* ── Preload adjacent images when hovering a tile ──── */
  const preloadAdjacent = useCallback(
    (index: number) => {
      const start = Math.max(0, index - 1);
      const end = Math.min(filtered.length - 1, index + 1);
      for (let i = start; i <= end; i++) {
        const src = filtered[i]?.src;
        if (src && !preloadRef.current.has(src)) {
          preloadRef.current.add(src);
          const img = new window.Image();
          img.src = src;
        }
      }
    },
    [filtered]
  );

  const openLightbox = useCallback(
    (index: number) => {
      preloadAdjacent(index);
      setLightboxIndex(index);
      document.body.style.overflow = "hidden";
    },
    [preloadAdjacent]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (index: number) => {
      preloadAdjacent(index);
      setLightboxIndex(index);
    },
    [preloadAdjacent]
  );

  /* Reset preload cache when filter changes */
  useEffect(() => {
    preloadRef.current.clear();
  }, [activeFilter]);

  return (
    <div className="pt-32">
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-20">
            <FadeIn>
              <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
                Gallery
              </p>
            </FadeIn>
            <RevealTextWords
              text="Visual Showcase"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            />
            <FadeIn delay={0.3}>
              <p className="text-white/30 mt-7 max-w-lg mx-auto text-[15px] leading-relaxed font-light">
                A curated collection of photorealistic renders and design
                projects — each crafted with precision and an eye for detail.
              </p>
            </FadeIn>
          </div>

          {/* ── Filters ── */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-6 py-2.5 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-500 ${
                    activeFilter === cat
                      ? "bg-gold text-bg shadow-lg shadow-gold/20"
                      : "bg-white/[0.03] text-white/35 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60 hover:border-white/[0.1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* ── Pinterest Masonry ── */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const aspect = ASPECTS[i % ASPECTS.length];
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="break-inside-avoid"
                  >
                    <div
                      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.015] border border-white/[0.04] transition-all duration-700 hover:border-gold/[0.12]"
                      onClick={() => openLightbox(i)}
                      onMouseEnter={() => preloadAdjacent(i)}
                    >
                      {/* Image */}
                      <div className={`relative ${aspect} overflow-hidden`}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={1000}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.05]"
                        />
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                      {/* Gold top-edge */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-700" />

                      {/* Zoom badge */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 scale-90 group-hover:scale-100 transition-all duration-500">
                          <ZoomIn size={15} className="text-white/70" />
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-sm font-display font-semibold drop-shadow-lg">
                          {item.alt}
                        </p>
                        <p className="text-gold/60 text-[10px] tracking-[0.15em] uppercase mt-1">
                          {item.category}
                        </p>
                      </div>

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          boxShadow:
                            "0 0 0 1px rgba(199,161,74,0.06), 0 16px 48px -12px rgba(199,161,74,0.12)",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ── Empty state ── */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-white/20 text-sm">
                  No images in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <GalleryLightbox
        images={filtered.map((i) => ({ src: i.src, alt: i.alt }))}
        index={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
