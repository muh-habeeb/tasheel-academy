"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import BorderGlow from "@/components/BorderGlow";

interface ScrollyOverlayProps {
  scrollYProgress: MotionValue<number>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  ARCHITECTURE
//  Instead of fragile fractional keyframes, we:
//  1. Watch scrollYProgress with useMotionValueEvent
//  2. Convert it to a discrete section index (0 → 3) at clean 25% boundaries
//  3. Feed that index into AnimatePresence mode="wait"
//     → Framer Motion waits for the exit animation to finish BEFORE mounting
//       the next section, so sections NEVER overlap. Ever.
//
//  Boundaries:   0–25% = S1,  25–50% = S2,  50–75% = S3,  75–100% = S4
// ─────────────────────────────────────────────────────────────────────────────

function getSection(p: number): number {
  if (p < 0.25) return 0;
  if (p < 0.50) return 1;
  if (p < 0.75) return 2;
  return 3;
}

// Each section pair: [direction it enters from, direction it exits to]
// S1 — fades out upward (user scrolls down, content drifts up)
// S2 — slides in from LEFT,  out to LEFT
// S3 — slides in from RIGHT, out to RIGHT
// S4 — rises from BELOW,     fades out upward (end of journey)

const variants = {
  s1: {
    initial: { opacity: 1 },                                // visible on load
    animate: { opacity: 1 },
    exit:    { opacity: 0, y: -30, filter: "blur(6px)", transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  },
  s2: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0,   transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -60,  transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  },
  s3: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0,   transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: 60,   transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  },
  s4: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0,   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -20,  transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  },
};

// Shared GPU hint for gradient text — prevents bg-clip-text flicker
const gpu: React.CSSProperties = { WebkitTransform: "translateZ(0)", transform: "translateZ(0)" };

export function ScrollyOverlay({ scrollYProgress }: ScrollyOverlayProps) {
  const [section, setSection] = useState(0);

  // Watch scroll progress and switch section index at clean 25% boundaries
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = getSection(latest);
    if (next !== section) setSection(next);
  });

  return (
    <div className="absolute inset-0 pointer-events-none h-screen overflow-hidden">
      <AnimatePresence mode="wait">

        {/* ──────────────────────────────────────────────────────────────
            SECTION 1  (0 % → 25 %)
            Centered hero — logo, heading, CTA buttons.
            Blurs and drifts upward on exit.
        ────────────────────────────────────────────────────────────── */}
        {section === 0 && (
          <motion.div
            key="s1"
            {...variants.s1}
            className="absolute inset-0 flex flex-col justify-center md:justify-end items-center pb-0 md:pb-32 px-4 md:px-6"
            style={{ willChange: "opacity, transform, filter" }}
          >
            {/* bottom gradient so text is readable over the canvas */}
            <div
              className="absolute inset-x-0 bottom-0 h-[90%] -z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.55) 60%, transparent 100%)" }}
            />

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 pointer-events-auto md:mt-auto">
              {/* Logo — staggered mount animation */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              >
                <Image
                  src="/assets/logo.png"
                  alt="TasHeel Moral Academy"
                  width={160} height={64}
                  className="mb-4 md:mb-8 w-auto h-10 md:h-16 invert brightness-0"
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>

              {/* Admission badge */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#FFD97D] border border-[#FFD97D]/60 bg-[#FFD97D]/15 px-4 py-1.5 rounded-full mb-3 md:mb-6 font-sans"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD97D] animate-pulse" />
                Admissions Open • 2026
              </motion.span>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-3 md:mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4713A] via-[#D4A96A] to-[#C4713A]" style={gpu}>
                  Learn Quran.
                </span>
                <br />Understand Arabic.<br />Live Islam.
              </motion.h1>

              {/* Sub-heading */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="font-body text-sm md:text-xl text-[#F7F4EF]/80 max-w-2xl font-light leading-relaxed"
              >
                A transformative Islamic education —<br className="hidden md:block" /> from anywhere in the world.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 mt-5 md:mt-12"
              >
                <BorderGlow
                  edgeSensitivity={14} glowColor="40 80 80"
                  backgroundColor="#120F17" borderRadius={23}
                  glowRadius={51} glowIntensity={1} coneSpread={14} animated
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                >
                  <button className="cursor-pointer relative z-10 px-8 py-4 font-sans text-sm md:text-base font-semibold tracking-wide text-[#F7F4EF] w-full text-center hover:text-white transition-colors duration-300">
                    Explore Courses
                  </button>
                </BorderGlow>
                <button className="cursor-pointer px-8 py-4 rounded-full border border-[#C4713A]/50 text-[#F7F4EF] font-sans text-sm md:text-base font-semibold tracking-wide hover:bg-[#C4713A]/10 hover:border-[#C4713A] transition-all duration-300 w-full sm:w-auto text-center">
                  Enroll Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ──────────────────────────────────────────────────────────────
            SECTION 2  (25 % → 50 %)
            Expert Instructors — left-aligned, slides in from left.
        ────────────────────────────────────────────────────────────── */}
        {section === 1 && (
          <motion.div
            key="s2"
            {...variants.s2}
            className="absolute inset-0 flex items-center px-6 md:px-16"
            style={{ willChange: "opacity, transform" }}
          >
            <div
              className="absolute left-0 inset-y-0 w-full md:w-[65%] -z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
            />
            <div className="max-w-xl z-10 pointer-events-auto">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-4 md:mb-6 font-sans">
                Expert Instructors
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-4 md:mb-6">
                Precision in <br />
                <span className="text-[#C4713A]" style={gpu}>Every Lesson.</span>
              </h2>
              <p className="font-body text-sm md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light">
                Our certified teachers blend classical Islamic scholarship with modern pedagogy — Quran recitation, Arabic grammar, and moral studies taught with care and clarity.
              </p>
            </div>
          </motion.div>
        )}

        {/* ──────────────────────────────────────────────────────────────
            SECTION 3  (50 % → 75 %)
            Global Community — right-aligned, slides in from right.
        ────────────────────────────────────────────────────────────── */}
        {section === 2 && (
          <motion.div
            key="s3"
            {...variants.s3}
            className="absolute inset-0 flex items-center justify-end px-6 md:px-16"
            style={{ willChange: "opacity, transform" }}
          >
            <div
              className="absolute right-0 inset-y-0 w-full md:w-[65%] -z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
            />
            <div className="max-w-xl z-10 pointer-events-auto text-left md:text-right flex flex-col md:items-end">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-4 md:mb-6 font-sans">
                Global Community
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-4 md:mb-6">
                From Kerala <br />
                <span className="text-[#C4713A]" style={gpu}>to the World.</span>
              </h2>
              <p className="font-body text-sm md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light">
                Students across 20+ countries attend our live online classes. Same curriculum, same dedication — wherever you call home.
              </p>
            </div>
          </motion.div>
        )}

        {/* ──────────────────────────────────────────────────────────────
            SECTION 4  (75 % → 100 %)
            Begin Your Journey — left-aligned CTA, rises from below.
        ────────────────────────────────────────────────────────────── */}
        {section === 3 && (
          <motion.div
            key="s4"
            {...variants.s4}
            className="absolute inset-0 flex items-center px-6 md:px-16"
            style={{ willChange: "opacity, transform" }}
          >
            <div
              className="absolute left-0 inset-y-0 w-full md:w-[65%] -z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
            />
            <div className="max-w-xl z-10 pointer-events-auto">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-4 md:mb-6 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4713A] animate-pulse" />
                Start Today
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-4 md:mb-6">
                Begin Your <br />
                <span className="text-[#C4713A]" style={gpu}>Journey.</span>
              </h2>
              <p className="font-body text-sm md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light mb-6 md:mb-10">
                One free trial class.<br />No commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#C4713A] hover:bg-[#B5622B] text-white font-semibold text-sm md:text-base transition-all duration-200 shadow-lg shadow-[#C4713A]/25 hover:scale-[1.02] active:scale-[0.98] font-sans"
                >
                  <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  Book a Free Trial
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border border-[#F7F4EF]/30 text-[#F7F4EF] hover:border-[#F7F4EF] hover:bg-[#F7F4EF]/10 font-semibold text-sm md:text-base transition-all duration-200 font-sans"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
