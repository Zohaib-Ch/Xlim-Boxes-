import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Finishes.module.scss';

const Finishes = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Finishes Collection - Using your uploaded images
  const finishStyles = [
    {
      id: 1,
      title: "Combination Embossing",
      subtitle: "Multi-Dimensional Texture",
      description: "Advanced combination embossing technique creating complex multi-dimensional textures with sophisticated depth.",
      image: "/images/Finishes/Combination Embossing.png",
      category: "Advanced",
      price: "From $1.85",
      features: ["Multi-Layer", "Complex Texture", "Premium Depth"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea"
    },
    {
      id: 2,
      title: "Debossed XLIM Box",
      subtitle: "Recessed Elegance",
      description: "Precision debossing creating recessed brand impressions with elegant depth and sophisticated tactile experience.",
      image: "/images/Finishes/Debossed XLIM Box..png",
      category: "Precision",
      price: "From $1.25",
      features: ["Recessed Design", "Brand Impression", "Tactile Feel"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f093fb"
    },
    {
      id: 3,
      title: "Embossed XLIM Box",
      subtitle: "Raised Sophistication",
      description: "Premium embossing technique creating raised brand elements with luxury tactile appeal and visual prominence.",
      image: "/images/Finishes/Embossed XLIM Box.png",
      category: "Premium",
      price: "From $1.45",
      features: ["Raised Elements", "Visual Impact", "Luxury Touch"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      accentColor: "#fcb69f"
    },
    {
      id: 4,
      title: "Foil Edging",
      subtitle: "Metallic Borders",
      description: "Exquisite foil edging creating metallic borders and accents with brilliant shine and luxury appeal.",
      image: "/images/Finishes/Foil Edging.png",
      category: "Metallic",
      price: "From $1.65",
      features: ["Metallic Edges", "Brilliant Shine", "Luxury Accent"],
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      accentColor: "#ffd700"
    },
    {
      id: 5,
      title: "Foil Stamping",
      subtitle: "Metallic Excellence",
      description: "Hot foil stamping technique delivering brilliant metallic finishes with exceptional durability and luxury appeal.",
      image: "/images/Finishes/Foil Stamping.png",
      category: "Excellence",
      price: "From $1.95",
      features: ["Hot Foil", "Brilliant Metallic", "Exceptional Durability"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      accentColor: "#a8edea"
    },
    {
      id: 6,
      title: "Luxury Mix",
      subtitle: "Combined Perfection",
      description: "Ultimate luxury combining multiple premium finishing techniques for the most sophisticated packaging experience.",
      image: "/images/Finishes/Luxury Mix.png",
      category: "Ultimate",
      price: "From $2.85",
      features: ["Multiple Finishes", "Ultimate Luxury", "Sophisticated"],
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      accentColor: "#ff9a9e"
    },
    {
      id: 7,
      title: "Spot UV",
      subtitle: "Selective Gloss",
      description: "Precision spot UV coating creating selective high-gloss areas with striking contrast and premium visual impact.",
      image: "/images/Finishes/Spot UV.png",
      category: "Precision",
      price: "From $1.35",
      features: ["Selective Gloss", "High Contrast", "Visual Impact"],
      gradient: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)",
      accentColor: "#9333ea"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth <= 768;
    
    const ctx = gsap.context(() => {
      // Header animation with finishing polish effect - optimized for mobile
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: isMobile ? 25 : 40,
          scale: isMobile ? 0.95 : 0.9,
          filter: isMobile ? 'blur(5px)' : 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: isMobile ? 1.2 : 2,
          stagger: isMobile ? 0.12 : 0.25,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards with finishing reveal animation - optimized for mobile
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state - simplified for mobile
          gsap.set(card, {
            opacity: 0,
            scale: 0.8,
            rotationY: isMobile ? 0 : 45,
            y: isMobile ? 30 : 0,
            transformOrigin: 'center center',
            filter: isMobile ? 'blur(2px)' : 'blur(5px)'
          });

          // Finishing reveal animation
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: isMobile ? 1.2 : 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 90%' : 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * (isMobile ? 0.06 : 0.12)
          });

          // Subtle polish shimmer effect - disabled on mobile
          if (!isMobile) {
            gsap.to(card, {
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
              duration: 3 + (index * 0.2),
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.5
            });
          }

          // Enhanced hover with finishing shine effect
          const cardImage = card.querySelector(`.${styles.finishImage}`);
          const shineOverlay = card.querySelector(`.${styles.shineOverlay}`);
          
          if (cardImage && shineOverlay) {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                scale: 1.05,
                rotationY: -5,
                z: 50,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardImage, {
                scale: 1.1,
                filter: 'brightness(1.2) contrast(1.1)',
                duration: 0.8,
                ease: 'power2.out'
              });
              gsap.to(shineOverlay, {
                opacity: 1,
                x: '100%',
                duration: 0.8,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                scale: 1,
                rotationY: 0,
                z: 0,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardImage, {
                scale: 1,
                filter: 'brightness(1) contrast(1)',
                duration: 0.8,
                ease: 'power2.out'
              });
              gsap.to(shineOverlay, {
                opacity: 0,
                x: '-100%',
                duration: 0.6,
                ease: 'power2.out'
              });
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.finishes} id="finishes" data-section="finishes">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            <span className={styles.badgeText}>Finishing Excellence</span>
          </div>
          
          <h2 className={styles.title}>
            Premium Finishes
            <span className={styles.titleAccent}>Luxury Craftsmanship</span>
          </h2>
          
          <p className={styles.description}>
            Elevate your packaging with our premium finishing techniques. From embossing to foil stamping, 
            each finish adds a distinctive touch of luxury and sophistication to your brand.
          </p>
        </div>

        {/* Finishes Grid */}
        <div ref={gridRef} className={styles.finishesGrid}>
          {finishStyles.map((finish, index) => (
            <div
              key={finish.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.finishCard}
              style={{
                '--card-gradient': finish.gradient,
                '--accent-color': finish.accentColor
              }}
            >
              {/* Image Container with Shine Effect */}
              <div className={styles.imageWrapper}>
                <img
                  src={finish.image}
                  alt={finish.title}
                  className={styles.finishImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>🎨</div>
                  <div className={styles.fallbackText}>{finish.title}</div>
                </div>
                <div className={styles.shineOverlay}></div>
                <div className={styles.imageOverlay}>
                  <div className={styles.finishTexture}></div>
                  <div className={styles.priceTag}>{finish.price}</div>
                  <div className={styles.categoryBadge}>{finish.category}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.finishTitle}>{finish.title}</h3>
                    <p className={styles.finishSubtitle}>{finish.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.finishDescription}>{finish.description}</p>
                
                {/* Features with Finish Indicators */}
                <div className={styles.featuresStack}>
                  {finish.features.map((feature, idx) => (
                    <div key={idx} className={styles.finishFeature}>
                      <div 
                        className={styles.featureIndicator}
                        style={{ background: finish.gradient }}
                      ></div>
                      <span className={styles.featureLabel}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Apply Finish</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11L12 14L22 4"/>
                      <path d="M21 12V19C21 19.6 20.6 20 20 20H4C3.4 20 3 19.6 3 19V5C3 4.4 3.4 4 4 4H16"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>View Sample</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Craft Your Finishing Touch</h3>
            <p className={styles.ctaDescription}>
              Transform your packaging with our premium finishing techniques and luxury craftsmanship
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Explore All Finishes</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z"/>
                  <path d="M12 22V12"/>
                  <path d="M2 7L12 12L22 7"/>
                </svg>
              </button>
              <button className={styles.ctaSecondary}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
                <span>Finish Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Finishes;
