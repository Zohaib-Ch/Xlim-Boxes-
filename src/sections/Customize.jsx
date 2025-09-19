import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion.js';
import styles from './Customize.module.scss';

const Customize = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const configuratorRef = useRef(null);
  const optionsRef = useRef([]);
  const previewRef = useRef(null);

  // Customization state
  const [selectedOptions, setSelectedOptions] = useState({
    boxType: 'magnetic',
    size: 'medium',
    material: 'premium',
    finish: 'matte',
    color: 'black',
    branding: 'foil-stamping',
    quantity: '1000'
  });

  // Box type options
  const boxTypes = [
    {
      id: 'magnetic',
      name: 'Magnetic Closure',
      description: 'Premium magnetic flap closure',
      basePrice: 4.25,
      image: '/images/Magnetic Closure Box.png'
    },
    {
      id: 'rigid-gift',
      name: 'Rigid Gift Box',
      description: 'Classic rigid box with lid',
      basePrice: 3.50,
      image: '/images/Rigid Gift Box.png'
    },
    {
      id: 'hinged',
      name: 'Hinged Box',
      description: 'Convenient hinged opening',
      basePrice: 2.95,
      image: '/images/Hinged Rigid Box.png'
    },
    {
      id: 'cylindrical',
      name: 'Cylindrical Box',
      description: 'Round elegant design',
      basePrice: 3.20,
      image: '/images/Cylindrical Rigid Box.png'
    }
  ];

  // Size options
  const sizes = [
    { id: 'small', name: 'Small', dimensions: '10×8×3 cm', multiplier: 0.8 },
    { id: 'medium', name: 'Medium', dimensions: '15×12×5 cm', multiplier: 1.0 },
    { id: 'large', name: 'Large', dimensions: '20×16×8 cm', multiplier: 1.3 },
    { id: 'custom', name: 'Custom', dimensions: 'Your dimensions', multiplier: 1.2 }
  ];

  // Material options
  const materials = [
    { id: 'standard', name: 'Standard', description: '300 GSM Chipboard', multiplier: 1.0 },
    { id: 'premium', name: 'Premium', description: '350 GSM Chipboard', multiplier: 1.2 },
    { id: 'luxury', name: 'Luxury', description: '400 GSM Chipboard', multiplier: 1.5 }
  ];

  // Finish options
  const finishes = [
    { id: 'matte', name: 'Matte Lamination', multiplier: 1.0 },
    { id: 'gloss', name: 'Gloss Lamination', multiplier: 1.1 },
    { id: 'soft-touch', name: 'Soft Touch', multiplier: 1.3 },
    { id: 'spot-uv', name: 'Spot UV', multiplier: 1.4 }
  ];

  // Color options
  const colors = [
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'kraft', name: 'Kraft Brown', hex: '#D2B48C' },
    { id: 'navy', name: 'Navy Blue', hex: '#1E3A8A' },
    { id: 'burgundy', name: 'Burgundy', hex: '#7C2D12' },
    { id: 'custom', name: 'Custom Color', hex: '#C6A667' }
  ];

  // Branding options
  const brandingOptions = [
    { id: 'none', name: 'No Branding', multiplier: 1.0 },
    { id: 'digital-print', name: 'Digital Print', multiplier: 1.2 },
    { id: 'foil-stamping', name: 'Foil Stamping', multiplier: 1.5 },
    { id: 'embossing', name: 'Embossing', multiplier: 1.4 },
    { id: 'debossing', name: 'Debossing', multiplier: 1.3 }
  ];

  // Quantity tiers
  const quantityTiers = [
    { id: '100', name: '100-499', multiplier: 1.5 },
    { id: '500', name: '500-999', multiplier: 1.2 },
    { id: '1000', name: '1,000-2,499', multiplier: 1.0 },
    { id: '2500', name: '2,500-4,999', multiplier: 0.85 },
    { id: '5000', name: '5,000+', multiplier: 0.7 }
  ];

  // Calculate price
  const calculatePrice = () => {
    const boxType = boxTypes.find(type => type.id === selectedOptions.boxType);
    const size = sizes.find(s => s.id === selectedOptions.size);
    const material = materials.find(m => m.id === selectedOptions.material);
    const finish = finishes.find(f => f.id === selectedOptions.finish);
    const branding = brandingOptions.find(b => b.id === selectedOptions.branding);
    const quantity = quantityTiers.find(q => q.id === selectedOptions.quantity);

    const basePrice = boxType?.basePrice || 3.50;
    const totalMultiplier = (size?.multiplier || 1) * 
                           (material?.multiplier || 1) * 
                           (finish?.multiplier || 1) * 
                           (branding?.multiplier || 1) * 
                           (quantity?.multiplier || 1);

    return (basePrice * totalMultiplier).toFixed(2);
  };

  // Handle option change
  const handleOptionChange = (category, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Handle get quote
  const handleGetQuote = () => {
    const selectedBoxType = boxTypes.find(type => type.id === selectedOptions.boxType);
    const selectedSize = sizes.find(s => s.id === selectedOptions.size);
    const selectedMaterial = materials.find(m => m.id === selectedOptions.material);
    const selectedFinish = finishes.find(f => f.id === selectedOptions.finish);
    const selectedColor = colors.find(c => c.id === selectedOptions.color);
    const selectedBranding = brandingOptions.find(b => b.id === selectedOptions.branding);
    const selectedQuantity = quantityTiers.find(q => q.id === selectedOptions.quantity);
    
    const quoteDetails = `
Box Type: ${selectedBoxType?.name}
Size: ${selectedSize?.name} (${selectedSize?.dimensions})
Material: ${selectedMaterial?.name}
Finish: ${selectedFinish?.name}
Color: ${selectedColor?.name}
Branding: ${selectedBranding?.name}
Quantity: ${selectedQuantity?.name}
Estimated Price: $${calculatePrice()} per unit

I'm interested in getting a detailed quote for these custom rigid boxes. Please contact me with more information.
    `.trim();

    const whatsappUrl = `https://wa.me/923704133315?text=${encodeURIComponent(quoteDetails)}`;
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

      // Configurator animation
      gsap.fromTo(configuratorRef.current,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: configuratorRef.current,
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Options staggered animation
      gsap.fromTo(optionsRef.current,
        {
          opacity: 0,
          x: -40,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: optionsRef.current[0],
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Preview animation
      gsap.fromTo(previewRef.current,
        {
          opacity: 0,
          x: 60
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: previewRef.current,
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
      id="customize" 
      data-section="customize"
      className={styles.customize}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.eyebrow}>Design Your Perfect Box</span>
            <h2 className={styles.title}>
              Custom Packaging
              <span className={styles.titleAccent}> Configurator</span>
            </h2>
            <p className={styles.description}>
              Create your ideal rigid box with our interactive configurator. Choose from premium materials, 
              finishes, and customization options to match your brand perfectly.
            </p>
          </div>
        </header>

        {/* Configurator */}
        <div ref={configuratorRef} className={styles.configurator}>
          {/* Options Panel */}
          <div className={styles.optionsPanel}>
            {/* Box Type Selection */}
            <div ref={el => optionsRef.current[0] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Box Type</h3>
              <div className={styles.boxTypeGrid}>
                {boxTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleOptionChange('boxType', type.id)}
                    className={`${styles.boxTypeCard} ${selectedOptions.boxType === type.id ? styles.selected : ''}`}
                  >
                    <img src={type.image} alt={type.name} className={styles.boxTypeImage} />
                    <div className={styles.boxTypeInfo}>
                      <div className={styles.boxTypeName}>{type.name}</div>
                      <div className={styles.boxTypeDesc}>{type.description}</div>
                      <div className={styles.boxTypePrice}>From ${type.basePrice}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div ref={el => optionsRef.current[1] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Size</h3>
              <div className={styles.optionGrid}>
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleOptionChange('size', size.id)}
                    className={`${styles.optionCard} ${selectedOptions.size === size.id ? styles.selected : ''}`}
                  >
                    <div className={styles.optionName}>{size.name}</div>
                    <div className={styles.optionDesc}>{size.dimensions}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div ref={el => optionsRef.current[2] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Material</h3>
              <div className={styles.optionGrid}>
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => handleOptionChange('material', material.id)}
                    className={`${styles.optionCard} ${selectedOptions.material === material.id ? styles.selected : ''}`}
                  >
                    <div className={styles.optionName}>{material.name}</div>
                    <div className={styles.optionDesc}>{material.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div ref={el => optionsRef.current[3] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Finish</h3>
              <div className={styles.optionGrid}>
                {finishes.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => handleOptionChange('finish', finish.id)}
                    className={`${styles.optionCard} ${selectedOptions.finish === finish.id ? styles.selected : ''}`}
                  >
                    <div className={styles.optionName}>{finish.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div ref={el => optionsRef.current[4] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Color</h3>
              <div className={styles.colorGrid}>
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleOptionChange('color', color.id)}
                    className={`${styles.colorCard} ${selectedOptions.color === color.id ? styles.selected : ''}`}
                  >
                    <div 
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className={styles.colorName}>{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Branding Selection */}
            <div ref={el => optionsRef.current[5] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Branding</h3>
              <div className={styles.optionGrid}>
                {brandingOptions.map((branding) => (
                  <button
                    key={branding.id}
                    onClick={() => handleOptionChange('branding', branding.id)}
                    className={`${styles.optionCard} ${selectedOptions.branding === branding.id ? styles.selected : ''}`}
                  >
                    <div className={styles.optionName}>{branding.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div ref={el => optionsRef.current[6] = el} className={styles.optionGroup}>
              <h3 className={styles.optionTitle}>Quantity</h3>
              <div className={styles.optionGrid}>
                {quantityTiers.map((quantity) => (
                  <button
                    key={quantity.id}
                    onClick={() => handleOptionChange('quantity', quantity.id)}
                    className={`${styles.optionCard} ${selectedOptions.quantity === quantity.id ? styles.selected : ''}`}
                  >
                    <div className={styles.optionName}>{quantity.name}</div>
                    <div className={styles.optionDesc}>units</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div ref={previewRef} className={styles.previewPanel}>
            <div className={styles.previewContainer}>
              <div className={styles.previewHeader}>
                <h3 className={styles.previewTitle}>Your Custom Box</h3>
                <div className={styles.priceDisplay}>
                  <span className={styles.priceLabel}>Estimated Price</span>
                  <span className={styles.priceValue}>${calculatePrice()}</span>
                  <span className={styles.priceUnit}>per unit</span>
                </div>
              </div>

              <div className={styles.previewImage}>
                <img 
                  src={boxTypes.find(type => type.id === selectedOptions.boxType)?.image}
                  alt="Custom box preview"
                  className={styles.boxPreview}
                />
                <div className={styles.previewOverlay}>
                  <div className={styles.previewBadge}>Preview</div>
                </div>
              </div>

              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Type:</span>
                  <span className={styles.specValue}>
                    {boxTypes.find(type => type.id === selectedOptions.boxType)?.name}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Size:</span>
                  <span className={styles.specValue}>
                    {sizes.find(s => s.id === selectedOptions.size)?.name}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Material:</span>
                  <span className={styles.specValue}>
                    {materials.find(m => m.id === selectedOptions.material)?.name}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Finish:</span>
                  <span className={styles.specValue}>
                    {finishes.find(f => f.id === selectedOptions.finish)?.name}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Color:</span>
                  <span className={styles.specValue}>
                    {colors.find(c => c.id === selectedOptions.color)?.name}
                  </span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Branding:</span>
                  <span className={styles.specValue}>
                    {brandingOptions.find(b => b.id === selectedOptions.branding)?.name}
                  </span>
                </div>
              </div>

              <button onClick={handleGetQuote} className={styles.quoteButton}>
                <span className={styles.buttonText}>Get Detailed Quote</span>
                <svg className={styles.buttonIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customize;
