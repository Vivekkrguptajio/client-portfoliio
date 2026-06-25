import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PortfolioContext } from '../context/PortfolioContext'

export default function LatestWork() {
  const navigate = useNavigate();
  const { projects } = useContext(PortfolioContext);
  
  const works = projects.slice(0, 3);

  return (
    <section id="latest-work" className="w-full bg-black text-white py-20 md:py-32 px-4 md:px-16 transition-colors duration-1000">
      <div className="w-full flex flex-col gap-12">
        {/* Section Header */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-neuebit uppercase tracking-wide text-white">
            LATEST WORK
          </h2>
        </motion.div>

        {/* Cards Container */}
        <div className="flex flex-col gap-10">
          {works.map((work, index) => (
            <motion.div 
              key={work._id || work.id}
              onClick={() => navigate(`/work/${work._id || work.id}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full flex flex-col md:flex-row bg-[#0f0f0f] border border-[#1a1a1a] rounded-[32px] overflow-hidden cursor-pointer group hover:border-[#333] transition-colors duration-500"
            >
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-[300px] md:h-[450px] lg:h-[500px] p-4 md:p-6 lg:p-8">
                <div className="w-full h-full rounded-[24px] overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8 lg:py-12 lg:px-12">
                <div className="flex flex-col gap-6">
                  <motion.h3 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-mondwest tracking-normal text-white"
                  >
                    {work.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-gray-400 text-base md:text-lg leading-relaxed font-sans"
                  >
                    {work.description}
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-12 mt-8 md:mt-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-sans">Location</span>
                    <span className="font-neuebit text-xl md:text-2xl uppercase tracking-wider text-white">{work.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-sans">Industry</span>
                    <span className="font-neuebit text-xl md:text-2xl uppercase tracking-wider text-white">{work.industry}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Portfolio Button */}
        <div className="w-full flex justify-center mt-8 md:mt-16">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/work')}
            className="h-[44px] flex items-center justify-center bg-[#1C1C1C] text-white text-[13px] md:text-[14px] font-medium tracking-wide px-6 rounded-xl hover:bg-black hover:shadow-lg transition-all duration-300 active:scale-[0.97] uppercase"
          >
            View My Work
          </motion.button>
        </div>
      </div>
    </section>
  )
}

