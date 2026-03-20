"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

// ─── Brand color: #5547F0 = rgb(85, 71, 240) ──────────────
const AC = "85, 71, 240"; // accent color RGB for rgba()

// ─── Icons (12×12) ─────────────────────────────────────────
function CardIcon({ type }: { type: string }) {
  const p = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "search":   return <svg {...p}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
    case "database": return <svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
    case "code":     return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "palette":  return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "wrench":   return <svg {...p}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
    case "test":     return <svg {...p}><path d="M14 2v6h6"/><path d="M4 15l4 4 8-8"/><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/></svg>;
    case "rocket":   return <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>;
    default: return null;
  }
}

// ─── Progress ring ─────────────────────────────────────────
function ProgressRing({ value, size = 34, sw = 2.5 }: { value: number; size?: number; sw?: number }) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - value / 100);
  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`rgba(${AC},0.1)`} strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`rgba(${AC},0.75)`} strokeWidth={sw}
        strokeDasharray={`${c}`} strokeDashoffset={off} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 3} textAnchor="middle" fill={`rgba(${AC},0.9)`} fontSize="9" fontWeight="700">
        {value}<tspan fontSize="6">%</tspan>
      </text>
    </svg>
  );
}

// ─── Sparkline ─────────────────────────────────────────────
function Sparkline({ points }: { points: number[] }) {
  const h = 18, w = 52, max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - 2 - ((v - min) / range) * (h - 4)}`).join(" ");
  const last = points[points.length - 1], ly = h - 2 - ((last - min) / range) * (h - 4);
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={pts} fill="none" stroke={`rgba(${AC},0.45)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={ly} r="2" fill={`rgba(${AC},0.7)`} />
    </svg>
  );
}

// ─── Card analytics ────────────────────────────────────────
function CardViz({ day, dark }: { day: string; done: boolean; dark: boolean }) {
  const at = "text-[#5547F0]";
  const st = dark ? "text-white/40" : "text-[#475569]";
  const badge = dark
    ? "bg-[rgba(85,71,240,0.1)] text-[rgba(85,71,240,0.7)]"
    : "bg-[rgba(85,71,240,0.08)] text-[#5547F0]";
  const numMuted = dark ? "text-white/55" : "text-[#334155]";
  const barBg = dark ? "bg-white/[0.06]" : "bg-[#E5E7EB]";

  switch (day) {
    case "1": return (
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className={`text-[16px] font-bold leading-none ${at}`}>12</span>
          <span className={`text-[9px] ${st}`}>features</span>
        </div>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>Scoped</span>
      </div>
    );
    case "2": return (
      <div className="flex items-center gap-1.5">
        <span className={`text-[9px] font-medium ${st}`}>3 models</span>
        <div className="flex gap-0.5">
          {["Schema", "Auth", "Seed"].map(s => (
            <span key={s} className={`text-[7px] font-bold px-1 py-0.5 rounded ${dark ? "bg-[rgba(85,71,240,0.08)] text-[rgba(85,71,240,0.55)]" : "bg-[rgba(85,71,240,0.06)] text-[#5547F0]"}`}>{s}</span>
          ))}
        </div>
      </div>
    );
    case "3": return (
      <div className="flex items-center justify-between gap-2">
        <Sparkline points={[2, 5, 8, 14, 22, 30, 47]} />
        <ProgressRing value={47} />
      </div>
    );
    case "4": return (
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className={`text-[16px] font-bold leading-none ${at}`}>8</span>
          <span className={`text-[9px] ${st}`}>screens</span>
        </div>
        <div className="flex gap-0.5">
          {["#5547F0", "#8B5CF6", "#14B8A6", "#F59E0B"].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: dark ? 0.65 : 0.8 }} />
          ))}
        </div>
      </div>
    );
    case "5": return (
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex justify-between text-[8px] mb-0.5">
            <span className={st}>Progress</span>
            <span className={`font-bold ${at}`}>5/7</span>
          </div>
          <div className={`h-1 ${barBg} rounded-full overflow-hidden`}>
            <div className="h-full rounded-full" style={{ width: "71%", background: `rgba(${AC},0.55)` }} />
          </div>
        </div>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>Active</span>
      </div>
    );
    case "6": return (
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-[14px] font-bold leading-none ${numMuted}`}>24</span>
            <span className={`text-[9px] ${st}`}>tests</span>
          </div>
          <span className={`text-[8px] ${st}`}>passed</span>
        </div>
        <ProgressRing value={84} size={36} />
      </div>
    );
    case "7": return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `rgba(${AC},0.6)` }} />
          <span className={`text-[9px] font-medium ${dark ? "text-white/45" : "text-[#475569]"}`}>Ready to deploy</span>
        </div>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>Go live</span>
      </div>
    );
    default: return null;
  }
}

// ─── Data ──────────────────────────────────────────────────
const DAYS = [
  { day: "1", task: "Discovery & scope lock",   done: true,  icon: "search" },
  { day: "2", task: "Auth + database setup",    done: true,  icon: "database" },
  { day: "3", task: "Core feature build",       done: true,  icon: "code" },
  { day: "4", task: "UI polish + integrations", done: true,  icon: "palette" },
  { day: "5", task: "Feature completion",       done: false, icon: "wrench" },
  { day: "6", task: "Testing & feedback",       done: false, icon: "test" },
  { day: "7", task: "Ship day",                 done: false, icon: "rocket" },
];

// ─── Layout (compact — fits viewport) ──────────────────────
const W = 920, H = 550; // scene container (native size)
const CARD_W = 215;     // card width px (~13% larger)
const CARD_H = 114;     // approx card height px
const CW = (CARD_W / W) * 100;
const CHH = (CARD_H / H) * 100 / 2;

const CCX = 50, CCY = 46;
const CORE_R = 75; // circle visual radius px
const RX = (CORE_R / W) * 100;
const RY = (CORE_R / H) * 100;

type CP = { top: string; left?: string; right?: string; rot: number; dur: number; del: number; cx: boolean; lx: number; ly: number };

const CARDS: CP[] = [
  { top: "4%",  left: "4%",  rot: -2, dur: 5.2, del: 0.0, cx: false, lx: 4 + CW,       ly: 4 + CHH },
  { top: "36%", left: "2%",  rot: -4, dur: 5.6, del: 0.5, cx: false, lx: 2 + CW,       ly: 36 + CHH },
  { top: "66%", left: "4%",  rot: -2, dur: 5.0, del: 1.0, cx: false, lx: 4 + CW,       ly: 66 + CHH },
  { top: "82%", left: "50%", rot: 0,  dur: 5.4, del: 1.4, cx: true,  lx: 50,            ly: 82 },
  { top: "4%",  right: "4%", rot: 2,  dur: 5.3, del: 0.2, cx: false, lx: 100 - 4 - CW, ly: 4 + CHH },
  { top: "36%", right: "2%", rot: 4,  dur: 4.9, del: 0.7, cx: false, lx: 100 - 2 - CW, ly: 36 + CHH },
  { top: "66%", right: "4%", rot: 2,  dur: 5.1, del: 1.1, cx: false, lx: 100 - 4 - CW, ly: 66 + CHH },
];

function circleEdge(lx: number, ly: number) {
  const dx = lx - CCX, dy = ly - CCY;
  if (dx === 0 && dy === 0) return { x: CCX, y: CCY };
  const t = 1 / Math.sqrt((dx / RX) ** 2 + (dy / RY) ** 2);
  return { x: CCX + dx * t, y: CCY + dy * t };
}

// ─── Proportional scene scaling hook ───────────────────────
function useSceneScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

// ─── Card style helper ─────────────────────────────────────
function cardStyle(dark: boolean) {
  return dark
    ? {
        background: "rgba(14,18,30,0.75)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 20px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.02)",
      }
    : {
        background: "rgba(255,255,255,0.82)",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(108,63,230,0.08)",
      };
}

// ─── Full visual scene (reused for desktop + tablet) ───────
function VisualScene({ scale, dark }: { scale: number; dark: boolean }) {
  const lineColor = dark ? `rgba(${AC},0.12)` : `rgba(${AC},0.18)`;
  const dotOuter = dark ? `rgba(${AC},0.05)` : `rgba(${AC},0.06)`;
  const dotOuterStroke = dark ? `rgba(${AC},0.25)` : `rgba(${AC},0.3)`;
  const dotInner = dark ? `rgba(${AC},0.5)` : `rgba(${AC},0.55)`;
  const edgeDotOuter = dark ? `rgba(${AC},0.06)` : `rgba(${AC},0.08)`;
  const edgeDotStroke = dark ? `rgba(${AC},0.2)` : `rgba(${AC},0.25)`;
  const edgeDotInner = dark ? `rgba(${AC},0.4)` : `rgba(${AC},0.45)`;

  const cs = cardStyle(dark);
  const taskColor = dark ? "text-white/50" : "text-[#475569]";
  const borderColor = dark ? "border-white/[0.04]" : "border-[#E5E7EB]";

  return (
    <div
      className="absolute top-0 left-0 origin-top-left"
      style={{ width: `${W}px`, height: `${H}px`, transform: `scale(${scale})` }}
    >
      {/* Connector lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
        <defs>
          <filter id="lg"><feGaussianBlur stdDeviation="1.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {CARDS.map((cp, i) => {
          const e = circleEdge(cp.lx, cp.ly);
          return (
            <g key={i} filter="url(#lg)">
              <line x1={`${e.x}%`} y1={`${e.y}%`} x2={`${cp.lx}%`} y2={`${cp.ly}%`} stroke={lineColor} strokeWidth="1" />
              <circle cx={`${cp.lx}%`} cy={`${cp.ly}%`} r="3" fill={dotOuter} stroke={dotOuterStroke} strokeWidth="0.8" />
              <circle cx={`${cp.lx}%`} cy={`${cp.ly}%`} r="1.2" fill={dotInner} />
              <circle cx={`${e.x}%`} cy={`${e.y}%`} r="2" fill={edgeDotOuter} stroke={edgeDotStroke} strokeWidth="0.6" />
              <circle cx={`${e.x}%`} cy={`${e.y}%`} r="0.8" fill={edgeDotInner} />
            </g>
          );
        })}
      </svg>

      {/* AI Core Circle */}
      <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full blur-[80px]" style={{ background: `rgba(${AC},${dark ? 0.08 : 0.05})`, animation: "hero-glow-pulse 5s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full blur-[40px]" style={{ background: `rgba(${AC},${dark ? 0.06 : 0.04})` }} />

        {/* Orbit ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full" style={{ border: `1px solid rgba(${AC},${dark ? 0.12 : 0.15})`, animation: "hero-ring-spin 25s linear infinite" }}>
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(${AC},0.5)`, boxShadow: `0 0 6px rgba(${AC},0.35)` }} />
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: `rgba(${AC},0.3)` }} />
        </div>

        {/* Counter orbit */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[128px] rounded-full border border-dashed" style={{ borderColor: `rgba(${AC},${dark ? 0.06 : 0.1})`, animation: "hero-ring-spin 35s linear infinite reverse" }} />

        {/* Glass circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108px] h-[108px] rounded-full backdrop-blur-xl" style={{
          border: `2px solid rgba(${AC},${dark ? 0.25 : 0.2})`,
          background: dark
            ? `radial-gradient(circle at 40% 35%, rgba(${AC},0.08), rgba(${AC},0.02) 60%, transparent)`
            : `radial-gradient(circle at 40% 35%, rgba(${AC},0.06), rgba(${AC},0.02) 60%, rgba(255,255,255,0.6))`,
          boxShadow: dark
            ? `0 0 25px rgba(${AC},0.1), 0 0 50px rgba(${AC},0.04), inset 0 0 20px rgba(${AC},0.04)`
            : `0 0 25px rgba(${AC},0.08), 0 0 50px rgba(${AC},0.03), inset 0 0 20px rgba(${AC},0.03)`,
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full" style={{ border: `1px solid rgba(${AC},${dark ? 0.08 : 0.1})` }} />

        {/* Shield */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill={`rgba(${AC},${dark ? 0.07 : 0.06})`} stroke={`rgba(${AC},0.4)`} strokeWidth="1" />
            <path d="M9 12l2 2 4-4" stroke={`rgba(${AC},0.65)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Day cards */}
      {DAYS.map((d, i) => {
        const cp = CARDS[i];

        if (cp.cx) {
          return (
            <div
              key={d.day}
              className="absolute z-20"
              style={{ top: cp.top, left: "50%", transform: "translateX(-50%)", width: `${CARD_W}px` }}
            >
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}>
                <div style={{ animation: `hero-float ${cp.dur}s ease-in-out ${cp.del}s infinite` }}>
                  <div className="backdrop-blur-xl rounded-2xl p-3.5 cursor-default transition-all duration-300 hover:scale-[1.02]" style={cs}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${AC},0.12)`, color: "#5547F0" }}>
                        <CardIcon type={d.icon} />
                      </div>
                      <span className="text-[11px] font-bold tracking-widest" style={{ color: "#5547F0" }}>DAY {d.day}</span>
                      {d.done && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto" style={{ color: `rgba(${AC},0.55)` }}>
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-[12px] leading-snug ${taskColor} mb-2.5`}>{d.task}</p>
                    <div className={`border-t ${borderColor} pt-2`}>
                      <CardViz day={d.day} done={d.done} dark={dark} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        }

        const pos: React.CSSProperties = { top: cp.top };
        if (cp.left !== undefined) pos.left = cp.left;
        else if (cp.right !== undefined) pos.right = cp.right;

        return (
          <motion.div key={d.day} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}
            className="absolute z-20" style={{ ...pos, width: `${CARD_W}px` }}>
            <div style={{ transform: `rotate(${cp.rot}deg)` }}>
              <div style={{ animation: `hero-float ${cp.dur}s ease-in-out ${cp.del}s infinite` }}>
                <div className="backdrop-blur-xl rounded-2xl p-3 cursor-default transition-all duration-300 hover:scale-[1.02]" style={cs}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${AC},0.12)`, color: "#5547F0" }}>
                      <CardIcon type={d.icon} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: "#5547F0" }}>DAY {d.day}</span>
                    {d.done && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="ml-auto" style={{ color: `rgba(${AC},0.55)` }}>
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-[11px] leading-snug ${taskColor} mb-2`}>{d.task}</p>
                  <div className={`border-t ${borderColor} pt-2`}>
                    <CardViz day={d.day} done={d.done} dark={dark} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Text content block ────────────────────────────────────
function HeroText({ center = false, dark }: { center?: boolean; dark: boolean }) {
  const align = center ? "text-center items-center justify-center" : "text-left";
  return (
    <>
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 lg:mb-6"
        style={{
          background: dark ? `rgba(${AC},0.08)` : `rgba(${AC},0.06)`,
          border: dark ? `1px solid rgba(${AC},0.15)` : `1px solid rgba(${AC},0.12)`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className={`text-sm font-medium ${dark ? "text-white/80" : "text-[#334155]"}`}>Accepting New Projects</span>
      </div>

      {/* Heading */}
      <h1 className={`text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] xl:text-[60px] font-extrabold leading-[1.12] tracking-tight mb-4 lg:mb-5 ${dark ? "text-white" : "text-[#121212]"}`}>
        Turn your idea into an{" "}
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #5547F0, #8B5CF6, #A78BFA)` }}>
          MVP in 7 days
        </span>
      </h1>

      {/* Description */}
      <p className={`text-[15px] md:text-[16px] leading-relaxed mb-6 lg:mb-8 ${center ? "mx-auto max-w-md" : "max-w-lg"} ${dark ? "text-white/50" : "text-[#475569]"}`}>
        Book a free call, tell us your idea, and our senior dev team + AI tooling will build, design, and ship your production-ready MVP — in one week. No long timelines. No bloated agencies. Just execution.
      </p>

      {/* CTA Buttons */}
      <div className={`flex flex-wrap gap-3 sm:gap-4 mb-6 lg:mb-8 ${align}`}>
        <button onClick={() => document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-lg font-semibold text-white text-[14px] sm:text-[15px] transition-all duration-200 hover:brightness-110 cursor-pointer" style={{ background: `linear-gradient(135deg, #5547F0, #7C3AED)` }}>
          Book Free Call <span aria-hidden="true">&rarr;</span>
        </button>
        <a
          href="#how-it-works"
          className={`inline-flex items-center px-5 sm:px-7 py-3 rounded-lg font-semibold text-[14px] sm:text-[15px] transition-all duration-200 ${dark ? "text-white/80 hover:text-white" : "text-[#334155] hover:text-[#121212]"}`}
          style={{
            border: dark ? `1px solid rgba(255,255,255,0.12)` : `1px solid #D1D5DB`,
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
          }}
        >
          View Process
        </a>
      </div>

      {/* Trust stats */}
      <div className={`flex flex-wrap gap-x-4 lg:gap-x-5 gap-y-2 ${align}`}>
        {["50+ MVPs shipped", "7-day delivery", "Fixed pricing", "NDA signed Day 1"].map(stat => (
          <span key={stat} className={`flex items-center gap-1.5 text-[12px] sm:text-[13px] ${dark ? "text-white/40" : "text-[#64748B]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`rgba(${AC},${dark ? 0.5 : 0.6})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {stat}
          </span>
        ))}
      </div>
    </>
  );
}

// ─── Component ─────────────────────────────────────────────
export default function HeroSection() {
  const { ref: sceneRef, scale } = useSceneScale();
  const { dark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-clip">
      {/* ── Background ──────────────────────────────── */}
      {dark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0918] via-[#120e2a] to-[#080614]" />
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}

      {/* ── Ambient glows ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full blur-[140px]" style={{ background: `rgba(${AC},${dark ? 0.08 : 0.04})` }} />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-[130px]" style={{ background: dark ? "rgba(139,92,246,0.06)" : "rgba(139,92,246,0.03)" }} />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: `rgba(${AC},${dark ? 0.06 : 0.03})` }} />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: `rgba(${AC},${dark ? 0.06 : 0.03})` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] w-[280px] h-[280px] rounded-full blur-[60px]" style={{ background: `rgba(${AC},${dark ? 0.05 : 0.025})` }} />
        {/* Grid */}
        {dark ? (
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }} />
        ) : (
          <div className="absolute inset-0 opacity-100" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }} />
        )}
      </div>

      {/* ── Keyframes ───────────────────────────────── */}
      <style>{`
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes hero-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes hero-glow-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.03); } }
      `}</style>

      {/* ── Main container ─────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">

        {/* ── Layout: flex-col on mobile/tablet, row on lg+ ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12">

          {/* ── TEXT SIDE ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[45%] xl:w-[42%] flex-shrink-0 text-center lg:text-left mb-10 md:mb-12 lg:mb-0"
          >
            <HeroText center={false} dark={dark} />
          </motion.div>

          {/* ── VISUAL SIDE ────────────────────────────── */}
          <div className="w-full lg:w-[55%] xl:w-[58%] flex-shrink-0">

            {/* Full scene — visible on md+ (tablet & desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="hidden md:block pb-16"
            >
              <div
                ref={sceneRef}
                className="relative w-full mx-auto overflow-visible"
                style={{ maxWidth: `${W}px`, aspectRatio: `${W} / ${H}` }}
              >
                <VisualScene scale={scale} dark={dark} />
              </div>
            </motion.div>

            {/* Simplified mobile visual — visible below md */}
            <div className="md:hidden">
              <div className="flex justify-center mb-6">
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute inset-0 rounded-full backdrop-blur-md" style={{
                    border: `1.5px solid rgba(${AC},${dark ? 0.2 : 0.15})`,
                    background: dark
                      ? `radial-gradient(circle, rgba(${AC},0.06), transparent 70%)`
                      : `radial-gradient(circle, rgba(${AC},0.04), rgba(255,255,255,0.8) 70%)`,
                    boxShadow: dark
                      ? `0 0 20px rgba(${AC},0.08)`
                      : `0 0 20px rgba(${AC},0.06), 0 2px 8px rgba(0,0,0,0.04)`,
                  }} />
                  <div className="absolute inset-[-10px] rounded-full" style={{ border: `1px solid rgba(${AC},${dark ? 0.08 : 0.1})`, animation: "hero-ring-spin 20s linear infinite" }}>
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: `rgba(${AC},0.4)` }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill={`rgba(${AC},0.08)`} stroke={`rgba(${AC},0.4)`} strokeWidth="1" />
                      <path d="M9 12l2 2 4-4" stroke={`rgba(${AC},0.65)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {DAYS.map(d => (
                  <div key={d.day} className={`backdrop-blur-md rounded-xl p-3.5 ${d.day === "4" ? "col-span-2" : ""}`} style={cardStyle(dark)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `rgba(${AC},0.12)`, color: "#5547F0" }}>
                        <CardIcon type={d.icon} />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: "#5547F0" }}>DAY {d.day}</span>
                    </div>
                    <p className={`text-[11px] leading-snug ${dark ? "text-white/50" : "text-[#475569]"}`}>{d.task}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
