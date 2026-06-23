import { useState, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import heroImg from '../assets/hero.png'
import { motion } from 'framer-motion'

export default function Hero({ startAnimation }) {
  const { profileDetails } = useContext(PortfolioContext)
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * 0.08
    const y = (e.clientY - (top + height / 2)) * 0.08
    setImgPos({ x, y })
  }

  const handleMouseLeave = () => {
    setImgPos({ x: 0, y: 0 })
  }

  // Framer Motion Variants for Blur Reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Much faster letter appearance for heading
        delayChildren: 0.05
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.375, ease: "easeOut" }
    }
  }

  // Custom variant for paragraph to stagger letters perfectly while keeping word wrap
  const paragraphCharVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 15 },
    visible: (i) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { 
        duration: 0.375, 
        ease: "easeOut",
        delay: 0.375 + (i * 0.0125) // Much shorter delay for paragraph letters
      }
    })
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center pt-10 pb-4 px-5 md:px-20 bg-white relative"
    >
      {/* Image + Text Overlay Container */}
      <div className={`relative flex flex-col items-center mt-6 md:mt-10 ${startAnimation ? 'animate-fade-up' : 'opacity-0'}`}>
        {/* Doodle Illustration */}
        <img 
          src={heroImg} 
          alt="Sketch illustration of Ranjeet Verma" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `translate(${imgPos.x}px, ${Math.min(imgPos.y, 0)}px)` }}
          className="max-h-[55vh] w-auto object-contain select-none transition-transform duration-75 ease-out origin-bottom"
        />

        {/* Heading - Blur Reveal Letter by Letter */}
        <motion.div 
          className="text-center -mt-4 md:-mt-6 relative z-10 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
        >
          <h1 className="text-5xl sm:text-6xl md:text-[80px] font-mondwest text-[#111111] leading-none tracking-normal flex justify-center">
            {"Simplicity".split("").map((letter, i) => (
              <motion.span key={`h1-${i}`} variants={wordVariants}>{letter}</motion.span>
            ))}
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-[56px] text-[#111111] leading-none -mt-1 md:-mt-3 flex flex-wrap items-center justify-center">
            <div className="flex mr-1 md:mr-2 font-caslon italic font-normal tracking-wide">
              {profileDetails?.subtitle?.split(' ').slice(0, 2).join(' ').split('').map((char, i) => (
                <motion.span key={`sub1-${i}`} variants={wordVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
            <div className="flex font-mondwest tracking-tight">
              {profileDetails?.subtitle?.split(' ').slice(2).join(' ').split('').map((char, i) => (
                <motion.span key={`sub2-${i}`} variants={wordVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </h2>
        </motion.div>
      </div>

      {/* Subtitle Paragraph - Blur Reveal Letter by Letter (With Word Wrapping Preserved) */}
      <p className="max-w-md text-center text-[#4A4A4A] text-sm md:text-[14px] leading-relaxed mt-[10px] mb-0 font-sans mx-auto">
        {(() => {
          let charIndex = 0;
          return profileDetails?.description?.split(' ').map((word, wIndex) => (
            <span key={`word-${wIndex}`} className="inline-block mr-[0.25em]">
              {word.split('').map((char) => (
                <motion.span 
                  key={`char-${charIndex}`} 
                  custom={charIndex++}
                  variants={paragraphCharVariants}
                  initial="hidden"
                  animate={startAnimation ? "visible" : "hidden"}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))
        })()}
      </p>

      {/* Buttons */}
      <div 
        className={`flex items-center justify-center gap-4 mt-[24px] ${startAnimation ? 'animate-fade-up' : 'opacity-0'}`} 
        style={{ animationDelay: '0.8s' }}
      >
        <a 
          href="#about" 
          className="h-[44px] flex items-center justify-center bg-[#1C1C1C] text-white text-[13px] md:text-[14px] font-medium tracking-wide px-4 rounded-xl hover:bg-black hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
        >
          EXPLOR WORK
        </a>
        <a 
          href={profileDetails?.resumeLink} 
          download={profileDetails?.resumeLink !== '#' ? 'Resume.pdf' : undefined}
          className="h-[44px] flex items-center justify-center bg-[#F2F2F2] text-[#1C1C1C] text-[13px] md:text-[14px] font-medium tracking-wide px-4 rounded-xl hover:bg-[#E5E5E5] transition-all duration-300 active:scale-[0.97]"
        >
          RESUME
        </a>
      </div>
    </section>
  )
}
