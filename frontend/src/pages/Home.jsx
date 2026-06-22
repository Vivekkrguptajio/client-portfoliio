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
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Monitor Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['home', 'about', 'approach', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-white overflow-x-clip font-sans">
      
      {/* ═══════ PRELOADER ═══════ */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ═══════ NAVBAR ═══════ */}
      <Navbar scrolled={scrolled} activeSection={activeSection} loading={loading} />

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
