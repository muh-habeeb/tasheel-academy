"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, GraduationCap, Users, Globe } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

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
    gradFrom: "#10b981",
    gradTo: "#14b8a6",
    icon: <CalendarCheck className="w-7 h-7 text-white" strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "Orientation & Introduction",
    description:
      "After booking, students join a guided orientation. Teachers explain how Online Islamic Classes are structured — Quran recitation, Arabic learning, and Islamic moral teachings. Students understand schedules, learning methods, and how Kerala traditions blend with global education.",
    tag: "Onboarding",
    gradFrom: "#14b8a6",
    gradTo: "#0ea5e9",
    icon: <GraduationCap className="w-7 h-7 text-white" strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "Personalized & Group Learning",
    description:
      "Students join individual classes or group batches based on preference. Lessons cover Quran Online, Arabic for Beginners, memorization, and Islamic studies — ensuring personal attention, teamwork, and active engagement for learners in Kerala and worldwide.",
    tag: "Learning",
    gradFrom: "#059669",
    gradTo: "#10b981",
    icon: <Users className="w-7 h-7 text-white" strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "Global Access & Ongoing Support",
    description:
      "Classes are accessible to students in Kerala, India, and across the world. Teachers provide continuous feedback and English-speaking instructors support international learners — ensuring steady improvement in Quran Learning, Arabic, and Islamic studies.",
    tag: "Worldwide",
    gradFrom: "#0284c7",
    gradTo: "#6366f1",
    icon: <Globe className="w-7 h-7 text-white" strokeWidth={1.5} />,
  },
];

/* ─────────────────────────────────────────────────────────────
   BACKGROUND OPTIONS
   Uncomment ONE block to switch the section background image.
   The mask fades it into the dark section cleanly.
───────────────────────────────────────────────────────────── */

// ✅ ACTIVE: Option A — Deep ocean ripple (dark, blue-teal, fits the theme)
const BG_IMAGE = "/assets/bgs/stock/pat-whelen-Rxt252RzQlY-unsplash.jpg";
const BG_BLEND = "mix-blend-overlay opacity-[0.08]";

// Option B — Dark chrome tide (grayscale shimmer, very moody)
// const BG_IMAGE = "/assets/bgs/stock/lumilist-dark-chrome-tide.jpg";
// const BG_BLEND = "opacity-[0.12]";

// Option C — Open book / warm light (masked radially, classic)
// const BG_IMAGE = "/assets/bgs/stock/pexels-pixabay-161153.jpg";
// const BG_BLEND = " opacity-[1.00]";

/* ─────────────────────────────────────────────────────────────
   SVG BACKGROUND DECORATION
───────────────────────────────────────────────────────────── */
function SvgDecor() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <radialGradient id="hw-orb1" cx="20%" cy="10%" r="40%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hw-orb2" cx="80%" cy="90%" r="40%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
        </radialGradient>
        <pattern id="hw-dots" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.035)" />
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
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(16,185,129,0.05)" strokeWidth="1" strokeDasharray="5 12">
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
        top: `${88 + index * 52}px`,   // cascading top offset — cards stack visually
        zIndex: 10 + index,
      }}
    >
      {/* Card shell */}
      <div
        className="relative flex flex-col md:flex-row min-h-[260px] md:min-h-[220px]"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(5,10,8,0.92) 100%)`,
          boxShadow: `0 30px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: `radial-gradient(circle 350px at var(--mx,50%) var(--my,50%), ${step.gradFrom}22, transparent 70%)`,
          }}
        />

        {/* Left: Gradient accent panel with icon */}
        <div
          className="relative shrink-0 flex items-center justify-center p-8 md:p-0 md:w-[200px] lg:w-[240px]"
          style={{
            background: `linear-gradient(145deg, ${step.gradFrom}28, ${step.gradTo}10)`,
            borderRight: `1px solid rgba(255,255,255,0.05)`,
          }}
        >
          {/* Big number watermark */}
          <span
            className="absolute text-[7rem] md:text-[8rem] font-black tabular-nums leading-none select-none pointer-events-none"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${step.gradFrom}30`,
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
            style={{ filter: `drop-shadow(0 0 14px ${step.gradFrom}90)` }}
          >
            {step.icon}
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex-1 flex flex-col justify-center gap-3 p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
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
                        : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
            {step.title}
          </h3>

          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl">
            {step.description}
          </p>
        </div>

        {/* Bottom gradient border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.gradFrom}50, ${step.gradTo}50, transparent)`,
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
      className="relative w-full bg-[#040404] overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background image — switch by changing BG_IMAGE / BG_BLEND constants above */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover object-center ${BG_BLEND}`}
          style={{
            // WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 35%, transparent 100%)",
            // maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 35%, transparent 100%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-emerald-700/8 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-teal-600/6 blur-[150px]" />
        <SvgDecor />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 md:pt-32">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 border border-emerald-500/25 bg-emerald-500/5 px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            How Classes Work at{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
              TasHeel
            </span>
          </h2>
          <p className="text-white/45 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            A clear journey from your first trial to mastery — accessible from anywhere in the world.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="flex flex-col gap-4 pb-[40vh]">
          {steps.map((step, i) => (
            <StackCard key={i} step={step} index={i} />
          ))}
          {/* CTA — sits after the stacking region */}
          <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-28 md:pb-36 text-center">
            <BorderGlow
              backgroundColor="#050a08"
              glowColor="160 80 60"
              colors={["#10b981", "#14b8a6", "#0ea5e9"]}
              borderRadius={9999}
              glowRadius={48}
              glowIntensity={1.2}
              coneSpread={30}
              edgeSensitivity={15}
              animated
              className="inline-grid"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-white active:scale-95 transition-transform duration-150"
              >
                <CalendarCheck className="w-5 h-5" strokeWidth={1.5} />
                Book a Free Trial Class
              </a>
            </BorderGlow>
          </div>
        </div>
      </div>


      {/* Shape Divider — bottom edge transition */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[90px]"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            fill="#040404"
            fillOpacity="1"
          />
        </svg>
      </div> */}
    </section>
  );
}
