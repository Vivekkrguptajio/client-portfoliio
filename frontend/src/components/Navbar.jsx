import { useState, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import ranjeetNavbar from '../assets/ranjeetnavbar.png'

export default function Navbar({ scrolled, activeSection, loading, isDarkTheme = false }) {
  const { profileDetails } = useContext(PortfolioContext)
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
    { name: 'ABOUT US', href: '/about' },
    { name: 'PROJECT', href: '/work' },
  ]

  return (
    <header 
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-in-out ${
        loading ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      } ${scrolled ? 'top-4 px-4' : 'top-0 px-0'}`}
    >
      <nav 
        className={`w-full flex items-center justify-between transition-all duration-500 backdrop-blur-2xl backdrop-saturate-200 ${
          isDarkTheme ? 'bg-white/10' : 'bg-white/20'
        } ${
          scrolled 
            ? `max-w-7xl py-2 px-6 md:px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] border ${isDarkTheme ? 'border-white/10' : 'border-white/40'}` 
            : 'max-w-full py-3 px-6 md:px-10 shadow-sm rounded-none border-transparent'
        }`}
      >
        {/* Logo */}
        <a 
          href="/" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `translate(${logoPos.x}px, ${logoPos.y}px)` }}
          className={`group flex items-center gap-3 font-semibold tracking-tight transition-transform duration-75 ease-out select-none whitespace-nowrap ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
        >
          <img 
            src={ranjeetNavbar} 
            alt="Ranjeet Logo" 
            className={`w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-all duration-300 ${isDarkTheme ? 'invert brightness-0 object-contain' : ''}`}
          />
          <span className={`text-2xl md:text-3xl font-neuebit transition-colors duration-300 tracking-wide ${isDarkTheme ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600'}`}>
            Ranjeet Verma.
          </span>
        </a>
        
        {/* Desktop Nav Links & Buttons */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-6 mr-2">
            {navLinks.map((link) => {
              const linkPath = link.href.replace(/^\//, '').replace(/^#/, '');
              const isActive = activeSection === linkPath;
              return (
                <a 
                  key={link.name}
                  href={link.href} 
                  className={`group text-lg md:text-xl font-neuebit tracking-normal md:tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? (isDarkTheme ? 'text-white' : 'text-black')
                      : (isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black')
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-0 w-full h-[2px] transition-transform duration-500 origin-left ${isDarkTheme ? 'bg-white' : 'bg-gray-900'} ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
              );
            })}
          </div>

          <a 
            href={profileDetails?.resumeLink || "#"} 
            target="_blank" 
            rel="noreferrer"
            className={`group text-lg md:text-xl font-neuebit tracking-normal md:tracking-wide transition-colors duration-200 relative py-1 ${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'}`}
          >
            RESUME
            <span className={`absolute left-0 bottom-0 w-full h-[2px] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${isDarkTheme ? 'bg-white' : 'bg-gray-900'}`}></span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-[2px] transition-all duration-300 ${isDarkTheme ? 'bg-white' : 'bg-gray-900'} ${mobileMenu ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
          <span className={`block w-5 h-[2px] transition-all duration-300 ${isDarkTheme ? 'bg-white' : 'bg-gray-900'} ${mobileMenu ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-[2px] transition-all duration-300 ${isDarkTheme ? 'bg-white' : 'bg-gray-900'} ${mobileMenu ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Nav Menu Dropdown */}
      <div className={`md:hidden absolute top-[calc(100%+12px)] left-4 right-4 rounded-2xl glass-navbar border-t border-gray-100 overflow-hidden transition-all duration-300 shadow-xl ${
        mobileMenu ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0 py-0 border-transparent'
      }`}>
        <div className="flex flex-col px-4 py-2 gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="text-lg font-neuebit text-gray-700 hover:text-black hover:bg-gray-50/50 rounded-xl px-4 py-2 transition-all"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={profileDetails?.resumeLink || "#"} 
            target="_blank" 
            rel="noreferrer"
            onClick={() => setMobileMenu(false)}
            className="text-lg font-neuebit text-gray-700 hover:text-black hover:bg-gray-50/50 rounded-xl px-4 py-2 transition-all"
          >
            RESUME
          </a>
        </div>
      </div>
    </header>
  )
}
