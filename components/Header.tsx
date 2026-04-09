"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { uiStore, useUIStore } from "@/lib/store/ui-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const links = [
  { name: "Home", href: "/" },
  { name: "Why Choose Us", href: "/why-choose-us" },
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const { isMenuOpen } = useUIStore();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Simple scroll effect for header background using gsap instead of complex state
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
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto backdrop-blur-xl bg-black/40 shadow-xl shadow-black/80 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 z-50 tracking-tight"
          onClick={() => uiStore.setMenuOpen(false)}
        >
          <div className="relative w-12 h-12 rounded shrink-0">
            <Image src="/favicon.ico" alt="Logo" fill sizes="48px" className="object-contain" />
          </div>
          <div className="flex flex-col leading-none justify-center">
            <span className="text-lg font-bold text-white uppercase tracking-wide">
              THASHEEL MORAL
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mt-0.5">
              ACADEMY
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link, i) => {
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

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-white z-50 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
          onClick={() => uiStore.toggleMenu()}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ clipPath: "circle(0% at right 2rem top 3rem)" }}
            animate={{ clipPath: "circle(150% at right 2rem top 3rem)" }}
            exit={{ clipPath: "circle(0% at right 2rem top 3rem)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col justify-center items-center gap-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={link.href}
                  className="text-3xl font-medium text-white hover:text-emerald-400 transition-colors"
                  onClick={() => uiStore.setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Button 
                className="mt-8 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-400 cursor-pointer text-lg w-64 h-14 active:scale-[0.97] transition-all duration-150 ease-out"
                onClick={() => uiStore.setMenuOpen(false)}
              >
                Enroll Now
              </Button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
