"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import Image from "next/image";

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

  // Derive which frame to show
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new window.Image();
        img.onload = () => {
          loaded++;
          const pct = Math.round((loaded / totalFrames) * 100);
          setLoadProgress(pct);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent("sequence-load", { detail: pct }));
          }
          if (loaded === totalFrames) {
            setIsReady(true);
          }
        };
        // The path matches exactly what was asked in the prompt
        img.src = `/sequence/frame_${String(i).padStart(2, "0")}_delay-${frameDelay}.webp`;
        images.push(img);
      }
      imageCache.current = images;
    };

    loadImages();
  }, [totalFrames, frameDelay]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || !imageCache.current[index]) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = imageCache.current[index];
    const canvas = canvasRef.current;
    
    // Ensure canvas resolution matches its display size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    // Set high-quality rendering
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear with canvas background color from prompt
    ctx.fillStyle = "#F5F2EC";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Calculate object-cover aspect ratio
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image (fit to width)
      drawWidth = rect.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image (fit to height)
      drawHeight = rect.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Reset transform for next frame
    ctx.resetTransform();
  };

  // Initial render when ready
  useEffect(() => {
    if (isReady) {
      drawFrame(0);
    }
  }, [isReady]);

  // Update on scroll with RAF
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isReady) {
      requestAnimationFrame(() => {
        drawFrame(Math.round(latest));
      });
    }
  });

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (isReady) {
        requestAnimationFrame(() => {
          drawFrame(Math.round(frameIndex.get()));
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, frameIndex]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#F5F2EC] overflow-hidden pointer-events-none">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full will-change-transform"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
