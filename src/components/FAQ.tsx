"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What exactly do I get in 7 days?",
    a: "A fully functional, production-ready MVP with auth, core features (up to 3), responsive web app, database + API, deployment on your domain, and full source code. Everything you need to launch and start getting users.",
  },
  {
    q: "How is it possible to build an MVP in just 7 days?",
    a: "Our senior dev team combines deep expertise with AI-powered tooling to move at 3–5x the speed of traditional agencies. We scope tightly on Day 1, eliminating waste and focusing only on what matters for launch.",
  },
  {
    q: "What tech stack do you use?",
    a: "We typically use React / Next.js for the frontend, Node.js for the backend, and PostgreSQL or MongoDB for the database. We adapt based on your specific requirements — the stack is always modern and production-grade.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "We include iterations and revisions during the sprint, plus post-launch support for bug fixes and small tweaks. For larger feature additions, we offer extended engagement options.",
  },
  {
    q: "Do you sign an NDA?",
    a: "Yes — NDA is signed on Day 1 before any work begins. Your idea, code, and data are fully protected. We also hand over all source code and credentials upon delivery.",
  },
  {
    q: "What does the free discovery call cover?",
    a: "We'll discuss your idea, define the MVP scope, identify core features, outline the tech approach, and give you a fixed quote — all in 30 minutes. No sales pitch, no commitment.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "We offer a satisfaction guarantee. If we fail to deliver what was agreed in the scope document, you get a full refund. The scope is locked on Day 1 so there are no surprises.",
  },
  {
    q: "Can I be involved during the build?",
    a: "Absolutely. You get daily Loom updates showing progress, and we have feedback loops built into the sprint. You're always in the loop without needing to micromanage.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="relative py-24 md:py-32 bg-white/60 dark:bg-surface-dark-card/60 transition-colors duration-300 overflow-hidden"
      id="faq"
    >
      {/* ── Ambient glow: teal/cyan (right side) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] -right-[20%] w-[800px] h-[700px] rounded-[50%] opacity-[0.25] dark:opacity-[0.12] blur-[200px] dark:blur-[240px] animate-[glow-breathe_11s_ease-in-out_infinite_0.8s]"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.6) 0%, rgba(6,182,212,0.25) 45%, rgba(6,182,212,0.05) 65%, transparent 80%)" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-gray-50 dark:bg-surface-dark-elevated border-brand-primary/20 dark:border-brand-primary/30 shadow-sm"
                      : "bg-gray-50/50 dark:bg-surface-dark-elevated/50 border-gray-100 dark:border-surface-dark-border hover:border-gray-200 dark:hover:border-surface-dark-border/80"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  >
                    <span
                      className={`text-[15px] font-semibold transition-colors duration-200 ${
                        isOpen
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-light dark:bg-brand-primary/10 text-brand-primary flex items-center justify-center"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
