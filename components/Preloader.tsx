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
  const [pageLoaded, setPageLoaded] = useState(false);
  const [lottieFinished, setLottieFinished] = useState(false);
  const hasFired = useRef(false);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";
    hasFired.current = false;

    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (customEvent.detail === 100) {
        setPageLoaded(true);
      }
    };

    window.addEventListener("sequence-load", handleProgress);

    return () => {
      window.removeEventListener("sequence-load", handleProgress);
      // Failsafe unlock if destroyed
      document.body.style.overflow = "auto";
    };
  }, []);

  // Trigger slide out only when BOTH the page is loaded (100%) and the Lottie animation has played once entirely.
  useEffect(() => {
    if (pageLoaded && lottieFinished && !hasFired.current) {
      hasFired.current = true;
      if (!textRef.current || !slideRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          setComplete(true);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("preloader-complete"));
          }
        }
      });

      // Hide the lottie animation
      tl.to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });

      // Slide up the dark background
      tl.to(slideRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
      }, "-=0.2");
    }
  }, [pageLoaded, lottieFinished]);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div
        ref={slideRef}
        className="absolute inset-0 bg-[#000000] pointer-events-auto"
      ></div>
      <div
        ref={textRef}
        // Increased max-width dramatically so the animation is much larger
        className="relative z-10 flex items-center justify-center w-[90vw] md:w-[70vw] max-w-4xl mx-auto"
      >
        <Lottie
          animationData={loaderAnimation}
          loop={false}
          autoPlay={true}
          onComplete={() => setLottieFinished(true)}
          // Increased brightness along with invert to ensure any off-black colors become extremely bright pure white
          className="w-full h-auto object-contain invert brightness-200 contrast-125"
        />
      </div>
    </div>
  );
}
