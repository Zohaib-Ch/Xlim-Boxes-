import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Reviews.module.scss';

const Reviews = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const reviewsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Customer testimonials and reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Brand Manager",
      company: "Luxe Cosmetics",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "XLIM BOXES transformed our product presentation completely. The magnetic closure boxes are not just packaging - they're an experience. Our customers love the unboxing moment, and it's significantly boosted our brand perception.",
      project: "Custom Magnetic Closure Boxes",
      orderSize: "5,000 units"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Founder & CEO",
      company: "Artisan Jewelry Co.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "Working with XLIM BOXES has been exceptional. The attention to detail, premium materials, and fast turnaround exceeded our expectations. Our jewelry pieces now have packaging that matches their luxury quality.",
      project: "Rigid Gift Boxes with Custom Branding",
      orderSize: "2,500 units"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Marketing Director",
      company: "Premium Skincare",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The sustainable kraft boxes from XLIM align perfectly with our eco-friendly brand values. Quality is outstanding, and the natural finish gives our products an authentic, premium feel that our customers appreciate.",
      project: "Eco-Friendly Kraft Rigid Boxes",
      orderSize: "10,000 units"
    },
    {
      id: 4,
      name: "David Park",
      role: "Operations Manager",
      company: "Tech Gadgets Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "XLIM BOXES delivered exactly what we needed - secure, professional packaging that protects our electronics during shipping. The hinged boxes are perfect for our premium product line, and delivery was right on schedule.",
      project: "Hinged Rigid Boxes for Electronics",
      orderSize: "7,500 units"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Creative Director",
      company: "Boutique Fashion",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The cylindrical boxes for our limited edition accessories are absolutely stunning. XLIM BOXES understood our vision perfectly and delivered packaging that's as beautiful as our products. Customer response has been incredible.",
      project: "Custom Cylindrical Rigid Boxes",
      orderSize: "3,000 units"
    },
    {
      id: 6,
      name: "James Mitchell",
      role: "Brand Owner",
      company: "Gourmet Foods",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "From design consultation to final delivery, XLIM BOXES provided outstanding service. The booklet-style boxes for our gift sets are sophisticated and functional. Quality control is evident in every detail.",
      project: "Booklet Boxes for Gift Sets",
      orderSize: "4,200 units"
    }
  ];

  // Company logos for social proof
  const trustedBrands = [
    { name: "Luxe Cosmetics", logo: "LC" },
    { name: "Artisan Jewelry Co.", logo: "AJ" },
    { name: "Premium Skincare", logo: "PS" },
    { name: "Tech Gadgets Pro", logo: "TG" },
    { name: "Boutique Fashion", logo: "BF" },
    { name: "Gourmet Foods", logo: "GF" }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

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

      // Reviews animation
      gsap.fromTo(reviewsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current[0],
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg 
        key={index} 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill={index < rating ? "currentColor" : "none"}
        className={styles.star}
      >
        <path 
          d="M10 1L12.09 6.26L18 7.27L14 11.14L15.18 17.02L10 14.77L4.82 17.02L6 11.14L2 7.27L7.91 6.26L10 1Z" 
          stroke="currentColor" 
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      data-section="reviews"
      className={styles.reviews}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>Customer Stories</span>
            <h2 className={styles.title}>
              What Our Clients
              <span className={styles.titleAccent}> Say</span>
            </h2>
            <p className={styles.description}>
              Discover why leading brands trust XLIM BOXES for their premium packaging needs. 
              Real feedback from real customers who've experienced our quality and service.
            </p>
          </div>
        </header>

        {/* Reviews Carousel */}
        <div className={styles.carousel}>
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.reviewsTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={review.id}
                  ref={el => reviewsRef.current[index] = el}
                  className={styles.reviewCard}
                >
                  <div className={styles.reviewContent}>
                    {/* Quote Icon */}
                    <div className={styles.quoteIcon}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M14 8C14 12.4183 10.4183 16 6 16V20C12.6274 20 18 14.6274 18 8H14Z" fill="currentColor"/>
                        <path d="M30 8C30 12.4183 26.4183 16 22 16V20C28.6274 20 34 14.6274 34 8H30Z" fill="currentColor"/>
                      </svg>
                    </div>

                    {/* Rating */}
                    <div className={styles.rating}>
                      {renderStars(review.rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className={styles.reviewText}>
                      "{review.review}"
                    </blockquote>

                    {/* Project Info */}
                    <div className={styles.projectInfo}>
                      <div className={styles.projectDetail}>
                        <span className={styles.projectLabel}>Project:</span>
                        <span className={styles.projectValue}>{review.project}</span>
                      </div>
                      <div className={styles.projectDetail}>
                        <span className={styles.projectLabel}>Order Size:</span>
                        <span className={styles.projectValue}>{review.orderSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className={styles.authorInfo}>
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className={styles.authorAvatar}
                      loading="lazy"
                    />
                    <div className={styles.authorDetails}>
                      <div className={styles.authorName}>{review.name}</div>
                      <div className={styles.authorRole}>{review.role}</div>
                      <div className={styles.authorCompany}>{review.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className={styles.carouselControls}>
            <button 
              onClick={prevSlide}
              className={styles.carouselBtn}
              aria-label="Previous review"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.carouselDots}>
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className={styles.carouselBtn}
              aria-label="Next review"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Trusted Brands */}
        <div className={styles.trustedBrands}>
          <div className={styles.brandsHeader}>
            <span className={styles.brandsLabel}>Trusted by Leading Brands</span>
          </div>
          <div className={styles.brandsGrid}>
            {trustedBrands.map((brand, index) => (
              <div key={index} className={styles.brandLogo}>
                <div className={styles.logoIcon}>{brand.logo}</div>
                <span className={styles.brandName}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
