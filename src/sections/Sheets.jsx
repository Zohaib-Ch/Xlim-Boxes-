import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Sheets.module.scss';

const Sheets = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Sheets Collection - Using your uploaded images
  const sheetStyles = [
    {
      id: 1,
      title: "Fabric Wrapping Sheet",
      subtitle: "Luxurious Texture",
      description: "Premium fabric-textured wrapping sheets providing sophisticated tactile experience and elegant presentation.",
      image: "/images/Sheets/Fabric Wrapping Sheet.png",
      category: "Luxury",
      price: "From $0.95",
      features: ["Soft Touch", "Premium Texture"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea"
    },
    {
      id: 2,
      title: "Holographic Film Sheet",
      subtitle: "Iridescent Brilliance",
      description: "Eye-catching holographic films creating stunning rainbow effects and premium visual impact for luxury packaging.",
      image: "/images/Sheets/Holographic Film Sheet.png",
      category: "Premium",
      price: "From $1.45",
      features: ["Rainbow Effect", "Light Reflection", "Eye-catching"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f093fb"
    },
    {
      id: 3,
      title: "Luxury Hybrid Sheet",
      subtitle: "Combined Excellence",
      description: "Innovative hybrid materials combining multiple premium finishes for ultimate luxury packaging presentation.",
      image: "/images/Sheets/Luxury Hybrid Sheet.png",
      category: "Innovation",
      price: "From $1.85",
      features: ["Multi-Finish", "Innovation", "Premium Blend"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      accentColor: "#fcb69f"
    },
    {
      id: 4,
      title: "Materials 2 Kraft Paper Sheet",
      subtitle: "Natural Elegance",
      description: "Sustainable kraft paper sheets offering natural elegance with eco-friendly appeal and rustic charm.",
      image: "/images/Sheets/Materials 2 Kraft Paper Sheet.png",
      category: "Eco-Friendly",
      price: "From $0.65",
      features: ["Sustainable", "Natural Look", "Eco-Friendly"],
      gradient: "linear-gradient(135deg, #8b7355 0%, #a68660 100%)",
      accentColor: "#a68660"
    },
    {
      id: 5,
      title: "Metallic Foil Paper Sheet",
      subtitle: "Shimmer & Shine",
      description: "Brilliant metallic foil papers adding luxurious shimmer and sophisticated shine to premium packaging.",
      image: "/images/Sheets/Metallic Foil Paper Sheet.png",
      category: "Metallic",
      price: "From $1.25",
      features: ["Metallic Shine", "Luxury Appeal", "Reflective"],
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      accentColor: "#ffd700"
    },
    {
      id: 6,
      title: "SBS C1S C2S Paper Sheet",
      subtitle: "Professional Grade",
      description: "High-quality SBS paper sheets with single or double-sided coating for professional printing applications.",
      image: "/images/Sheets/SBS C1S  C2S Paper Sheet.png",
      category: "Professional",
      price: "From $0.75",
      features: ["Coated Surface", "Print Ready", "Professional"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      accentColor: "#a8edea"
    },
    {
      id: 7,
      title: "Textured Wrapping Paper Sheet",
      subtitle: "Tactile Experience",
      description: "Textured paper sheets providing unique tactile experience with sophisticated surface patterns and finishes.",
      image: "/images/Sheets/Textured Wrapping Paper Sheet.png",
      category: "Textured",
      price: "From $0.85",
      features: ["Unique Texture", "Tactile Feel", "Pattern Design"],
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      accentColor: "#ff9a9e"
    },
    {
      id: 8,
      title: "Velvet Wrapping Sheet",
      subtitle: "Ultimate Luxury",
      description: "Ultra-premium velvet wrapping sheets delivering the ultimate luxury experience with soft, plush texture.",
      image: "/images/Sheets/Velvet Wrapping Sheet.png",
      category: "Ultra-Luxury",
      price: "From $2.25",
      features: ["Velvet Touch", "Ultra-Premium", "Plush Feel"],
      gradient: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)",
      accentColor: "#9333ea"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth <= 768;
    
    const ctx = gsap.context(() => {
      // Header animation with paper unfolding effect - optimized for mobile
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: isMobile ? 30 : 50,
          rotationX: isMobile ? -45 : -90,
          transformOrigin: 'top center'
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: isMobile ? 1.2 : 2,
          stagger: isMobile ? 0.15 : 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards with paper layering animation - optimized for mobile
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state - simplified for mobile
          gsap.set(card, {
            opacity: 0,
            y: isMobile ? 30 : (50 + (index * 10)),
            rotationX: isMobile ? -15 : -30,
            scale: isMobile ? 0.9 : 0.9,
            transformOrigin: 'top center'
          });

          // Paper sheet entrance animation
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: isMobile ? 1.0 : 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * (isMobile ? 0.04 : 0.08)
          });

          // Subtle paper flutter effect - disabled on mobile
          if (!isMobile) {
            gsap.to(card, {
              rotationX: Math.sin(index) * 2,
              rotationY: Math.cos(index) * 1,
              duration: 6 + (index * 0.5),
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.4
            });
          }

          // Enhanced hover with paper lifting effect
          const cardImage = card.querySelector(`.${styles.sheetImage}`);
          const paperLayer = card.querySelector(`.${styles.paperLayer}`);
          
          if (cardImage && paperLayer) {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                rotationX: -5,
                y: -15,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardImage, {
                scale: 1.1,
                duration: 0.8,
                ease: 'power2.out'
              });
              gsap.to(paperLayer, {
                opacity: 1,
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                rotationX: 0,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardImage, {
                scale: 1,
                duration: 0.8,
                ease: 'power2.out'
              });
              gsap.to(paperLayer, {
                opacity: 0,
                scale: 1,
                duration: 0.8,
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
    <section ref={sectionRef} className={styles.sheets} id="sheets" data-section="sheets">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>📄</span>
            <span className={styles.badgeText}>Material Excellence</span>
          </div>
          
          <h2 className={styles.title}>
            Premium Paper Sheets
            <span className={styles.titleAccent}>Materials & Textures</span>
          </h2>
          
          <p className={styles.description}>
            Discover our curated collection of premium paper sheets and materials. Each option 
            offers unique textures, finishes, and characteristics to elevate your packaging design.
          </p>
        </div>

        {/* Sheets Grid */}
        <div ref={gridRef} className={styles.sheetsGrid}>
          {sheetStyles.map((sheet, index) => (
            <div
              key={sheet.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.sheetCard}
              style={{
                '--card-gradient': sheet.gradient,
                '--accent-color': sheet.accentColor
              }}
            >
              {/* Image Container with Paper Layers */}
              <div className={styles.imageWrapper}>
                <img
                  src={sheet.image}
                  alt={sheet.title}
                  className={styles.sheetImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>📋</div>
                  <div className={styles.fallbackText}>{sheet.title}</div>
                </div>
                <div className={styles.paperLayer}></div>
                <div className={styles.imageOverlay}>
                  <div className={styles.paperTexture}></div>
                  <div className={styles.priceTag}>{sheet.price}</div>
                  <div className={styles.categoryBadge}>{sheet.category}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.sheetTitle}>{sheet.title}</h3>
                    <p className={styles.sheetSubtitle}>{sheet.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.sheetDescription}>{sheet.description}</p>
                
                {/* Features with Material Swatches */}
                <div className={styles.featuresRow}>
                  {sheet.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureSwatch}>
                      <div 
                        className={styles.swatchColor}
                        style={{ background: sheet.gradient }}
                      ></div>
                      <span className={styles.swatchLabel}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Get Sample</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6C5.4 2 5 2.4 5 3V21C5 21.6 5.4 22 6 22H18C18.6 22 19 21.6 19 21V8L14 2Z"/>
                      <path d="M14 2V8H19"/>
                      <path d="M16 13H8"/>
                      <path d="M16 17H8"/>
                      <path d="M10 9H8"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>Specs</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Material Perfection Awaits</h3>
            <p className={styles.ctaDescription}>
              Discover the perfect material combination for your premium packaging needs
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Explore Materials</span>
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
                <span>Material Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sheets;
