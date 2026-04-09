"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

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
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black/80 mix-blend-multiply" />
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
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Learn Quran. <br />
            <span className="text-emerald-400">
              Understand Arabic.
            </span><br/>
            Live Islam.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10"
        >
          We go beyond basic Quran reading. Our students learn the Quran along with important life lessons, daily duas, and Islamic values that can be applied in everyday life.
        </motion.p>

        {/* Buttons stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button className="px-8 py-6 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-400 cursor-pointer shadow-[0_0_40px_rgba(52,211,153,0.3)] hover:shadow-[0_0_60px_rgba(52,211,153,0.5)] text-base active:scale-[0.97] transition-all duration-150 ease-out">
            Start Your Journey
          </Button>
          
          <Button variant="outline" className="px-8 py-6 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-sm cursor-pointer text-base active:scale-[0.97] transition-all duration-150 ease-out">
            Explore Courses
          </Button>
        </motion.div>
      </div>

      {/* Removed scroll indicator component from the bottom */}
      
    </section>
  );
}
