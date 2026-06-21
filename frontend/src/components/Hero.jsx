import { useState, useContext, useEffect } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import heroImg from '../assets/hero.png'

export default function Hero() {
  const { profileDetails } = useContext(PortfolioContext)
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 })
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!profileDetails?.description) return;
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);
    const interval = setInterval(() => {
      if (index <= profileDetails.description.length) {
        setDisplayedText(profileDetails.description.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [profileDetails?.description]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * 0.2
    const y = (e.clientY - (top + height / 2)) * 0.2
    setImgPos({ x, y })
  }

  const handleMouseLeave = () => {
    setImgPos({ x: 0, y: 0 })
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center pt-10 pb-4 px-5 md:px-20 bg-white relative"
    >
      {/* Image + Text Overlay Container */}
      <div className="relative flex flex-col items-center animate-fade-up mt-6 md:mt-10">
        {/* Doodle Illustration */}
        <img 
          src={heroImg} 
          alt="Sketch illustration of Ranjeet Verma" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `translate(${imgPos.x}px, ${Math.min(imgPos.y, 0)}px)` }}
          className="max-h-[55vh] w-auto object-contain select-none transition-transform duration-75 ease-out origin-bottom hover:scale-105"
        />

        {/* Heading - shifted slightly upwards for a balanced overlap */}
        <div className="text-center -mt-4 md:-mt-6 relative z-10 animate-fade-up flex flex-col items-center" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-5xl md:text-[60px] font-mondwest text-[#111111] leading-none tracking-tight">
            Simplicity
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-[50px] text-[#111111] leading-none -mt-1 md:-mt-3 flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3">
            <span className="font-serif italic font-normal tracking-wide">{profileDetails.subtitle.split(' ')[0]} {profileDetails.subtitle.split(' ')[1]}</span>
            <span className="font-mondwest tracking-tight">{profileDetails.subtitle.split(' ').slice(2).join(' ')}</span>
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <p 
        className="max-w-lg text-center text-gray-500 text-sm md:text-[17px] leading-relaxed mt-5 mb-8 animate-fade-up min-h-[60px]" 
        style={{ animationDelay: '0.4s' }}
      >
        {displayedText}
        <span className={`inline-block w-[2px] h-4 ml-1 align-middle bg-gray-400 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
      </p>

      {/* Buttons */}
      <div 
        className="flex items-center justify-center gap-4 animate-fade-up" 
        style={{ animationDelay: '0.6s' }}
      >
        <a 
          href="#projects" 
          className="bg-[#1C1C1C] text-white text-[13px] md:text-[14px] font-medium tracking-wide px-8 py-3.5 rounded-2xl hover:bg-black hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
        >
          EXPLOR WORK
        </a>
        <a 
          href={profileDetails.resumeLink} 
          download={profileDetails.resumeLink !== '#' ? 'Resume.pdf' : undefined}
          className="bg-[#F2F2F2] text-[#1C1C1C] text-[13px] md:text-[14px] font-medium tracking-wide px-8 py-3.5 rounded-2xl hover:bg-[#E5E5E5] transition-all duration-300 active:scale-[0.97]"
        >
          RESUME
        </a>
      </div>
    </section>
  )
}
