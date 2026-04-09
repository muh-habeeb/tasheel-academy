"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant introductory animation with GSAP
    const ctx = gsap.context(() => {
      // 1. Initial clip-path reveal for the background image
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.8,
          ease: "power4.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with optimized Next/Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          // Fallback just in case, but user specified this specific asset
          src="/assets/bgs/stock/ashkan-forouzani-7blIFp0kFP4-unsplash.jpg"
          alt="Tasheel Moral Academy Education"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Deep elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
        >
          <span className="text-sm font-medium tracking-wide text-white uppercase letter-spacing-2">
            Admissions Open For 2026
          </span>
        </motion.div>

        {/* Masked text reveal effect for the title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay: 1, ease: [0.77, 0, 0.175, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Excellence in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Moral Education
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10"
        >
          Empowering the next generation with deep moral values, ethics, and world-class guidance. Build a foundation that lasts a lifetime.
        </motion.p>

        {/* Buttons stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="px-8 py-4 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-400 active:scale-95 transition-all duration-200 shadow-[0_0_40px_rgba(52,211,153,0.3)] hover:shadow-[0_0_60px_rgba(52,211,153,0.5)]">
            Start Your Journey
          </button>
          
          <button className="px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 border border-white/10 hover:border-white/30 backdrop-blur-sm active:scale-95 transition-all duration-200">
            Explore Courses
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
