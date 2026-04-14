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
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
    >
     
        <div className="max-w-6xl w-full mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2.5 z-50 tracking-tight cursor-pointer pointer-events-auto"
            onClick={() => uiStore.setMenuOpen(false)}
          >
            <div className="relative w-12 h-12 rounded shrink-0">
              <Image src="/favicon.ico" alt="Logo" fill sizes="48px" className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-none justify-center">
              <span className="text-lg font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 filter drop-shadow-sm">
                THASHEEL MORAL
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mt-0.5">
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
