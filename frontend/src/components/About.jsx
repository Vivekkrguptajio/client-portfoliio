import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import aboutImg from '../assets/about.png'

export default function About() {
  const { aboutParagraphs } = useContext(PortfolioContext)


  return (
    <>
      <section id="about" className="w-full bg-white text-black py-16 md:py-28 px-5 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Profile Sketch Image */}
          <div className="relative w-full flex justify-center md:justify-start">
            <img 
              src={aboutImg} 
              alt="Sketch illustration of Ranjeet Verma" 
              className="w-full max-w-lg md:max-w-xl h-auto object-contain rotate-180 md:scale-[1.1] origin-center"
            />
          </div>

          {/* Right: About Text */}
          <div className="w-full md:ml-5 lg:ml-10">
            <h2 className="text-6xl md:text-7xl font-neuebit tracking-wide mb-10">
              <span className="text-gray-700">About </span>
              <span>Me</span>
            </h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              {aboutParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
