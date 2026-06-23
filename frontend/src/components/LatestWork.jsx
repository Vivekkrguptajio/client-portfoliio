import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function LatestWork() {
  const navigate = useNavigate();
  const works = [
    {
      id: 1,
      title: "Duo Nutrition",
      description: "DUO NUTRITION is a brand that redefines pet food as a celebration of the equal, unspoken partnership between humans and their dogs. Our challenge was to translate philosophy into a logo that captures the essence of togetherness. The solution lies in the submark: a simple yet powerful oval, split evenly down the middle. This design embodies the concept of a duet: two distinct halves, balanced and complementary, coming together to form a unified whole.",
      location: "RUSSIA",
      industry: "PETS",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Indió White",
      description: "A serene and refined space shaped by light, texture, and architectural clarity. Each project is a dialogue between structure and softness, where elegance meets a lived experience. We crafted an identity that reflects their minimalist yet warm approach to interior design.",
      location: "CARLSBAD, CA",
      industry: "INTERIOR DESIGN",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Nymph Beauty",
      description: "Nymph is a clean beauty brand focusing on natural ingredients and sustainable packaging. The branding needed to feel organic, luxurious, and grounded. We developed a visual system that utilizes earthy tones, elegant typography, and a minimalist aesthetic to convey purity and sophistication.",
      location: "NEW YORK",
      industry: "BEAUTY & WELLNESS",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    }
  ];

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
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full flex flex-col md:flex-row bg-[#0a0a0a] rounded-[32px] overflow-hidden"
            >
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-[250px] md:h-[380px] p-4 md:p-6">
                <div className="w-full h-full rounded-[24px] overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:px-12">
                <div className="flex flex-col gap-4">
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
                    className="text-gray-400 text-sm md:text-base leading-relaxed font-sans"
                  >
                    {work.description}
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-12 mt-8 md:mt-12"
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

