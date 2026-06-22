import { motion } from 'framer-motion'

export default function Approach() {
  const icons = [
    // Heart
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="heart">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>,
    // X
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="x">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>,
    // Coffee Cup
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="coffee">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>,
    // Expand/Star
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="expand">
      <polyline points="15 3 21 3 21 9"></polyline>
      <polyline points="9 21 3 21 3 15"></polyline>
      <line x1="21" y1="3" x2="14" y2="10"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>,
    // Home
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" key="home">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ]

  return (
    <section id="approach" className="w-full bg-white text-black py-20 md:py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20">
        
        {/* Left Side: Small Title */}
        <div className="w-full md:w-1/4">
          <p className="text-gray-400 text-xs md:text-sm font-neuebit font-semibold tracking-normal uppercase">
            OUR APPROACH AND VALUES
          </p>
        </div>

        {/* Right Side: Main Text */}
        <div className="w-full md:w-3/4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-[56px] leading-[1.2] font-neuebit font-medium tracking-tight"
          >
            <span className="text-[#111111]">We combine creativity, strategic ideas and technology </span>
            <span className="text-gray-400">to create bespoke solutions that drive your success.</span>
          </motion.h2>

          {/* Icons Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-6 mt-20 md:mt-32"
          >
            {icons.map((icon, index) => (
              <div key={index} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                {icon}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
