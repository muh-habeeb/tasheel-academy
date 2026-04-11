"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

const courses: ChromaItem[] = [
  {
    image: "/assets/bgs/quranbatch.webp",
    title: "Individual Quran Batch",
    subtitle: "Individual Quran learning online in Kerala with personalized guidance",
    description: "Our Online Islamic Classes in Kerala and worldwide provide one-to-one Quran learning. Students receive personal guidance in Quran recitation, Quran memorization, and Tajweed. Perfect for learners who want focused attention and progress at their own pace.",
    borderColor: "#10B981", 
    gradient: "linear-gradient(145deg, rgba(16, 185, 129, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "1-on-1",
  },
  {
    image: "/assets/bgs/girlquran.webp",
    title: "Group Quran Batch",
    subtitle: "Group Quran classes online in Kerala for recitation and memorization",
    description: "In this batch, students learn together in small groups, creating a supportive environment. The program covers Quran recitation, memorization, and pronunciation rules, ensuring both interaction and steady progress in online Quran learning in Kerala and globally.",
    borderColor: "#34D399",
    gradient: "linear-gradient(145deg, rgba(52, 211, 153, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "Group",
  },
  {
    image: "/assets/bgs/induvidual madrasa.webp",
    title: "Individual Madrasa Batch",
    subtitle: "One-on-one madrasa class – Online Islamic Classes in Kerala",
    description: "This one-to-one batch offers a full Islamic curriculum, including Quran, Arabic, and Islamic Studies. Learners benefit from customized lessons that combine religious knowledge with personal mentorship, making it ideal for dedicated students worldwide.",
    borderColor: "#059669",
    gradient: "linear-gradient(145deg, rgba(5, 150, 105, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "1-on-1",
  },
  {
    image: "/assets/bgs/grpmadrasa.webp",
    title: "Group Madrasa Batch",
    subtitle: "Group madrasa class – Online Islamic Classes in Kerala",
    description: "Students join in groups to study Quran, Arabic, and Islamic Studies together. This batch builds teamwork, discipline, and knowledge, while keeping lessons interactive and engaging. Perfect for families seeking affordable yet quality Islamic education.",
    borderColor: "#6EE7B7",
    gradient: "linear-gradient(145deg, rgba(110, 231, 183, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "Group",
  },
  {
    image: "/assets/bgs/quranWIthLap.webp",
    title: "Weekend Batch",
    subtitle: "Weekend classes – Learning Arabic & Quran online in Kerala",
    description: "Our Weekend Islamic Classes in Kerala and worldwide offer Quran memorization, Learning Arabic for Beginners, and Islamic Studies on Saturdays and Sundays. Perfect for school students, working adults, and busy families who need flexible, convenient learning options.",
    borderColor: "#A7F3D0",
    gradient: "linear-gradient(145deg, rgba(167, 243, 208, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "Sat/Sun",
  },
  {
    image: "/assets/bgs/techign2.webp",
    title: "Worldwide Online Batch",
    subtitle: "Worldwide batch – Online Islamic Classes in Kerala & worldwide",
    description: "Our Learning Arabic for Beginners, Quran, and Islamic Studies programs are available globally. Whether you are in India or in any country, TasHeel Moral Academy makes Islamic education accessible from anywhere in the world, with experienced English-speaking teachers.",
    borderColor: "#047857",
    gradient: "linear-gradient(145deg, rgba(4, 120, 87, 0.35), rgba(0, 0, 0, 0.9))",
    handle: "Global",
  }
];

const CourseCard = ({ course, index }: { course: ChromaItem; index: number }) => {
  const cardRef = useRef<HTMLElement>(null);

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="shrink-0 flex"
    >
      <article
        ref={cardRef}
        onMouseMove={handleCardMove}
        className="group relative flex flex-col w-[85vw] sm:w-[320px] lg:w-[380px] min-h-[500px] rounded-[24px] overflow-hidden border border-white/10 transition-colors duration-300 cursor-default shadow-2xl"
        style={
          {
            '--card-border': course.borderColor || 'transparent',
            background: course.gradient || 'linear-gradient(165deg, rgba(255,255,255,0.05), rgba(0,0,0,0.8))',
            '--spotlight-color': 'rgba(255,255,255,0.3)', // Made the spotlight visually stronger
          } as React.CSSProperties
        }
      >
        {/* Glow overlay targeting mouse position */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 opacity-0 group-hover:opacity-100 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)'
          }}
        />

        {/* Card Body */}
        <div className="relative z-10 flex-none p-[16px] h-[240px] box-border overflow-hidden">
          <div className="w-full h-full rounded-[14px] overflow-hidden border border-white/5 relative">
            {/* The image doesn't scale on hover anymore to keep it strictly professional as requested */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={course.image} 
              alt={course.title} 
              loading="lazy" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" 
            />
          </div>
        </div>
        
        {/* Text Area with hover animation */}
        <footer className="relative z-10 p-6 pt-2 grow flex flex-col gap-3 text-white font-sans transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="m-0 text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/80 group-hover:from-emerald-300 group-hover:to-teal-100 transition-all duration-300">
              {course.title}
            </h3>
            {course.handle && (
              <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-full shrink-0 border border-emerald-500/20">
                {course.handle}
              </span>
            )}
          </div>
          
          <p className="m-0 text-sm font-medium text-emerald-400">
            {course.subtitle}
          </p>
          
          {course.description && (
            <p className="m-0 text-sm text-white/70 leading-relaxed font-light mt-1">
              {course.description}
            </p>
          )}

          {course.location && (
            <div className="mt-auto pt-4 text-xs font-medium text-white/40 uppercase tracking-wider">
              {course.location}
            </div>
          )}
        </footer>
      </article>
    </motion.div>
  );
};

export function Cources() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Get the full horizontal scroll width limit
      const getScrollAmount = () => {
        const containerWidth = containerRef.current?.scrollWidth || 0;
        return -(containerWidth - window.innerWidth + window.innerWidth * 0.1); 
      };

      const tween = gsap.to(containerRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + (getScrollAmount() * -1), // Pin duration matches scroll width
        pin: true,
        animation: tween,
        scrub: 1.2, // Smooth scrubbing
        invalidateOnRefresh: true,
        // Optional snap behavior to lock onto cards
        snap: {
          snapTo: 1 / (courses.length - 1),
          inertia: false,
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: "power1.inOut"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="courses" className="w-full relative">
      <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden border-t border-white/5 flex flex-col justify-center">
        
        {/* Big Background Animation / Box Shadow Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[70%] rounded-full bg-emerald-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-teal-800/10 blur-[130px] pointer-events-none" />

      {/* Banner images added to Top-Left and Bottom-Left */}
      <div className="absolute top-12 -left-8 md:left-12 opacity-15 pointer-events-none blur-[2px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/bgs/banner.png" alt="" className="w-[120px] md:w-[180px] -rotate-12 object-contain" />
      </div>
      <div className="absolute bottom-12 -left-8 md:left-12 opacity-15 pointer-events-none blur-[2px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/bgs/banner.png" alt="" className="w-[120px] md:w-[180px] rotate-12 object-contain" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-8 shrink-0">
        <div className="text-center md:text-left max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200">Courses</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500/50 rounded-full mb-8 mx-auto md:mx-0"></div>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
            Discover our comprehensive range of Islamic studies designed to nurture spiritual growth, 
            focusing on recitation, memorization, and command of the Arabic language.
          </p>
        </div>
      </div>

      {/* GSAP Horizontal Scroll Area */}
      <div className="relative w-full z-10 overflow-visible">
        <div 
          ref={containerRef} 
          // pl-[calc(50vw-x)] positions the first card perfectly in the center initially!
          className="flex gap-6 w-max pl-[calc(50vw-42.5vw)] sm:pl-[calc(50vw-160px)] lg:pl-[calc(50vw-190px)] pr-[50vw] pb-12 pt-4"
        >
          {courses.map((course, idx) => (
            <CourseCard key={idx} course={course} index={idx} />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
