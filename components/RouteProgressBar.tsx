"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function RouteProgressBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    cleanup();
    isNavigatingRef.current = true;
    setIsLoading(true);
    setProgress(0);

    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 90) currentProgress = 90;
      setProgress(currentProgress);
    }, 200);
  }, [cleanup]);

  const completeProgress = useCallback(() => {
    cleanup();
    isNavigatingRef.current = false;
    setProgress(100);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 400);
  }, [cleanup]);

  // Detect navigation START by intercepting link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isInternal = href.startsWith("/") || href.startsWith("#");
      const isSamePage = href === pathname;
      const isNewTab = anchor.target === "_blank";

      if (isInternal && !isSamePage && !isNewTab) {
        startProgress();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, startProgress]);

  // Detect navigation COMPLETE when pathname changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // Use microtask to avoid synchronous setState in effect
      queueMicrotask(() => {
        if (isNavigatingRef.current) {
          completeProgress();
        }
      });
    }
  }, [pathname, completeProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Progress bar */}
          <motion.div
            className="h-full bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(52,211,153,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          {/* Glow shimmer at the leading edge */}
          <motion.div
            className="absolute top-0 h-full w-20 bg-linear-to-l from-emerald-300/80 to-transparent rounded-r-full shadow-emerald-500"
            style={{ left: `${Math.max(0, progress - 8)}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
