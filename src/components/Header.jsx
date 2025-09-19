import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion.js';
import { scrollToElement } from '../lib/scroll.js';
import styles from './Header.module.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const whatsappBtnRef = useRef(null);
  
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'styles', label: 'Styles', href: '#styles' },
    { id: 'customize', label: 'Customize', href: '#customize' },
    { id: 'benefits', label: 'Benefits', href: '#benefits' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  // Scroll detection for header shrink effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldShrink = scrollTop > 50;
      
      if (shouldShrink !== isScrolled) {
        setIsScrolled(shouldShrink);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Header shrink animation
  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion()) return;

    if (isScrolled) {
      gsap.to(headerRef.current, {
        height: '70px',
        backdropFilter: 'blur(20px)',
        background: 'rgba(20, 21, 26, 0.95)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(logoRef.current, {
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(headerRef.current, {
        height: '90px',
        backdropFilter: 'blur(12px)',
        background: 'rgba(20, 21, 26, 0.8)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(logoRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isScrolled]);

  // Logo breathing animation
  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion()) return;

    const breathingTl = gsap.timeline({ repeat: -1, yoyo: true });
    breathingTl.to(logoRef.current, {
      textShadow: '0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.3)',
      duration: 2,
      ease: 'power2.inOut'
    });

    return () => breathingTl.kill();
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'home';
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach(item => {
      const element = document.querySelector(item.href) || document.querySelector(`[data-section="${item.id}"]`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current || prefersReducedMotion()) return;

    if (isMobileMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: 'block' });
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      // Animate menu items
      const menuItems = mobileMenuRef.current.querySelectorAll(`.${styles.mobileNavItem}`);
      gsap.fromTo(menuItems,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' });
        }
      });
    }
  }, [isMobileMenuOpen]);

  // Handle navigation clicks
  const handleNavClick = (item, e) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Smooth scroll to section
    const targetElement = document.querySelector(item.href) || document.querySelector(`[data-section="${item.id}"]`);
    if (targetElement) {
      scrollToElement(targetElement, -80); // Offset for fixed header
    }
    
    setActiveSection(item.id);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // WhatsApp button click
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/923704133315', '_blank');
  };

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.container}>
          {/* Logo */}
          <div ref={logoRef} className={styles.logo}>
            <span className={styles.xlim}>XLIM</span>
            <span className={styles.boxes}>BOXES</span>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navItems.map(item => (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(item, e)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                    <span className={styles.navUnderline} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* WhatsApp CTA - Desktop */}
          <button
            ref={whatsappBtnRef}
            className={`${styles.whatsappBtn} ${styles.desktop}`}
            onClick={handleWhatsAppClick}
            aria-label="Contact us on WhatsApp"
          >
            <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
            </svg>
            WhatsApp
          </button>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerRef}
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={styles.mobileMenu}
          style={{ display: 'none' }}
        >
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {navItems.map(item => (
                <li key={item.id} className={styles.mobileNavItem}>
                  <a
                    href={item.href}
                    className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(item, e)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className={styles.mobileNavItem}>
                <button
                  className={styles.mobileWhatsappBtn}
                  onClick={handleWhatsAppClick}
                  aria-label="Contact us on WhatsApp"
                >
                  <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  WhatsApp Us
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile WhatsApp FAB */}
      <button
        className={`${styles.whatsappFab} ${styles.mobile}`}
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
      >
        <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
        </svg>
      </button>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={styles.backdrop}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
