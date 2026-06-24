import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import aboutPageImg from '../assets/AboutPage.png'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = 'about'

  // Monitor Scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-white overflow-x-clip font-sans">
      
      {/* ═══════ NAVBAR ═══════ */}
      <Navbar scrolled={scrolled} activeSection={activeSection} loading={false} />

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="pt-[2.2%]">
        <div className="w-full flex justify-center">
          <img src={aboutPageImg} alt="About Ranjeet" className="w-[85%] h-auto object-contain" />
        </div>
        <Contact />
      </main>
    </div>
  )
}
