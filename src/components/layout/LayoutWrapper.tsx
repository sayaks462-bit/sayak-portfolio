"use client";

import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { LoadingScreen } from "./LoadingScreen";
import { PageTransition } from "@/components/animations/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";
import { useState, useEffect } from "react";

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
