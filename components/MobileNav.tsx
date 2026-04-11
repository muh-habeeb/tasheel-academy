"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { uiStore, useUIStore } from "@/lib/store/ui-store";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/nav-links";



export function MobileNav() {
  const { isMenuOpen } = useUIStore();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          initial={{ clipPath: "circle(0% at calc(100% - 2rem) 3rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2rem) 3rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2rem) 3rem)" }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 w-full h-full z-40 bg-black/90 backdrop-blur-2xl"
        >
          {/* Noise texture layer */}
          {/* <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' width='1000' height='1000'%3E%3Cdefs%3E%3Cfilter id='nf' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.139' numOctaves='4' seed='15' stitchTiles='stitch' width='100%25' height='100%25' result='turbulence'/%3E%3CfeSpecularLighting surfaceScale='14' specularConstant='0.5' specularExponent='20' lighting-color='%2334d399' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='153'/%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%23080808'/%3E%3Crect width='700' height='700' fill='%2334d399' filter='url(%23nf)'/%3E%3C/svg%3E")`,
              backgroundSize: '350px 350px',
            }}
          /> */}

          {/* Scrollable content — fills viewport, centers items */}
          <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center justify-center min-h-full px-8 py-28">

              {/* Nav links */}
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.name}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{
                        delay: 0.08 + i * 0.06,
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="w-full max-w-xs text-center"
                      whileHover={{ scale: 1.05, x: 6 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={link.href}
                        className={`
                          block py-3 text-2xl font-semibold tracking-tight
                          transition-all duration-200
                          ${isActive
                            ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                            : "text-white/90 hover:text-emerald-300 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]"}
                        `}
                        onClick={() => uiStore.setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>

                    {/* Separator */}
                    {i < navLinks.length - 1 && (
                      <motion.div
                        className="w-full max-w-xs h-px bg-white/8 my-1"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{
                          delay: 0.12 + i * 0.06,
                          duration: 0.4,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8"
              >
                <Button
                  className="rounded-full bg-emerald-500 text-white font-semibold text-lg px-10 h-14 hover:bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.25)] active:scale-[0.97] transition-all duration-150 ease-out cursor-pointer"
                  onClick={() => uiStore.setMenuOpen(false)}
                >
                  Enroll Now
                </Button>
              </motion.div>

            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
