"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";

interface ScrollyOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export function ScrollyOverlay({ scrollYProgress }: ScrollyOverlayProps) {
  // --- Section 1: Opening Title (0% to 15%) ---
  // Hold fully visible until 12%, then fade out slowly by 18%
  const o1s = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.20], [1, 1, 0, 0]);
  const y1s = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.20], [0, 0, -20, -20]);

  // --- Section 2: Left Aligned (25% to 45%) ---
  const o2s = useTransform(scrollYProgress, [0, 0.22, 0.28, 0.42, 0.48, 1], [0, 0, 1, 1, 0, 0]);
  const y2s = useTransform(scrollYProgress, [0, 0.22, 0.28, 0.42, 0.48, 1], [40, 40, 0, 0, -40, -40]);

  // --- Section 3: Right Aligned (55% to 75%) ---
  const o3s = useTransform(scrollYProgress, [0, 0.52, 0.58, 0.72, 0.78, 1], [0, 0, 1, 1, 0, 0]);
  const y3s = useTransform(scrollYProgress, [0, 0.52, 0.58, 0.72, 0.78, 1], [40, 40, 0, 0, -40, -40]);

  // --- Section 4: Left Aligned CTA (82% to 96%) ---
  // Visible until end of container
  const o4s = useTransform(scrollYProgress, [0, 0.80, 0.85, 0.96, 1], [0, 0, 1, 1, 0]);
  const y4s = useTransform(scrollYProgress, [0, 0.80, 0.85, 0.96, 1], [40, 40, 0, 0, -40]);

  return (
    <div className="absolute inset-0 pointer-events-none h-screen ">
      
      {/* 
        ========================================================
        SECTION 1: CENTERED OPENING
        ========================================================
      */}
      <motion.div 
        className="absolute inset-0 flex  flex-col justify-end items-center pb-24 md:pb-32 px-6 overflow-hidden"
        style={{ opacity: o1s, y: y1s }}
      >
        <div 
          className="absolute  inset-x-0 bottom-0 h-[90%] pointer-events-none -z-10"
          style={{ background: "linear-gradient(to top, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.60) 60%, transparent 100%)" }}
        />
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 pointer-events-auto mt-auto">
          <Image 
            src="/assets/logo.png" 
            alt="TasHeel Moral Academy" 
            width={160} 
            height={64} 
            className="mb-8 w-auto h-12 md:h-16 invert brightness-0"
            style={{ width: "auto", height: "auto" }}
          />

          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-6 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4713A] animate-pulse" />
            Admissions Open • 2026
          </span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4713A] via-[#D4A96A] to-[#C4713A]">
              Learn Quran.
            </span>
            <br />
            Understand Arabic.
            <br />
            Live Islam.
          </h1>

          <p className="font-body text-lg md:text-xl text-[#F7F4EF]/80 max-w-2xl font-light leading-relaxed">
            A transformative Islamic education —<br className="hidden md:block" /> from anywhere in the world.
          </p>
        </div>
      </motion.div>

      {/* 
        ========================================================
        SECTION 2: LEFT ALIGNED
        ========================================================
      */}
      <motion.div 
        className="absolute inset-0 flex items-center px-6 md:px-16 overflow-hidden"
        style={{ opacity: o2s, y: y2s }}
      >
        <div 
          className="absolute left-0 inset-y-0 w-full md:w-[60%] pointer-events-none -z-10"
          style={{ background: "linear-gradient(to right, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
        />

        <div className="max-w-xl z-10 pointer-events-auto">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-6 font-sans">
            Expert Instructors
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-6">
            Precision in <br />
            <span className="text-[#C4713A]">Every Lesson.</span>
          </h2>

          <p className="font-body text-base md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light">
            Our certified teachers blend classical Islamic scholarship with modern pedagogy — Quran recitation, Arabic grammar, and moral studies taught with care and clarity.
          </p>
        </div>
      </motion.div>

      {/* 
        ========================================================
        SECTION 3: RIGHT ALIGNED
        ========================================================
      */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 overflow-hidden"
        style={{ opacity: o3s, y: y3s }}
      >
        <div 
          className="absolute right-0 inset-y-0 w-full md:w-[60%] pointer-events-none -z-10"
          style={{ background: "linear-gradient(to left, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
        />

        <div className="max-w-xl z-10 pointer-events-auto text-left md:text-right flex flex-col md:items-end">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-6 font-sans">
            Global Community
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-6">
            From Kerala <br />
            <span className="text-[#C4713A]">to the World.</span>
          </h2>

          <p className="font-body text-base md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light">
            Students across 20+ countries attend our live online classes. Same curriculum, same dedication — wherever you call home.
          </p>
        </div>
      </motion.div>

      {/* 
        ========================================================
        SECTION 4: LEFT ALIGNED CTA
        ========================================================
      */}
      <motion.div 
        className="absolute inset-0 flex items-center px-6 md:px-16 overflow-hidden"
        style={{ opacity: o4s, y: y4s }}
      >
        <div 
          className="absolute left-0 inset-y-0 w-full md:w-[60%] pointer-events-none -z-10"
          style={{ background: "linear-gradient(to right, rgba(18,24,43,0.95) 0%, rgba(18,24,43,0.65) 60%, transparent 100%)" }}
        />

        <div className="max-w-xl z-10 pointer-events-auto">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/10 px-4 py-2 rounded-full mb-6 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4713A] animate-pulse" />
            Start Today
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F4EF] leading-[1.1] mb-6">
            Begin Your <br />
            <span className="text-[#C4713A]">Journey.</span>
          </h2>

          <p className="font-body text-base md:text-lg text-[#F7F4EF]/80 leading-relaxed font-light mb-10">
            One free trial class.<br />
            No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C4713A] hover:bg-[#B5622B] text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-[#C4713A]/25 hover:shadow-[#C4713A]/40 hover:scale-[1.02] active:scale-[0.98] font-sans"
            >
              <CalendarCheck className="w-5 h-5" strokeWidth={1.5} />
              Book a Free Trial
            </Link>

            <Link 
              href="/courses"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#F7F4EF]/30 text-[#F7F4EF] hover:border-[#F7F4EF] hover:bg-[#F7F4EF]/10 font-semibold transition-all duration-200 font-sans"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
