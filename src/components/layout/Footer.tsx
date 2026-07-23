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
const CONTACT_PHONE = "+91 8972804284";
const LINKEDIN_URL = "https://www.linkedin.com/in/sayak-sarkar-54399833b/";
const INSTAGRAM_URL = "https://www.instagram.com/_.sayak.__0/";

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
              className="flex items-center gap-3 text-white/35 hover:text-gold active:text-gold active:scale-[0.98] transition-colors text-sm group mb-3"
            >
              <Phone size={14} className="shrink-0" />
              <span>{CONTACT_PHONE}</span>
              <Copy
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-gold/50"
              />
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918972804284"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/35 hover:text-[#25D366] active:text-[#25D366] active:scale-[0.98] transition-colors text-sm group mb-5"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
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
