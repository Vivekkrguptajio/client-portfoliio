import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import aboutImg from '../assets/about.png'
import { motion } from 'framer-motion'

export default function About() {
  const { aboutParagraphs } = useContext(PortfolioContext)

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }


  return (
    <>
      <section id="about" className="w-full bg-white text-black py-16 md:py-28 px-5 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Profile Sketch Image */}
          <motion.div 
            className="relative w-full flex justify-center md:justify-start"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <img 
              src={aboutImg} 
              alt="Sketch illustration of Ranjeet Verma" 
              className="w-full max-w-[475px] h-auto object-contain rotate-180 origin-center mx-auto md:mx-0"
            />
          </motion.div>

          {/* Right: About Text */}
          <motion.div 
            className="w-full md:ml-5 lg:ml-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[32px] font-mondwest text-black leading-none">About Us</h2>
            </div>
            
            <div className="space-y-6 text-[#4A4A4A] text-[16px] font-sans leading-relaxed tracking-wide">
              {aboutParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
