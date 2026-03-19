"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Book a Call",
    description: "Schedule a free 30-minute discovery call. No pitch decks needed — just tell us your idea.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2V6M8 2V6M3 10H21" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Discuss Your Idea",
    description: "We deep-dive into your vision, define scope, and lock in the features that matter for launch.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "We Build Your MVP",
    description: "Our senior devs + AI tooling build your product end-to-end — design, code, database, and deployment.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Launch in 7 Days",
    description: "Your MVP goes live — tested, deployed, and ready for real users. Source code is 100% yours.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-surface-dark transition-colors duration-300" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-4">
            How it Works
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            From idea to launch in{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">four simple steps</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            We&apos;ve streamlined the entire process so you can go from concept to a live product in record time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-brand-primary/10 via-brand-primary/30 to-brand-primary/10 dark:from-brand-primary/5 dark:via-brand-primary/20 dark:to-brand-primary/5 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Circle */}
                <div className="relative z-10 mb-7">
                  <div className="w-[88px] h-[88px] rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-xl shadow-brand-primary/20 group-hover:shadow-2xl group-hover:shadow-brand-primary/30 group-hover:scale-105 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-white dark:bg-surface-dark-card border-2 border-brand-light dark:border-brand-primary/20 flex items-center justify-center shadow-md">
                    <span className="text-[11px] font-bold text-brand-primary">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-[260px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
