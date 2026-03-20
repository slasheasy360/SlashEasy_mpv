import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import BookCall from "@/components/BookCall";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="relative z-0">
      {/* ── Ambient background glow ─────────────────────────────
           Large blurred blobs at strategic Y positions.
           Visible through semi-transparent section backgrounds.
           Hero/FinalCTA/Footer have their own opaque bgs so
           these blobs only affect the middle sections.
      ───────────────────────────────────────────────────────── */}
      {/* ── Ambient light fields ──────────────────────────────
           Each "light" is a massive element (1400–1800px) blurred
           at 50–70% of its size, at very low opacity (3–6%).
           This makes shapes completely invisible — only soft
           color temperature shifts remain.
      ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        {/* Light mode — soft pastel washes */}
        <div className="dark:hidden">
          <div className="absolute top-[200px] -left-[40%] w-[1600px] h-[1400px] rounded-full bg-purple-400/20 blur-[400px]" />
          <div className="absolute top-[1200px] -right-[30%] w-[1400px] h-[1200px] rounded-full bg-blue-400/15 blur-[350px]" />
          <div className="absolute top-[2400px] -left-[20%] w-[1800px] h-[1600px] rounded-full bg-violet-400/15 blur-[450px]" />
          <div className="absolute top-[3600px] -right-[25%] w-[1400px] h-[1400px] rounded-full bg-pink-300/12 blur-[380px]" />
        </div>

        {/* Dark mode — rich ambient washes */}
        <div className="hidden dark:block">
          <div className="absolute top-[200px] -left-[40%] w-[1800px] h-[1600px] rounded-full bg-purple-500/25 blur-[450px]" />
          <div className="absolute top-[1400px] -right-[35%] w-[1600px] h-[1400px] rounded-full bg-blue-500/18 blur-[400px]" />
          <div className="absolute top-[2600px] -left-[25%] w-[2000px] h-[1800px] rounded-full bg-brand-primary/20 blur-[500px]" />
          <div className="absolute top-[3800px] -right-[30%] w-[1600px] h-[1600px] rounded-full bg-pink-500/15 blur-[420px]" />
          <div className="absolute top-[4800px] -left-[35%] w-[1400px] h-[1200px] rounded-full bg-violet-500/18 blur-[380px]" />
        </div>
      </div>

      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Services />
      <BookCall />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
