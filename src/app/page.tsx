'use client'

import React, { useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';

const PageWrapper = styled(motion.div)`
  background: transparent;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Section = styled(motion.section)`
  padding: 4rem 0;
`;

export default function Home() {
  const controls = useAnimation();
  const bgRef = useRef(null);

  useEffect(() => {
    // Animate background
    const tween = KUTE.fromTo(
      '#bg-path',
      { path: 'M0,0 C25,0 75,100 100,100' },
      { path: 'M0,0 C75,50 25,50 100,100' },
      { repeat: 999, duration: 10000, yoyo: true }
    );
    tween.start();

    // Animate sections
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 }
    }));

    // Particle animation
    anime({
      targets: '.particle',
      translateX: () => anime.random(-500, 500),
      translateY: () => anime.random(-500, 500),
      scale: () => anime.random(1, 1.5),
      easing: 'easeInOutQuad',
      duration: 3000,
      delay: anime.stagger(10),
      loop: true
    });
  }, [controls]);

  return (
    <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <svg className="fixed inset-0 w-full h-full" style={{zIndex: -1}} ref={bgRef}>
        <path id="bg-path" d="M0,0 C25,0 75,100 100,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        {[...Array(50)].map((_, i) => (
          <circle key={i} className="particle" r="2" fill="#64ffda" />
        ))}
      </svg>

      <Navbar />

      <Section custom={0} initial={{ opacity: 0, y: 50 }} animate={controls}>
        <Overview />
      </Section>

      <Section custom={1} initial={{ opacity: 0, y: 50 }} animate={controls}>
        <About />
      </Section>

      <Section custom={2} initial={{ opacity: 0, y: 50 }} animate={controls}>
        <Skills />
      </Section>

      <Section custom={3} initial={{ opacity: 0, y: 50 }} animate={controls}>
        <Contact />
      </Section>

      <Footer />
    </PageWrapper>
  );
}
