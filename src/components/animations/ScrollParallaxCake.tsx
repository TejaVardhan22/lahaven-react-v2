import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ScrollParallaxCakeProps {
  children: React.ReactNode;
  speed?: number; // e.g. 40 = subtle upwards parallax, -40 = downwards
  rotateFactor?: number; // e.g. 3 = subtle 3 degree rotation during scroll
  scaleFactor?: number; // e.g. 0.05 = scales from 0.96 to 1.04
  fade?: boolean;
  className?: string;
  offset?: ["start end" | "start start" | "center end" | "start center", "end start" | "end end" | "center start"];
}

/**
 * Reusable Cinematic Scroll Parallax Component
 * Synchronizes vertical displacement, subtle tilt/rotation, and optional scale
 * with the viewport scroll progress using hardware-accelerated transforms.
 */
export const ScrollParallaxCake: React.FC<ScrollParallaxCakeProps> = ({
  children,
  speed = 45,
  rotateFactor = 2.5,
  scaleFactor = 0.04,
  fade = false,
  className = '',
  offset = ['start end', 'end start'],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // Smooth springs for scroll responsiveness without jarring jumps
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 150,
    mass: 0.5,
  });

  // Calculate transform values
  const y = useTransform(smoothProgress, [0, 1], [-speed, speed]);
  const rotate = useTransform(smoothProgress, [0, 1], [-rotateFactor, rotateFactor]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1 - scaleFactor, 1, 1 - scaleFactor * 0.5]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.85]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative will-change-transform ${className}`}>
      <motion.div
        style={{
          y,
          rotateZ: rotate,
          scale,
          opacity: fade ? opacity : 1,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollParallaxCake;

