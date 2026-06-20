import { useState, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import ranjeetNavbar from '../assets/ranjeetnavbar.png'

export default function Navbar({ scrolled, activeSection, loading }) {
  const { socialLinks } = useContext(PortfolioContext)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * 0.2
    const y = (e.clientY - (top + height / 2)) * 0.2
    setLogoPos({ x, y })
  }

  const handleMouseLeave = () => {
    setLogoPos({ x: 0, y: 0 })
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#toolkit' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ]

  return (
    <header 
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-in-out ${
        loading ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      } ${scrolled ? 'top-4 px-4' : 'top-0 px-0'}`}
    >
      <nav 
        className={`w-full flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'bg-white/20 backdrop-blur-2xl backdrop-saturate-200 max-w-7xl py-3 px-6 md:px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40' 
            : 'bg-transparent max-w-full py-4 px-6 md:px-10 shadow-none rounded-none border-transparent'
        }`}
      >
        {/* Logo */}
        <a 
          href="#home" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `translate(${logoPos.x}px, ${logoPos.y}px)` }}
          className="group flex items-center gap-3 font-semibold text-gray-900 tracking-tight transition-transform duration-75 ease-out select-none whitespace-nowrap"
        >
          <img 
            src={ranjeetNavbar} 
            alt="Ranjeet Logo" 
            className="w-9 h-9 md:w-10 md:h-10 object-contain group-hover:scale-105 transition-all duration-300"
          />
          <span className="text-sm md:text-base group-hover:text-gray-600 transition-colors duration-300">
            Ranjeet Verma.
          </span>
        </a>
        
        {/* Desktop Nav Links & Buttons */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-6 lg:gap-8 mr-2">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`text-[15px] font-medium transition-colors duration-200 relative py-1 ${
                  activeSection === link.name.toLowerCase() 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <a 
            href="#contact"
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white text-[14px] font-medium px-5 py-1.5 rounded-full hover:shadow-[0_8px_20px_-6px_rgba(56,189,248,0.5)] hover:scale-105 transition-all duration-300"
          >
            Contact
          </a>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href={socialLinks?.linkedin || "#"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenu ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
          <span className={`block w-5 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenu ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenu ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <div className={`md:hidden glass-navbar border-t border-gray-100 overflow-hidden transition-all duration-300 ${
        mobileMenu ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
