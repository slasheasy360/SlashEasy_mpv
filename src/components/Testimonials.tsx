"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    quote: "SlashEasy took our napkin sketch and turned it into a fully working SaaS in 6 days. Our investors were blown away at the demo.",
    name: "Priya Sharma",
    role: "Founder, FinFlow",
    avatar: "#6C3FE6",
    initials: "PS",
    stars: 5,
  },
  {
    quote: "I'd been quoted 3 months and $40K by agencies. SlashEasy delivered a better product in 7 days for a fraction of the cost.",
    name: "Marcus Chen",
    role: "CEO, NoteStack",
    avatar: "#8B5CF6",
    initials: "MC",
    stars: 5,
  },
  {
    quote: "The process was incredibly smooth — daily updates, clean code, and they actually understood what I was building. Shipped on time, no excuses.",
    name: "Sarah Williams",
    role: "CTO, GreenLeaf",
    avatar: "#10B981",
    initials: "SW",
    stars: 4,
  },
  {
    quote: "We used SlashEasy to validate our idea before raising. The MVP helped us close our pre-seed round in 3 weeks. Absolute game-changer.",
    name: "Daniel Okafor",
    role: "Founder, Peleza",
    avatar: "#F59E0B",
    initials: "DO",
    stars: 5,
  },
  {
    quote: "Their team is nothing short of fantastic — extremely helpful, incredibly quick, and utterly professional in every interaction. The quality of their work speaks volumes.",
    name: "Reece Akhtar",
    role: "CEO, Deeper Signals",
    avatar: "#EC4899",
    initials: "RA",
    stars: 5,
  },
  {
    quote: "Simon and the team are essential to my team. They strike the right balance of beautiful design and functional usability. Super efficient to implement.",
    name: "Scott Willman",
    role: "EVP of Product, SmartCloud",
    avatar: "#3B82F6",
    initials: "SC",
    stars: 4,
  },
  {
    quote: "Our product and website redesign went great. But more than that, SlashEasy was just amazing to work with and made the whole process fun and stress free.",
    name: "Patrick Kelly",
    role: "CEO, ClickMagick",
    avatar: "#14B8A6",
    initials: "PK",
    stars: 5,
  },
  {
    quote: "Their creativity-fueled technical skills resulted in visually stunning, user-friendly mobile app and web designs. An absolute pleasure working with such talented people.",
    name: "Marta Tloczek",
    role: "Product Owner, Pix",
    avatar: "#F97316",
    initials: "MT",
    stars: 4,
  },
  {
    quote: "Working with SlashEasy has been a breeze. They really nailed the details and delivered top-notch design. If you want things done right, they're your go-to.",
    name: "Hu Dan",
    role: "Founder, Milte",
    avatar: "#A855F7",
    initials: "HD",
    stars: 5,
  },
  {
    quote: "Reliable, fast, and easy. They came up with numerous options and worked really hard to create the perfect design for us. Couldn't be happier!",
    name: "Jackie Sheely",
    role: "Co-Founder, Legacy Blueprint",
    avatar: "#EF4444",
    initials: "JS",
    stars: 4,
  },
  {
    quote: "Working with SlashEasy has been a pleasure. They were fast, great in communication, and crafted an excellent design that exceeded expectations.",
    name: "Helene Auramo",
    role: "CEO, Prönö",
    avatar: "#06B6D4",
    initials: "HA",
    stars: 5,
  },
  {
    quote: "After 7+ years in the SaaS industry, I can confidently say the team at SlashEasy is among the most talented I've worked with. They go above and beyond.",
    name: "Amneet Bains",
    role: "Marketing Lead, Stepsize",
    avatar: "#84CC16",
    initials: "AB",
    stars: 5,
  },
];

// Split testimonials into 3 columns
const COL_1 = TESTIMONIALS.filter((_, i) => i % 3 === 0);
const COL_2 = TESTIMONIALS.filter((_, i) => i % 3 === 1);
const COL_3 = TESTIMONIALS.filter((_, i) => i % 3 === 2);

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white dark:bg-surface-dark-elevated border border-gray-100 dark:border-surface-dark-border hover:border-brand-primary/20 dark:hover:border-brand-primary/30 ambient-card transition-all duration-300 mb-5">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={j < t.stars ? "#FBBF24" : "#D1D5DB"}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-[14px] leading-relaxed mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
          style={{ backgroundColor: t.avatar }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
          <p className="text-gray-400 dark:text-gray-500 text-[12px]">{t.role}</p>
        </div>
      </div>

      {/* Quote decoration */}
      <div className="absolute top-4 right-6 text-brand-primary/[0.05] dark:text-brand-primary/[0.07] text-6xl font-serif leading-none select-none pointer-events-none">
        &ldquo;
      </div>
    </div>
  );
}

function ScrollColumn({
  testimonials,
  speed = 25,
  direction = "up",
}: {
  testimonials: typeof TESTIMONIALS;
  speed?: number;
  direction?: "up" | "down";
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // We duplicate the list to create seamless infinite scroll
  const items = [...testimonials, ...testimonials];

  const animationDuration = testimonials.length * speed;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "700px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F0F0F8] dark:from-surface-dark-card to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F0F0F8] dark:from-surface-dark-card to-transparent z-10 pointer-events-none" />

      <div
        ref={columnRef}
        className="flex flex-col"
        style={{
          animation: `scroll-${direction} ${animationDuration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32 bg-[#F0F0F8] dark:bg-surface-dark-card transition-colors duration-300"
      id="testimonials"
    >
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand-primary/10 text-brand-primary text-[13px] font-semibold tracking-wide mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Proven track of{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              satisfied clients
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            We cherish relations to blossom and last. Here&apos;s what founders say about us.
          </p>
        </motion.div>

        {/* Auto-scrolling columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ScrollColumn testimonials={COL_1} speed={28} direction="up" />
          <ScrollColumn testimonials={COL_2} speed={32} direction="down" />
          <div className="hidden lg:block">
            <ScrollColumn testimonials={COL_3} speed={26} direction="up" />
          </div>
        </div>
      </div>
    </section>
  );
}
