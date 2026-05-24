import { useState } from 'react'

export default function Navbar({ scrolled, activeSection, loading }) {
  const [mobileMenu, setMobileMenu] = useState(false)

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
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
            ? 'max-w-6xl py-3 px-6 md:px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40' 
            : 'max-w-full py-5 px-6 md:px-10 shadow-sm rounded-none border-transparent'
        }`}
      >
        {/* Logo */}
        <a 
          href="#home" 
          className="font-semibold text-gray-900 text-lg md:text-xl tracking-tight hover:text-gray-600 transition-colors duration-300 select-none whitespace-nowrap"
        >
          Ranjeet Verma.
        </a>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`text-xs font-semibold tracking-[0.15em] transition-colors duration-200 relative py-1 ${
                activeSection === link.name.toLowerCase() 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Resume Button */}
          <a 
            href="#resume" 
            className="border border-gray-300 hover:border-gray-900 rounded-full px-5 py-2 text-xs font-semibold tracking-[0.15em] text-gray-600 hover:text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            RESUME
          </a>
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
              className="text-xs font-semibold tracking-[0.15em] text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#resume" 
            className="border border-gray-300 rounded-full px-5 py-2 text-xs font-semibold tracking-[0.15em] text-gray-600 text-center hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            RESUME
          </a>
        </div>
      </div>
    </header>
  )
}
