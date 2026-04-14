"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, GraduationCap, Users, Globe } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Book a Free Trial Class",
    description:
      "Students select their preferred schedule and teacher to begin Online Islamic Classes in Kerala and worldwide. Learners choose a class suited to their pace — covering Quran Learning, Arabic for Beginners, memorization, and Islamic studies — guided by experienced English-speaking teachers.",
    tag: "Get Started",
    gradFrom: "#C4713A", // Copper
    gradTo: "#D4A96A",   // Gold
    icon: <CalendarCheck className="w-7 h-7 text-[#2B3A6B]" strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "Orientation & Introduction",
    description:
      "After booking, students join a guided orientation. Teachers explain how Online Islamic Classes are structured — Quran recitation, Arabic learning, and Islamic moral teachings. Students understand schedules, learning methods, and how Kerala traditions blend with global education.",
    tag: "Onboarding",
    gradFrom: "#D4A96A",
    gradTo: "#B5622B",
    icon: <GraduationCap className="w-7 h-7 text-[#2B3A6B]" strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "Personalized & Group Learning",
    description:
      "Students join individual classes or group batches based on preference. Lessons cover Quran Online, Arabic for Beginners, memorization, and Islamic studies — ensuring personal attention, teamwork, and active engagement for learners in Kerala and worldwide.",
    tag: "Learning",
    gradFrom: "#2B3A6B", // Navy
    gradTo: "#3D4F7C",   // Steel
    icon: <Users className="w-7 h-7 text-[#2B3A6B]" strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "Global Access & Ongoing Support",
    description:
      "Classes are accessible to students in Kerala, India, and across the world. Teachers provide continuous feedback and English-speaking instructors support international learners — ensuring steady improvement in Quran Learning, Arabic, and Islamic studies.",
    tag: "Worldwide",
    gradFrom: "#3D4F7C",
    gradTo: "#7A8AAD",
    icon: <Globe className="w-7 h-7 text-[#2B3A6B]" strokeWidth={1.5} />,
  },
];

/* ─────────────────────────────────────────────────────────────
   SVG BACKGROUND DECORATION
───────────────────────────────────────────────────────────── */
function SvgDecor() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <radialGradient id="hw-orb1" cx="20%" cy="10%" r="40%">
          <stop offset="0%" stopColor="#C4713A" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#C4713A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hw-orb2" cx="80%" cy="90%" r="40%">
          <stop offset="0%" stopColor="#2B3A6B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2B3A6B" stopOpacity="0" />
        </radialGradient>
        <pattern id="hw-dots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(43,58,107,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hw-dots)" />
      <ellipse cx="20%" cy="10%" rx="30%" ry="25%" fill="url(#hw-orb1)">
        <animate attributeName="ry" values="25%;30%;25%" dur="7s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="80%" cy="90%" rx="28%" ry="22%" fill="url(#hw-orb2)">
        <animate attributeName="rx" values="28%;34%;28%" dur="9s" begin="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Vertical dashed connector */}
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(43,58,107,0.15)" strokeWidth="1" strokeDasharray="5 12">
        <animate attributeName="stroke-dashoffset" from="0" to="34" dur="2.5s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   STACKING CARD  
───────────────────────────────────────────────────────────── */
function StackCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - left}px`);
    el.style.setProperty("--my", `${e.clientY - top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="sticky group overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        top: `${88 + index * 52}px`,
        zIndex: 10 + index,
      }}
    >
      {/* Card shell */}
      <div
        className="relative flex flex-col md:flex-row min-h-[260px] md:min-h-[220px] bg-white border border-[#2B3A6B]/10"
        style={{
          boxShadow: `0 20px 40px -10px rgba(43,58,107,0.06)`,
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: `radial-gradient(circle 350px at var(--mx,50%) var(--my,50%), ${step.gradFrom}1A, transparent 70%)`,
          }}
        />

        {/* Left: Gradient accent panel with icon */}
        <div
          className="relative shrink-0 flex items-center justify-center p-8 md:p-0 md:w-[200px] lg:w-[240px]"
          style={{
            background: `linear-gradient(145deg, ${step.gradFrom}1A, ${step.gradTo}08)`,
            borderRight: `1px solid rgba(43,58,107,0.08)`,
          }}
        >
          {/* Big number watermark */}
          <span
            className="absolute text-[7rem] md:text-[8rem] font-sans font-black tabular-nums leading-none select-none pointer-events-none"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${step.gradFrom}40`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {step.number}
          </span>
          {/* Icon */}
          <div
            className="relative z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
          >
            {step.icon}
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex-1 flex flex-col justify-center gap-3 p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-sans font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border"
              style={{
                color: step.gradFrom,
                borderColor: `${step.gradFrom}40`,
                background: `${step.gradFrom}10`,
              }}
            >
              {step.tag}
            </span>
            {/* Animated step indicator dots */}
            <div className="flex items-center gap-1.5 ml-auto">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 20 : 6,
                    height: 6,
                    background:
                      i === index
                        ? `linear-gradient(90deg, ${step.gradFrom}, ${step.gradTo})`
                        : "rgba(43,58,107,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[#1C2544] leading-tight">
            {step.title}
          </h3>

          <p className="font-body text-[#3D4F7C] text-sm md:text-base leading-relaxed max-w-2xl font-light">
            {step.description}
          </p>
        </div>

        {/* Bottom gradient border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.gradFrom}30, ${step.gradTo}30, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EEE9E0] overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft glow orbs (light mode) */}
        <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full bg-[#C4713A]/6 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[350px] rounded-full bg-[#2B3A6B]/5 blur-[140px] pointer-events-none" />
        <SvgDecor />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 md:pt-32">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C4713A] border border-[#C4713A]/30 bg-[#C4713A]/8 px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4713A] animate-pulse" />
            Our Process
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C2544] tracking-tight leading-[1.1] mb-5">
            How Classes Work at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4713A] via-[#D4A96A] to-[#C4713A]">
              TasHeel
            </span>
          </h2>
          <p className="font-body text-[#3D4F7C] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            A clear journey from your first trial to mastery — accessible from anywhere in the world.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="flex flex-col gap-4 pb-[20vh] md:pb-[30vh]">
          {steps.map((step, i) => (
            <StackCard key={i} step={step} index={i} />
          ))}

          {/* CTA — sits after the stacking region */}
          <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-16 text-center">
            <BorderGlow
              backgroundColor="#EEE9E0"
              glowColor="196 113 58"
              colors={["#C4713A", "#D4A96A", "#2B3A6B"]}
              borderRadius={9999}
              glowRadius={48}
              glowIntensity={1.2}
              coneSpread={30}
              edgeSensitivity={15}
              animated
              className="inline-grid"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans font-semibold text-base text-white bg-[#C4713A] hover:bg-[#B5622B] active:scale-95 transition-all duration-200"
              >
                <CalendarCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
                Book a Free Trial Class
              </Link  >
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
