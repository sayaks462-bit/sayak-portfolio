"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn, ScaleIn } from "@/components/animations/FadeIn";
import { RevealTextWords } from "@/components/animations/RevealText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import {
  Mail,
  Linkedin,
  Download,
  Send,
  ArrowUpRight,
  Check,
  MapPin,
  Copy,
} from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

/* ── WhatsApp SVG ────────────────────────────────────── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────── */
const CONTACT_EMAIL = "sayaks462@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/sayak-sarkar-54399833b/";
const WHATSAPP_URL = "https://wa.me/919876543210";
const WHATSAPP_NUMBER = "+91 98765 43210";

/* ── Animated form field ─────────────────────────────── */
function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  rows,
  delay = 0,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  rows?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [focused, setFocused] = useState(false);

  const baseClasses =
    "w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white/90 text-sm placeholder-white/20 focus:outline-none transition-all duration-500";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <label className="block text-[11px] font-semibold text-white/30 tracking-[0.12em] uppercase mb-2.5">
        {label}
      </label>
      {rows ? (
        <textarea
          required={required}
          rows={rows}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} resize-none ${
            focused
              ? "border-gold/40 ring-1 ring-gold/20 bg-white/[0.05]"
              : "border-white/[0.06]"
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${
            focused
              ? "border-gold/40 ring-1 ring-gold/20 bg-white/[0.05]"
              : "border-white/[0.06]"
          }`}
          placeholder={placeholder}
        />
      )}
    </motion.div>
  );
}

/* ── Contact card ────────────────────────────────────── */
function ContactCard({
  icon,
  label,
  value,
  href,
  copyText,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  copyText?: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const { copy } = useCopyToClipboard();

  return (
    <motion.div
      ref={ref}
      className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/[0.15] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Hover gold glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(199,161,74,0.04) 0%, transparent 60%)",
        }}
      />

      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex items-center gap-4 flex-1 min-w-0 relative z-10"
      >
        <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/[0.12] flex items-center justify-center text-gold/70 group-hover:bg-gold/[0.15] group-hover:text-gold transition-all duration-400 shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase">
            {label}
          </p>
          <p className="text-white/80 text-sm font-medium truncate mt-0.5">
            {value}
          </p>
        </div>
        <ArrowUpRight
          size={14}
          className="text-white/15 group-hover:text-gold/60 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>

      {/* Copy button */}
      {copyText && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            copy(copyText, label);
          }}
          className="relative z-10 w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/20 hover:text-gold hover:bg-gold/[0.08] hover:border-gold/[0.15] transition-all duration-300 shrink-0"
          aria-label={`Copy ${label}`}
        >
          <Copy size={12} />
        </button>
      )}
    </motion.div>
  );
}

/* ── Map placeholder ─────────────────────────────────── */
function MapPlaceholder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden border border-white/[0.05] bg-white/[0.01] h-[220px] sm:h-[260px]"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(199,161,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,74,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(199,161,74,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.06]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.06]" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-white/[0.03] rotate-[20deg] origin-left" />
        <div className="absolute top-0 bottom-0 left-[35%] w-px bg-white/[0.03] rotate-[15deg] origin-top" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center backdrop-blur-sm"
        >
          <MapPin size={16} className="text-gold" />
        </motion.div>
        <div className="w-3 h-1 bg-gold/20 rounded-full mt-1 blur-[2px]" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <p className="text-white/50 text-[10px] tracking-wider uppercase">
            India
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <p className="text-gold/50 text-[10px] tracking-wider">
            Available Worldwide
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main page ───────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    /* Build mailto link as a reliable fallback */
    const mailtoBody = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      ``,
      formData.message,
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(mailtoBody)}`;

    /* Attempt Formspree / Web3Forms / custom endpoint first.
       If no endpoint is configured, fall back to mailto. */
    const FORM_ENDPOINT = ""; // Add your form endpoint here (e.g. Formspree)

    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });
      } catch {
        /* fall through to mailto */
      }
    }

    /* Always open mailto as primary delivery */
    window.location.href = mailtoUrl;

    setSending(false);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  const contactLinks = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      copyText: CONTACT_EMAIL,
    },
    {
      icon: <WhatsAppIcon size={18} />,
      label: "WhatsApp",
      value: WHATSAPP_NUMBER,
      href: WHATSAPP_URL,
      copyText: WHATSAPP_NUMBER,
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      value: "Sayak Sarkar",
      href: LINKEDIN_URL,
    },
  ];

  return (
    <div className="pt-28 sm:pt-32">
      <section className="py-14 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-16 sm:mb-20">
            <FadeIn>
              <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
                Get In Touch
              </p>
            </FadeIn>
            <RevealTextWords
              text="Let's Create Together"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            />
            <FadeIn delay={0.3}>
              <p className="text-white/30 mt-7 max-w-lg mx-auto text-[15px] leading-relaxed font-light">
                Have a project in mind? Let&apos;s discuss how I can bring
                your vision to life with stunning 3D visualization.
              </p>
            </FadeIn>
          </div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

            {/* ─── Left: Contact cards + CTAs + Map ─── */}
            <div className="lg:col-span-4 space-y-8">

              {/* Contact cards */}
              <div>
                <FadeIn>
                  <h3 className="text-white/20 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
                    Contact Information
                  </h3>
                </FadeIn>
                <div className="space-y-3">
                  {contactLinks.map((item, i) => (
                    <ContactCard key={item.label} {...item} index={i} />
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <FadeIn delay={0.35}>
                <MagneticButton>
                  <a
                    href="#"
                    download
                    className="flex items-center justify-center gap-2.5 w-full px-7 py-3.5 bg-gold text-bg text-[13px] font-semibold tracking-wide rounded-full hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-400 group"
                  >
                    <Download size={15} />
                    Download Resume
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </a>
                </MagneticButton>
              </FadeIn>

              {/* WhatsApp direct button */}
              <FadeIn delay={0.4}>
                <MagneticButton>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full px-7 py-3.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 text-[13px] font-semibold tracking-wide rounded-full hover:bg-[#25D366]/15 hover:border-[#25D366]/30 active:bg-[#25D366]/25 active:scale-[0.97] transition-all duration-400 group"
                  >
                    <WhatsAppIcon size={16} />
                    Chat on WhatsApp
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </a>
                </MagneticButton>
              </FadeIn>

              {/* Map */}
              <MapPlaceholder />
            </div>

            {/* ─── Right: Form ─── */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.1}>
                <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] overflow-hidden">
                  {/* Corner glows */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/[0.025] blur-[70px] rounded-full" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold/[0.015] blur-[60px] rounded-full" />

                  <div className="relative z-10">
                    {/* Form header */}
                    <FadeIn delay={0.12}>
                      <div className="mb-8">
                        <h3 className="font-display text-xl font-bold text-white/80 mb-1">
                          Send a Message
                        </h3>
                        <p className="text-white/25 text-[13px]">
                          Fill in the details below and I&apos;ll get back to
                          you within 24 hours.
                        </p>
                      </div>
                    </FadeIn>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          label="Your Name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(v) =>
                            setFormData({ ...formData, name: v })
                          }
                          required
                          delay={0.15}
                        />
                        <FormField
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(v) =>
                            setFormData({ ...formData, email: v })
                          }
                          required
                          delay={0.2}
                        />
                      </div>

                      <FormField
                        label="Subject"
                        placeholder="Project Inquiry"
                        value={formData.subject}
                        onChange={(v) =>
                          setFormData({ ...formData, subject: v })
                        }
                        required
                        delay={0.25}
                      />

                      <FormField
                        label="Message"
                        placeholder="Tell me about your project, timeline, and budget..."
                        value={formData.message}
                        onChange={(v) =>
                          setFormData({ ...formData, message: v })
                        }
                        required
                        rows={5}
                        delay={0.3}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <MagneticButton>
                          <button
                            type="submit"
                            disabled={submitted || sending}
                            className={`inline-flex items-center gap-2.5 px-8 py-3.5 text-[13px] font-semibold tracking-wide rounded-full transition-all duration-500 group ${
                              submitted
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                : sending
                                ? "bg-gold/50 text-bg cursor-wait"
                                : "bg-gold text-bg hover:bg-gold-light active:bg-gold-dark active:scale-[0.97] shadow-lg shadow-gold/20 hover:shadow-gold/30"
                            }`}
                          >
                            {submitted ? (
                              <>
                                <Check size={15} />
                                Message Sent
                              </>
                            ) : sending ? (
                              <>
                                <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send
                                  size={14}
                                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                />
                              </>
                            )}
                          </button>
                        </MagneticButton>
                      </motion.div>
                    </form>
                  </div>

                  {/* Border glow */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(199,161,74,0.03)",
                    }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
