"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="relative w-11 h-6 rounded-full bg-gray-200 dark:bg-surface-dark-elevated border border-gray-300 dark:border-surface-dark-border transition-colors duration-300 cursor-pointer flex-shrink-0"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white dark:bg-brand-primary shadow-md flex items-center justify-center"
        animate={{ left: dark ? "calc(100% - 22px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {dark ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="white" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#6C3FE6" />
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="#6C3FE6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl border-b border-gray-200/30 dark:border-surface-dark-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a href="#" className="relative z-10 flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
              }`}>
                SlashEasy
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors duration-200 ${
                    scrolled
                      ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      : "text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop right: toggle + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200 bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                Book Free Call
              </button>
            </div>

            {/* Mobile: toggle + hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2 bg-gray-900 dark:bg-white" : scrolled ? "bg-gray-900 dark:bg-white" : "bg-gray-900 dark:bg-white"}`} />
                <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : scrolled ? "bg-gray-900 dark:bg-white" : "bg-gray-900 dark:bg-white"}`} />
                <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2 bg-gray-900 dark:bg-white" : scrolled ? "bg-gray-900 dark:bg-white" : "bg-gray-900 dark:bg-white"}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white dark:bg-surface-dark lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="text-xl font-medium text-gray-900 dark:text-white hover:text-brand-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={() => { setMobileOpen(false); document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" }); }}
                className="mt-4 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-lg shadow-lg cursor-pointer"
              >
                Book Free Call
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
