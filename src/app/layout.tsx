import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://sayaksarkar.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sayak Sarkar | 3D Designer & Visualizer",
    template: "%s | Sayak Sarkar",
  },
  description:
    "Sayak Sarkar is a professional 3D Designer specializing in photorealistic interior visualizations, luxury residential designs, commercial spaces, and exhibition stall designs. Based in India, available worldwide.",
  keywords: [
    "3D Designer",
    "Interior Visualization",
    "3D Rendering",
    "Exhibition Stall Design",
    "Luxury Interior Design",
    "Commercial Space Design",
    "Residential Design",
    "3ds Max",
    "V-Ray",
    "Photorealistic Rendering",
    "Architectural Visualization",
    "Sayak Sarkar",
  ],
  authors: [{ name: "Sayak Sarkar", url: SITE_URL }],
  creator: "Sayak Sarkar",
  publisher: "Sayak Sarkar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sayak Sarkar | 3D Designer Portfolio",
    title: "Sayak Sarkar | 3D Designer & Visualizer",
    description:
      "Professional 3D Designer specializing in photorealistic interior visualizations, luxury residential designs, commercial spaces, and exhibition stall designs.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sayak Sarkar — 3D Designer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sayak Sarkar | 3D Designer & Visualizer",
    description:
      "Professional 3D Designer specializing in photorealistic interior visualizations, luxury residential designs, and exhibition stall designs.",
    images: [OG_IMAGE],
    creator: "@sayaksarkar",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg min-h-screen font-body antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to content
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
