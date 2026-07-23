"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  images,
  index,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const pinchStart = useRef({ dist: 0, zoom: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);

  const current = images[index];

  /* ── Preload adjacent images ────────────────────────── */
  useEffect(() => {
    if (!isOpen || images.length === 0) return;
    const indices = [
      (index - 1 + images.length) % images.length,
      index,
      (index + 1) % images.length,
    ];
    indices.forEach((i) => {
      const img = new window.Image();
      img.src = images[i].src;
    });
  }, [isOpen, index, images]);

  /* ── Reset on image change ──────────────────────────── */
  const resetTransform = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetTransform();
    setImageLoaded(false);
  }, [index, resetTransform]);

  /* ── Navigation ─────────────────────────────────────── */
  const goNext = useCallback(() => {
    resetTransform();
    onNavigate(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length, onNavigate, resetTransform]);

  const goPrev = useCallback(() => {
    resetTransform();
    onNavigate(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, onNavigate, resetTransform]);

  /* ── Zoom controls ──────────────────────────────────── */
  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.5, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(z - 0.5, 1);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  /* ── Double-click / double-tap to toggle zoom ─────── */
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (zoom > 1) {
        resetTransform();
      } else {
        setZoom(2.5);
      }
    }
    lastTap.current = now;
  }, [zoom, resetTransform]);

  /* ── Keyboard ───────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetTransform();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, goNext, goPrev, onClose, zoomIn, zoomOut, resetTransform]);

  /* ── Scroll to zoom ─────────────────────────────────── */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    },
    [zoomIn, zoomOut]
  );

  /* ── Mouse drag pan ─────────────────────────────────── */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  /* ── Touch pinch-to-zoom ────────────────────────────── */
  const getTouchDist = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchStart.current = { dist: getTouchDist(e.touches), zoom };
    }
    handleDoubleTap();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = getTouchDist(e.touches);
      const scale = dist / pinchStart.current.dist;
      const newZoom = Math.max(1, Math.min(5, pinchStart.current.zoom * scale));
      setZoom(newZoom);
      if (newZoom <= 1) setPan({ x: 0, y: 0 });
    }
  };

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
          {/* ═══════════════ Top Bar ═══════════════ */}
          <div className="relative z-10 flex items-center justify-between px-4 md:px-8 h-16 shrink-0 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm font-medium tabular-nums">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-white/15">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
              <span className="text-white/15 text-xs hidden sm:inline">&mdash;</span>
              <span className="text-white/30 text-xs hidden sm:inline truncate max-w-[220px]">
                {current.alt}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {[
                { icon: <ZoomOut size={13} />, fn: () => zoomOut(), label: "Zoom out" },
                { icon: <span className="text-[10px] font-mono tabular-nums">{Math.round(zoom * 100)}%</span>, fn: null, label: "" },
                { icon: <ZoomIn size={13} />, fn: () => zoomIn(), label: "Zoom in" },
              ].map((btn, i) =>
                btn.fn ? (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); btn.fn!(); }}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                    aria-label={btn.label}
                  >
                    {btn.icon}
                  </button>
                ) : (
                  <span key={i} className="text-white/25 text-[10px] w-10 text-center">
                    {btn.icon}
                  </span>
                )
              )}

              <button
                onClick={(e) => { e.stopPropagation(); resetTransform(); }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>

              <div className="w-px h-5 bg-white/10 mx-1" />

              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* ═══════════════ Image Area ═══════════════ */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-hidden relative select-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-gold/50 animate-spin" />
              </div>
            )}

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${current.src}-${index}`}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1600}
                  height={1000}
                  className={`max-h-[82vh] w-auto object-contain rounded-lg transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  draggable={false}
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ═══════════════ Thumbnail Strip ═══════════════ */}
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
