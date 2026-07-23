"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { galleryItems } from "@/lib/data";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

/* ── Category filters ─────────────────────────────── */
const CATEGORIES = ["All", "Interior", "Exhibition", "Commercial", "Residential"];

/* ── Fullscreen Lightbox ────────────────────────────── */
function Lightbox({
  images,
  index,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const current = images[index];

  const goNext = useCallback(
    () => onNavigate(index === images.length - 1 ? 0 : index + 1),
    [index, images.length, onNavigate]
  );
  const goPrev = useCallback(
    () => onNavigate(index === 0 ? images.length - 1 : index - 1),
    [index, images.length, onNavigate]
  );
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.5, 5)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.5, 1)), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, goNext, goPrev, onClose, zoomIn, zoomOut]);

  useEffect(() => {
    setZoom(1);
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!current) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] bg-black/97 backdrop-blur-3xl flex flex-col"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-4 md:px-8 h-16 shrink-0 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm font-medium tabular-nums">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-white/15">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
              <span className="text-white/15 text-xs hidden sm:inline">
                &mdash;
              </span>
              <span className="text-white/30 text-xs hidden sm:inline truncate max-w-[220px]">
                {current.alt}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Zoom out"
              >
                <ZoomOut size={13} />
              </button>
              <span className="text-white/25 text-[10px] font-mono tabular-nums w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Zoom in"
              >
                <ZoomIn size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(1);
                }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>
              <div className="w-px h-5 bg-white/10 mx-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-gold/50 animate-spin" />
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 md:left-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 md:right-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.src}-${index}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transform: `scale(${zoom})` }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1600}
                  height={1000}
                  className={`max-h-[82vh] w-auto object-contain rounded-lg transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  draggable={false}
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div className="relative z-10 h-16 md:h-[72px] shrink-0 border-t border-white/[0.04] flex items-center justify-center px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(i);
                  }}
                  className={`relative h-10 w-14 md:h-11 md:w-16 rounded-lg overflow-hidden shrink-0 transition-all duration-400 ${
                    i === index
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-black opacity-100 scale-105"
                      : "opacity-25 hover:opacity-55 hover:scale-105"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={80}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Gallery Tile ───────────────────────────────────── */
function GalleryTile({
  item,
  index,
  onClick,
  onHover,
}: {
  item: (typeof galleryItems)[number];
  index: number;
  onClick: () => void;
  onHover: () => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="break-inside-avoid mb-4 sm:mb-5"
    >
      <div
        className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.015] border border-white/[0.04] transition-all duration-700 hover:border-gold/[0.12]"
        onClick={onClick}
        onMouseEnter={onHover}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          {imgError ? (
            <div className="aspect-[4/3] flex items-center justify-center bg-white/[0.02]">
              <span className="text-white/15 text-xs">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}

          {/* Loading skeleton */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-white/[0.03] animate-pulse" />
          )}
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />

        {/* Gold top-edge line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-700 pointer-events-none" />

        {/* Zoom icon center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 scale-75 group-hover:scale-100 transition-all duration-500 shadow-lg">
            <ZoomIn size={16} className="text-white/80" />
          </div>
        </div>

        {/* Category pill — top left */}
        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase bg-black/40 backdrop-blur-xl text-white/60 border border-white/[0.08]">
            {item.category}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <p className="text-white text-sm font-display font-semibold drop-shadow-lg">
            {item.alt}
          </p>
          <p className="text-gold/70 text-[10px] tracking-[0.15em] uppercase mt-1">
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
}

/* ── Main Gallery Page ─────────────────────────────── */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const preloadRef = useRef<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? galleryItems
        : galleryItems.filter((i) => i.category === activeFilter),
    [activeFilter]
  );

  const lightboxImages = useMemo(
    () => filtered.map((i) => ({ src: i.src, alt: i.alt })),
    [filtered]
  );

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
    },
    [preloadAdjacent]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);

  const navigateLightbox = useCallback(
    (index: number) => {
      preloadAdjacent(index);
      setLightboxIndex(index);
    },
    [preloadAdjacent]
  );

  useEffect(() => {
    preloadRef.current.clear();
  }, [activeFilter]);

  return (
    <div className="pt-28 sm:pt-32">
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="text-center mb-16 sm:mb-20">
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

          {/* ── Category Filters ── */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`relative px-5 py-2.5 rounded-xl text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-500 ${
                      activeFilter === cat
                        ? "bg-gold text-bg shadow-lg shadow-gold/20"
                        : "bg-white/[0.03] text-white/35 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60 hover:border-white/[0.1] active:bg-white/[0.08] active:text-white/70 active:scale-95"
                    }`}
                  >
                    {cat}
                    <span
                      className={`ml-1.5 text-[10px] ${
                        activeFilter === cat ? "text-bg/50" : "text-white/20"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ── Masonry Grid (CSS columns) ── */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => openLightbox(i)}
                  onHover={() => preloadAdjacent(i)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <p className="text-white/20 text-sm">
                No images in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}
