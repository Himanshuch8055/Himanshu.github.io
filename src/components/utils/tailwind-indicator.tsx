"use client";

import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js animation
    anime({
      targets: indicatorRef.current,
      scale: [0, 1],
      rotate: '1turn',
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
    });

    // Popmotion animation
    const { animate } = popmotion;
    animate({
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 1000,
      onUpdate: (v) => {
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = v.toString();
        }
      },
    });

    // KUTE.js animation
    const tween = KUTE.fromTo(
      '#indicator-bg',
      { draw: '0% 0%' },
      { draw: '0% 100%' },
      { duration: 1000 }
    );
    tween.start();
  }, []);

  return (
    <div ref={indicatorRef} className="fixed bottom-2 left-2 z-50 animate__animated animate__fadeIn vov fade-in">
      <svg width="60" height="60" viewBox="0 0 60 60" className="bg-transparent">
        <circle id="indicator-bg" cx="30" cy="30" r="28" fill="none" stroke="#64ffda" strokeWidth="2" />
        <g className="text-xs font-mono">
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="block sm:hidden">xs</text>
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</text>
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</text>
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="hidden lg:block xl:hidden 2xl:hidden">lg</text>
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="hidden xl:block 2xl:hidden">xl</text>
          <text x="30" y="25" textAnchor="middle" fill="#ffffff" className="hidden 2xl:block">2xl</text>
        </g>
        <text x="30" y="40" textAnchor="middle" fill="#64ffda" className="text-[8px]">Tailwind</text>
      </svg>
    </div>
  );
}
