import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins safely in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Optimize ticker performance - prevent jumps on background tab throttle
  gsap.ticker.lagSmoothing(1000, 16);

  // Set default luxury easing and duration
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.75,
  });
}

/**
 * Checks if user prefers reduced motion
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if current viewport is mobile (< 768px) to disable complex parallax
 */
export const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Silky smooth reveal for elements entering viewport.
 * Uses ScrollTrigger with once: true so it cleans up immediately after reveal,
 * maintaining 120fps scrolling with zero ongoing CPU overhead.
 */
export const smoothReveal = (
  element: gsap.DOMTarget,
  options?: {
    y?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  }
) => {
  if (!element || isReducedMotion()) return;

  const {
    y = 20,
    scale = 1,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    start = 'top 95%',
  } = options || {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
      scale: scale !== 1 ? scale : 1,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start,
        once: true,
      },
    }
  );
};

/**
 * Ultra-smooth subtle parallax for editorial imagery (desktop only).
 * Uses scrub with smooth lerp without locking scroll.
 */
export const smoothParallax = (
  element: gsap.DOMTarget,
  triggerElement?: gsap.DOMTarget,
  options?: {
    yPercent?: number;
    start?: string;
    end?: string;
    scrub?: number | boolean;
  }
) => {
  if (!element || isReducedMotion() || isMobileViewport()) return;

  const {
    yPercent = 3,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.2,
  } = options || {};

  return gsap.fromTo(
    element,
    { yPercent: -yPercent, willChange: 'transform' },
    {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: (triggerElement || element) as gsap.DOMTarget,
        start,
        end,
        scrub,
      },
    }
  );
};

/**
 * Silky organic continuous floating effect for badges and decorative items.
 * Kept intentionally subtle (quiet luxury) to avoid distraction.
 */
export const smoothFloating = (
  element: gsap.DOMTarget,
  options?: {
    y?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
  }
) => {
  if (!element || isReducedMotion()) return;

  const { y = 4, rotation = 0.8, duration = 3.8, delay = 0 } = options || {};

  return gsap.to(element, {
    y,
    rotation,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    willChange: 'transform',
  });
};

export { gsap, ScrollTrigger };
