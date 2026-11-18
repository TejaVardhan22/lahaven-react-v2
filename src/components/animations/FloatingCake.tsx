import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface FloatingCakeProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  floatDistance?: number;
  floatDuration?: number;
  enableTilt?: boolean;
  enableShadow?: boolean;
  priority?: boolean;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Premium Floating Cake component
 * - Gentle floating motion with natural harmonic sine easing
 * - Subtle 3D rotation & depth
 * - Dynamic breathing ground shadow that responds in sync
 * - Interactive Apple-style mouse tilt on desktop
 * - Full reduced-motion and mobile low-power support
 */
export const FloatingCake: React.FC<FloatingCakeProps> = ({
  src,
  alt,
  width = 800,
  height = 800,
  className = '',
  imageClassName = '',
  floatDistance = 10,
  floatDuration = 4.2,
  enableTilt = true,
  enableShadow = true,
  priority = false,
  badge,
  children,
}) => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural physical feel
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || reduceMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const shouldAnimate = !reduceMotion;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX: enableTilt && !reduceMotion ? tiltX : 0,
          rotateY: enableTilt && !reduceMotion ? tiltY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative will-change-transform"
      >
        {/* Floating Cake Container */}
        <motion.div
          animate={
            shouldAnimate
              ? {
                  y: [-floatDistance, floatDistance, -floatDistance],
                }
              : { y: 0 }
          }
          transition={
            shouldAnimate
              ? {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
          className="relative z-10 will-change-transform"
        >
          {/* Cake Image with smooth lighting / edge treatment */}
          <div className="relative overflow-hidden rounded-[1.8rem] transition-transform duration-500 ease-out">
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${imageClassName}`}
            />

            {/* Subtle luxury ambient highlight overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/20 opacity-60" />
          </div>

          {/* Optional Floating Badge on Cake */}
          {badge && (
            <motion.div
              animate={
                shouldAnimate
                  ? {
                      y: [floatDistance * 0.4, -floatDistance * 0.4, floatDistance * 0.4],
                    }
                  : undefined
              }
              transition={
                shouldAnimate
                  ? {
                      duration: floatDuration * 0.9,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : undefined
              }
              className="absolute pointer-events-none z-20"
            >
              {badge}
            </motion.div>
          )}

          {children}
        </motion.div>

        {/* Dynamic Breathing Ground Shadow */}
        {enableShadow && (
          <motion.div
            animate={
              shouldAnimate
                ? {
                    scaleX: [0.88, 1.08, 0.88],
                    scaleY: [0.85, 1.12, 0.85],
                    opacity: [0.22, 0.42, 0.22],
                  }
                : { scaleX: 1, scaleY: 1, opacity: 0.3 }
            }
            transition={
              shouldAnimate
                ? {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }
                : undefined
            }
            className="pointer-events-none absolute -bottom-6 inset-x-8 h-8 rounded-[100%] bg-slate_blue/35 blur-xl will-change-transform"
            style={{ transformOrigin: 'center center' }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default FloatingCake;

