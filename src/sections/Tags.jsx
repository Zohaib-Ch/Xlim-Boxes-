import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Tags.module.scss';

const Tags = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  // Tags Collection - Using your uploaded images
  const tagStyles = [
    {
      id: 1,
      title: "Anniversary Tag",
      subtitle: "Milestone Celebration",
      description: "Elegant anniversary tags designed to commemorate special milestones and celebrate lasting relationships.",
      image: "/images/Tags/Anniversary Tag.png",
      category: "Celebration",
      price: "From $0.45",
      features: ["Elegant Design", "Premium Quality", "Milestone Ready"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea"
    },
    {
      id: 2,
      title: "Birthday Tag",
      subtitle: "Joyful Occasions",
      description: "Vibrant and cheerful birthday tags perfect for adding festive spirit to gifts and celebrations.",
      image: "/images/Tags/Birthday Tag.png",
      category: "Birthday",
      price: "From $0.35",
      features: ["Festive Colors", "Joyful Design", "Party Ready"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f093fb"
    },
    {
      id: 3,
      title: "Corporate Tag",
      subtitle: "Professional Branding",
      description: "Professional corporate tags designed for business gifting and corporate branding with sophisticated appeal.",
      image: "/images/Tags/Corporate Tag.png",
      category: "Business",
      price: "From $0.55",
      features: ["Professional Look", "Brand Ready", "Corporate Style"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      accentColor: "#fcb69f"
    },
    {
      id: 4,
      title: "Festival Tag",
      subtitle: "Cultural Celebrations",
      description: "Culturally inspired festival tags perfect for seasonal celebrations and traditional festivities.",
      image: "/images/Tags/Festival Tag.png",
      category: "Festival",
      price: "From $0.65",
      features: ["Cultural Design", "Seasonal", "Traditional Style"],
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      accentColor: "#ffd700"
    },
    {
      id: 5,
      title: "Luxury Gift Tag",
      subtitle: "Premium Elegance",
      description: "Ultra-premium luxury gift tags crafted with exquisite materials for the most discerning gift presentations.",
      image: "/images/Tags/Luxury Gift Tag.png",
      category: "Luxury",
      price: "From $0.95",
      features: ["Ultra-Premium", "Luxury Materials", "Exquisite Craft"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      accentColor: "#a8edea"
    },
    {
      id: 6,
      title: "Seasonal Holiday Tag",
      subtitle: "Holiday Spirit",
      description: "Seasonal holiday tags capturing the magic and warmth of festive seasons with beautiful designs.",
      image: "/images/Tags/Seasonal Holiday Tag.png",
      category: "Holiday",
      price: "From $0.75",
      features: ["Seasonal Theme", "Holiday Magic", "Festive Spirit"],
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      accentColor: "#ff9a9e"
    },
    {
      id: 7,
      title: "Thank You Tag",
      subtitle: "Gratitude Expression",
      description: "Heartfelt thank you tags designed to express genuine appreciation and gratitude with elegant simplicity.",
      image: "/images/Tags/Thank You Tag.png",
      category: "Gratitude",
      price: "From $0.40",
      features: ["Heartfelt Design", "Appreciation", "Elegant Simple"],
      gradient: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
      accentColor: "#ffeaa7"
    },
    {
      id: 8,
      title: "Wedding Tag",
      subtitle: "Romantic Elegance",
      description: "Romantic wedding tags crafted for the most special day, featuring elegant designs for love celebrations.",
      image: "/images/Tags/Wedding Tag.png",
      category: "Wedding",
      price: "From $0.85",
      features: ["Romantic Design", "Wedding Perfect", "Love Celebration"],
      gradient: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)",
      accentColor: "#9333ea"
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth <= 768;
    
    const ctx = gsap.context(() => {
      // Header animation with tag swinging effect - optimized for mobile
      gsap.fromTo(headerRef.current.children, 
        { 
          opacity: 0, 
          y: isMobile ? 20 : 30,
          rotation: isMobile ? -5 : -10,
          transformOrigin: 'top center'
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: isMobile ? 1.2 : 1.8,
          stagger: isMobile ? 0.1 : 0.2,
          ease: isMobile ? 'power2.out' : 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards with tag hanging animation - optimized for mobile
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial state - simplified for mobile
          const randomRotation = isMobile ? 0 : (Math.random() - 0.5) * 20;
          gsap.set(card, {
            opacity: 0,
            y: isMobile ? -40 : -100,
            rotation: randomRotation,
            scale: 0.8,
            transformOrigin: 'top center'
          });

          // Tag dropping entrance animation
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: isMobile ? 1.0 : 1.8,
            ease: isMobile ? 'power2.out' : 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * (isMobile ? 0.05 : 0.1)
          });

          // Gentle swaying motion like hanging tags - disabled on mobile
          if (!isMobile) {
            gsap.to(card, {
              rotation: Math.sin(index) * 3,
              duration: 4 + (index * 0.3),
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut',
              delay: index * 0.2
            });
          }

          // Enhanced hover with tag lifting effect
          const cardImage = card.querySelector(`.${styles.tagImage}`);
          const tagString = card.querySelector(`.${styles.tagString}`);
          
          if (cardImage && tagString) {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                y: -20,
                rotation: (Math.random() - 0.5) * 8,
                duration: 0.6,
                ease: 'power2.out'
              });
              gsap.to(cardImage, {
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out'
              });
              gsap.to(tagString, {
                scaleY: 1.3,
                duration: 0.6,
                ease: 'power2.out'
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                y: 0,
                rotation: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
              });
              gsap.to(cardImage, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
              });
              gsap.to(tagString, {
                scaleY: 1,
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
    <section ref={sectionRef} className={styles.tags} id="tags" data-section="tags">
      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🏷️</span>
            <span className={styles.badgeText}>Tag Collection</span>
          </div>
          
          <h2 className={styles.title}>
            Premium Gift Tags
            <span className={styles.titleAccent}>Every Occasion Covered</span>
          </h2>
          
          <p className={styles.description}>
            Complete your packaging with our premium gift tag collection. From elegant celebrations 
            to heartfelt gratitude, find the perfect tag for every special moment.
          </p>
        </div>

        {/* Tags Grid */}
        <div ref={gridRef} className={styles.tagsGrid}>
          {tagStyles.map((tag, index) => (
            <div
              key={tag.id}
              ref={el => cardsRef.current[index] = el}
              className={styles.tagCard}
              style={{
                '--card-gradient': tag.gradient,
                '--accent-color': tag.accentColor
              }}
            >
              {/* Tag String Effect */}
              <div className={styles.tagString}></div>
              
              {/* Image Container with Tag Hole */}
              <div className={styles.imageWrapper}>
                <div className={styles.tagHole}></div>
                <img
                  src={tag.image}
                  alt={tag.title}
                  className={styles.tagImage}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.imageFallback} style={{ display: 'none' }}>
                  <div className={styles.fallbackIcon}>🏷️</div>
                  <div className={styles.fallbackText}>{tag.title}</div>
                </div>
                <div className={styles.imageOverlay}>
                  <div className={styles.tagPattern}></div>
                  <div className={styles.categoryBadge}>{tag.category}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.tagTitle}>{tag.title}</h3>
                    <p className={styles.tagSubtitle}>{tag.subtitle}</p>
                  </div>
                </div>
                
                <p className={styles.tagDescription}>{tag.description}</p>
                
                {/* Features with Tag Icons */}
                <div className={styles.featuresLine}>
                  {tag.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureTag}>
                      <span className={styles.tagIcon}>✦</span>
                      <span className={styles.tagText}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button className={styles.primaryBtn}>
                    <span>Order Tags</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7L10 17L5 12"/>
                    </svg>
                  </button>
                  <button className={styles.secondaryBtn}>
                    <span>Preview</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Tag Your Perfect Moment</h3>
            <p className={styles.ctaDescription}>
              Let us help you create the perfect finishing touch for your special occasions
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <span>Design Custom Tags</span>
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
                <span>Tag Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tags;
