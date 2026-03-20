"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    title: "UI/UX Design",
    description: "Pixel-perfect, responsive interfaces designed for conversion. Looks great on desktop, tablet, and mobile out of the box.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Full-Stack Development",
    description: "Full auth system, database + backend, up to 3 core features, and 1 payment integration (Stripe/Razorpay) — all production-ready.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Deployment & DevOps",
    description: "Live deployment on a real URL by Day 7. Hosting, domain setup, SSL — fully functional and production-ready.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    title: "Iterations & Revisions",
    description: "Feedback loops built into the sprint. We iterate until you&apos;re satisfied with every detail.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Quality Assurance",
    description: "Manual + automated testing across devices. Basic admin panel included to manage your data without touching code.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Post-Launch Support",
    description: "Full source code handover, daily Loom updates during build, NDA signed Day 1, and post-launch guidance. We don&apos;t disappear after Day 7.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Services() {
  return (
    <section className="relative py-24 md:py-32 bg-white/60 dark:bg-surface-dark-card/60 transition-colors duration-300 overflow-hidden" id="services">
      {/* ── Ambient glow: warm yellow (left-middle) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] -left-[22%] w-[900px] h-[800px] rounded-[50%] opacity-[0.35] dark:opacity-[0.16] blur-[200px] dark:blur-[240px] animate-[glow-breathe_10s_ease-in-out_infinite_1s]"
          style={{ background: "radial-gradient(ellipse at 55% 50%, rgba(234,179,8,0.75) 0%, rgba(220,165,5,0.3) 45%, rgba(200,150,0,0.06) 65%, transparent 80%)" }}
        />
      </div>

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
            What You Get
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">launch fast</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            A complete end-to-end service. Design, development, deployment, and beyond.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative p-7 rounded-2xl bg-gray-50 dark:bg-surface-dark-elevated border border-gray-100 dark:border-surface-dark-border hover:border-brand-primary/20 dark:hover:border-brand-primary/30 ambient-card hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-light dark:bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-brand-primary group-hover:to-brand-secondary group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
