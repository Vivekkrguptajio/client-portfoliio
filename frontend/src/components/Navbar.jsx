import { useState } from 'react'
import ranjeetNavbar from '../assets/ranjeetnavbar.png'

export default function Navbar({ scrolled, activeSection, loading }) {
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
    { name: 'ABOUT US', href: '#about' },
    { name: 'PROJECT', href: '#projects' },
    { name: 'RESUME', href: '#resume' },
  ]

  return (
    <header 
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-in-out ${
        loading ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      } ${scrolled ? 'top-4 px-4' : 'top-0 px-0'}`}
    >
      <nav 
        className={`w-full flex items-center justify-between transition-all duration-500 bg-white/20 backdrop-blur-2xl backdrop-saturate-200 ${
          scrolled 
            ? 'max-w-7xl py-1.5 px-6 md:px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40' 
            : 'max-w-full py-3 px-6 md:px-10 shadow-sm rounded-none border-transparent'
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
            className="w-10 h-10 md:w-11 md:h-11 object-contain group-hover:scale-105 transition-all duration-300"
          />
          <span className="text-sm md:text-base group-hover:text-gray-600 transition-colors duration-300">
            Ranjeet Verma.
          </span>
        </a>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                activeSection === link.name.toLowerCase() 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.name}
            </a>
          ))}
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
