import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Benefits.module.scss';

const Benefits = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const benefitsRef = useRef([]);
  const statsRef = useRef([]);

  // Key benefits of XLIM BOXES
  const benefits = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M24 4V44M4 14L44 34M44 14L4 34" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Premium Materials",
      description: "High-grade chipboard and premium finishes ensure durability and luxury feel that reflects your brand quality.",
      features: ["350-400 GSM Chipboard", "Premium Paper Finishes", "Scratch-Resistant Coating"]
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8C31.732 8 38 14.268 38 22C38 29.732 31.732 36 24 36C16.268 36 10 29.732 10 22C10 14.268 16.268 8 24 8Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M19 22L22 25L29 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 36V42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 40H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Quality Assurance",
      description: "Rigorous quality control ensures every box meets our premium standards before reaching your customers.",
      features: ["Multi-Point Inspection", "Strength Testing", "Color Accuracy Check"]
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 12H40L36 36H12L8 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M8 12L6 6H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="42" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="32" cy="42" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 20V28M20 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Custom Solutions",
      description: "Tailored packaging solutions designed to meet your specific product requirements and brand vision.",
      features: ["Custom Dimensions", "Brand Color Matching", "Unique Design Elements"]
    },
    {
      id: 4,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 6L6 14V34L24 42L42 34V14L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M6 14L24 22L42 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M24 22V42" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="24" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Fast Turnaround",
      description: "Quick production and delivery times without compromising on quality, keeping your business moving forward.",
      features: ["7-10 Day Production", "Express Shipping Options", "Rush Order Capability"]
    },
    {
      id: 5,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M12 20H36V40C36 41.1046 35.1046 42 34 42H14C12.8954 42 12 41.1046 12 40V20Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 20V16C20 11.5817 23.5817 8 28 8H32C36.4183 8 40 11.5817 40 16V20" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 28V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Secure Packaging",
      description: "Robust construction and secure closure mechanisms protect your products during shipping and storage.",
      features: ["Reinforced Corners", "Secure Lid Systems", "Tamper-Evident Options"]
    },
    {
      id: 6,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8L8 16V32L24 40L40 32V16L24 8Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 20L24 24L32 20" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 24V32" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 28C12 28 16 26 24 26C32 26 36 28 36 28" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Sustainable Options",
      description: "Eco-friendly materials and sustainable production processes for environmentally conscious brands.",
      features: ["100% Recyclable Materials", "FSC Certified Papers", "Biodegradable Options"]
    }
  ];

  // Company statistics
  const stats = [
    { number: "500K+", label: "Boxes Delivered", suffix: "" },
    { number: "98", label: "Customer Satisfaction", suffix: "%" },
    { number: "15", label: "Years Experience", suffix: "+" },
    { number: "24", label: "Hour Support", suffix: "/7" }
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Benefits cards staggered animation
      gsap.fromTo(benefitsRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current[0],
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        const numberElement = stat.querySelector('[data-number]');
        const finalValue = numberElement.textContent;
        
        gsap.fromTo(numberElement,
          { textContent: 0 },
          {
            textContent: finalValue.replace(/\D/g, ''), // Extract numbers only
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              const value = Math.ceil(this.targets()[0].textContent);
              if (finalValue.includes('K')) {
                numberElement.textContent = value >= 1000 ? `${Math.floor(value/1000)}${value % 1000 === 0 ? '' : '.' + Math.floor((value % 1000)/100)}K` : value;
              } else {
                numberElement.textContent = value;
              }
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="benefits" 
      data-section="benefits"
      className={styles.benefits}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>Why Choose XLIM BOXES</span>
            <h2 className={styles.title}>
              Premium Packaging
              <span className={styles.titleAccent}> Solutions</span>
            </h2>
            <p className={styles.description}>
              Discover why leading brands trust XLIM BOXES for their premium rigid packaging needs. 
              Our commitment to quality, innovation, and customer satisfaction sets us apart.
            </p>
          </div>
        </header>

        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              ref={el => benefitsRef.current[index] = el}
              className={styles.benefitCard}
            >
              <div className={styles.cardIcon}>
                {benefit.icon}
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
                
                <ul className={styles.featuresList}>
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => statsRef.current[index] = el}
                className={styles.statCard}
              >
                <div className={styles.statNumber}>
                  <span data-number>{stat.number}</span>
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
