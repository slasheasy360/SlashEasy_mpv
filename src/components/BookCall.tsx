"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingRobot from "./FloatingRobot";

export default function BookCall() {
  // Load TidyCal embed script once
  useEffect(() => {
    const existing = document.querySelector('script[src*="tidycal"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="relative py-14 md:py-20 bg-[#F6FAFF] dark:bg-surface-dark-elevated transition-colors duration-300 overflow-hidden" id="book-call">
      {/* ── Ambient glow: purple/blue (left side) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] -left-[20%] w-[900px] h-[800px] rounded-[50%] opacity-[0.25] dark:opacity-[0.12] blur-[200px] dark:blur-[240px] animate-[glow-breathe_12s_ease-in-out_infinite_0.5s]"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(108,63,230,0.65) 0%, rgba(59,130,246,0.3) 45%, rgba(59,130,246,0.05) 65%, transparent 80%)" }}
        />
      </div>

      {/* Header — uses standard content padding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-5">
            Book a Free Call
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Get your MVP roadmap in a{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">30-min call</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            No sales pitch. No commitment. Just a focused conversation about your idea,
            technical requirements, and how we&apos;d build it in 7 days.
          </p>
        </motion.div>
      </div>

      {/* TidyCal Embed — wide container for horizontal 3-column layout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 lg:px-8"
      >
        <FloatingRobot />
        <div className="tidycal-embed" data-path="slasheasy/free-30-min-mvp-discovery-call"></div>
      </motion.div>

      {/* Trust points */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10"
        >
          {[
            "Understand your idea & target users",
            "Define MVP scope & core features",
            "Get a clear timeline & fixed quote",
            "Ask us anything — tech stack, process, team",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-[14px]">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
