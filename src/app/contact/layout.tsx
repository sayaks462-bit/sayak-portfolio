import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Sayak Sarkar — 3D Designer",
  description:
    "Get in touch with Sayak Sarkar for 3D visualization projects — interior design renders, exhibition stall concepts, and commercial space visualizations. Available worldwide.",
  openGraph: {
    title: "Contact Sayak Sarkar | 3D Designer",
    description:
      "Let's discuss your next project. Available for 3D visualization, interior design, and exhibition stall design work.",
    url: "https://sayaksarkar.com/contact",
  },
  alternates: {
    canonical: "https://sayaksarkar.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
