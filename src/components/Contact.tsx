'use client'

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { satoshiBold, satoshiRegular, satoshiLight } from '@/components/utils/font';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';

const ContactWrapper = styled.div`
  background: transparent;
  color: #ffffff;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #64ffda;
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.7);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 4rem;
  text-align: center;
  color: #8892b0;
`;

const ContactLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactLink = styled(motion.a)`
  color: #ffffff;
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #64ffda;
    transform: translateY(-5px) rotate(5deg) scale(1.1);
  }
`;

const Contact = () => {
    const controls = useAnimation();
    const titleRef = useRef(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
            '#contact-bg-path',
            { path: 'M0,0 C25,0 75,100 100,100' },
            { path: 'M0,0 C75,50 25,50 100,100' },
            { repeat: 999, duration: 5000, yoyo: true }
        );
        tween.start();

        // Animate contact links
        linkRefs.current.forEach((link, index) => {
            if (link) {
                anime({
                    targets: link,
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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <ContactWrapper>
            <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgba(100,255,218,0.1)', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: 'rgba(0,0,0,0)', stopOpacity:1}} />
                    </linearGradient>
                </defs>
                <path id="contact-bg-path" d="M0,0 C25,0 75,100 100,100" fill="url(#grad1)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            </svg>

            <ContactContent
                initial="hidden"
                animate={controls}
                variants={containerVariants}
            >
                <Title 
                    ref={titleRef}
                    className={`${satoshiBold.className} animate__animated animate__fadeInDown`}
                >
                    Get in touch.
                </Title>
                <Subtitle 
                    ref={subtitleRef}
                    className={`${satoshiRegular.className} vov fade-in`}
                >
                    Let's create something amazing together!
                </Subtitle>

                <ContactLinks>
                    {[
                        { icon: FaGithub, href: "https://github.com/yourusername" },
                        { icon: FaTwitter, href: "https://twitter.com/yourusername" },
                        { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername" },
                        { icon: FaEnvelope, href: "mailto:your.email@example.com" },
                    ].map((link, index) => (
                        <ContactLink 
                            key={index}
                            href={link.href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            ref={el => linkRefs.current[index] = el}
                            className="vov fade-in-up"
                        >
                            <link.icon />
                        </ContactLink>
                    ))}
                </ContactLinks>
            </ContactContent>
        </ContactWrapper>
    );
};

export default Contact;
