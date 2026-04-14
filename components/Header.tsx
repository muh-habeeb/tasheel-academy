"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { uiStore } from "@/lib/store/ui-store";
import Image from "next/image";
import { RouteProgressBar } from "@/components/RouteProgressBar";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(headerRef.current, {
          y: -5,
          opacity: 0.95,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-[30px] left-1/2 -translate-x-1/2 w-[85%] z-40 pointer-events-none rounded-full overflow-hidden"
    >
      {/* 
        NOISE BACKGROUND (ACTIVE) 
        This adds a premium grainy texture to the header background.
      */}
      <div
      // className="absolute inset-0 pointer-events-none bg-[#F7F4EF] opacity-90"
      // style={{
      //   backgroundImage: `url("/assets/bgs/stock/nois.jpeg")`,
      // }}
      ></div>


      {/* BACKDROP BLUR BACKGROUND (COMMENTED OUT) 
        Toggle this if you prefer a smooth frosted-glass look.
         */}
      <div className="absolute inset-0 pointer-events-none bg-[#F7F4EF]/70 backdrop-blur-md"></div>


      <div className="relative max-w-6xl w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 z-50 tracking-tight cursor-pointer pointer-events-auto"
          onClick={() => uiStore.setMenuOpen(false)}
        >
          <div className="relative w-10 h-10 rounded shrink-0">
            <Image src="/favicon.ico" alt="Logo" fill sizes="40px" className="object-contain" priority />
          </div>
          <div className="flex flex-col leading-none justify-center">
            <span className="font-display text-base font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#1C2544] to-[#3D4F7C] filter drop-shadow-sm">
              THASHEEL MORAL
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#C4713A] font-semibold mt-0.5">
              ACADEMY
            </span>
          </div>
        </Link>

        {/* Nav is now global via MobileNav/StaggeredMenu */}
      </div>

      <RouteProgressBar />
    </header>
  );
}
