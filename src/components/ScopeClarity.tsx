"use client";

import { motion } from "framer-motion";

const INCLUDED = [
  "Auth + core features (max 3)",
  "Responsive web app",
  "1 payment integration (Stripe / Razorpay)",
  "Database + API",
  "Live deployment + domain setup",
  "Source code + credentials",
  "Basic admin panel",
  "NDA + daily Loom updates",
];

const NOT_INCLUDED = [
  "Native iOS / Android app",
  "Complex multi-role permissions (3+ roles)",
  "Custom AI/ML model training",
  "HIPAA / SOC2 / PCI compliance",
  "Multi-language / i18n",
  "Automated test suites",
  "CI/CD pipeline setup",
  "Real-time collaboration (Notion-style)",
];

function CheckIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6L5 9L10 3"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function WarningIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 3v3.5M6 8.5v.5"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ScopeClarity() {
  return (
    <section className="relative py-24 md:py-32 transition-colors duration-300 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-4">
            Scope Clarity
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Crystal clear on what&apos;s{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              in and out
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Scope creep kills MVPs. We define — in writing — exactly what&apos;s
            included before a single line of code is written.
          </p>
        </motion.div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Included */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            className="group relative rounded-2xl p-8 md:p-9 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/10 hover:border-emerald-300/60 dark:hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/[0.04]"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Included in every MVP
              </h3>
            </div>

            <ul className="space-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-[15px] text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Included */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ ...cardVariants, visible: { ...cardVariants.visible, transition: { delay: 0.1, duration: 0.5, ease: "easeOut" as const } } }}
            className="group relative rounded-2xl p-8 md:p-9 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-500/10 hover:border-amber-300/60 dark:hover:border-amber-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/[0.04]"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Full-scale only (not in 7 days)
              </h3>
            </div>

            <ul className="space-y-4">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <WarningIcon />
                  <span className="text-[15px] text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
