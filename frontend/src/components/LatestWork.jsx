import React from 'react'
import { motion } from 'framer-motion'

export default function LatestWork() {
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
    <section className="w-full bg-white text-black py-20 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="w-full">
          <p className="text-gray-400 text-sm md:text-base font-neuebit font-semibold tracking-normal uppercase">
            LATEST WORK
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col gap-10">
          {works.map((work, index) => (
            <motion.div 
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full flex flex-col md:flex-row bg-[#F8F8F8] rounded-[32px] overflow-hidden"
            >
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-[350px] md:h-[550px] p-3 md:p-6">
                <div className="w-full h-full rounded-[24px] overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:px-24">
                <div className="flex flex-col gap-6">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                    {work.title}
                  </h3>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                    {work.description}
                  </p>
                </div>

                <div className="flex items-center gap-16 mt-12 md:mt-20">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-sm">Location</span>
                    <span className="font-medium text-sm md:text-base uppercase tracking-wide">{work.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-sm">Industry</span>
                    <span className="font-medium text-sm md:text-base uppercase tracking-wide">{work.industry}</span>
                  </div>
                </div>
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
            className="bg-[#B0B0B0] hover:bg-[#9E9E9E] text-black text-lg md:text-xl font-medium px-10 py-5 rounded-[16px] transition-colors duration-300"
          >
            View My Work
          </motion.button>
        </div>
      </div>
    </section>
  )
}
