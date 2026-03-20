"use client";

import { motion } from "framer-motion";
const PLANS = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    annualPrice: "Free",
    period: "forever",
    description: "Perfect for early-stage founders exploring options.",
    features: [
      "Free 30-min discovery call",
      "MVP scope & feature list",
      "Tech stack recommendation",
      "Timeline estimate",
      "No obligation",
    ],
    cta: "Book Free Call",
    ctaHref: "#book-call",
    popular: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Pro",
    monthlyPrice: "$19",
    annualPrice: "$15",
    period: "/month",
    annualBilled: "$180 billed yearly",
    saveBadge: "Save 21%",
    description: "Full MVP build with our senior development team.",
    features: [
      "Everything in Starter",
      "Full UI/UX design",
      "Full-stack development",
      "Database & API setup",
      "Authentication & payments",
      "Deployment & CI/CD",
      "7-day delivery guarantee",
    ],
    cta: "Start Your MVP",
    ctaHref: "#book-call",
    popular: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "Business",
    monthlyPrice: "$79",
    annualPrice: "$63",
    period: "/month",
    annualBilled: "$756 billed yearly",
    saveBadge: "Save 20%",
    description: "For teams that need ongoing development & priority support.",
    features: [
      "Everything in Pro",
      "Priority queue (start within 48h)",
      "Dedicated project manager",
      "Post-launch iterations (2 weeks)",
      "Performance monitoring",
      "Advanced integrations",
      "Source code + documentation",
      "Slack channel support",
    ],
    cta: "Contact Us",
    ctaHref: "#book-call",
    popular: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Pricing() {
  const isAnnual = true;

  return (
    <section className="relative py-24 md:py-32 bg-white/60 dark:bg-surface-dark-card/60 transition-colors duration-300 overflow-hidden" id="pricing">
      {/* ── Ambient glow: cool blue (left-middle) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[8%] -left-[20%] w-[900px] h-[800px] rounded-[50%] opacity-[0.35] dark:opacity-[0.16] blur-[200px] dark:blur-[240px] animate-[glow-breathe_10s_ease-in-out_infinite_4s]"
          style={{ background: "radial-gradient(ellipse at 55% 50%, rgba(59,130,246,0.7) 0%, rgba(37,99,235,0.3) 45%, rgba(29,78,216,0.06) 65%, transparent 80%)" }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">pricing</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            No hidden fees. No hourly billing. Fixed price, fixed timeline, clear deliverables.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="h-full"
            >
              <div
                className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-300 group cursor-default overflow-hidden ${
                  plan.popular
                    ? "bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0d0d1a] text-white shadow-2xl shadow-brand-primary/20 lg:scale-[1.04] hover:shadow-[0_32px_80px_-12px_rgba(108,63,230,0.35)] hover:scale-[1.06] ring-1 ring-brand-primary/20"
                    : "bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-surface-dark-border hover:border-brand-primary/30 dark:hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/[0.06] dark:hover:shadow-brand-primary/15 hover:scale-[1.03]"
                }`}
              >
                {/* Glow effect for popular */}
                {plan.popular && (
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
                )}

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <span className="px-5 py-1.5 rounded-b-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-[12px] font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    plan.popular
                      ? "bg-brand-primary/20 text-brand-secondary"
                      : "bg-brand-light dark:bg-brand-primary/10 text-brand-primary"
                  }`}
                >
                  {plan.icon}
                </div>

                {/* Plan name */}
                <h3
                  className={`text-lg font-bold mb-1.5 ${
                    plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.name}
                </h3>

                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <div className="flex items-baseline gap-1.5">
                    {isAnnual && plan.annualPrice !== plan.monthlyPrice && (
                      <span
                        className={`text-2xl font-bold line-through mr-1 ${
                          plan.popular ? "text-gray-500" : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        {plan.monthlyPrice}
                      </span>
                    )}
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        plan.popular ? "text-gray-500" : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                    {isAnnual && plan.saveBadge && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[11px] font-bold">
                        {plan.saveBadge}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.annualBilled && (
                    <p
                      className={`text-xs mt-1.5 ${
                        plan.popular ? "text-gray-500" : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {plan.annualBilled}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`my-6 h-px ${
                    plan.popular ? "bg-white/10" : "bg-gray-100 dark:bg-surface-dark-border"
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular
                            ? "bg-brand-primary/20"
                            : "bg-green-100 dark:bg-green-900/30"
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={plan.popular ? "text-brand-secondary" : "text-green-600 dark:text-green-400"}
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-[14px] leading-snug ${
                          plan.popular ? "text-gray-300" : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.cta === "Book Free Call" ? (
                  <button
                    onClick={() => document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })}
                    className={`relative block w-full py-3.5 rounded-2xl text-center font-semibold text-[15px] mt-8 transition-all duration-300 overflow-hidden group/btn cursor-pointer ${
                      plan.popular
                        ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                  </button>
                ) : (
                  <a
                    href={plan.ctaHref}
                    className={`relative block w-full py-3.5 rounded-2xl text-center font-semibold text-[15px] mt-8 transition-all duration-300 overflow-hidden group/btn ${
                      plan.popular
                        ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
