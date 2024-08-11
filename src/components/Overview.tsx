"use client";

import { useEffect, useRef, useState } from "react";
import { inter, satoshiBold } from "@/components/utils/font";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import Container from "@/components/ui/Container";
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";
import { Tilt } from 'react-tilt';
import { useSpring, animated } from 'react-spring';
import KUTE from 'kute.js';

const Overview = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const titleRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef(null);
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const particlesInit = async (main: Engine) => {
    await loadFull(main as any);
    setParticlesLoaded(true);
  };

  useEffect(() => {
    if (isInView && particlesLoaded) {
      controls.start("visible");
      animateContent();
    }
  }, [controls, isInView, particlesLoaded]);

  const animateContent = () => {
    // Anime.js animation for title
    anime({
      targets: titleRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic(1, .8)',
    });

    // Popmotion animation for content
    const { animate } = popmotion;
    animate({
      from: { scale: 0.5, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      duration: 1000,
      onUpdate: (v) => {
        if (contentRef.current) {
          contentRef.current.style.transform = `scale(${v.scale})`;
          contentRef.current.style.opacity = v.opacity.toString();
        }
      },
    });

    // KUTE.js animation for SVG
    if (svgRef.current) {
      KUTE.fromTo(
        svgRef.current,
        { path: '#path1' },
        { path: '#path2' },
        { duration: 2000, repeat: 999, yoyo: true }
      ).start();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const springProps = useSpring({
    from: { transform: 'translateY(50px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 1000,
  });

  return (
    <Container>
      <motion.section
        ref={ref}
        className={`${inter.className} relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden`}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.article
            className="flex flex-col gap-10 max-w-[900px] text-center mx-auto"
            variants={itemVariants}
          >
            <motion.h1
              ref={titleRef}
              className={`${satoshiBold.className} font-extrabold text-6xl sm:text-7xl md:text-8xl text-white animate__animated animate__fadeInDown`}
              variants={itemVariants}
            >
              Hi, I&rsquo;m Himanshu Chauhan.
            </motion.h1>
            <div ref={contentRef} className="vov fade-in">
              <motion.div variants={itemVariants} className="tracking-wide text-2xl sm:text-3xl md:text-4xl text-blue-400 font-bold">
                <TypeAnimation
                  sequence={[
                    'Frontend Developer',
                    2000,
                    'UI/UX Enthusiast',
                    2000,
                    'Creative Coder',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
                <span className="cursor">|</span>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl leading-9 text-gray-300 max-w-3xl mx-auto mt-6"
              >
                Passionate about crafting stunning, responsive, and user-centric web experiences.
                I transform ideas into pixel-perfect realities with clean, efficient code and a touch of magic.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
              >
                <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="animated-button px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 text-white text-xl font-semibold rounded-full shadow-lg transition duration-300"
                  >
                    View My Work
                  </motion.button>
                </Tilt>
                <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="animated-button px-10 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 bg-size-200 text-white text-xl font-semibold rounded-full shadow-lg transition duration-300"
                  >
                    Contact Me
                  </motion.button>
                </Tilt>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-8 mt-10"
              >
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-icon"
                    whileHover={{ scale: 1.3, y: -7 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="text-4xl text-gray-400 hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.article>
          <animated.div style={springProps}>
            <svg
              ref={svgRef}
              className="absolute bottom-0 left-0 w-full h-24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                id="path1"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192"
              />
              <path
                id="path2"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                d="M0,192L48,170.7C96,149,192,107,288,90.7C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128"
                opacity="0"
              />
            </svg>
          </animated.div>
        </div>
      </motion.section>
    </Container>
  );
};

export default Overview;
