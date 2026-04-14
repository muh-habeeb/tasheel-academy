"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lerp helper (linear interpolation for smooth easing)
const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const smoothRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch devices - don't apply fake smooth on touch
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return; // Let native scroll handle mobile - feels more natural

    gsap.registerPlugin(ScrollTrigger);

    const content = smoothRef.current;
    const wrapper = wrapperRef.current;
    if (!content || !wrapper) return;

    // Set body height to match content height so native scrollbar stays in sync
    const setBodyHeight = () => {
      document.body.style.height = content.getBoundingClientRect().height + 'px';
    };

    setBodyHeight();
    
    // Update body height whenever content size changes
    const resizeObserver = new ResizeObserver(setBodyHeight);
    resizeObserver.observe(content);

    // Override ScrollTrigger to read from our virtual scroll position
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          targetY.current = value;
          currentY.current = value;
        }
        return currentY.current;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: 'transform',
    });

    // The main animation loop
    const loop = () => {
      targetY.current = window.scrollY;
      currentY.current = lerp(currentY.current, targetY.current, 0.09);
      
      // Only update if there's a noticeable difference
      if (Math.abs(currentY.current - targetY.current) > 0.05) {
        gsap.set(content, { y: -currentY.current });
        ScrollTrigger.update();
      } else {
        currentY.current = targetY.current;
        gsap.set(content, { y: -currentY.current });
      }
      
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    const onResize = () => {
      setBodyHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      document.body.style.height = '';
      // Reset ScrollTrigger to normal (important for Next.js route changes)
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    // Wrapper is fixed to viewport
    <div ref={wrapperRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* This div is what actually moves via transform */}
      <div ref={smoothRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
