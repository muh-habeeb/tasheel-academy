"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { uiStore, useUIStore } from "@/lib/store/ui-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { navLinks } from "@/lib/nav-links";
import { RouteProgressBar } from "@/components/RouteProgressBar";

export function Header() {
  const { isMenuOpen } = useUIStore();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          boxShadow: "0 0px 0px 0px rgba(0,0,0,0)",
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
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
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto backdrop-blur-xl bg-white/5 shadow-2xl shadow-black/80"
    >
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 z-50 tracking-tight"
          onClick={() => uiStore.setMenuOpen(false)}
        >
          <div className="relative w-12 h-12 rounded shrink-0">
            <Image src="/favicon.ico" alt="Logo" fill sizes="48px" className="object-contain" priority />
          </div>
          <div className="flex flex-col leading-none justify-center">
            <span className="text-lg font-bold uppercase tracking-wide text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200 filter drop-shadow-sm">
              THASHEEL MORAL
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mt-0.5">
              ACADEMY
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.name}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-all duration-200 group py-2 active:scale-[0.97]"
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
              >
                {link.name}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-400 transform origin-left transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <Button className="ml-4 rounded-full bg-white text-black hover:bg-emerald-400 hover:text-white cursor-pointer px-6 active:scale-[0.97] transition-all duration-150 ease-out">
            Enroll Now
          </Button>
        </nav>

        {/* MOBILE TOGGLE — just the button, MobileNav lives in layout */}
        <button
          className="lg:hidden text-white z-50 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
          onClick={() => uiStore.toggleMenu()}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* GitHub-style route progress bar — absolute to header bottom */}
      <RouteProgressBar />
    </header>
  );
}
