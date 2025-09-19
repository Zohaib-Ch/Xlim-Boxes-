import { useState, useEffect } from 'react';

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scroll when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isLoading]);

  useEffect(() => {
    let progressInterval;
    let loadComplete = false;
    let startTime = Date.now();
    const minLoadTime = 5000; // Minimum 5 seconds for luxury experience

    // More sophisticated progress simulation
    const updateProgress = () => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const timeProgress = Math.min(elapsed / minLoadTime * 85, 85); // Time-based progress up to 85%
        
        if (loadComplete && prev >= 95) {
          // Final completion
          clearInterval(progressInterval);
          return 100;
        }
        
        if (loadComplete) {
          // Accelerate to 95% when actually loaded
          return Math.min(prev + 2, 95);
        }
        
        // Smooth curve based on time and random increments
        const targetProgress = Math.min(timeProgress, 85);
        const diff = targetProgress - prev;
        const increment = Math.max(diff * 0.1, 0.5); // Smooth approach
        
        return Math.min(prev + increment, 85);
      });
    };

    // Start progress simulation
    progressInterval = setInterval(updateProgress, 50); // Smoother updates

    // Handle actual page load
    const handleLoad = () => {
      loadComplete = true;
    };

    // Handle different loading states
    const handleDOMContentLoaded = () => {
      // DOM is ready, but resources might still be loading
      setTimeout(() => {
        setProgress(prev => Math.max(prev, 60));
      }, 100);
    };

    // Check current state
    if (document.readyState === 'complete') {
      handleLoad();
    } else if (document.readyState === 'interactive') {
      handleDOMContentLoaded();
      window.addEventListener('load', handleLoad);
    } else {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.addEventListener('load', handleLoad);
    }

    // Ensure minimum display time for luxury experience
    const minTimeTimeout = setTimeout(() => {
      if (loadComplete && progress >= 95) {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Longer pause at 100% for impact
      }
    }, minLoadTime);

    // Progress completion handler
    const progressCompleteCheck = setInterval(() => {
      if (progress >= 100) {
        clearInterval(progressCompleteCheck);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); // Extended pause for luxury feel
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      clearInterval(progressCompleteCheck);
      clearTimeout(minTimeTimeout);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.removeEventListener('load', handleLoad);
    };
  }, [progress]);

  return { isLoading, progress };
};
