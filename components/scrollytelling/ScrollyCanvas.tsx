"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform, useSpring } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  frameDelay?: string;
}

export function ScrollyCanvas({
  scrollYProgress,
  totalFrames = 240,
  frameDelay = "0.067s",
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // ─── ADDED SPRING FOR FLUIDITY ──────────────────────────────────────────
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 700,
    damping: 90,
    mass: 1,
    restDelta: 0.0001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 0.97],
    [0, totalFrames - 1],
    { clamp: true }
  );

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let cancelled = false;

    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        const pct = Math.round((loaded / totalFrames) * 100);
        setLoadProgress(pct);
        window.dispatchEvent(new CustomEvent("sequence-load", { detail: pct }));
        if (loaded === totalFrames) {
          imageCache.current = images;
          setIsReady(true);
          setTimeout(() => setShowHint(false), 800);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loaded++;
        if (loaded === totalFrames) {
          imageCache.current = images;
          setIsReady(true);
          setTimeout(() => setShowHint(false), 800);
        }
      };
      img.src = `/sequence/frame_${String(i).padStart(2, "0")}_delay-${frameDelay}.webp`;
      images[i] = img;
    }

    return () => { cancelled = true; };
  }, [totalFrames, frameDelay]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || !imageCache.current[index]) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = imageCache.current[index];
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#F5F2EC";
    ctx.fillRect(0, 0, rect.width, rect.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = rect.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.resetTransform();
  };

  useEffect(() => { if (isReady) drawFrame(0); }, [isReady]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isReady) requestAnimationFrame(() => drawFrame(Math.round(latest)));
  });

  useEffect(() => {
    const handleResize = () => {
      if (isReady) requestAnimationFrame(() => drawFrame(Math.round(frameIndex.get())));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, frameIndex]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#F5F2EC] overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full will-change-transform"
        style={{ objectFit: "contain" }} />

      {/* loading overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%, transparent 100%)",
        opacity: isReady ? 0 : 1,
        transition: "opacity 1.2s ease",
        pointerEvents: "none", zIndex: 1,
      }} />

      {showHint && (
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "50%",
          transform: "translateX(-50%)", pointerEvents: "none",
          opacity: isReady ? 0 : 1, transition: "opacity 0.6s ease", zIndex: 10,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(28, 37, 68, 0.82)", backdropFilter: "blur(12px)",
            borderRadius: "999px", padding: "0.45rem 1.1rem",
            color: "#F5F2EC", fontSize: "0.75rem",
            fontFamily: "var(--font-dm-sans, sans-serif)", letterSpacing: "0.04em",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)", whiteSpace: "nowrap",
          }}>
            <span style={{
              display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
              background: "#C4713A", animation: "pulse-dot 1.2s ease-in-out infinite", flexShrink: 0,
            }} />
            {loadProgress < 100 ? `Crafting your experience… ${loadProgress}%` : "✦ Experience ready"}
          </div>
          <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }`}</style>
        </div>
      )}
    </div>
  );
}