"use client";

import { useCallback } from "react";
import { useToast } from "@/components/ui/Toast";

/**
 * Returns a `copy` function that copies text to clipboard
 * and shows a success toast notification.
 */
export function useCopyToClipboard() {
  const { toast } = useToast();

  const copy = useCallback(
    async (text: string, label?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast(`${label ?? "Text"} copied to clipboard`, "success");
      } catch {
        /* Fallback for older browsers */
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast(`${label ?? "Text"} copied to clipboard`, "success");
      }
    },
    [toast]
  );

  return { copy };
}
