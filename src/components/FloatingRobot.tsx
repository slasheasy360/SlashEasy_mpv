"use client";

import { useRef, useEffect, useCallback } from "react";

// ─── Config ────────────────────────────────────────────────
const CURSOR_RANGE = 30;          // max px the robot drifts toward cursor
const LERP_FACTOR = 0.06;         // smoothing (lower = smoother/slower)
const BLINK_MIN_MS = 2000;        // min interval between blinks
const BLINK_MAX_MS = 5000;        // max interval between blinks
const BLINK_DURATION_MS = 180;    // how long eyelids stay shut
const MOBILE_BREAKPOINT = 768;

// ─── Component ─────────────────────────────────────────────
export default function FloatingRobot() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  // Mutable state (no re-renders)
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const isMobile = useRef(false);
  const sectionRect = useRef<DOMRect | null>(null);

  // ── Cursor tracking via requestAnimationFrame ────────────
  const tick = useCallback(() => {
    if (!isMobile.current && cursorRef.current) {
      // Lerp toward target
      current.current.x += (mouse.current.x - current.current.x) * LERP_FACTOR;
      current.current.y += (mouse.current.y - current.current.y) * LERP_FACTOR;

      // Clamp
      const cx = Math.max(-CURSOR_RANGE, Math.min(CURSOR_RANGE, current.current.x));
      const cy = Math.max(-CURSOR_RANGE, Math.min(CURSOR_RANGE, current.current.y));

      cursorRef.current.style.transform = `translate(${cx}px, ${cy}px)`;

      // Pupil micro-follow (±3px inside the eye socket)
      const pupilX = cx * 0.1;
      const pupilY = cy * 0.1;
      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", `${48 + pupilX}`);
        leftPupilRef.current.setAttribute("cy", `${55 + pupilY}`);
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute("cx", `${72 + pupilX}`);
        rightPupilRef.current.setAttribute("cy", `${55 + pupilY}`);
      }
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  // ── Mouse listener (throttled to rAF already) ───────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile.current || !wrapperRef.current) return;

    // Cache section position (recalc rarely)
    if (!sectionRect.current) {
      const section = wrapperRef.current.closest("section");
      if (section) sectionRect.current = section.getBoundingClientRect();
    }

    const rect = sectionRect.current;
    if (!rect) return;

    // Robot center (approx)
    const robotEl = wrapperRef.current;
    const rr = robotEl.getBoundingClientRect();
    const robotCx = rr.left + rr.width / 2;
    const robotCy = rr.top + rr.height / 2;

    // Direction from robot to cursor, normalized to ±CURSOR_RANGE
    const dx = e.clientX - robotCx;
    const dy = e.clientY - robotCy;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const maxInfluence = 400; // beyond this distance, full range
    const factor = Math.min(dist / maxInfluence, 1);

    mouse.current.x = (dx / dist) * CURSOR_RANGE * factor;
    mouse.current.y = (dy / dist) * CURSOR_RANGE * factor;
  }, []);

  // ── Random blink loop ────────────────────────────────────
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const blink = () => {
      // Shut eyes
      if (leftEyeRef.current) leftEyeRef.current.style.transform = "scaleY(0.08)";
      if (rightEyeRef.current) rightEyeRef.current.style.transform = "scaleY(0.08)";

      // Open eyes after BLINK_DURATION_MS
      setTimeout(() => {
        if (leftEyeRef.current) leftEyeRef.current.style.transform = "scaleY(1)";
        if (rightEyeRef.current) rightEyeRef.current.style.transform = "scaleY(1)";
      }, BLINK_DURATION_MS);

      // Schedule next blink
      const next = BLINK_MIN_MS + Math.random() * (BLINK_MAX_MS - BLINK_MIN_MS);
      timeout = setTimeout(blink, next);
    };

    // First blink after a short random delay
    timeout = setTimeout(blink, 1500 + Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, []);

  // ── Bootstrap: rAF loop + listeners + mobile detect ──────
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < MOBILE_BREAKPOINT;
      if (isMobile.current && cursorRef.current) {
        cursorRef.current.style.transform = "translate(0px, 0px)";
        current.current.x = 0;
        current.current.y = 0;
        mouse.current.x = 0;
        mouse.current.y = 0;
      }
    };
    checkMobile();

    // Invalidate cached rect on scroll/resize
    const invalidateRect = () => { sectionRect.current = null; };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", invalidateRect);
    window.addEventListener("scroll", invalidateRect, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", invalidateRect);
      window.removeEventListener("scroll", invalidateRect);
    };
  }, [tick, handleMouseMove]);

  return (
    <div
      ref={wrapperRef}
      className="absolute z-30 pointer-events-none
        -top-[52px] right-3
        md:-top-[68px] md:right-5
        lg:-top-[78px] lg:right-8"
    >
      {/* CSS: idle float + glow — runs independently of JS cursor layer */}
      <style>{`
        .robot-idle {
          animation: rb-float 4.5s ease-in-out infinite, rb-glow 3.5s ease-in-out infinite;
        }
        @keyframes rb-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30%  { transform: translateY(-6px) rotate(0.8deg); }
          60%  { transform: translateY(-10px) rotate(-0.6deg); }
          80%  { transform: translateY(-3px) rotate(0.3deg); }
        }
        @keyframes rb-glow {
          0%, 100% { filter: drop-shadow(0 6px 16px rgba(108,63,230,0.3)) drop-shadow(0 2px 4px rgba(0,0,0,0.15)); }
          50%      { filter: drop-shadow(0 10px 32px rgba(108,63,230,0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }
        }
        @keyframes rb-antenna {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes rb-chest {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.85; }
        }
        @keyframes rb-arm-l {
          0%, 100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        @keyframes rb-arm-r {
          0%, 100% { transform: rotate(4deg); }
          50%      { transform: rotate(-4deg); }
        }
      `}</style>

      {/* Layer 1: CSS float (idle) */}
      <div className="robot-idle">
        {/* Layer 2: JS cursor follow (transform set via ref) */}
        <div ref={cursorRef} className="transition-none will-change-transform">
          <div className="w-[72px] h-[88px] md:w-[96px] md:h-[112px] lg:w-[112px] lg:h-[128px]">
            <svg
              viewBox="0 0 120 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* ── Antenna ─────────────────── */}
              <line x1="60" y1="30" x2="60" y2="10" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="6" r="5" fill="#6C3FE6" style={{ animation: "rb-antenna 2.2s ease-in-out infinite" }}>
                <animate attributeName="r" values="4;6.5;4" dur="2.2s" repeatCount="indefinite" />
              </circle>
              {/* Antenna glow ring */}
              <circle cx="60" cy="6" r="9" fill="none" stroke="#6C3FE6" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="8;12;8" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.2s" repeatCount="indefinite" />
              </circle>

              {/* ── Head ────────────────────── */}
              <rect x="25" y="28" width="70" height="55" rx="16" fill="url(#rbHead)" stroke="#6C3FE6" strokeWidth="2" />
              {/* Visor */}
              <rect x="34" y="39" width="52" height="32" rx="11" fill="#0B0B14" opacity="0.92" />

              {/* ── Eyes (controlled via refs) ── */}
              <g
                ref={leftEyeRef}
                style={{ transformOrigin: "48px 55px", transition: "transform 0.12s ease" }}
              >
                <circle cx="48" cy="55" r="7" fill="#6C3FE6" />
                <circle ref={leftPupilRef} cx="48" cy="55" r="3.5" fill="#A78BFA" />
                <circle cx="46" cy="52.5" r="1.8" fill="white" opacity="0.75" />
              </g>
              <g
                ref={rightEyeRef}
                style={{ transformOrigin: "72px 55px", transition: "transform 0.12s ease" }}
              >
                <circle cx="72" cy="55" r="7" fill="#6C3FE6" />
                <circle ref={rightPupilRef} cx="72" cy="55" r="3.5" fill="#A78BFA" />
                <circle cx="70" cy="52.5" r="1.8" fill="white" opacity="0.75" />
              </g>

              {/* ── Mouth ──────────────────── */}
              <path d="M49 65 Q60 73 71 65" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* ── Body ───────────────────── */}
              <rect x="30" y="86" width="60" height="36" rx="12" fill="url(#rbBody)" stroke="#6C3FE6" strokeWidth="2" />

              {/* Chest light */}
              <circle cx="60" cy="101" r="6" fill="#6C3FE6" style={{ animation: "rb-chest 2.8s ease-in-out infinite" }} />
              <circle cx="60" cy="101" r="3.5" fill="#A78BFA" style={{ animation: "rb-chest 2.8s ease-in-out infinite 0.3s" }} />
              {/* Chest glow ring */}
              <circle cx="60" cy="101" r="10" fill="none" stroke="#6C3FE6" strokeWidth="0.8" opacity="0.15">
                <animate attributeName="r" values="9;14;9" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.02;0.15" dur="2.8s" repeatCount="indefinite" />
              </circle>

              {/* ── Arms ───────────────────── */}
              <g style={{ transformOrigin: "28px 94px", animation: "rb-arm-l 3.2s ease-in-out infinite" }}>
                <rect x="10" y="90" width="18" height="9" rx="4.5" fill="#8B5CF6" opacity="0.7" />
                <circle cx="11" cy="94.5" r="3.5" fill="#8B5CF6" opacity="0.5" />
              </g>
              <g style={{ transformOrigin: "92px 94px", animation: "rb-arm-r 3.2s ease-in-out infinite" }}>
                <rect x="92" y="90" width="18" height="9" rx="4.5" fill="#8B5CF6" opacity="0.7" />
                <circle cx="109" cy="94.5" r="3.5" fill="#8B5CF6" opacity="0.5" />
              </g>

              {/* ── Ear accents ─────────────── */}
              <circle cx="25" cy="52" r="5.5" fill="#8B5CF6" opacity="0.4" />
              <circle cx="95" cy="52" r="5.5" fill="#8B5CF6" opacity="0.4" />

              {/* ── Defs ───────────────────── */}
              <defs>
                <linearGradient id="rbHead" x1="25" y1="28" x2="95" y2="83">
                  <stop offset="0%" stopColor="#1e1e36" />
                  <stop offset="100%" stopColor="#141425" />
                </linearGradient>
                <linearGradient id="rbBody" x1="30" y1="86" x2="90" y2="122">
                  <stop offset="0%" stopColor="#1e1e36" />
                  <stop offset="100%" stopColor="#101020" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
