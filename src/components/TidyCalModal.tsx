"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIDYCAL_URL = "https://tidycal.com/slasheasy/free-30-min-mvp-discovery-call";

export default function TidyCalModal() {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openModal = useCallback(() => {
    setIframeLoaded(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Listen for the global custom event
  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener("open-tidycal", handler);
    return () => window.removeEventListener("open-tidycal", handler);
  }, [openModal]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white dark:bg-surface-dark-elevated rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-surface-dark-card flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors z-10 cursor-pointer"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Embed area */}
            <div className="flex-1 min-h-0 relative">
              {/* Loading state */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white dark:bg-surface-dark-elevated z-[5]">
                  <div className="w-9 h-9 rounded-full border-[3px] border-brand-primary/20 border-t-brand-primary animate-spin" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">Loading booking calendar...</p>
                </div>
              )}

              {/* TidyCal iframe — loads the real booking UI */}
              <iframe
                src={TIDYCAL_URL}
                title="Book a Free Call — TidyCal"
                onLoad={() => setIframeLoaded(true)}
                className="w-full border-0 rounded-2xl"
                style={{ height: "min(80vh, 700px)" }}
                allow="payment"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
