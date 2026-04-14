"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  const hasFired = useRef(false);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";
    hasFired.current = false;
    
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      const pct = customEvent.detail;
      
      if (textRef.current) {
        textRef.current.innerText = `${pct}%`;
      }
      
      if (pct === 100 && !hasFired.current) {
        hasFired.current = true;
        if (!textRef.current || !slideRef.current) return;
        // Once 100%, trigger the slide out
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
            setComplete(true);
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("preloader-complete"));
            }
          }
        });
        
        // Hide the text
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
    };

    window.addEventListener("sequence-load", handleProgress);
    
    return () => {
      window.removeEventListener("sequence-load", handleProgress);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (complete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={slideRef}
        className="absolute inset-0 bg-[#111111] pointer-events-auto"
      ></div>
      <div 
        ref={textRef}
        className="relative z-10 font-sans text-[4rem] md:text-[8rem] font-medium tracking-tight text-[#F7F4EF] mix-blend-difference"
      >
        0%
      </div>
    </div>
  );
}
