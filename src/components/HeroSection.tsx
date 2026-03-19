"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const TRUST = [
  "50+ MVPs shipped",
  "7-day delivery",
  "Fixed pricing",
  "NDA signed Day 1",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#2d1063] to-[#0f0720]" />

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-brand-primary/20 blur-[160px]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-brand-secondary/15 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-brand-primary/5 blur-[180px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-36 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-[13px] font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Accepting New Projects
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-7 text-[42px] md:text-[56px] lg:text-[66px] font-extrabold text-white leading-[1.06] tracking-tight"
            >
              Turn your idea into an{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  MVP in 7 days
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-brand-primary/20 rounded-sm -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed"
            >
              Book a free call, tell us your idea, and our senior dev team + AI tooling
              will build, design, and ship your production-ready MVP — in one week.
              No long timelines. No bloated agencies. Just execution.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href="#book-call"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Book Free Call
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-xl border border-white/20 text-white/90 font-medium text-base hover:bg-white/10 hover:border-white/35 transition-all duration-200 text-center backdrop-blur-sm"
              >
                View Process
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST.map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/45 text-sm">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Build Progress Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-primary/25 to-brand-secondary/25 rounded-3xl blur-3xl" />
              <div className="relative animate-float bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-7 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8L6 12L14 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Build Progress</p>
                      <p className="text-white/40 text-xs">MVP Sprint — Week 1</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">Active</span>
                </div>

                {/* Progress */}
                <div className="mb-7">
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Progress</span>
                    <span className="text-brand-secondary font-medium">57%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "57%" }}
                      transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3.5">
                  {[
                    { day: "Day 1", task: "Discovery & scope lock", done: true },
                    { day: "Day 2", task: "Auth + database setup", done: true },
                    { day: "Day 3", task: "Core feature build", done: true },
                    { day: "Day 4", task: "UI polish + integrations", done: true },
                    { day: "Day 5", task: "Feature completion", done: false },
                    { day: "Day 6", task: "Testing & feedback", done: false },
                    { day: "Day 7", task: "Ship day", done: false },
                  ].map((step, i) => (
                    <motion.div
                      key={step.day}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.08, duration: 0.35 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                        step.done
                          ? "bg-gradient-to-br from-brand-primary to-brand-secondary"
                          : "border border-white/15 bg-white/[0.03]"
                      }`}>
                        {step.done && (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs font-semibold flex-shrink-0 w-10 ${step.done ? "text-brand-secondary" : "text-white/30"}`}>
                        {step.day}
                      </span>
                      <span className={`text-sm ${step.done ? "text-white/80 line-through decoration-white/20" : "text-white/50"}`}>
                        {step.task}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[
                      { bg: "#6C3FE6", label: "SE" },
                      { bg: "#8B5CF6", label: "AI" },
                      { bg: "#413A7C", label: "DV" },
                    ].map((a, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-surface-dark/50 flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: a.bg }}>
                        {a.label}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/30">Updated just now</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs font-medium tracking-wider uppercase">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white/30">
            <path d="M10 4V16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
