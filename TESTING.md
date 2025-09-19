# Section 1: Preloader Testing Guide

## What to Test

### 1. **Visual Elements**
- ✅ Dark luxury background with subtle gradient
- ✅ Animated particles floating with mouse parallax (desktop)
- ✅ "XLIM BOXES" wordmark with proper typography (Playfair Display + Inter)
- ✅ Neon border rectangle that animates around the logo
- ✅ Progress bar that fills from 0-100%
- ✅ Smooth fade-out and slide-up exit animation

### 2. **Animations**
- ✅ Logo entrance: scale + blur to normal
- ✅ Logo glow: pulsing neon text shadow effect
- ✅ Neon border: stroke animation that loops
- ✅ Progress bar: smooth fill animation
- ✅ Particles: floating movement with mouse parallax
- ✅ Exit: fade + slide up, then removal from DOM

### 3. **Responsiveness**
- ✅ Mobile: Logo scales appropriately
- ✅ Mobile: Neon border adjusts to screen size
- ✅ Mobile: Progress bar stays centered
- ✅ Touch devices: Particles work without mouse

### 4. **Accessibility**
- ✅ Reduced motion: Animations disabled/simplified
- ✅ No layout shifts during loading
- ✅ Proper contrast ratios
- ✅ Body scroll locked during preloader

### 5. **Performance**
- ✅ Canvas animations run at 60fps
- ✅ No blocking of main thread
- ✅ Smooth progress animation
- ✅ Clean DOM removal after completion

## How to Test

1. **Start Dev Server**: `npm run dev`
2. **Open Browser**: Navigate to localhost URL
3. **Hard Refresh**: Cmd/Ctrl + Shift + R to see full preloader
4. **Test Reduced Motion**: 
   - Chrome DevTools > Rendering > Emulate CSS prefers-reduced-motion
   - Should show simple fade instead of complex animations
5. **Test Mobile**: Use DevTools device emulation
6. **Test Performance**: DevTools Performance tab during load

## Expected Behavior

1. **Load Phase** (0-3 seconds):
   - Particles start floating immediately
   - Logo scales in with blur effect
   - Neon border starts stroke animation
   - Progress bar fills smoothly (fake + real progress)

2. **Complete Phase** (after window.onload):
   - Progress reaches 100%
   - Brief pause (500ms)
   - Smooth exit animation
   - DOM element completely removed
   - Main content appears
   - Body scroll unlocked

## Troubleshooting

- **Particles not moving**: Check canvas context and animation loop
- **GSAP errors**: Ensure ScrollTrigger plugin registered
- **Fonts not loading**: Check Google Fonts connection
- **Mobile issues**: Test touch events and viewport sizing
- **Performance issues**: Monitor console for warnings

## Files Created

- `src/components/Preloader.jsx` - Main component
- `src/components/Preloader.module.scss` - Styles
- `src/lib/motion.js` - GSAP utilities
- `src/lib/scroll.js` - Lenis smooth scroll
- `src/lib/usePreloader.js` - Progress hook
- `src/styles/` - Design system (tokens, globals, mixins)

## Next Steps

After confirming preloader works correctly, type "Next" to proceed to Section 2: Header/Navbar.
