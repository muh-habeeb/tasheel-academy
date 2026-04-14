"use client";

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import { uiStore, useUIStore } from '@/lib/store/ui-store';
import { navLinks } from '@/lib/nav-links';
import FlowingMenu from './FlowingMenu';

/* ────────────────────────────────────────────────────────────
   STAGGERED MENU — themed for Tasheel Academy (dark/emerald)
────────────────────────────────────────────────────────────── */

// Academy theme
const PANEL_BG    = '#050a08';        // near-black green-tinted
const COLORS      = ['#065f46', '#0f172a']; // emerald-900 → slate-900 pre-layers
const ACCENT      = '#10b981';        // emerald-500

const socialItems = [
  { label: 'WhatsApp', link: 'https://wa.me/' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Facebook',  link: 'https://facebook.com' },
];

export function MobileNav() {
  const { isMenuOpen } = useUIStore();
  const pathname = usePathname();

  const [open, setOpen]           = useState(false);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openRef     = useRef(false);
  const panelRef    = useRef<HTMLDivElement>(null);
  const preLayersRef= useRef<HTMLDivElement>(null);
  const preLayerEls = useRef<HTMLElement[]>([]);

  const plusHRef    = useRef<HTMLSpanElement>(null);
  const plusVRef    = useRef<HTMLSpanElement>(null);
  const iconRef     = useRef<HTMLSpanElement>(null);
  const textInnerRef= useRef<HTMLSpanElement>(null);
  const toggleBtnRef= useRef<HTMLButtonElement>(null);
  const busyRef     = useRef(false);

  const openTlRef        = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef    = useRef<gsap.core.Tween | null>(null);
  const spinTlRef        = useRef<gsap.core.Timeline | null>(null);
  const textCycleRef     = useRef<gsap.core.Tween | null>(null);

  /* ── Initial setup ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const pre   = preLayersRef.current;
      if (!panel) return;

      const layers = pre ? Array.from(pre.querySelectorAll<HTMLElement>('.sm-prelayer')) : [];
      preLayerEls.current = layers;

      gsap.set([panel, ...layers], { xPercent: 100 });
      gsap.set(plusHRef.current, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(plusVRef.current, { rotate: 90, transformOrigin: '50% 50%' });
      gsap.set(iconRef.current,  { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInnerRef.current, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  /* ── Sync with uiStore (hamburger in Header also controls this) ── */
  useEffect(() => {
    if (isMenuOpen && !openRef.current)  handleOpen();
    if (!isMenuOpen && openRef.current) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  /* ── Open animation ── */
  const handleOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    openRef.current = true;
    setOpen(true);

    const panel  = panelRef.current;
    const layers = preLayerEls.current;
    if (!panel) { busyRef.current = false; return; }

    openTlRef.current?.kill();

    const itemEls    = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const socialTitle= panel.querySelector<HTMLElement>('.sm-socials-title');
    const socialLinks= Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));

    if (itemEls.length)    gsap.set(itemEls,    { yPercent: 140, rotate: 10 });
    if (socialTitle)       gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length)gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });

    layers.forEach((el, i) => {
      const start = Number(gsap.getProperty(el, 'xPercent'));
      tl.fromTo(el, { xPercent: start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const layerDone = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;

    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, layerDone);

    if (itemEls.length) {
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, layerDone + 0.1);
    }
    if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, layerDone + 0.3);
    if (socialLinks.length) {
      tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, layerDone + 0.35);
    }

    openTlRef.current = tl;

    // Animate icon & text
    spinTlRef.current?.kill();
    spinTlRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } })
      .to(plusHRef.current, { rotate: 45, duration: 0.5 }, 0)
      .to(plusVRef.current, { rotate: -45, duration: 0.5 }, 0);

    animateText(true);
  }, []);

  /* ── Close animation ── */
  const handleClose = useCallback(() => {
    openTlRef.current?.kill();
    openRef.current = false;
    setOpen(false);

    const panel  = panelRef.current;
    const layers = preLayerEls.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        busyRef.current = false;
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
      },
    });

    spinTlRef.current?.kill();
    spinTlRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      .to(plusHRef.current, { rotate: 0, duration: 0.35 }, 0)
      .to(plusVRef.current, { rotate: 90, duration: 0.35 }, 0);

    animateText(false);
  }, []);

  /* ── Toggle (button click) ── */
  const toggleMenu = useCallback(() => {
    const next = !openRef.current;
    if (next) {
      uiStore.setMenuOpen(true);
      handleOpen();
    } else {
      uiStore.setMenuOpen(false);
      handleClose();
    }
  }, [handleOpen, handleClose]);

  /* ── Text cycle ── */
  function animateText(opening: boolean) {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleRef.current?.kill();

    const cur = opening ? 'Menu' : 'Close';
    const tar = opening ? 'Close' : 'Menu';
    const seq = [cur, tar === 'Menu' ? 'Close' : 'Menu', tar, tar];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.45 + seq.length * 0.06,
      ease: 'power4.out',
    });
  }

  /* ── Click outside ── */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) {
        uiStore.setMenuOpen(false);
        handleClose();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, handleClose]);

  return (
    /* Global nav — visible on all screens */
    <div className="sm-scope fixed top-0 left-0 w-screen h-screen pointer-events-none z-50" suppressHydrationWarning>
      <div
        className="relative w-full h-full pointer-events-none"
        style={{ '--sm-accent': ACCENT } as React.CSSProperties}
        suppressHydrationWarning
      >
        {/* ── Toggle button (top-right) ── */}
        <button
          ref={toggleBtnRef}
          onClick={toggleMenu}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="pointer-events-auto absolute top-7 right-6 z-50 inline-flex items-center gap-1.5 text-white bg-transparent border-0 cursor-pointer font-medium text-sm leading-none"
        >
          <span className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap" aria-hidden>
            <span ref={textInnerRef} className="flex flex-col leading-none">
              {textLines.map((l, i) => (
                <span key={i} className="block h-[1em] leading-none">{l}</span>
              ))}
            </span>
          </span>
          <span
            ref={iconRef}
            className="relative w-3.5 h-3.5 inline-flex items-center justify-center"
            aria-hidden
          >
            <span ref={plusHRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2" />
            <span ref={plusVRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2" />
          </span>
        </button>

        {/* ── Pre-layer colour wipes ── */}
        <div ref={preLayersRef} className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 pointer-events-none z-5" suppressHydrationWarning>
          {COLORS.map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 bottom-0 w-full" style={{ background: c }} suppressHydrationWarning />
          ))}
        </div>

        {/* ── Slide-in panel ── */}
        <aside
          ref={panelRef}
          aria-hidden={!open}
          className="pointer-events-auto absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col pt-28 pb-10 z-10"
          style={{ background: PANEL_BG }}
          suppressHydrationWarning
        >
          <div className="grow max-h-[65vh]">
            <FlowingMenu
              items={navLinks.map(l => ({ text: l.name, link: l.href }))}
              currentPath={pathname}
              onItemClick={() => { uiStore.setMenuOpen(false); handleClose(); }}
              textColor="#fff"
              marqueeBgColor={ACCENT}
              marqueeTextColor="#fff"
              borderColor="rgba(255,255,255,0.08)"
              speed={12}
            />
          </div>

          <div className="px-8 mt-6">
            <a
              href="#contact"
              onClick={() => { uiStore.setMenuOpen(false); handleClose(); }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-base active:scale-95 transition-transform duration-150"
              style={{ background: `linear-gradient(135deg, #10b981, #14b8a6)` }}
            >
              Book a Free Trial
            </a>
          </div>

          <div className="px-8 mt-auto pt-4">
            {/* Divider */}
            <div className="w-16 h-px mb-6" style={{ background: `${ACCENT}40` }} />

            {/* Socials */}
            <div className="sm-socials flex flex-col gap-3">
              <h3 className="sm-socials-title text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
                Follow Us
              </h3>
              <ul className="sm-socials-list list-none m-0 p-0 flex flex-row gap-5 flex-wrap">
                {socialItems.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-base font-medium text-white/70 hover:text-emerald-300 no-underline transition-colors duration-200"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
