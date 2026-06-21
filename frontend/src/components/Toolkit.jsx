import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

export default function Toolkit() {
  const { designTools } = useContext(PortfolioContext)

  // Double the array for the infinite scroll trick
  const infiniteTools = [...designTools, ...designTools, ...designTools, ...designTools]

  return (
    <section className="w-full bg-white py-16 overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 md:px-20 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          <span className="font-light">My Design </span>
          <span>Toolkit</span>
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden group">
        {/* Marquee Wrapper */}
        <div className="flex w-max animate-marquee gap-6 md:gap-8 px-4">
          {infiniteTools.map((tool, index) => (
            <div 
              key={`${tool.id}-${index}`} 
              className={`flex-shrink-0 flex flex-col w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border items-center justify-center cursor-default ${tool.bg} ${tool.border}`}
            >
              <img src={tool.icon} alt={tool.name} className="w-12 h-12 md:w-16 md:h-16 mb-4 object-contain drop-shadow-sm" />
              <span className={`font-semibold text-base md:text-lg tracking-wide ${tool.text}`}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
