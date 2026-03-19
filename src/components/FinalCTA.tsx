"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="final-cta">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#2d1063] to-[#0f0720]" />

      {/* Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-brand-primary/20 blur-[150px]" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-brand-secondary/15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-[13px] font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Limited Spots Available
          </span>

          <h2 className="text-3xl md:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight">
            Start building your<br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              MVP today
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/55 leading-relaxed max-w-xl mx-auto">
            50+ founders have already shipped with us. Your idea deserves to be more than a doc —
            let&apos;s make it real.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#book-call"
              className="group px-10 py-4 rounded-xl bg-white text-brand-primary font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Book Your Free Call
              <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
            </a>
            <a
              href="#how-it-works"
              className="px-10 py-4 rounded-xl border border-white/20 text-white/90 font-medium text-base hover:bg-white/10 hover:border-white/35 transition-all duration-200 text-center backdrop-blur-sm"
            >
              See How it Works
            </a>
          </div>

          <p className="mt-8 text-white/30 text-sm">
            Free discovery call. No commitment. NDA signed on Day 1.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
