import Lenis from 'lenis';
import { prefersReducedMotion } from './motion.js';

let lenis = null;

// Initialize smooth scrolling with Lenis
export const initSmoothScroll = () => {
  // Don't initialize if user prefers reduced motion
  if (prefersReducedMotion()) {
    return null;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Animation frame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
};

// Scroll to element smoothly
export const scrollToElement = (target, offset = 0) => {
  if (!lenis) {
    // Fallback to native scroll
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  lenis.scrollTo(target, {
    offset,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
};

// Scroll to top
export const scrollToTop = () => {
  scrollToElement(0);
};

// Stop/start smooth scrolling
export const stopScroll = () => {
  if (lenis) {
    lenis.stop();
  }
};

export const startScroll = () => {
  if (lenis) {
    lenis.start();
  }
};

// Destroy smooth scrolling
export const destroyScroll = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

// Get current scroll position
export const getScrollY = () => {
  if (lenis) {
    return lenis.scroll;
  }
  return window.scrollY;
};

export { lenis };
