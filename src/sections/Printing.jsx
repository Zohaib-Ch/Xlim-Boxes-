import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Printing.module.scss';

const Printing = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Printing Collection - Using your uploaded images
  const printingStyles = [
    {
      id: 1,
      title: "Digital Printing",
      subtitle: "High Resolution Precision",
      description: "State-of-the-art digital printing technology delivering crisp, vibrant colors with exceptional detail accuracy.",
      image: "/images/Prinitng/Digital Printing.png",
      category: "Modern",
      price: "From $0.85",
      features: ["4K Resolution", "Quick Turnaround", "Variable Data"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea"
    },
    {
      id: 2,
      title: "Flexographic Printing",
      subtitle: "High Volume Excellence",
      description: "Efficient flexographic printing perfect for large runs with consistent quality and cost-effective production.",
      image: "/images/Prinitng/Flexographic Printing.png",
      category: "Industrial",
      price: "From $0.65",
      features: ["High Volume", "Cost Effective", "Consistent Quality"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f093fb"
    },
    {
      id: 3,
      title: "Gradient Printing",
      subtitle: "Smooth Transitions",
      description: "Beautiful gradient effects creating smooth color transitions and stunning visual appeal for premium packaging.",
      image: "/images/Prinitng/Gradient Printing.png",
      category: "Artistic",
      price: "From $1.25",
      features: ["Smooth Gradients", "Color Blending", "Visual Impact"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      accentColor: "#fcb69f"
    },
    {
      id: 4,
      title: "Metallic Ink Printing",
      subtitle: "Luxurious Finish",
      description: "Premium metallic inks adding sophisticated shimmer and luxury appeal to your packaging designs.",
      image: "/images/Prinitng/Metallic Ink Printing.png",
      category: "Premium",
      price: "From $1.95",
      features: ["Metallic Finish", "Luxury Appeal", "Shimmer Effect"],
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      accentColor: "#ffd700"
    },
    {
      id: 5,
      title: "Minimalist Print",
      subtitle: "Clean Elegance",
      description: "Clean, minimal printing approach focusing on typography and space for sophisticated brand presentation.",
      image: "/images/Prinitng/Minimalist Print.png",
      category: "Modern",
      price: "From $0.95",
      features: ["Clean Design", "Typography Focus", "Sophisticated"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      accentColor: "#a8edea"
    },
    {
      id: 6,
      title: "Offset Printing",
      subtitle: "Traditional Excellence",
      description: "Traditional offset printing delivering superior quality and color accuracy for professional packaging needs.",
      image: "/images/Prinitng/Offset Printing.png",
      category: "Professional",
      price: "From $0.75",
      features: ["Superior Quality", "Color Accuracy", "Professional Grade"],
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      accentColor: "#ff9a9e"
    },
    {
      id: 7,
      title: "Screen Printing",
      subtitle: "Bold & Vibrant",
      description: "Vibrant screen printing technique perfect for bold designs and thick ink coverage with lasting durability.",
      image: "/images/Prinitng/Screen Printing.png",
      category: "Bold",
      price: "From $1.15",
      features: ["Vibrant Colors", "Thick Coverage", "Durable"],
      gradient: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
      accentColor: "#ffeaa7"
    },
    {
      id: 8,
      title: "UV Printing",
      subtitle: "Instant Cure Technology",
      description: "Advanced UV printing with instant curing technology for enhanced durability and brilliant color reproduction.",
      image: "/images/Prinitng/UV Printing.png",
      category: "Advanced",
      price: "From $1.45",
      features: ["Instant Cure", "Enhanced Durability", "Brilliant Colors"],
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
      accentColor: "#fd79a8"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Header animation with printing press effect - optimized for mobile
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: isMobile ? 30 : 60,
          skewY: isMobile ? 2 : 5
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: isMobile ? 1.0 : 1.6,
          stagger: isMobile ? 0.12 : 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards with printing press mechanism animation - optimized for mobile
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state - simplified for mobile
          gsap.set(card, {
            opacity: 0,
            x: isMobile ? 0 : (index % 2 === 0 ? -200 : 200),
            rotationY: isMobile ? 0 : (index % 2 === 0 ? -45 : 45),
            y: isMobile ? 40 : 0,
            scale: 0.8
          });

          // Printing press entrance animation
          gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: isMobile ? 1.0 : 1.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * (isMobile ? 0.05 : 0.1)
          });

          // Subtle printing press movement - disabled on mobile
          if (!isMobile) {
            gsap.to(card, {
              x: index % 2 === 0 ? 5 : -5,
              duration: 4 + (index * 0.3),
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.5
            });
          }

          // Enhanced hover with ink spreading effect
          const cardImage = card.querySelector(`.${styles.printImage}`);
          const inkOverlay = card.querySelector(`.${styles.inkOverlay}`);
          
          if (cardImage && inkOverlay) {
            card.addEventListener('mouseenter', () => {
              gsap.to(cardImage, {
                scale: 1.08,
                duration: 0.7,
                ease: 'power2.out'
              });
              gsap.to(inkOverlay, {
                scale: 1.2,
                opacity: 0.8,
                duration: 0.7,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(cardImage, {
                scale: 1,
                duration: 0.7,
                ease: 'power2.out'
              });
              gsap.to(inkOverlay, {
                scale: 1,
                opacity: 0,
                duration: 0.7,
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
    <section ref={sectionRef} className={styles.printing} id="printing" data-section="printing">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🎨</span>
            <span className={styles.badgeText}>Printing Excellence</span>
          </div>
          
          <h2 className={styles.title}>
            Premium Printing
            <span className={styles.titleAccent}>Techniques & Finishes</span>
          </h2>
          
          <p className={styles.description}>
            Explore our advanced printing technologies and techniques. From digital precision to 
            traditional craftsmanship, we deliver exceptional print quality for every project.
          </p>
        </div>

        {/* Printing Grid */}
        <div ref={gridRef} className={styles.printGrid}>
          {printingStyles.map((printStyle, index) => (
            <div
              key={printStyle.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.printCard}
              style={{
                '--card-gradient': printStyle.gradient,
                '--accent-color': printStyle.accentColor
              }}
            >
              {/* Image Container with Ink Effect */}
              <div className={styles.imageWrapper}>
                <img
                  src={printStyle.image}
                  alt={printStyle.title}
                  className={styles.printImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>🖨️</div>
                  <div className={styles.fallbackText}>{printStyle.title}</div>
                </div>
                <div className={styles.inkOverlay}></div>
                <div className={styles.imageOverlay}>
                  <div className={styles.printPattern}></div>
                  <div className={styles.categoryBadge}>{printStyle.category}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.printTitle}>{printStyle.title}</h3>
                    <p className={styles.printSubtitle}>{printStyle.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.printDescription}>{printStyle.description}</p>
                
                {/* Features with Print Dots */}
                <div className={styles.featuresGrid}>
                  {printStyle.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <span className={styles.featureDot}></span>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Print Quote</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9L6 2C6 1.4 6.4 1 7 1H17C17.6 1 18 1.4 18 2V9"/>
                      <path d="M6 18H4C3.4 18 3 17.6 3 17V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V17C21 17.6 20.6 18 20 18H18"/>
                      <path d="M6 14H18V22H6V14Z"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>Samples</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to Print Excellence?</h3>
            <p className={styles.ctaDescription}>
              Let our printing experts bring your vision to life with cutting-edge technology
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Start Printing Project</span>
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
                <span>Print Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Printing;
