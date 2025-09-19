import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Contact.module.scss';

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    quantity: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  // Contact information
  const contactInfo = [
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Visit Our Office",
      details: [
        "XLIM BOXES Manufacturing",
        "Industrial Zone, Lahore",
        "Punjab, Pakistan"
      ],
      action: "Get Directions"
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Email Us",
      details: [
        "Xlimboxes@gmail.com",
        "Quick response guaranteed",
        "Professional support"
      ],
      action: "Send Email"
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92V19.92C22 20.52 21.39 21 20.92 21C9.36 21 0 11.64 0 0.0799999C0 -0.390001 0.48 -0.999999 1.08 -0.999999H4.08C4.68 -0.999999 5.17 -0.509999 5.17 0.0799999C5.17 2.24 5.57 4.31 6.33 6.24C6.49 6.68 6.33 7.17 5.93 7.41L4.22 8.64C6.07 12.26 9.74 15.93 13.36 17.78L14.59 16.07C14.83 15.67 15.32 15.51 15.76 15.67C17.69 16.43 19.76 16.83 21.92 16.83C22.52 16.83 23.03 17.33 23.03 17.93Z" fill="currentColor"/>
        </svg>
      ),
      title: "Call Us",
      details: [
        "03704133315",
        "Direct line available",
        "Mon-Fri: 9AM-6PM PST"
      ],
      action: "Call Now"
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382C17.015 14.382 16.569 14.264 16.153 14.028C15.737 13.792 15.351 13.438 15.014 12.966L12.707 9.379C12.37 8.907 11.984 8.553 11.568 8.317C11.152 8.081 10.706 7.963 10.249 7.963C9.792 7.963 9.346 8.081 8.93 8.317C8.514 8.553 8.128 8.907 7.791 9.379L5.484 12.966C5.147 13.438 4.761 13.792 4.345 14.028C3.929 14.264 3.483 14.382 3.026 14.382C2.569 14.382 2.123 14.264 1.707 14.028C1.291 13.792 0.905 13.438 0.568 12.966C0.231 12.494 0.062 11.992 0.062 11.459C0.062 10.926 0.231 10.424 0.568 9.952L6.707 1.379C7.044 0.907 7.43 0.553 7.846 0.317C8.262 0.081 8.708 -0.037 9.165 -0.037C9.622 -0.037 10.068 0.081 10.484 0.317C10.9 0.553 11.286 0.907 11.623 1.379L17.762 9.952C18.099 10.424 18.268 10.926 18.268 11.459C18.268 11.992 18.099 12.494 17.762 12.966C17.425 13.438 17.039 13.792 16.623 14.028C16.207 14.264 15.761 14.382 15.304 14.382H17.472Z" fill="currentColor"/>
        </svg>
      ),
      title: "WhatsApp",
      details: [
        "03704133315",
        "Instant quotes & support",
        "Available 24/7"
      ],
      action: "Message Us"
    }
  ];

  // Project types for form dropdown
  const projectTypes = [
    'Rigid Gift Boxes',
    'Magnetic Closure Boxes',
    'Kraft Rigid Boxes',
    'Hinged Rigid Boxes',
    'Cylindrical Rigid Boxes',
    'Shoulder Neck Boxes',
    'Booklet Boxes',
    'Collapsible Rigid Boxes',
    'Custom Design'
  ];

  // Quantity ranges
  const quantityRanges = [
    '100-500 units',
    '500-1,000 units',
    '1,000-5,000 units',
    '5,000-10,000 units',
    '10,000+ units'
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

      // Form animation
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          x: -60
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact info staggered animation
      gsap.fromTo(contactInfoRef.current,
        {
          opacity: 0,
          x: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current[0],
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        quantity: '',
        message: ''
      });

      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleContactAction = (contactId, action) => {
    switch (contactId) {
      case 1: // Visit Office
        window.open('https://maps.google.com/?q=Lahore+Pakistan', '_blank');
        break;
      case 2: // Email
        window.location.href = 'mailto:Xlimboxes@gmail.com';
        break;
      case 3: // Call
        window.location.href = 'tel:03704133315';
        break;
      case 4: // WhatsApp
        window.open('https://wa.me/923704133315', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      data-section="contact"
      className={styles.contact}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>Get In Touch</span>
            <h2 className={styles.title}>
              Let's Create Something
              <span className={styles.titleAccent}> Amazing</span>
            </h2>
            <p className={styles.description}>
              Ready to elevate your brand with premium rigid packaging? Contact our team for 
              personalized solutions, quick quotes, and expert guidance on your packaging needs.
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Contact Form */}
          <div ref={formRef} className={styles.formSection}>
            <div className={styles.formWrapper}>
              <h3 className={styles.formTitle}>Send us a message</h3>
              <p className={styles.formDescription}>
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.formLabel}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="projectType" className={styles.formLabel}>
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="quantity" className={styles.formLabel}>
                      Estimated Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="">Select quantity range</option>
                      {quantityRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    required
                    rows="5"
                    placeholder="Tell us about your project requirements, dimensions, colors, branding needs, timeline, etc."
                  />
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' && (
                    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="32" strokeDashoffset="32">
                        <animate attributeName="stroke-dashoffset" dur="1s" values="32;0;32" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  )}
                  {formStatus === 'sending' ? 'Sending...' : 
                   formStatus === 'success' ? 'Message Sent!' : 
                   formStatus === 'error' ? 'Try Again' : 
                   'Get Your Quote'}
                </button>

                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10L8 15L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <h3 className={styles.contactInfoTitle}>Other ways to reach us</h3>
            <p className={styles.contactInfoDescription}>
              Prefer to contact us directly? Choose the method that works best for you.
            </p>

            <div className={styles.contactMethods}>
              {contactInfo.map((contact, index) => (
                <div 
                  key={contact.id}
                  ref={el => contactInfoRef.current[index] = el}
                  className={styles.contactMethod}
                >
                  <div className={styles.contactIcon}>
                    {contact.icon}
                  </div>
                  
                  <div className={styles.contactDetails}>
                    <h4 className={styles.contactTitle}>{contact.title}</h4>
                    <div className={styles.contactDetailsList}>
                      {contact.details.map((detail, detailIndex) => (
                        <span key={detailIndex} className={styles.contactDetail}>
                          {detail}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleContactAction(contact.id, contact.action)}
                      className={styles.contactAction}
                    >
                      {contact.action}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
