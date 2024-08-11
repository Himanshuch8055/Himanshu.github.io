'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaCode, FaCoffee, FaBook, FaLaptopCode, FaPalette, FaLightbulb } from 'react-icons/fa';
import { satoshiBold, satoshiRegular, satoshiLight } from '@/components/utils/font';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';

const About = () => {
  const controls = useAnimation();
  const titleRef = useRef(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Anime.js animation for title
    anime({
      targets: titleRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic(1, .8)',
    });

    // Popmotion animation for subtitle
    const { animate } = popmotion;
    animate({
      from: { scale: 0.5, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      duration: 1000,
      onUpdate: (v) => {
        if (subtitleRef.current) {
          subtitleRef.current.style.transform = `scale(${v.scale})`;
          subtitleRef.current.style.opacity = v.opacity.toString();
        }
      },
    });

    // KUTE.js animation for background
    const tween = KUTE.fromTo(
      '#bg-path',
      { path: 'M0,0 C25,0 75,100 100,100' },
      { path: 'M0,0 C75,50 25,50 100,100' },
      { repeat: 999, duration: 5000, yoyo: true }
    );
    tween.start();

    // Animate icons
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        anime({
          targets: icon,
          translateY: [50, 0],
          opacity: [0, 1],
          delay: index * 100,
          duration: 1000,
          easing: 'easeOutQuad',
        });
      }
    });

    controls.start("visible");
  }, [controls]);

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

  return (
    <motion.div 
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgba(100,255,218,0.1)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <path id="bg-path" d="M0,0 C25,0 75,100 100,100" fill="url(#grad1)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      </svg>

      <div className="max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className={`${satoshiBold.className} text-6xl md:text-7xl mb-8 text-center text-teal-400 drop-shadow-glow animate__animated animate__fadeInDown`}
        >
          about me.
        </h1>
        <h2 
          ref={subtitleRef}
          className={`${satoshiRegular.className} text-3xl md:text-4xl mb-6 text-center text-blue-300 vov fade-in`}
        >
          Himanshu Chauhan
        </h2>
        <motion.p 
          variants={itemVariants}
          className={`${satoshiLight.className} text-2xl mb-16 text-center text-gray-300`}
        >
          Front End Developer | Creative Coder | Book Enthusiast
        </motion.p>
        
        <div className="flex justify-center space-x-16 mb-20">
          {[
            { icon: FaLaptopCode, text: "Frontend Dev" },
            { icon: FaPalette, text: "Creative Coder" },
            { icon: FaLightbulb, text: "Innovator" },
          ].map((item, index) => (
            <motion.div
              key={index}
              ref={el => iconRefs.current[index] = el}
              variants={itemVariants}
              className="flex flex-col items-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className="text-5xl text-teal-400 mb-3 group-hover:text-teal-300 transition-colors duration-300" />
              <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">{item.text}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="space-y-8">
          {[
            "Hi, again! I'm Himanshu. I'm a frontend developer with a passion for blending creativity with functionality. I enjoy building websites that are both beautiful and user-friendly. I believe in simplicity and minimalism and enjoy bringing that ethos into every project I touch.",
            "I'm a lifelong learner and I'm always looking for new ways to grow and improve my skills. I'm currently diving deep into Vue, and I'm excited to see where this journey takes me.",
            "When I'm not crafting pixel-perfect interfaces, you can find me with my nose in a book or rewatching my favorite shows for the 100th time. Did I mention I'm an <span class='text-teal-400 font-semibold'>7x binger of Archer</span> and a <span class='text-teal-400 font-semibold'>3x binger of Arrested Development</span>?",
          ].map((paragraph, index) => (
            <p 
              key={index} 
              ref={el => paragraphRefs.current[index] = el}
              className={`${satoshiLight.className} text-xl text-gray-300 leading-relaxed vov fade-in-up`} 
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
