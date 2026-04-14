"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import LaserFlow from "./LaserFlow";
import BorderGlow from "@/components/BorderGlow";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 });
    }, containerRef);

    const playAnim = () => {
      ctx.add(() => {
        gsap.to(imageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.8,
          ease: "power4.inOut",
        });
      });
    };

    window.addEventListener("preloader-complete", playAnim);

    return () => {
      window.removeEventListener("preloader-complete", playAnim);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh lg:h-screen w-full flex items-center justify-center overflow-hidden bg-[#F7F4EF]"
    >
      {/* Background Image with optimized Next/Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform bg-[#F7F4EF]"
      >
        <Image
          src="/assets/bgs/stock/ashkan-forouzani-7blIFp0kFP4-unsplash.jpg"
          alt="Tasheel Moral Academy Education"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Warm elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EF]/90 via-[#F7F4EF]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#F7F4EF]/30" />

        {/* Full section Noise Texture — custom specular lighting */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700' width='700' height='700'%3E%3Cdefs%3E%3Cfilter id='nf' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.139' numOctaves='4' seed='15' stitchTiles='stitch' width='100%25' height='100%25' result='turbulence'/%3E%3CfeSpecularLighting surfaceScale='14' specularConstant='0.5' specularExponent='20' lighting-color='%2334d399' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='153'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%23080808'/%3E%3Crect width='700' height='700' fill='%2334d399' filter='url(%23nf)'/%3E%3C/svg%3E")`,
            backgroundSize: '350px 350px',
          }}
        />
      </div>

      {/* LaserFlow as full background layer (Isolated from GSAP animations) */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <LaserFlow
          style={{ height: "100%", width: "100%" }}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.50}
          color="#C4713A"
          horizontalSizing={2}
          verticalSizing={12}
          wispDensity={2}
          wispSpeed={3}
          wispIntensity={9.8}
          flowSpeed={0.11}
          flowStrength={0.9}
          fogIntensity={0.97}
          fogScale={0.1}
          fogFallSpeed={0.1}
          decay={1.64}
          falloffStart={1.2}
          mouseSmoothTime={0.1}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-2 container mx-auto px-6 lg:px-12 pt-16 pb-20 lg:py-0 w-full min-h-dvh lg:h-full flex flex-col justify-center pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side text content */}
          <div className="flex flex-col items-start text-left max-w-2xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#2B3A6B]/10 bg-[#F7F4EF]/50 backdrop-blur-md shadow-sm"
            >
              <span className="text-sm font-sans font-medium tracking-wide text-[#3D4F7C] uppercase letter-spacing-2">
                Admissions Open For 2026
              </span>
            </motion.div>

            {/* Masked text reveal effect for the title lines staggered by 0.3s */}
            <div className="mb-6 flex flex-col gap-1.5">
              <div className="overflow-hidden pt-2">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 1.0, ease: [0.77, 0, 0.175, 1] }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#1C2544] tracking-tight leading-[1.1]"
                >
                  Learn Quran.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 1.3, ease: [0.77, 0, 0.175, 1] }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C4713A] via-[#D4A96A] to-[#C4713A] tracking-tight leading-[1.1] pb-2"
                >
                  Understand Arabic.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 1.6, ease: [0.77, 0, 0.175, 1] }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#1C2544] tracking-tight leading-[1.1]"
                >
                  Live Islam.
                </motion.h1>
              </div>
            </div>

            <div className="overflow-hidden mb-10 max-w-xl">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, delay: 1.9, ease: [0.77, 0, 0.175, 1] }}
                className="font-body text-lg md:text-xl text-[#3D4F7C] font-light leading-relaxed py-2"
              >
                We go beyond basic Quran reading. Our students learn the Quran  <span className="text-[#1C2544]"> along with important life lessons, daily duas, and Islamic values </span> that can be applied in everyday life.
              </motion.p>
            </div>

            {/* Buttons stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center pointer-events-auto"
            >
              <BorderGlow
                edgeSensitivity={10}
                glowColor="196 113 58"
                backgroundColor="#F7F4EF"
                borderRadius={50}
                glowRadius={37}
                glowIntensity={1.6}
                coneSpread={7}
                animated
                colors={['#C4713A', '#D4A96A', '#C4713A']}
              >
                <Button
                  className="w-full h-full sm:w-auto px-8 py-4 rounded-full text-white font-sans font-bold text-base transition-all duration-200 ease-out cursor-pointer border-0 bg-transparent flex items-center justify-center pointer-events-none"
                  style={{ color: '#1C2544' }}
                >
                  Start Your Journey
                </Button>
              </BorderGlow>

              <Button variant="outline" className="px-8 py-6 rounded-full bg-white/50 text-[#2B3A6B] font-sans font-medium hover:bg-white/80 border-[#2B3A6B]/20 hover:border-[#2B3A6B]/40 hover:text-[#1C2544] backdrop-blur-sm cursor-pointer text-base active:scale-[0.97] transition-all duration-150 ease-out shadow-sm">
                Explore Courses
              </Button>
            </motion.div>
          </div>

          {/* Right Side is now empty, letting the LaserFlow shine through */}
          <div className="hidden lg:block w-full h-full" />

        </div>
      </div>
    </section>
  );
}
