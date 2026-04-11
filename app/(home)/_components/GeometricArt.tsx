"use client";
import React, { useRef, useEffect } from 'react';

export function GeometricArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Scale for high DPI
    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    let animationId: number;
    let time = 0;

    // Pi theory and Golden Ratio constants
    const phi = 1.6180339887;
    const numRings = 7;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      
      const cx = size / 2;
      const cy = size / 2;
      
      for (let i = 1; i <= numRings; i++) {
        // Logarithmic / Phi scaling
        const radius = i * 25 * phi;
        const speedMultiplier = 1 / (i * 0.8);
        const angleOffset = time * speedMultiplier;
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        
        // Fades out towards the edges
        const opacity = Math.max(0, 0.25 - (i * 0.03));
        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Sacred geometry connection points
        const numPoints = 2 + Math.floor(i * phi);
        
        ctx.beginPath();
        for (let j = 0; j <= numPoints; j++) {
          const angle = (j / numPoints) * Math.PI * 2 + angleOffset;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
          
          // Draw orbital nodes
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167, 243, 208, 0.6)`; // emerald-200
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      time += 0.015;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative flex items-center justify-center opacity-80 pointer-events-none mix-blend-screen scale-75 md:scale-100">
      <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
      <canvas ref={canvasRef} className="relative z-10" />
    </div>
  );
}
