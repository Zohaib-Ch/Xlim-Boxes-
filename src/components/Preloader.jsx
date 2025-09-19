import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion.js';
import { usePreloader } from '../lib/usePreloader.js';
import styles from './Preloader.module.scss';

const Preloader = ({ onComplete }) => {
  const { isLoading, progress } = usePreloader();
  const [animationPhase, setAnimationPhase] = useState('entering');
  const preloaderRef = useRef(null);
  const logoContainerRef = useRef(null);
  const xlimRef = useRef(null);
  const boxesRef = useRef(null);
  const taglineRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressTextRef = useRef(null);
  const progressLabelRef = useRef(null);
  const ornamentTopRef = useRef(null);
  const ornamentBottomRef = useRef(null);
  const canvasRef = useRef(null);
  const shimmerRef = useRef(null);
  const masterTl = useRef(null);

  // Enhanced luxury particles
  useEffect(() => {
    if (prefersReducedMotion() || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 80;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create luxury particles with different types
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.7 ? 'gold' : 'cyan',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse attraction (subtle)
        const dx = (mouseX - particle.x) * 0.0008;
        const dy = (mouseY - particle.y) * 0.0008;
        particle.vx += dx;
        particle.vy += dy;

        // Apply friction
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Boundary wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Pulse animation
        particle.pulse += particle.pulseSpeed;
        const pulseOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse));

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );

        if (particle.type === 'gold') {
          gradient.addColorStop(0, `rgba(198, 166, 103, ${pulseOpacity})`);
          gradient.addColorStop(0.5, `rgba(198, 166, 103, ${pulseOpacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(198, 166, 103, 0)');
        } else {
          gradient.addColorStop(0, `rgba(0, 229, 255, ${pulseOpacity})`);
          gradient.addColorStop(0.5, `rgba(0, 229, 255, ${pulseOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Master timeline for luxury entrance
  useEffect(() => {
    if (!logoContainerRef.current || prefersReducedMotion()) return;

    masterTl.current = gsap.timeline({
      onComplete: () => {
        setAnimationPhase('loading');
      }
    });

    // Set initial states
    gsap.set([xlimRef.current, boxesRef.current, taglineRef.current], {
      opacity: 0,
      y: 40,
      scale: 0.9
    });

    gsap.set([ornamentTopRef.current, ornamentBottomRef.current], {
      opacity: 0,
      scaleX: 0
    });

    gsap.set(progressLabelRef.current, {
      opacity: 0,
      y: 20
    });

    // Luxury entrance sequence - Extended timing
    masterTl.current
      // Ornaments appear first - slower and more elegant
      .to(ornamentTopRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 1.6,
        ease: "power3.out"
      })
      .to(ornamentBottomRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 1.6,
        ease: "power3.out"
      }, "-=1.0")
      // XLIM appears with more elegance
      .to(xlimRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: "power3.out"
      }, "-=0.8")
      // Add shimmer effect to XLIM - longer duration
      .to(xlimRef.current, {
        textShadow: "0 0 30px rgba(198, 166, 103, 0.8), 0 0 60px rgba(198, 166, 103, 0.4), 0 0 100px rgba(198, 166, 103, 0.2)",
        duration: 1.0,
        ease: "power2.inOut"
      }, "-=0.6")
      // BOXES appears - slower
      .to(boxesRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out"
      }, "-=1.0")
      // Tagline appears - more deliberate
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.6")
      // Progress label appears - final touch
      .to(progressLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out"
      }, "-=0.4");

    return () => {
      if (masterTl.current) {
        masterTl.current.kill();
      }
    };
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (!progressFillRef.current || !progressTextRef.current) return;

    gsap.to(progressFillRef.current, {
      width: `${progress}%`,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.to(progressTextRef.current, {
      innerText: Math.round(progress),
      duration: 0.6,
      ease: 'power2.out',
      snap: { innerText: 1 }
    });
  }, [progress]);

  // Exit animation
  useEffect(() => {
    if (!isLoading && preloaderRef.current && animationPhase === 'loading') {
      setAnimationPhase('exiting');

      const exitTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
          if (preloaderRef.current && preloaderRef.current.parentNode) {
            preloaderRef.current.parentNode.removeChild(preloaderRef.current);
          }
        }
      });

      if (prefersReducedMotion()) {
        exitTl.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.5
        });
      } else {
        exitTl
          .to([progressBarRef.current, progressLabelRef.current], {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power2.in'
          })
          .to(taglineRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in'
          }, "-=0.2")
          .to([xlimRef.current, boxesRef.current], {
            opacity: 0,
            y: -30,
            scale: 1.1,
            duration: 0.8,
            ease: 'power3.in'
          }, "-=0.3")
          .to([ornamentTopRef.current, ornamentBottomRef.current], {
            opacity: 0,
            scaleX: 0,
            duration: 0.6,
            ease: 'power2.in'
          }, "-=0.5")
          .to(preloaderRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut'
          }, "-=0.3");
      }
    }
  }, [isLoading, onComplete, animationPhase]);

  if (!isLoading && animationPhase === 'exiting') return null;

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      {/* Luxury Background */}
      <div className={styles.background}>
        <div className={styles.gradient} />
        <div className={styles.texture} />
        <canvas ref={canvasRef} className={styles.particles} />
      </div>

      {/* Ornamental Borders */}
      <div ref={ornamentTopRef} className={styles.ornament}>
        <svg viewBox="0 0 300 20" className={styles.ornamentSvg}>
          <path 
            d="M0,10 Q75,2 150,10 T300,10" 
            stroke="url(#goldGradient)" 
            strokeWidth="1" 
            fill="none"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(198, 166, 103, 0)" />
              <stop offset="50%" stopColor="rgba(198, 166, 103, 1)" />
              <stop offset="100%" stopColor="rgba(198, 166, 103, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Container */}
      <div ref={logoContainerRef} className={styles.logoContainer}>
        <div ref={xlimRef} className={styles.xlim}>XLIM</div>
        <div ref={boxesRef} className={styles.boxes}>BOXES</div>
        <div ref={taglineRef} className={styles.tagline}>
          Luxury Rigid Packaging, Engineered to Impress
        </div>
      </div>

      {/* Bottom Ornament */}
      <div ref={ornamentBottomRef} className={`${styles.ornament} ${styles.ornamentBottom}`}>
        <svg viewBox="0 0 300 20" className={styles.ornamentSvg}>
          <path 
            d="M0,10 Q75,18 150,10 T300,10" 
            stroke="url(#goldGradient2)" 
            strokeWidth="1" 
            fill="none"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(198, 166, 103, 0)" />
              <stop offset="50%" stopColor="rgba(198, 166, 103, 1)" />
              <stop offset="100%" stopColor="rgba(198, 166, 103, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Progress Section */}
      <div ref={progressLabelRef} className={styles.progressSection}>
        <div className={styles.progressLabel}>Loading Experience</div>
        <div ref={progressBarRef} className={styles.progressBar}>
          <div ref={progressFillRef} className={styles.progressFill} />
          <div className={styles.progressGlow} />
        </div>
        <div className={styles.progressText}>
          <span ref={progressTextRef}>0</span>%
        </div>
      </div>

      {/* Shimmer Effect */}
      <div ref={shimmerRef} className={styles.shimmer} />
    </div>
  );
};

export default Preloader;