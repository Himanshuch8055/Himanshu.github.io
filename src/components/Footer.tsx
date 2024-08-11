"use client"

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import Container from '@/components/ui/Container';
import { satoshiBold, satoshiRegular, satoshiLight } from '@/components/utils/font';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
import * as popmotion from 'popmotion';
import 'vov.css';
import KUTE from 'kute.js';

const FooterWrapper = styled.footer`
  background: transparent;
  color: #ffffff;
  padding: 6rem 0 3rem;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: #ffffff;
  font-size: 1.75rem;
  transition: all 0.3s ease;

  &:hover {
    color: #64ffda;
  }
`;

const FooterNav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled(motion.a)`
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;

  &:hover {
    color: #64ffda;
  }
`;

const ScrollToTop = styled(motion.button)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  background-color: #64ffda;
  color: #1a1a1a;
  border: none;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(100, 255, 218, 0.3);
`;

const Footer: React.FC = () => {
  const controls = useAnimation();
  const titleRef = useRef(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRef = useRef(null);

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

    // KUTE.js animation for social links
    const tween = KUTE.fromTo(
      socialLinksRef.current,
      { translateX: -50 },
      { translateX: 0 },
      { duration: 1000, easing: 'easingQuadraticInOut' }
    );
    tween.start();

    controls.start("visible");
  }, [controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterSection variants={itemVariants}>
            <motion.h2 
              ref={titleRef}
              className={`${satoshiBold.className} text-4xl mb-4 text-[#64ffda] animate__animated animate__fadeInDown`}
            >:://HC</motion.h2>
            <motion.p 
              ref={subtitleRef}
              className={`${satoshiLight.className} text-base text-gray-300 mb-4 max-w-md leading-relaxed vov fade-in`}
            >
              Crafting digital experiences with passion and precision. Let's build something extraordinary together.
            </motion.p>
            <SocialLinks ref={socialLinksRef} variants={itemVariants}>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" whileHover={{ scale: 1.2, rotate: 5 }}>
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" whileHover={{ scale: 1.2, rotate: -5 }}>
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" whileHover={{ scale: 1.2, rotate: 5 }}>
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="mailto:contact@example.com" aria-label="Email" whileHover={{ scale: 1.2, rotate: -5 }}>
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection variants={itemVariants}>
            <motion.h3 
              className={`${satoshiBold.className} text-2xl mb-4 text-[#64ffda] animate__animated animate__fadeInRight`}
            >Quick Links</motion.h3>
            <FooterNav>
              <FooterLink href="#" className={`${satoshiRegular.className} text-lg vov slide-in-right`} whileHover={{ x: 5, color: '#64ffda' }}>Home</FooterLink>
              <FooterLink href="#" className={`${satoshiRegular.className} text-lg vov slide-in-right`} whileHover={{ x: 5, color: '#64ffda' }}>About</FooterLink>
              <FooterLink href="#" className={`${satoshiRegular.className} text-lg vov slide-in-right`} whileHover={{ x: 5, color: '#64ffda' }}>Projects</FooterLink>
              <FooterLink href="#" className={`${satoshiRegular.className} text-lg vov slide-in-right`} whileHover={{ x: 5, color: '#64ffda' }}>Contact</FooterLink>
            </FooterNav>
          </FooterSection>
          
          <FooterSection variants={itemVariants}>
            <motion.h3 
              className={`${satoshiBold.className} text-2xl mb-4 text-[#64ffda] animate__animated animate__fadeInRight`}
            >Contact</motion.h3>
            <motion.p 
              className={`${satoshiLight.className} text-base text-gray-300 mb-3 leading-relaxed vov fade-in-up`}
            >
              123 Web Dev Lane<br />
              Codeverse City, CV 12345
            </motion.p>
            <motion.p 
              className={`${satoshiLight.className} text-base text-gray-300 leading-relaxed vov fade-in-up`}
            >
              contact@hc.dev<br />
              +1 (555) 123-4567
            </motion.p>
          </FooterSection>
        </FooterContent>
        <motion.div 
          className={`${satoshiLight.className} text-sm text-gray-400 text-center mt-12 animate__animated animate__fadeInUp`}
        >
          © {new Date().getFullYear()} HC. All rights reserved.
        </motion.div>
      </Container>
      <ScrollToTop 
        onClick={scrollToTop} 
        aria-label="Scroll to top"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <FaArrowUp />
      </ScrollToTop>
    </FooterWrapper>
  );
};

export default Footer;
