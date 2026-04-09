"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { uiStore, useUIStore } from "@/lib/store/ui-store";

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
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
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
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 pointer-events-auto"
    >
      <div className="container mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white z-50 flex items-center gap-2 group"
          onClick={() => uiStore.setMenuOpen(false)}
        >
          <span className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors duration-200">
            {/* Custom abstract shape for a premium feel */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="white" className="group-hover:fill-emerald-400 transition-colors duration-300"/>
              <path d="M12 8L6 19H18L12 8Z" fill="black" />
            </svg>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            tasheelmoralacademy.in
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.name}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group py-2"
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

          <button className="ml-4 px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-emerald-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform">
            Enroll Now
          </button>
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
              <button 
                className="mt-8 px-8 py-4 rounded-full bg-emerald-500 text-white font-medium text-xl w-64 hover:bg-emerald-400 active:scale-95 transition-all duration-200"
                onClick={() => uiStore.setMenuOpen(false)}
              >
                Enroll Now
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
