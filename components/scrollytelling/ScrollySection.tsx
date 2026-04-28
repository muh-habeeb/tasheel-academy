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
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#F5F2EC] -mt-[80px] md:mt-0 h-[var(--scroll-height-mobile)] md:h-[var(--scroll-height-desktop)]"
      style={{ 
        // @ts-ignore
        "--scroll-height-mobile": "500svh",
        "--scroll-height-desktop": scrollHeight 
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden" suppressHydrationWarning>
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
