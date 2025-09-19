import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './LuxuryStyles.module.scss';

const LuxuryStyles = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Premium rigid box styles - Using your custom images with luxury gradients
  const luxuryStyles = [
    {
      id: 1,
      title: "Kraft Rigid Boxes",
      subtitle: "Sustainable Luxury",
      description: "Sustainable rigid packaging with natural look and strong structure, perfect for eco-conscious brands.",
      image: "/images/Kraft Rigid Box.png",
      category: "Eco-Friendly",
      price: "From $2.25",
      features: ["100% Recyclable", "Natural Kraft Finish", "Strong Chipboard Base"],
      gradient: "linear-gradient(135deg, #8b7355 0%, #a68660 100%)",
      accentColor: "#a68660"
    },
    {
      id: 2,
      title: "Rigid Gift Boxes",
      subtitle: "Premium Gifting",
      description: "Luxurious rigid boxes perfect for gifting, branding, and creating lasting impact with ribbon closures.",
      image: "/images/Rigid Gift Box.png",
      category: "Gifting",
      price: "From $3.50",
      features: ["Ribbon Closure", "Premium Finish", "Custom Branding Options"],
      gradient: "linear-gradient(135deg, #c6a667 0%, #d4b876 100%)",
      accentColor: "#c6a667"
    },
    {
      id: 3,
      title: "Magnetic Closure Boxes",
      subtitle: "Secure Luxury",
      description: "Secure luxury feel with sleek magnetic flap closure for premium product packaging and unboxing experience.",
      image: "/images/Magnetic Closure Box.png",
      category: "Premium",
      price: "From $4.25",
      features: ["Magnetic Closure", "Premium Chipboard", "Foil Stamping Available"],
      gradient: "linear-gradient(135deg, #00e5ff 0%, #00b4cc 100%)",
      accentColor: "#00e5ff"
    },
    {
      id: 4,
      title: "Collapsible Rigid Boxes",
      subtitle: "Space-Saving Design",
      description: "Space-saving foldable design with premium appeal and easy storage, maintaining rigid box quality.",
      image: "/images/Collapsible Rigid Box.png",
      category: "Functional",
      price: "From $3.80",
      features: ["Collapsible Design", "Easy Assembly", "Premium Materials"],
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
      accentColor: "#8b5cf6"
    },
    {
      id: 5,
      title: "Cylindrical Rigid Boxes",
      subtitle: "Round Elegance",
      description: "Round rigid boxes ideal for candles, accessories, and specialty gifts with unique cylindrical presentation.",
      image: "/images/Cylindrical Rigid Box.png",
      category: "Specialty",
      price: "From $3.20",
      features: ["Cylindrical Design", "Perfect for Candles", "Secure Lid System"],
      gradient: "linear-gradient(135deg, #00ffb2 0%, #00cc8f 100%)",
      accentColor: "#00ffb2"
    },
    {
      id: 6,
      title: "Hinged Rigid Boxes",
      subtitle: "Convenient Opening",
      description: "Secure hinged lid offering convenience and durability in unboxing with attached lid design.",
      image: "/images/Hinged Rigid Box.png",
      category: "Functional",
      price: "From $2.95",
      features: ["Hinged Lid", "Durable Construction", "Easy Access Design"],
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
      accentColor: "#ff6b6b"
    },
    {
      id: 7,
      title: "Shoulder Neck Boxes",
      subtitle: "Layered Structure",
      description: "Distinctive layered structure for high-end branding and protection with inner shoulder design.",
      image: "/images/Shoulder Neck Box.png",
      category: "Luxury",
      price: "From $4.75",
      features: ["Shoulder Design", "Premium Protection", "Elegant Structure"],
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      accentColor: "#ffd700"
    },
    {
      id: 8,
      title: "Booklet Boxes",
      subtitle: "Product Showcase",
      description: "Elegant opening design highlighting products with secure protection, opening like a book for unique presentation.",
      image: "/images/Booklet Box.png",
      category: "Display",
      price: "From $3.60",
      features: ["Book-Style Opening", "Product Display", "Secure Protection"],
      gradient: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)",
      accentColor: "#9333ea"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Premium cards animation with enhanced effects
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state
          gsap.set(card, {
            opacity: 0,
            y: 120,
            rotationX: 45,
            scale: 0.7
          });

          // Enhanced entrance animation
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.12
          });

          // Simplified hover effects - let CSS handle the main animations
          const cardImage = card.querySelector(`.${styles.styleImage}`);
          const cardOverlay = card.querySelector(`.${styles.imageOverlay}`);
          
          if (cardImage && cardOverlay) {
            // Minimal JS enhancement for smooth interactions
            card.addEventListener('mouseenter', () => {
              gsap.to(cardImage, {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(cardImage, {
                scale: 1,
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
    <section ref={sectionRef} className={styles.luxuryStyles} id="styles" data-section="styles">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✦</span>
            <span className={styles.badgeText}>Premium Collection</span>
          </div>
          
          <h2 className={styles.title}>
            Luxury Rigid Box
            <span className={styles.titleAccent}>Styles & Finishes</span>
          </h2>
          
          <p className={styles.description}>
            Discover our curated collection of premium rigid boxes. Each style is 
            crafted with meticulous attention to detail and engineered for the perfect 
            unboxing experience.
          </p>
        </div>

        {/* Premium Styles Grid */}
        <div ref={gridRef} className={styles.stylesGrid}>
          {luxuryStyles.map((style, index) => (
            <div
              key={style.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.styleCard}
              style={{
                '--card-gradient': style.gradient,
                '--accent-color': style.accentColor
              }}
            >
              {/* Premium Image Container */}
              <div className={styles.imageWrapper}>
                <img
                  src={style.image}
                  alt={style.title}
                  className={styles.styleImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>📦</div>
                  <div className={styles.fallbackText}>{style.title}</div>
                </div>
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayGradient}></div>
                  <div className={styles.priceTag}>{style.price}</div>
                  <div className={styles.categoryBadge}>{style.category}</div>
                </div>
              </div>

              {/* Premium Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.styleTitle}>{style.title}</h3>
                    <p className={styles.styleSubtitle}>{style.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.styleDescription}>{style.description}</p>
                
                {/* Premium Features List */}
                <ul className={styles.featuresList}>
                  {style.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.featureIcon}>✓</span>
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Premium Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Get Quote</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>View Details</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Premium Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Need a Custom Design?</h3>
            <p className={styles.ctaDescription}>
              Our design experts will work with you to create the perfect packaging solution
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Start Custom Project</span>
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
                <span>WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryStyles;