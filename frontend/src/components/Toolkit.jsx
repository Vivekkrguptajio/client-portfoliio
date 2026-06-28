import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import { motion } from 'framer-motion'

export default function Toolkit() {
  const { designTools } = useContext(PortfolioContext)

  // Only apply infinite scroll if we have enough tools to fill the screen
  const isMarquee = designTools.length > 5;
  const toolsToShow = isMarquee 
    ? [...designTools, ...designTools, ...designTools, ...designTools] 
    : designTools;

  return (
    <section className="w-full bg-white py-28 my-12 overflow-hidden border-t border-gray-100">
      <motion.div 
        className="max-w-6xl mx-auto px-5 md:px-20 mb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-neuebit text-gray-900 tracking-wide">
          <span className="text-gray-700">My Design </span>
          <span>Toolkit</span>
        </h2>
      </motion.div>

      <motion.div 
        className="relative flex w-full overflow-hidden group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Marquee Wrapper */}
        <div className={`flex w-max gap-6 md:gap-8 px-4 ${isMarquee ? 'animate-marquee' : 'animate-marquee-viewport'}`}>
          {toolsToShow.map((tool, index) => (
            <div 
              key={`${tool.id || tool._id}-${index}`} 
              className={`flex-shrink-0 flex flex-col w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border items-center justify-center cursor-default ${tool.bg || ''} ${tool.border || ''}`}
              style={{
                backgroundColor: tool.color ? `${tool.color}0D` : undefined, // 5% opacity
                borderColor: tool.color ? `${tool.color}33` : undefined, // 20% opacity
              }}
            >
              <img src={tool.icon} alt={tool.name} className="w-12 h-12 md:w-16 md:h-16 mb-4 object-contain drop-shadow-sm" />
              <span 
                 className={`font-semibold text-base md:text-lg tracking-wide ${tool.text || ''}`}
                 style={{ color: tool.color || undefined }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
