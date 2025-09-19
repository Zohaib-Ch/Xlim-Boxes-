import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './FAQs.module.scss';

const FAQs = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const faqsRef = useRef([]);
  const ctaRef = useRef(null);

  // FAQ state for expand/collapse
  const [openFAQ, setOpenFAQ] = useState(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      category: "General",
      question: "What types of rigid boxes do you manufacture?",
      answer: "We specialize in manufacturing premium rigid boxes including Magnetic Closure Boxes, Rigid Gift Boxes, Hinged Boxes, Cylindrical Boxes, Kraft Rigid Boxes, Shoulder Neck Boxes, Booklet Boxes, and Collapsible Rigid Boxes. Each type can be fully customized to match your brand requirements."
    },
    {
      id: 2,
      category: "Customization",
      question: "Can I customize the size and design of my boxes?",
      answer: "Absolutely! We offer complete customization including custom dimensions, colors, materials, finishes, and branding options. You can choose from various chipboard weights (300-400 GSM), finishes like matte/gloss lamination, soft touch, spot UV, and branding options including foil stamping, embossing, and digital printing."
    },
    {
      id: 3,
      category: "Materials",
      question: "What materials do you use for rigid box construction?",
      answer: "We use high-quality chipboard ranging from 300 GSM to 400 GSM for structural integrity. Our boxes are wrapped with premium paper stocks and can include various finishes such as matte/gloss lamination, soft-touch coating, or specialty finishes. All materials are sourced from certified suppliers ensuring consistent quality."
    },
    {
      id: 4,
      category: "Ordering",
      question: "What is the minimum order quantity (MOQ)?",
      answer: "Our standard minimum order quantity is 100 units. However, we understand that different businesses have different needs, and we're flexible with quantities based on your specific requirements. Larger quantities (1000+ units) receive better pricing per unit."
    },
    {
      id: 5,
      category: "Production",
      question: "How long does production take?",
      answer: "Standard production time is 7-10 business days after artwork approval and payment confirmation. Rush orders can be accommodated in 5-7 days with additional rush charges. Complex customizations or specialty finishes may require additional time, which we'll communicate upfront."
    },
    {
      id: 6,
      category: "Design",
      question: "Do you provide design services?",
      answer: "Yes! Our experienced design team can help create stunning packaging designs that reflect your brand identity. We offer design consultation, structural design modifications, and artwork preparation services. We work with your existing brand guidelines or help develop new packaging concepts."
    },
    {
      id: 7,
      category: "Pricing",
      question: "How is pricing determined?",
      answer: "Pricing depends on several factors including box type, dimensions, material quality, finish options, branding requirements, and order quantity. Our online configurator provides instant estimates, and our team provides detailed quotes within 24 hours for complex projects."
    },
    {
      id: 8,
      category: "Shipping",
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! We work with reliable international shipping partners to ensure your boxes arrive safely and on time. Shipping costs and delivery times vary by destination. We provide tracking information and handle all export documentation."
    },
    {
      id: 9,
      category: "Quality",
      question: "What quality control measures do you have?",
      answer: "We maintain strict quality control throughout the production process. This includes material inspection, printing quality checks, structural integrity testing, and final packaging inspection. Each batch undergoes multi-point quality assessment before shipping."
    },
    {
      id: 10,
      category: "Samples",
      question: "Can I get samples before placing a large order?",
      answer: "Absolutely! We recommend ordering samples to evaluate quality and fit. We can provide blank samples of different box types and materials, or create custom samples with your branding. Sample costs are often credited toward your main order."
    },
    {
      id: 11,
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, credit cards, PayPal, and other secure payment options. For large orders, we can arrange flexible payment terms. A deposit is typically required before production begins."
    },
    {
      id: 12,
      category: "Support",
      question: "What kind of customer support do you provide?",
      answer: "We provide comprehensive customer support including design consultation, technical assistance, order tracking, and after-sales support. Our team is available via WhatsApp, email, and phone during business hours. We're committed to ensuring your complete satisfaction."
    }
  ];

  // Group FAQs by category
  const faqCategories = [...new Set(faqs.map(faq => faq.category))];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleContactSupport = () => {
    const message = "Hi! I have some questions about your rigid box packaging services. Could you please help me with more information?";
    const whatsappUrl = `https://wa.me/923704133315?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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

      // FAQs staggered animation
      gsap.fromTo(faqsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqsRef.current[0],
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="faqs" 
      data-section="faqs"
      className={styles.faqs}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>Got Questions?</span>
            <h2 className={styles.title}>
              Frequently Asked
              <span className={styles.titleAccent}> Questions</span>
            </h2>
            <p className={styles.description}>
              Find answers to common questions about our rigid box packaging services, 
              customization options, ordering process, and more. Can't find what you're looking for? 
              Contact our team directly.
            </p>
          </div>
        </header>

        {/* FAQ Categories Filter */}
        <div className={styles.categoriesFilter}>
          <button 
            onClick={() => setOpenFAQ(null)}
            className={styles.categoryBtn}
          >
            All Questions
          </button>
          {faqCategories.map((category) => (
            <button
              key={category}
              className={styles.categoryBtn}
              onClick={() => {
                const categoryFAQs = faqs.filter(faq => faq.category === category);
                if (categoryFAQs.length > 0) {
                  setOpenFAQ(categoryFAQs[0].id);
                  // Scroll to first FAQ of this category
                  const element = document.querySelector(`[data-faq-id="${categoryFAQs[0].id}"]`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className={styles.faqsList}>
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              ref={el => faqsRef.current[index] = el}
              data-faq-id={faq.id}
              className={`${styles.faqItem} ${openFAQ === faq.id ? styles.open : ''}`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={styles.faqQuestion}
                aria-expanded={openFAQ === faq.id}
              >
                <div className={styles.questionContent}>
                  <span className={styles.questionCategory}>{faq.category}</span>
                  <span className={styles.questionText}>{faq.question}</span>
                </div>
                <div className={styles.questionIcon}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className={styles.iconSvg}
                  >
                    <path 
                      d="M6 9L12 15L18 9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              
              <div className={styles.faqAnswer}>
                <div className={styles.answerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div ref={ctaRef} className={styles.contactCTA}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Still have questions?</h3>
            <p className={styles.ctaDescription}>
              Our packaging experts are here to help you find the perfect solution for your needs.
            </p>
            <div className={styles.ctaButtons}>
              <button onClick={handleContactSupport} className={styles.primaryBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" fill="currentColor"/>
                </svg>
                <span>WhatsApp Support</span>
              </button>
              
              <button 
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={styles.secondaryBtn}
              >
                <span>Contact Form</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
