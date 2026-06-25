import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import { PortfolioContext } from '../context/PortfolioContext'

export default function Work() {
  const { projects, workPageDetails } = useContext(PortfolioContext)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Handle scroll for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Reusing existing Navbar, passing required props */}
      <Navbar scrolled={scrolled} activeSection="work" isDarkTheme={false} loading={false} />

      {/* Hero Intro Section */}
      <section className="pt-[20vh] px-6 md:px-[5vw] max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-[3vw] font-mondwest font-medium leading-tight text-[#111111] tracking-tight">
              {workPageDetails?.title || 'Work'}
            </h1>
          </div>
          <div className="w-full md:w-1/3 flex md:justify-end mt-4 md:mt-0">
            <p className="text-sm md:text-[1vw] text-gray-500 leading-relaxed font-sans">
              {workPageDetails?.description || ''}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="mt-[10vw] md:mt-[8vw] px-6 md:px-[5vw] pb-[10vw] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-[1.5vw] gap-y-16 md:gap-y-[5vw]">
          {projects.map((project, index) => (
            <motion.div 
              onClick={() => navigate(`/work/${project._id || project.id}`)}
              key={project._id || project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.2 }}
              className="flex flex-col w-full group cursor-pointer"
            >
              {/* Image Container with Tags */}
              <div className="w-full h-[60vw] md:h-[30vw] relative rounded-xl md:rounded-[0.5vw] overflow-hidden bg-gray-100">
                {/* Floating Tags */}
                <div className="absolute top-[1vw] left-[1vw] md:top-auto md:bottom-[1vw] flex flex-wrap items-end gap-2 md:gap-[0.5vw] z-10 p-4 md:p-0">
                  {(Array.isArray(project.tags) ? project.tags : []).map(tag => (
                    <span 
                      key={tag} 
                      className="rounded-lg md:rounded-[0.5vw] bg-white/90 px-3 py-1.5 md:px-[1vw] md:py-[0.4vw] text-xs md:text-[0.8vw] font-medium backdrop-blur-md shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Title & Details */}
              <div className="mt-4 md:mt-[1.5vw] flex justify-between items-start">
                <h3 className="font-mondwest text-2xl md:text-[2vw] text-[#111111] leading-none">
                  {project.title}
                </h3>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[10px] md:text-[0.8vw] text-gray-400 uppercase tracking-widest mb-1">
                    Location:
                  </span>
                  <span className="text-xs md:text-[0.9vw] text-[#111111] uppercase font-semibold tracking-wide">
                    {project.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  )
}
