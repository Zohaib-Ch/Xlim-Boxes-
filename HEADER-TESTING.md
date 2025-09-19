# Section 2: Header/Navbar Testing Guide

## ✅ **What to Test**

### 1. **Visual Design & Layout**
- ✅ Glass morphism header with blur background
- ✅ XLIM BOXES logo with neon breathing effect
- ✅ Horizontal navigation menu (desktop)
- ✅ WhatsApp CTA button (desktop)
- ✅ Hamburger menu icon (mobile)
- ✅ Mobile WhatsApp FAB (bottom-right)

### 2. **Scroll Behavior**
- ✅ Header shrinks on scroll (90px → 70px)
- ✅ Background becomes more opaque when scrolled
- ✅ Logo scales down slightly (1.0 → 0.9)
- ✅ Subtle shadow appears on scroll
- ✅ Smooth transitions (0.4s duration)

### 3. **Navigation Features**
- ✅ Active section highlighting with neon underline
- ✅ Smooth scroll to sections with offset compensation
- ✅ IntersectionObserver for accurate section detection
- ✅ Hover effects on nav links
- ✅ Focus states for keyboard navigation

### 4. **Mobile Experience**
- ✅ Hamburger transforms to X when open
- ✅ Mobile menu slides down with backdrop blur
- ✅ Staggered animation of menu items
- ✅ Mobile WhatsApp button in menu
- ✅ Floating WhatsApp FAB with pulse animation
- ✅ Backdrop click to close menu

### 5. **WhatsApp Integration**
- ✅ Desktop button opens https://wa.me/923704133315
- ✅ Mobile FAB opens same WhatsApp link
- ✅ Proper hover and focus states
- ✅ WhatsApp icon SVG rendering

### 6. **Accessibility**
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation (Tab/Shift+Tab)
- ✅ Focus trap in mobile menu
- ✅ ESC key closes mobile menu
- ✅ Screen reader friendly navigation
- ✅ aria-expanded on hamburger button
- ✅ aria-current on active nav links

## 🧪 **How to Test**

### **Desktop Testing (1024px+)**
1. **Load Page**: Header should appear with glass effect
2. **Logo Animation**: XLIM should have breathing glow effect
3. **Scroll Test**: Scroll down, header should shrink smoothly
4. **Navigation**: Click each nav item, should smooth scroll to sections
5. **Active States**: Current section should highlight in nav
6. **WhatsApp Button**: Should open WhatsApp in new tab
7. **Keyboard Nav**: Tab through all interactive elements

### **Mobile Testing (< 1024px)**
1. **Responsive Layout**: Logo and hamburger should be visible
2. **Hamburger Menu**: Tap to open, should slide down with animation
3. **Menu Items**: Should animate in with stagger effect
4. **Navigation**: Tap nav items, menu should close and scroll
5. **WhatsApp FAB**: Should pulse and be accessible
6. **Backdrop**: Tap outside menu to close
7. **Touch Interactions**: All buttons should be touch-friendly

### **Accessibility Testing**
1. **Screen Reader**: Use screen reader to navigate
2. **Keyboard Only**: Navigate using only keyboard
3. **Focus Management**: Focus should be trapped in mobile menu
4. **Color Contrast**: Check all text meets WCAG standards
5. **Reduced Motion**: Test with reduced motion preference

## 🎯 **Expected Behavior**

### **On Load**
- Header appears with 90px height
- Glass background with subtle blur
- XLIM logo starts breathing animation
- Navigation items are properly spaced

### **On Scroll**
- Header shrinks to 70px at 50px scroll
- Background becomes more opaque
- Logo scales down slightly
- Shadow appears under header

### **Navigation**
- Smooth scroll with 80px offset for fixed header
- Active section updates based on viewport
- Neon underline animates on hover/active
- Mobile menu closes after navigation

### **Mobile Menu**
- Opens with slide-down animation
- Items animate in with 0.05s stagger
- Backdrop blur effect
- Focus management works correctly

## 🚨 **Common Issues to Check**

- **Z-index conflicts**: Header should stay above content
- **Mobile menu overflow**: Should not cause horizontal scroll
- **Touch targets**: All buttons should be minimum 44px
- **Performance**: Animations should be 60fps
- **WhatsApp links**: Should open correctly on all devices
- **Section detection**: Active nav should update accurately

## 📱 **Responsive Breakpoints**

- **Mobile**: < 768px (hamburger menu, FAB)
- **Tablet**: 768px - 1023px (hamburger menu)
- **Desktop**: 1024px+ (full navigation, desktop WhatsApp button)
- **Large**: 1200px+ (increased nav spacing)

## ⚡ **Performance Notes**

- Header uses `position: fixed` with GPU acceleration
- Scroll listener is throttled for performance
- IntersectionObserver is efficient for section detection
- GSAP animations are hardware accelerated
- Mobile menu uses transform animations

## 🎨 **Visual Polish**

- Glass morphism with backdrop-filter
- Neon glow effects on logo and active states
- Smooth micro-interactions
- Consistent spacing and typography
- WhatsApp brand colors (#25d366)

---

**Expected Results**: A premium, fully functional header that feels luxurious and works flawlessly across all devices and interaction methods.

**Test URL**: `http://localhost:5175/`

All features should work smoothly with no console errors or accessibility violations.
