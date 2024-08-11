'use client'

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { satoshiBold, satoshiRegular, satoshiLight } from '@/components/utils/font';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGithub, FaPython, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiRedux, SiExpress, SiMongodb, SiGraphql, SiVuedotjs, SiAngular, SiNextdotjs, SiNestjs, SiPostgresql, SiFirebase } from 'react-icons/si';
import 'animate.css';
import anime from 'animejs/lib/anime.es.js';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';
import { useInView } from 'react-intersection-observer';

const Skills: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { icon: <FaReact />, name: 'React' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <FaJs />, name: 'JavaScript' },
    { icon: <FaHtml5 />, name: 'HTML' },
    { icon: <FaCss3Alt />, name: 'CSS' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
    { icon: <SiRedux />, name: 'Redux' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiExpress />, name: 'Express' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <SiGraphql />, name: 'GraphQL' },
    { icon: <FaGithub />, name: 'GitHub' },
    { icon: <SiVuedotjs />, name: 'Vue.js' },
    { icon: <SiAngular />, name: 'Angular' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <SiNestjs />, name: 'NestJS' },
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiPostgresql />, name: 'PostgreSQL' },
    { icon: <FaDocker />, name: 'Docker' },
    { icon: <FaAws />, name: 'AWS' },
    { icon: <SiFirebase />, name: 'Firebase' },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');

      // Anime.js animation for title
      anime({
        targets: '.skills-title',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
      });

      // Popmotion animation for subtitle
      const { animate } = popmotion;
      animate({
        from: { scale: 0.5, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        duration: 1000,
        onUpdate: (v) => {
          const subtitle = document.querySelector('.skills-subtitle');
          if (subtitle) {
            subtitle.style.transform = `scale(${v.scale})`;
            subtitle.style.opacity = v.opacity.toString();
          }
        },
      });

      // KUTE.js animation for background
      const tween = KUTE.fromTo(
        '#skills-bg-path',
        { path: 'M0,0 C25,0 75,100 100,100' },
        { path: 'M0,0 C75,50 25,50 100,100' },
        { repeat: 999, duration: 5000, yoyo: true }
      );
      tween.start();
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
        <defs>
          <linearGradient id="skills-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgba(100,255,218,0.1)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <path id="skills-bg-path" d="M0,0 C25,0 75,100 100,100" fill="url(#skills-grad)" />
      </svg>

      <div className="max-w-7xl mx-auto">
        <h2 className={`${satoshiBold.className} text-6xl md:text-7xl mb-8 text-center text-teal-400 drop-shadow-glow skills-title`}>
          skills.
        </h2>
        <p className={`${satoshiLight.className} text-xl mb-16 text-center text-gray-300 skills-subtitle vov fade-in`}>
          Here's a glimpse into my tech toolkit. These are the technologies I've been working with recently and continue to explore:
        </p>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="flex flex-col items-center p-4 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl mb-3 text-teal-400">{skill.icon}</div>
              <span className={`${satoshiRegular.className} text-gray-300`}>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
