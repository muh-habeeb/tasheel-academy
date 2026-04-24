"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { ScrollyOverlay } from "./ScrollyOverlay";

interface ScrollySectionProps {
  totalFrames?: number;
  frameDelay?: string;
  scrollHeight?: string;
}

export function ScrollySection({
  totalFrames = 240,
  frameDelay = "0.067s",
  scrollHeight = "800vh",
}: ScrollySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // We start when the top of the container hits the top of the viewport
    // and end when the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#F5F2EC] -mt-[80px] md:mt-0"
      style={{ height: scrollHeight, position: "relative" }}
      suppressHydrationWarning
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <ScrollyCanvas 
          scrollYProgress={scrollYProgress} 
          totalFrames={totalFrames} 
          frameDelay={frameDelay} 
        />
        <ScrollyOverlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
