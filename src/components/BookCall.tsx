"use client";

import { motion } from "framer-motion";
import FloatingRobot from "./FloatingRobot";

const CALENDAR_DAYS = [
  { day: "Mon", slots: 3 },
  { day: "Tue", slots: 2 },
  { day: "Wed", slots: 5 },
  { day: "Thu", slots: 1 },
  { day: "Fri", slots: 4 },
];

export default function BookCall() {
  return (
    <section className="relative py-24 md:py-32 bg-gray-50 dark:bg-surface-dark transition-colors duration-300" id="book-call">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
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

            <div className="mt-8 space-y-4">
              {[
                "Understand your idea & target users",
                "Define MVP scope & core features",
                "Get a clear timeline & fixed quote",
                "Ask us anything — tech stack, process, team",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-[15px]">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Schedule Your Free Call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Calendar-style UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative pt-10 md:pt-12 lg:pt-14">
              {/* Robot — anchored to the calendar card's top edge */}
              <FloatingRobot />

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/15 to-brand-secondary/15 rounded-3xl blur-2xl dark:opacity-50" />

              <div className="relative bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-surface-dark-border rounded-2xl p-7 shadow-xl z-10">
                {/* Calendar header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">March 2026</h3>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Select a time slot</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18L9 12L15 6" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18L15 12L9 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Days row */}
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {CALENDAR_DAYS.map((d, i) => (
                    <div
                      key={d.day}
                      className={`text-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        i === 2
                          ? "bg-gradient-to-br from-brand-primary to-brand-secondary text-white border-transparent shadow-lg shadow-brand-primary/20"
                          : "bg-gray-50 dark:bg-surface-dark-card border-gray-200 dark:border-surface-dark-border hover:border-brand-primary/30 dark:hover:border-brand-primary/30"
                      }`}
                    >
                      <p className={`text-xs font-medium mb-1 ${i === 2 ? "text-white/70" : "text-gray-400 dark:text-gray-500"}`}>{d.day}</p>
                      <p className={`text-lg font-bold ${i === 2 ? "text-white" : "text-gray-900 dark:text-white"}`}>{18 + i}</p>
                      <p className={`text-[10px] mt-1 ${i === 2 ? "text-white/60" : "text-gray-400 dark:text-gray-500"}`}>
                        {d.slots} slots
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Available times (EST)</p>
                  {["9:00 AM", "10:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"].map((time, i) => (
                    <div
                      key={time}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        i === 1
                          ? "bg-brand-primary/5 dark:bg-brand-primary/10 border-brand-primary/20 dark:border-brand-primary/30"
                          : "bg-gray-50 dark:bg-surface-dark-card border-gray-200 dark:border-surface-dark-border hover:border-brand-primary/20 dark:hover:border-brand-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${i === 1 ? "bg-brand-primary" : "bg-gray-300 dark:bg-gray-600"}`} />
                        <span className={`text-sm font-medium ${i === 1 ? "text-brand-primary" : "text-gray-700 dark:text-gray-300"}`}>{time}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        i === 1
                          ? "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary"
                          : "bg-gray-100 dark:bg-surface-dark-elevated text-gray-500 dark:text-gray-400"
                      }`}>
                        30 min
                      </span>
                    </div>
                  ))}
                </div>

                {/* Confirm button */}
                <div className="mt-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl py-3.5 text-center cursor-pointer hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-200">
                  <span className="text-white font-semibold text-sm">Confirm — 10:30 AM, Wed Mar 20</span>
                </div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
