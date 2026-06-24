import { useState, useEffect } from 'react'

// Components
import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Toolkit from '../components/Toolkit'
import Approach from '../components/Approach'
import WorkShowcase from '../components/WorkShowcase'
import LatestWork from '../components/LatestWork'
import Contact from '../components/Contact'

export default function Home() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisited')
  })
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Monitor Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll spy logic removed based on user request

      // Check for dark theme
      let dark = false;
      const navBottom = window.scrollY + 80;
      const workShowcase = document.getElementById('work-showcase');
      const latestWork = document.getElementById('latest-work');

      if (workShowcase) {
        // WorkShowcase animates to black after 40% scroll (roughly 1.2 * windowHeight into the section)
        const blackStart = workShowcase.offsetTop + (window.innerHeight * 1.2);
        const blackEnd = workShowcase.offsetTop + workShowcase.offsetHeight;
        if (navBottom >= blackStart && navBottom < blackEnd) dark = true;
      }
      if (latestWork) {
        if (navBottom >= latestWork.offsetTop && navBottom < latestWork.offsetTop + latestWork.offsetHeight) dark = true;
      }
      setIsDarkTheme(dark);
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-white overflow-x-clip font-sans">
      
      {/* ═══════ PRELOADER ═══════ */}
      {loading && <Preloader onComplete={() => {
        sessionStorage.setItem('hasVisited', 'true')
        setLoading(false)
      }} />}

      {/* ═══════ NAVBAR ═══════ */}
      <Navbar scrolled={scrolled} activeSection={activeSection} loading={loading} isDarkTheme={isDarkTheme} />

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className={`transition-all duration-1000 ${loading ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}`}>
        <Hero startAnimation={!loading} />
        <About />
        <Toolkit />
        <Approach />
        <WorkShowcase />
        <LatestWork />
        <Contact />
      </main>
    </div>
  )
}
