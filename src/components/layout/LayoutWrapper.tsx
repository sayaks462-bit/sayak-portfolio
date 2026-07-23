"use client";

import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { PageTransition } from "@/components/animations/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("./CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("./LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  useLenis();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      {loading && <LoadingScreen />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </ToastProvider>
  );
}
