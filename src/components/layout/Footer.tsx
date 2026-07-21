"use client";

import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
  Phone,
  Copy,
} from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const CONTACT_EMAIL = "sayaks462@gmail.com";
const CONTACT_PHONE = "+91 98765 43210";
const LINKEDIN_URL = "https://www.linkedin.com/in/sayak-sarkar-54399833b/";

export function Footer() {
  const { copy } = useCopyToClipboard();

  return (
    <footer className="relative border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              SAYAK<span className="text-gold ml-1">SARKAR</span>
            </h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Professional 3D Designer specializing in photorealistic
              visualizations and luxury space design.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/35 hover:text-gold active:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect + Copy */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-5">
              Connect
            </h4>

            {/* Copy email */}
            <button
              onClick={() => copy(CONTACT_EMAIL, "Email")}
              className="flex items-center gap-3 text-white/35 hover:text-gold active:text-gold active:scale-[0.98] transition-colors text-sm group mb-3"
            >
              <Mail size={14} className="shrink-0" />
              <span className="truncate">{CONTACT_EMAIL}</span>
              <Copy
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-gold/50"
              />
            </button>

            {/* Copy phone */}
            <button
              onClick={() => copy(CONTACT_PHONE, "Phone")}
              className="flex items-center gap-3 text-white/35 hover:text-gold active:text-gold active:scale-[0.98] transition-colors text-sm group mb-5"
            >
              <Phone size={14} className="shrink-0" />
              <span>{CONTACT_PHONE}</span>
              <Copy
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-gold/50"
              />
            </button>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 hover:bg-gold/[0.05] active:bg-gold/[0.1] active:scale-95 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 hover:bg-gold/[0.05] active:bg-gold/[0.1] active:scale-95 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 hover:bg-gold/[0.05] active:bg-gold/[0.1] active:scale-95 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Sayak Sarkar. All rights
            reserved.
          </p>
          <p className="text-white/15 text-xs">3D Designer & Visualizer</p>
        </div>
      </div>
    </footer>
  );
}
