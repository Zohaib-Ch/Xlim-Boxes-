import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './SweetBoxes.module.scss';

const SweetBoxes = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Sweet Boxes Collection - Using your uploaded images
  const sweetBoxes = [
    {
      id: 1,
      title: "Collapsible Sweet Box",
      subtitle: "Space-Saving Elegance",
      description: "Collapsible design perfect for storage while maintaining premium presentation for sweet treats and confections.",
      image: "/images/Sweet-Boxes/Collapsible Sweet Box.png",
      category: "Functional",
      price: "From $1.85",
      features: ["Foldable Design", "Easy Assembly", "Premium Materials"],
      gradient: "linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)",
      accentColor: "#ff6b9d"
    },
    {
      id: 2,
      title: "Drawer-Style Sweet Box",
      subtitle: "Elegant Access",
      description: "Sophisticated drawer mechanism providing smooth access to sweets with premium sliding functionality.",
      image: "/images/Sweet-Boxes/Drawer-Style Sweet Box.png",
      category: "Premium",
      price: "From $2.95",
      features: ["Smooth Sliding", "Secure Closure", "Luxury Finish"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea"
    },
    {
      id: 3,
      title: "Fabric-Wrapped Sweet Box",
      subtitle: "Luxurious Touch",
      description: "Exquisite fabric wrapping creates a tactile luxury experience perfect for premium sweet presentations.",
      image: "/images/Sweet-Boxes/Fabric-Wrapped Sweet Box.png",
      category: "Luxury",
      price: "From $4.25",
      features: ["Fabric Wrapped", "Soft Touch", "Premium Texture"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f093fb"
    },
    {
      id: 4,
      title: "Festival Edition Sweet Box",
      subtitle: "Celebration Ready",
      description: "Specially designed for festive occasions with vibrant colors and celebratory elements for special moments.",
      image: "/images/Sweet-Boxes/Festival Edition Sweet Box.png",
      category: "Seasonal",
      price: "From $3.45",
      features: ["Festival Theme", "Vibrant Colors", "Special Edition"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      accentColor: "#fcb69f"
    },
    {
      id: 5,
      title: "Multi-Layer Sweet Box",
      subtitle: "Organized Luxury",
      description: "Multiple compartments for organized sweet storage with tiered design for variety presentation.",
      image: "/images/Sweet-Boxes/Multi-Layer Sweet Box.png",
      category: "Functional",
      price: "From $5.25",
      features: ["Multi-Tier Design", "Compartments", "Maximum Storage"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      accentColor: "#a8edea"
    },
    {
      id: 6,
      title: "Rigid Sweet Box with Partition Trays",
      subtitle: "Perfect Organization",
      description: "Rigid construction with custom partition trays ensuring each sweet has its dedicated space.",
      image: "/images/Sweet-Boxes/Rigid Sweet Box with Partition Trays.png",
      category: "Professional",
      price: "From $3.85",
      features: ["Custom Partitions", "Rigid Structure", "Perfect Fit"],
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      accentColor: "#ff9a9e"
    },
    {
      id: 7,
      title: "Round Sweet Box",
      subtitle: "Circular Elegance",
      description: "Unique circular design offering a distinctive presentation format for premium sweet collections.",
      image: "/images/Sweet-Boxes/Round Sweet Box.png",
      category: "Specialty",
      price: "From $2.75",
      features: ["Circular Design", "Unique Shape", "Eye-catching"],
      gradient: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
      accentColor: "#ffeaa7"
    },
    {
      id: 8,
      title: "Window Sweet Box",
      subtitle: "Visual Appeal",
      description: "Transparent window design allowing product visibility while maintaining protection and premium appeal.",
      image: "/images/Sweet-Boxes/Window Sweet Box.png",
      category: "Display",
      price: "From $2.45",
      features: ["Clear Window", "Product Visibility", "Secure Protection"],
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
      accentColor: "#fd79a8"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth <= 768;
    
    const ctx = gsap.context(() => {
      // Header animation with staggered reveal - optimized for mobile
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: isMobile ? 50 : 100,
          rotationX: isMobile ? -15 : -30
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: isMobile ? 1.2 : 1.8,
          stagger: isMobile ? 0.1 : 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards with unique floating animation - optimized for mobile
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state - simplified for mobile
          const startX = isMobile ? 0 : (index % 2 === 0 ? -150 : 150);
          gsap.set(card, {
            opacity: 0,
            x: startX,
            y: isMobile ? 40 : 80,
            rotation: isMobile ? 0 : (index % 2 === 0 ? -15 : 15),
            scale: isMobile ? 0.8 : 0.6
          });

          // Entrance animation with bounce effect
          gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: isMobile ? 1.2 : 2,
            ease: isMobile ? 'power2.out' : 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 90%' : 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * (isMobile ? 0.08 : 0.15)
          });

          // Floating animation - reduced for mobile
          if (!isMobile) {
            gsap.to(card, {
              y: -10,
              rotation: index % 2 === 0 ? 2 : -2,
              duration: 3 + (index * 0.2),
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.3
            });
          }

          // Enhanced hover effects
          const cardImage = card.querySelector(`.${styles.sweetImage}`);
          const cardContent = card.querySelector(`.${styles.cardContent}`);
          
          if (cardImage && cardContent) {
            card.addEventListener('mouseenter', () => {
              gsap.to(cardImage, {
                scale: 1.15,
                rotation: 5,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardContent, {
                y: -5,
                duration: 0.6,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(cardImage, {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'power3.out'
              });
              gsap.to(cardContent, {
                y: 0,
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
    <section ref={sectionRef} className={styles.sweetBoxes} id="sweet-boxes" data-section="sweet-boxes">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🍬</span>
            <span className={styles.badgeText}>Sweet Collection</span>
          </div>
          
          <h2 className={styles.title}>
            Premium Sweet Boxes
            <span className={styles.titleAccent}>Confectionery Excellence</span>
          </h2>
          
          <p className={styles.description}>
            Discover our exquisite collection of sweet boxes designed for confectionery businesses. 
            Each design combines functionality with aesthetic appeal to showcase your sweet creations perfectly.
          </p>
        </div>

        {/* Sweet Boxes Grid */}
        <div ref={gridRef} className={styles.sweetGrid}>
          {sweetBoxes.map((sweetBox, index) => (
            <div
              key={sweetBox.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.sweetCard}
              style={{
                '--card-gradient': sweetBox.gradient,
                '--accent-color': sweetBox.accentColor
              }}
            >
              {/* Image Container with Unique Overlay */}
              <div className={styles.imageWrapper}>
                <img
                  src={sweetBox.image}
                  alt={sweetBox.title}
                  className={styles.sweetImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>🍭</div>
                  <div className={styles.fallbackText}>{sweetBox.title}</div>
                </div>
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayPattern}></div>
                  <div className={styles.priceTag}>{sweetBox.price}</div>
                  <div className={styles.categoryBadge}>{sweetBox.category}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.sweetTitle}>{sweetBox.title}</h3>
                    <p className={styles.sweetSubtitle}>{sweetBox.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.sweetDescription}>{sweetBox.description}</p>
                
                {/* Features with Pills Design */}
                <div className={styles.featuresContainer}>
                  {sweetBox.features.map((feature, idx) => (
                    <span key={idx} className={styles.featurePill}>
                      <span className={styles.featureIcon}>✨</span>
                      <span className={styles.featureText}>{feature}</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Order Now</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V19C17 19.6 16.6 20 16 20H8C7.4 20 7 19.6 7 19V13"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>Details</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Sweet Dreams Start Here</h3>
            <p className={styles.ctaDescription}>
              Let us help you create the perfect packaging for your confectionery business
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Start Sweet Project</span>
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
                <span>Sweet Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SweetBoxes;
