"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { satoshiBold } from "@/components/utils/font";
import { AiOutlineMenu } from "react-icons/ai";
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';
import { motion, useAnimation } from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const Navbar = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const controls = useAnimation();
  const logoRef = useRef(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    // Anime.js animation for logo
    anime({
      targets: logoRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .8)',
    });

    // Popmotion animation for menu icon
    const { animate } = popmotion;
    animate({
      from: { scale: 0, rotate: -180 },
      to: { scale: 1, rotate: 0 },
      duration: 1000,
      onUpdate: (v) => {
        if (menuRef.current) {
          menuRef.current.style.transform = `scale(${v.scale}) rotate(${v.rotate}deg)`;
        }
      },
    });

    // KUTE.js animation for background
    const tween = KUTE.fromTo(
      '#navbar-bg',
      { path: 'M0,0 C25,0 75,100 100,100' },
      { path: 'M0,0 C75,50 25,50 100,100' },
      { repeat: 999, duration: 5000, yoyo: true }
    );
    tween.start();
  }, [inView, controls]);

  const springProps = useSpring({
    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
    config: config.wobbly,
  });

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  };

  return (
    <motion.nav
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -50 }
      }}
      transition={{ duration: 0.5, type: "spring" }}
      className="h-[10vh] grid place-items-center relative overflow-hidden bg-transparent"
    >
      <svg className="absolute w-full h-full" style={{zIndex: -1}}>
        <path id="navbar-bg" d="M0,0 C25,0 75,100 100,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      </svg>
      <Container className="flex justify-between items-center">
        <animated.p
          ref={logoRef}
          style={springProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${satoshiBold.className} text-secondary text-3xl tracking-[4px] animate__animated animate__fadeIn cursor-pointer`}
        >
          :&#x2f;&#x2f;HC
        </animated.p>

        <motion.div
          ref={menuRef}
          className="hidden md:block vov fade-in"
          variants={menuVariants}
          whileHover={{ scale: 1.2, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiOutlineMenu className="w-8 h-8 text-secondary cursor-pointer hover:text-primary transition-colors duration-300" />
        </motion.div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
