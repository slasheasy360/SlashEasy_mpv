"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

/* ── Tech‑stack icon map ── */
const TECH_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  "HTML 5": {
    color: "#E44D26",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <path d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30 5.902 27.201z" fill="#E44D26" />
        <path d="M16 27.858l8.17-2.265 1.922-21.532H16v23.797z" fill="#F16529" />
        <path d="M16 13.407h-4.09l-.282-3.165H16V7.151H8.454l.074.832.759 8.515H16v-3.091zM16 21.434l-.014.004-3.442-.929-.22-2.466H9.221l.433 4.852 6.332 1.758.014-.004v-3.215z" fill="#EBEBEB" />
        <path d="M15.989 13.407v3.091h3.806l-.358 4.009-3.448.93v3.215l6.337-1.757.047-.522.726-8.137.076-.829h-.834l-6.352-.001zM15.989 7.151v3.091h7.466l.062-.694.141-1.567.074-.83h-7.743z" fill="#fff" />
      </svg>
    ),
  },
  CSS3: {
    color: "#1572B6",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <path d="M5.902 27.201L3.656 2H28.344l-2.249 25.197L15.985 30 5.902 27.201z" fill="#1572B6" />
        <path d="M16 27.858l8.17-2.265 1.922-21.532H16v23.797z" fill="#33A9DC" />
        <path d="M16 13.191h4.09l.282-3.165H16V6.935h7.546l-.074.832-.759 8.515H16v-3.091zM16 21.218l.014.004 3.442-.929.22-2.466h3.103l-.433 4.852-6.332 1.758-.014-.004v-3.215z" fill="#fff" />
        <path d="M16 13.191v3.091h-3.806l.358-4.009 3.448-.93V7.151l-6.337 1.757-.047.522-.726 8.137-.076.829h.834L16 13.191zM16 21.218v3.215l-6.332-1.758-.433-4.852h3.103l.22 2.466 3.442.929z" fill="#EBEBEB" />
      </svg>
    ),
  },
  Docker: {
    color: "#2496ED",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <path d="M18.2 11.8h3v2.7h1.5c.7 0 1.4-.1 2-.4.3-.1.6-.3.9-.6-.4-.5-.6-1.1-.7-1.8-.1-.9.1-1.7.5-2.3l.2-.3.3.2c1 .7 1.7 1.7 1.9 2.5.8-.2 1.8-.1 2.6.3l.4.2-.2.4c-.6 1.2-1.9 1.8-3.5 1.7-2 5.2-6.3 7.8-11.9 7.8-2.9 0-5.5-1.1-7-3.1l-.1-.1-.3-.5c-.6-1.1-.9-2.3-.9-3.6l-.1-.4h13.3V11.8zM6.2 16.1h2.7v-2.7H6.2v2.7zm3.2 0h2.7v-2.7H9.4v2.7zm3.3 0h2.7v-2.7h-2.7v2.7zm3.2 0h2.7v-2.7h-2.7v2.7zm-3.2-3.2h2.7V10.2h-2.7v2.7zm3.2 0h2.7V10.2h-2.7v2.7zm3.3 0h2.7V10.2h-2.7v2.7zm0-3.2h2.7V7h-2.7v2.7z" fill="#2496ED" />
      </svg>
    ),
  },
  "Node Js": {
    color: "#539E43",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <path d="M16 30a2.2 2.2 0 01-1.1-.3l-3.4-2c-.5-.3-.3-.4-.1-.4a6.7 6.7 0 001.5-.7l.1.1 2.6 1.6c.1.1.2.1.3 0l10.3-5.9c.1-.1.1-.2.1-.3V10.1c0-.1-.1-.2-.1-.3L15.9 3.9c-.1-.1-.2-.1-.3 0L5.3 9.8c-.1.1-.2.2-.2.3v11.8c0 .1.1.2.1.3l2.8 1.6c1.5.8 2.5-.1 2.5-1.1V11.1c0-.2.1-.3.3-.3h1.4c.2 0 .3.1.3.3v11.6c0 2.1-1.1 3.3-3.1 3.3-.6 0-1.1 0-2.4-.7L4.4 23.8A2.2 2.2 0 013.3 22V10.1c0-.8.4-1.5 1.1-1.9L14.7 2.3a2.3 2.3 0 012.2 0l10.3 5.9c.7.4 1.1 1.1 1.1 1.9v11.8c0 .8-.4 1.5-1.1 1.9L16.9 29.7c-.3.2-.7.3-1 .3z" fill="#539E43" />
      </svg>
    ),
  },
  React: {
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <circle cx="16" cy="15.974" r="2.5" fill="#61DAFB" />
        <path d="M16 21.706c-6.598 0-12-2.595-12-5.732S9.402 10.242 16 10.242s12 2.595 12 5.732-5.402 5.732-12 5.732zm0-10.144c-5.834 0-10.7 2.212-10.7 4.412s4.866 4.412 10.7 4.412 10.7-2.212 10.7-4.412-4.866-4.412-10.7-4.412z" fill="#61DAFB" />
        <path d="M11.577 28.238c-.718 0-1.304-.168-1.748-.508-1.738-1.328-.87-4.706 2.21-8.614a.65.65 0 01.51-.248.65.65 0 01.51.248.65.65 0 010 .826c-2.684 3.405-3.434 6.194-2.298 7.062.518.396 1.358.34 2.428-.162 2.682-1.26 5.552-4.148 7.882-7.926 2.33-3.778 3.574-7.494 3.416-10.198-.072-1.232-.498-2.098-1.232-2.506-1.614-.898-4.42.644-7.104 3.848a.65.65 0 01-.51.248.65.65 0 01-.51-.248.65.65 0 010-.826c3.07-3.664 6.234-5.34 8.342-4.166 1.098.612 1.762 1.804 1.854 3.426.184 3.028-1.14 7.01-3.616 10.922s-5.516 7.012-8.456 8.394c-.754.354-1.44.528-2.078.528z" fill="#61DAFB" />
        <path d="M20.42 28.238c-.638 0-1.324-.174-2.078-.528-2.94-1.382-5.98-4.486-8.456-8.394S6.27 12.306 6.454 9.278c.092-1.622.756-2.814 1.854-3.426 2.108-1.174 5.272.502 8.342 4.166a.65.65 0 010 .826.65.65 0 01-.51.248.65.65 0 01-.51-.248C12.944 7.64 10.138 6.098 8.524 6.996c-.734.408-1.16 1.274-1.232 2.506-.158 2.704 1.086 6.42 3.416 10.198s5.2 6.666 7.882 7.926c1.07.502 1.91.558 2.428.162 1.136-.868.386-3.658-2.298-7.062a.65.65 0 010-.826.65.65 0 01.51-.248.65.65 0 01.51.248c3.08 3.908 3.948 7.286 2.21 8.614-.444.34-1.03.508-1.748.508z" fill="#61DAFB" />
      </svg>
    ),
  },
  JavaScript: {
    color: "#F7DF1E",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="32" height="32" rx="2" fill="#F7DF1E" />
        <path d="M8.4 22.966l2.338-1.415c.451.8 1.012 1.389 2.023 1.389.97 0 1.604-.385 1.604-1.875v-10.14h2.876v10.193c0 3.09-1.812 4.496-4.457 4.496-2.389 0-3.771-1.236-4.485-2.729l.101.081zM19.132 22.64l2.338-1.354c.618.97 1.422 1.715 2.876 1.715 1.208 0 1.982-.604 1.982-1.44 0-1-.793-1.354-2.128-1.936l-.73-.313c-2.108-.898-3.51-2.023-3.51-4.4 0-2.19 1.667-3.857 4.274-3.857 1.854 0 3.19.645 4.152 2.338l-2.274 1.458c-.5-.898-1.04-1.25-1.878-1.25-.854 0-1.396.542-1.396 1.25 0 .876.542 1.23 1.793 1.773l.73.313c2.484 1.066 3.886 2.153 3.886 4.496 0 2.577-2.024 3.985-4.74 3.985-2.661 0-4.38-1.268-5.22-2.928l.845.15z" fill="#000" />
      </svg>
    ),
  },
  Python: {
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <path d="M15.885 2.1c-7.1 0-6.651 3.079-6.651 3.079l.008 3.19h6.769v.958H5.558S2 8.84 2 16.022s3.108 6.93 3.108 6.93h1.856v-3.334s-.1-3.108 3.057-3.108h5.264s2.96.048 2.96-2.862V7.467S18.835 2.1 15.885 2.1zm-3.694 3.099a.95.95 0 110 1.9.95.95 0 010-1.9z" fill="url(#pyA)" />
        <path d="M16.115 29.9c7.1 0 6.651-3.079 6.651-3.079l-.008-3.19h-6.769v-.958h10.453S30 23.16 30 15.978s-3.108-6.93-3.108-6.93h-1.856v3.334s.1 3.108-3.057 3.108h-5.264s-2.96-.048-2.96 2.862v6.181S13.165 29.9 16.115 29.9zm3.694-3.099a.95.95 0 110-1.9.95.95 0 010 1.9z" fill="url(#pyB)" />
        <defs>
          <linearGradient id="pyA" x1="8" y1="2" x2="20" y2="18"><stop stopColor="#387EB8" /><stop offset="1" stopColor="#366994" /></linearGradient>
          <linearGradient id="pyB" x1="12" y1="14" x2="24" y2="30"><stop stopColor="#FFE052" /><stop offset="1" stopColor="#FFC331" /></linearGradient>
        </defs>
      </svg>
    ),
  },
};

/* ── Site-specific branded fallback previews ── */
const SITE_PREVIEWS: Record<string, React.ReactNode> = {
  "Nice Grading": (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Nav bar mock */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500/80" />
          <div className="w-20 h-3 rounded bg-white/20" />
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-2.5 rounded bg-white/10" />
          <div className="w-12 h-2.5 rounded bg-white/10" />
          <div className="w-16 h-6 rounded-md bg-emerald-500/70" />
        </div>
      </div>
      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <span className="text-white text-lg font-bold tracking-tight">Nice Grading</span>
        <span className="text-white/40 text-[10px] text-center max-w-[200px]">Smart grading platform with analytics</span>
        <div className="flex gap-2 mt-1">
          <div className="w-20 h-7 rounded-lg bg-emerald-500/80" />
          <div className="w-20 h-7 rounded-lg border border-white/10" />
        </div>
      </div>
      {/* Bottom stats */}
      <div className="flex justify-center gap-6 pb-4">
        <div className="text-center"><div className="w-8 h-2 rounded bg-emerald-500/40 mx-auto mb-1" /><div className="w-12 h-1.5 rounded bg-white/10 mx-auto" /></div>
        <div className="text-center"><div className="w-8 h-2 rounded bg-teal-500/40 mx-auto mb-1" /><div className="w-12 h-1.5 rounded bg-white/10 mx-auto" /></div>
        <div className="text-center"><div className="w-8 h-2 rounded bg-cyan-500/40 mx-auto mb-1" /><div className="w-12 h-1.5 rounded bg-white/10 mx-auto" /></div>
      </div>
    </div>
  ),
  TaskFlow: (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-[#0c0a1d] via-[#1a1145] to-[#0c0a1d]">
      {/* Nav bar mock */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-violet-500/80" />
          <div className="w-16 h-3 rounded bg-white/20" />
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-2.5 rounded bg-white/10" />
          <div className="w-16 h-6 rounded-md bg-violet-500/70" />
        </div>
      </div>
      {/* Board-like layout */}
      <div className="flex-1 flex gap-3 p-4 overflow-hidden">
        {/* Column 1 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-blue-400" /><div className="w-10 h-2 rounded bg-white/15" /></div>
          <div className="h-10 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-full h-1.5 rounded bg-white/10" /><div className="w-3/4 h-1.5 rounded bg-white/5 mt-1" /></div>
          <div className="h-10 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-full h-1.5 rounded bg-white/10" /><div className="w-1/2 h-1.5 rounded bg-white/5 mt-1" /></div>
          <div className="h-8 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-3/4 h-1.5 rounded bg-white/10" /></div>
        </div>
        {/* Column 2 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-amber-400" /><div className="w-12 h-2 rounded bg-white/15" /></div>
          <div className="h-12 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-full h-1.5 rounded bg-white/10" /><div className="w-2/3 h-1.5 rounded bg-white/5 mt-1" /><div className="w-1/3 h-1.5 rounded bg-violet-500/20 mt-1" /></div>
          <div className="h-8 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-full h-1.5 rounded bg-white/10" /></div>
        </div>
        {/* Column 3 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /><div className="w-8 h-2 rounded bg-white/15" /></div>
          <div className="h-10 rounded-lg bg-white/[0.04] border border-white/5 p-2"><div className="w-full h-1.5 rounded bg-white/10" /><div className="w-1/2 h-1.5 rounded bg-white/5 mt-1" /></div>
        </div>
      </div>
      {/* Brand badge */}
      <div className="flex justify-center pb-3">
        <span className="text-white font-bold text-sm">TaskFlow</span>
      </div>
    </div>
  ),
  "Lead Catcher": (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a]">
      {/* Nav bar mock */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-orange-500/80" />
          <div className="w-20 h-3 rounded bg-white/20" />
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-6 rounded-md bg-orange-500/70" />
        </div>
      </div>
      {/* Dashboard mock */}
      <div className="flex-1 flex gap-3 p-4">
        {/* Sidebar */}
        <div className="w-12 flex flex-col gap-3 items-center pt-2">
          <div className="w-6 h-6 rounded bg-white/[0.06]" />
          <div className="w-6 h-6 rounded bg-orange-500/20" />
          <div className="w-6 h-6 rounded bg-white/[0.06]" />
          <div className="w-6 h-6 rounded bg-white/[0.06]" />
        </div>
        {/* Main */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex-1 h-12 rounded-lg bg-white/[0.04] border border-white/5 p-2">
              <div className="w-8 h-1.5 rounded bg-orange-500/30 mb-1" />
              <div className="w-12 h-3 rounded bg-white/15" />
            </div>
            <div className="flex-1 h-12 rounded-lg bg-white/[0.04] border border-white/5 p-2">
              <div className="w-8 h-1.5 rounded bg-blue-500/30 mb-1" />
              <div className="w-10 h-3 rounded bg-white/15" />
            </div>
            <div className="flex-1 h-12 rounded-lg bg-white/[0.04] border border-white/5 p-2">
              <div className="w-8 h-1.5 rounded bg-emerald-500/30 mb-1" />
              <div className="w-14 h-3 rounded bg-white/15" />
            </div>
          </div>
          {/* Table rows */}
          <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/5 p-2 flex flex-col gap-1.5">
            <div className="flex gap-2"><div className="flex-1 h-1.5 rounded bg-white/10" /><div className="w-8 h-1.5 rounded bg-orange-500/20" /></div>
            <div className="flex gap-2"><div className="flex-1 h-1.5 rounded bg-white/8" /><div className="w-8 h-1.5 rounded bg-emerald-500/20" /></div>
            <div className="flex gap-2"><div className="flex-1 h-1.5 rounded bg-white/10" /><div className="w-8 h-1.5 rounded bg-blue-500/20" /></div>
            <div className="flex gap-2"><div className="flex-1 h-1.5 rounded bg-white/8" /><div className="w-8 h-1.5 rounded bg-orange-500/20" /></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <span className="text-white font-bold text-sm">Lead Catcher</span>
      </div>
    </div>
  ),
};

const PORTFOLIO_ITEMS = [
  {
    title: "Dating App",
    category: "Frontend & Backend",
    url: "https://dating-app-jet-zeta.vercel.app/",
    tags: ["HTML 5", "CSS3", "Node Js", "JavaScript", "React"],
    featured: true,
    embed: true,
  },
  {
    title: "Nice Grading",
    category: "Frontend & Backend",
    url: "https://nice-grading.vercel.app/",
    tags: ["React", "Node Js", "CSS3", "HTML 5"],
    embed: false, // blocks iframes via X-Frame-Options
  },
  {
    title: "Invest Valute",
    category: "Frontend & Backend",
    url: "https://invest-valute.vercel.app/",
    tags: ["React", "JavaScript", "CSS3", "Node Js"],
    embed: true,
  },
  {
    title: "TaskFlow",
    category: "Frontend & Backend",
    url: "https://taskflow-r6yp.onrender.com/",
    tags: ["React", "Node Js", "HTML 5", "CSS3"],
    embed: false, // blocks iframes via X-Frame-Options
  },
  {
    title: "Lead Catcher",
    category: "Frontend & Backend",
    url: "https://lead-catcher-2abo.onrender.com/",
    tags: ["Python", "JavaScript", "Node Js", "CSS3"],
    embed: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ── Tech‑stack sidebar icons ── */
function TechSidebar({ tags }: { tags: string[] }) {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-[5]">
      {tags.slice(0, 5).map((tag) => {
        const tech = TECH_ICONS[tag];
        if (!tech) return null;
        return (
          <div
            key={tag}
            className="w-8 h-8 rounded-lg bg-white dark:bg-surface-dark-elevated shadow-md border border-gray-100 dark:border-surface-dark-border flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-110"
            title={tag}
          >
            {tech.icon}
          </div>
        );
      })}
    </div>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof PORTFOLIO_ITEMS)[0];
  index: number;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleClick = useCallback(() => {
    window.open(item.url, "_blank", "noopener,noreferrer");
  }, [item.url]);

  const sitePreview = SITE_PREVIEWS[item.title];
  const showIframe = item.embed;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      onClick={handleClick}
      className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-surface-dark-elevated border border-gray-100 dark:border-surface-dark-border hover:border-brand-primary/20 dark:hover:border-brand-primary/30 ambient-card hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
        item.featured
          ? "ring-2 ring-brand-primary/20 shadow-lg shadow-brand-primary/10"
          : ""
      }`}
    >
      {/* Preview area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-surface-dark">
        {/* Live iframe for embeddable sites */}
        {showIframe && (
          <>
            <iframe
              src={item.url}
              title={item.title}
              className={`border-0 pointer-events-none absolute top-0 left-0 transition-opacity duration-500 z-[1] ${
                iframeLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
                transformOrigin: "top left",
              }}
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
            />
            {/* Loading spinner while iframe loads */}
            {!iframeLoaded && (
              <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-gray-100 dark:bg-surface-dark">
                <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
                <span className="text-xs text-gray-400 mt-3">Loading preview...</span>
              </div>
            )}
          </>
        )}

        {/* Branded fallback for sites that block iframes */}
        {!showIframe && sitePreview && (
          <div className="absolute inset-0 z-[2]">
            {sitePreview}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[3]">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-xs font-semibold border border-white/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Project
              </span>
            </div>
          </div>
        )}

        {/* Generic fallback (no branded preview) */}
        {!showIframe && !sitePreview && (
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="text-lg font-bold mt-3">{item.title}</span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/10 text-white text-xs font-semibold mt-2 border border-white/10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Project
            </span>
          </div>
        )}

        {/* Tech stack sidebar */}
        <TechSidebar tags={item.tags} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300 pointer-events-none z-[6]" />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium mb-1">
          {item.category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors duration-200">
          {item.title}
        </h3>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-surface-dark text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-surface-dark-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* External link icon */}
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 dark:bg-surface-dark-elevated/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-20">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section
      className="relative py-24 md:py-32 bg-gray-50 dark:bg-surface-dark transition-colors duration-300 overflow-hidden"
      id="portfolio"
    >
      {/* ── Ambient glow: warm yellow (top-right) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[5%] -right-[18%] w-[900px] h-[800px] rounded-[50%] opacity-[0.30] dark:opacity-[0.14] blur-[200px] dark:blur-[240px] animate-[glow-breathe_10s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(234,179,8,0.7) 0%, rgba(220,165,5,0.25) 45%, rgba(200,150,0,0.05) 65%, transparent 80%)" }}
        />
      </div>

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
            Portfolio
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 dark:text-white leading-tight">
            Our Full Stack{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Some of our recent work
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
