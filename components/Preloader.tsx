"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/assets/animations/loader.json";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const [complete, setComplete] = useState(false);
  const [lottieFinished, setLottieFinished] = useState(false);
  const hasFired = useRef(false);

  useEffect(() => {
    // Lock scrolling while the preloader is visible
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // As soon as the Lottie plays once, dismiss the preloader —
  // frame images will continue loading in the background with their own indicator.
  useEffect(() => {
    if (lottieFinished && !hasFired.current) {
      hasFired.current = true;
      if (!textRef.current || !slideRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          setComplete(true);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("preloader-complete"));
          }
        },
      });

      tl.to(textRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
      });

      tl.to(
        slideRef.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.15"
      );
    }
  }, [lottieFinished]);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
      suppressHydrationWarning
    >
      <div
        ref={slideRef}
        className="absolute inset-0 bg-black pointer-events-auto"
        suppressHydrationWarning
      />
      <div
        ref={textRef}
        className="relative z-10 flex items-center justify-center w-[90vw] md:w-[70vw] max-w-4xl mx-auto"
        suppressHydrationWarning
      >
        <Lottie
          animationData={loaderAnimation}
          loop={false}
          autoPlay={true}
          onComplete={() => setLottieFinished(true)}
          className="w-full h-auto object-contain invert brightness-200 contrast-125"
        />
      </div>
    </div>
  );
}
