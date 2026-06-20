import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import heroImg from '../assets/hero.png'

export default function Hero() {
  const { profileDetails } = useContext(PortfolioContext)
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center pt-10 pb-4 px-5 md:px-20 bg-white relative"
    >
      {/* Image + Text Overlay Container */}
      <div className="relative flex flex-col items-center animate-fade-up">
        {/* Doodle Illustration */}
        <img 
          src={heroImg} 
          alt="Sketch illustration of Ranjeet Verma" 
          className="max-h-[55vh] w-auto object-contain select-none animate-float"
        />

        {/* Heading - overlaps bottom of image */}
        <div className="text-center -mt-8 md:-mt-12 relative z-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-mondwest text-gray-900 leading-tight tracking-tight">
            Simplicity
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-mondwest text-gray-900 leading-tight tracking-tight mt-1">
            <span className="font-light italic">{profileDetails.subtitle.split(' ')[0]} {profileDetails.subtitle.split(' ')[1]}</span>{' '}
            <span className="font-bold">{profileDetails.subtitle.split(' ').slice(2).join(' ')}</span>
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <p 
        className="max-w-lg text-center text-gray-500 text-sm md:text-base leading-relaxed mt-4 mb-6 animate-fade-up" 
        style={{ animationDelay: '0.4s' }}
      >
        {profileDetails.description}
      </p>

      {/* Buttons */}
      <div 
        className="flex items-center gap-4 animate-fade-up" 
        style={{ animationDelay: '0.6s' }}
      >
        <a 
          href="#projects" 
          className="bg-gray-900 text-white text-xs font-semibold tracking-[0.15em] uppercase px-7 py-4 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
        >
          EXPLORE WORK
        </a>
        <a 
          href={profileDetails.resumeLink} 
          download={profileDetails.resumeLink !== '#' ? 'Resume.pdf' : undefined}
          className="border border-gray-300 text-gray-700 text-xs font-semibold tracking-[0.15em] uppercase px-7 py-4 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all duration-300 active:scale-[0.97]"
        >
          RESUME
        </a>
      </div>
    </section>
  )
}
