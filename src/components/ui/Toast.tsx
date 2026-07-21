"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Copy } from "lucide-react";

/* ── Toast Context ────────────────────────────────────── */
interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface ToastContextValue {
  toast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

/* ── Toast Provider ───────────────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/30"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  t.type === "success"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : t.type === "error"
                    ? "bg-red-500/15 text-red-400"
                    : "bg-gold/15 text-gold"
                }`}
              >
                {t.type === "success" ? (
                  <Check size={13} strokeWidth={2.5} />
                ) : t.type === "error" ? (
                  <X size={13} strokeWidth={2.5} />
                ) : (
                  <Copy size={13} />
                )}
              </div>
              <span className="text-white/80 text-[13px] font-medium whitespace-nowrap">
                {t.message}
              </span>
              <button
                onClick={() => dismiss(t.id)}
                className="ml-1 text-white/20 hover:text-white/50 transition-colors"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
