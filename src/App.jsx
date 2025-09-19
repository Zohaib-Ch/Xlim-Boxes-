import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { initGSAP } from './lib/motion.js'
import { initSmoothScroll } from './lib/scroll.js'
import Preloader from './components/Preloader.jsx'
import Header from './components/Header.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import Hero from './sections/Hero.jsx'
import LuxuryStyles from './sections/LuxuryStyles.jsx'
import SweetBoxes from './sections/SweetBoxes.jsx'
import Printing from './sections/Printing.jsx'
import Sheets from './sections/Sheets.jsx'
import Tags from './sections/Tags.jsx'
import Finishes from './sections/Finishes.jsx'
import Benefits from './sections/Benefits.jsx'
import Reviews from './sections/Reviews.jsx'
import Contact from './sections/Contact.jsx'
import Customize from './sections/Customize.jsx'
import FAQs from './sections/FAQs.jsx'
import './styles/globals.scss'

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  useEffect(() => {
    // Initialize GSAP and smooth scrolling
    initGSAP()
    initSmoothScroll()
  }, [])

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true)
  }

  return (
    <HelmetProvider>
      <div className="app">
        {/* Preloader */}
        <Preloader onComplete={handlePreloaderComplete} />
        
        {/* Main Content - Only show after preloader */}
        {preloaderComplete && (
          <>
            {/* Header */}
            <Header />
            
            {/* Main Content */}
                <main>
                  {/* Hero Section */}
                  <Hero />

                  {/* Luxury Styles Section */}
                  <LuxuryStyles />

                  {/* Sweet Boxes Section */}
                  <SweetBoxes />

                  {/* Printing Section */}
                  <Printing />

                  {/* Sheets Section */}
                  <Sheets />

                  {/* Tags Section */}
                  <Tags />

                  {/* Finishes Section */}
                  <Finishes />

                  {/* Benefits Section */}
                  <Benefits />

                  {/* Reviews Section */}
                  <Reviews />

                  {/* Contact Section */}
                  <Contact />

                  {/* Customize Section */}
                  <Customize />

                  {/* FAQs Section */}
                  <FAQs />
            </main>

            {/* Floating Action Buttons */}
            <FloatingActions />
          </>
        )}
      </div>
    </HelmetProvider>
  )
}

export default App
