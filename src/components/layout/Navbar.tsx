"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "../animations/MagneticButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-2xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              SAYAK
              <span className="text-gold ml-1">SARKAR</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-300 rounded-lg ${
                    isActive
                      ? "text-gold"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gold/[0.08] rounded-lg border border-gold/[0.15]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-bg text-[12px] font-semibold tracking-wide rounded-full hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-400 group"
              >
                Hire Me
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-10 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors -mr-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-3xl md:hidden overflow-y-auto"
            style={{ touchAction: "pan-y" }}
          >
            <div className="flex flex-col items-center justify-center min-h-full gap-2 py-20 px-6">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-2xl font-display font-bold transition-colors block py-3 px-4 ${
                        isActive
                          ? "text-gold"
                          : "text-white/50 hover:text-white active:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-bg text-[13px] font-semibold tracking-wide rounded-full"
                >
                  Hire Me
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
