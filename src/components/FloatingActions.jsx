import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './FloatingActions.module.scss';

const FloatingActions = () => {
  const containerRef = useRef(null);
  const whatsappRef = useRef(null);
  const gmailRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Initial state - hidden
      gsap.set([whatsappRef.current, gmailRef.current], {
        opacity: 0,
        scale: 0,
        y: 20
      });

      // Show animation
      gsap.to(whatsappRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 2 // Show after page load
      });

      gsap.to(gmailRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 2.2 // Show slightly after WhatsApp
      });

      // Floating animation
      gsap.to([whatsappRef.current, gmailRef.current], {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/923704133315', '_blank');
  };

  const handleGmailClick = () => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Open Gmail app on mobile
      window.open('googlegmail://co?to=Xlimboxes@gmail.com&subject=Inquiry%20about%20Packaging', '_blank');
    } else {
      // Open Gmail web on desktop
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=Xlimboxes@gmail.com&su=Inquiry%20about%20Packaging', '_blank');
    }
  };

  return (
    <div ref={containerRef} className={styles.floatingActions}>
      {/* Gmail Button */}
      <button
        ref={gmailRef}
        className={`${styles.floatingBtn} ${styles.gmailBtn}`}
        onClick={handleGmailClick}
        aria-label="Email us on Gmail"
        title="Gmail Contact"
      >
        <div className={styles.btnIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
          </svg>
        </div>
        <div className={styles.btnGlow}></div>
        <div className={styles.btnRipple}></div>
      </button>

      {/* WhatsApp Button */}
      <button
        ref={whatsappRef}
        className={`${styles.floatingBtn} ${styles.whatsappBtn}`}
        onClick={handleWhatsAppClick}
        aria-label="Message us on WhatsApp"
        title="WhatsApp Chat"
      >
        <div className={styles.btnIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" fill="currentColor"/>
          </svg>
        </div>
        <div className={styles.btnGlow}></div>
        <div className={styles.btnRipple}></div>
      </button>
    </div>
  );
};

export default FloatingActions;
