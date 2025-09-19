import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Hero.module.scss';

const Hero = () => {
  const [isReady, setIsReady] = useState(false);
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const visualRef = useRef(null);
  const statsRef = useRef(null);
  const scrollHintRef = useRef(null);
  const particlesRef = useRef([]);

  // Smooth transition from preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      
      if (prefersReducedMotion() || !heroRef.current) return;

      // Master timeline for professional entrance
      const masterTl = gsap.timeline({ delay: 0.3 });

      // Set initial states
      gsap.set([headlineRef.current, sublineRef.current, descriptionRef.current], {
        opacity: 0,
        y: 60,
        rotationX: 15
      });

      gsap.set(ctaContainerRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(visualRef.current, {
        opacity: 0,
        x: 100,
        rotationY: -20
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(scrollHintRef.current, {
        opacity: 0,
        y: 20
      });

      // Professional entrance sequence
      masterTl
        .to(headlineRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.4,
          ease: 'power3.out'
        })
        .to(sublineRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.8')
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.6')
        .to(ctaContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.4')
        .to(visualRef.current, {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.6,
          ease: 'power3.out'
        }, '-=1.2')
        .to(statsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.6')
        .to(scrollHintRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3');

    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Professional GSAP hover effects
  useEffect(() => {
    if (!isReady || prefersReducedMotion()) return;

    // Primary CTA hover effect
    if (primaryCtaRef.current) {
      const btn = primaryCtaRef.current;
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        scale: 1.05,
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 229, 255, 0.4)',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(btn.querySelector(`.${styles.ctaGlow}`), {
        scale: 1.2,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      }, 0)
      .to(btn.querySelector(`.${styles.ctaText}`), {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    }

    // Secondary CTA hover effect
    if (secondaryCtaRef.current) {
      const btn = secondaryCtaRef.current;
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        scale: 1.03,
        y: -4,
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        borderColor: '#00e5ff',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(btn.querySelector('svg'), {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    }

    // Background animation
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '100% 100%',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    }

    // Particle animations
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -30 - (index * 5),
          x: Math.sin(index) * 20,
          rotation: 360,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.5
        });
      }
    });

    // Scroll hint animation
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }

  }, [isReady]);

  // Handle interactions
  const handlePrimaryClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      gsap.to(window, {
        scrollTo: { y: contactSection, offsetY: 80 },
        duration: 1.5,
        ease: 'power3.inOut'
      });
    }
  };

  const handleSecondaryClick = () => {
    window.open('https://wa.me/923704133315', '_blank');
  };

  const handleScrollHint = () => {
    const stylesSection = document.querySelector('#styles');
    if (stylesSection) {
      gsap.to(window, {
        scrollTo: { y: stylesSection, offsetY: 80 },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section ref={heroRef} className={styles.hero} id="home" data-section="home">
      {/* Professional Background System */}
      <div ref={backgroundRef} className={styles.background}>
        <div className={styles.gradientLayer1}></div>
        <div className={styles.gradientLayer2}></div>
        <div className={styles.textureLayer}></div>
      </div>

      {/* Luxury Particles */}
      <div className={styles.particles}>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={el => particlesRef.current[index] = el}
            className={`${styles.particle} ${styles[`particle${index + 1}`]}`}
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Content Section */}
        <div ref={contentRef} className={styles.content}>
          {/* Premium Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span className={styles.badgeText}>Premium Luxury Packaging</span>
          </div>

          {/* Main Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            Luxury Rigid Packaging
            <span className={styles.headlineAccent}> Engineered to Impress</span>
          </h1>

          {/* Subline */}
          <div ref={sublineRef} className={styles.subline}>
            Premium Quality • Custom Design • Fast Delivery
          </div>

          {/* Description */}
          <p ref={descriptionRef} className={styles.description}>
            Transform your products with our premium rigid boxes. From magnetic closures to 
            custom branding, we create packaging that elevates your brand and delights your customers.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaContainerRef} className={styles.ctaContainer}>
            <button
              ref={primaryCtaRef}
              className={`${styles.cta} ${styles.ctaPrimary}`}
              onClick={handlePrimaryClick}
              aria-label="Get premium custom quote"
            >
              <span className={styles.ctaText}>Get Premium Quote</span>
              <div className={styles.ctaIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
              <div className={styles.ctaGlow}></div>
              <div className={styles.ctaRipple}></div>
            </button>

            <button
              ref={secondaryCtaRef}
              className={`${styles.cta} ${styles.ctaSecondary}`}
              onClick={handleSecondaryClick}
              aria-label="Connect via WhatsApp"
            >
              <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
              </svg>
              <span className={styles.ctaText}>WhatsApp</span>
            </button>
          </div>

          {/* Trust Stats */}
          <div ref={statsRef} className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Premium Boxes</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Luxury Brands</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div ref={visualRef} className={styles.visual}>
          <div className={styles.imageContainer}>
            <img 
              src="/images/image1.png"
              alt="XLIM BOXES - Premium luxury rigid packaging collection"
              className={styles.heroImage}
              loading="eager"
              onError={(e) => {
                if (e.target.src.includes('image1')) {
                  e.target.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80';
                }
              }}
            />
            <div className={styles.imageOverlay}>
              <div className={styles.brandBadge}>XLIM BOXES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Scroll Hint */}
      <div 
        ref={scrollHintRef}
        className={styles.scrollHint}
        onClick={handleScrollHint}
        role="button"
        tabIndex="0"
        aria-label="Explore our luxury styles"
      >
        <div className={styles.scrollLine}></div>
        <div className={styles.scrollText}>Explore Luxury</div>
        <div className={styles.scrollArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13L12 18L17 13"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;