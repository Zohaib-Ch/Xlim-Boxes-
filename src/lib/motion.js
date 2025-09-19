import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
export const registerGSAP = () => {
  gsap.registerPlugin(ScrollTrigger);
};

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Reveal with stagger animation
export const revealStagger = (scope, selector, opts = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    y = 30,
    opacity = 0,
    ease = 'power3.out',
    trigger = null,
    start = 'top 80%',
    ...rest
  } = opts;

  if (prefersReducedMotion()) {
    gsap.set(selector, { opacity: 1, y: 0 });
    return null;
  }

  const elements = scope ? scope.querySelectorAll(selector) : document.querySelectorAll(selector);
  
  gsap.set(elements, { opacity, y });

  const tl = gsap.timeline({
    delay,
    scrollTrigger: trigger ? {
      trigger: trigger,
      start,
      toggleActions: 'play none none reverse',
      ...rest
    } : null
  });

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease
  });

  return tl;
};

// Pin section for scroll-triggered animations
export const pinSection = (el, opts = {}) => {
  const {
    start = 'top top',
    end = '+=100%',
    scrub = 1,
    pin = true,
    ...rest
  } = opts;

  if (prefersReducedMotion()) {
    return null;
  }

  return ScrollTrigger.create({
    trigger: el,
    start,
    end,
    pin,
    scrub,
    ...rest
  });
};

// Magnetic button effect
export const magnetize = (el, strength = 0.3) => {
  if (prefersReducedMotion() || !el) return;

  const handleMouseMove = (e) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  el.addEventListener('mousemove', handleMouseMove);
  el.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Split text into words/chars for animation
export const splitText = (element, type = 'words') => {
  if (!element) return [];

  const text = element.textContent;
  const splits = [];

  if (type === 'words') {
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      
      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.display = 'inline-block';
      
      span.appendChild(inner);
      element.appendChild(span);
      
      if (index < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
      
      splits.push(inner);
    });
  } else if (type === 'chars') {
    const chars = text.split('');
    element.innerHTML = '';
    
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      splits.push(span);
    });
  }

  return splits;
};

// Smooth counter animation
export const animateCounter = (element, target, duration = 2) => {
  if (prefersReducedMotion()) {
    element.textContent = target;
    return;
  }

  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    }
  });
};

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  if (prefersReducedMotion()) return null;

  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

// Fade and scale animation
export const fadeScale = (elements, opts = {}) => {
  const {
    scale = 0.8,
    opacity = 0,
    duration = 0.6,
    stagger = 0.1,
    ease = 'power2.out',
    ...rest
  } = opts;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, scale: 1 });
    return null;
  }

  gsap.set(elements, { opacity, scale });

  return gsap.to(elements, {
    opacity: 1,
    scale: 1,
    duration,
    stagger,
    ease,
    ...rest
  });
};

// Initialize GSAP defaults
export const initGSAP = () => {
  registerGSAP();
  
  // Set GSAP defaults
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6
  });

  // Refresh ScrollTrigger on resize
  ScrollTrigger.addEventListener('refresh', () => ScrollTrigger.refresh());
  
  // Clean up ScrollTrigger on page unload
  window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
};
