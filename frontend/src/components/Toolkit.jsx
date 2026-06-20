export default function Toolkit() {
  const designTools = [
    { id: 1, name: 'Figma', bg: 'bg-[#F24E1E]/5', text: 'text-[#F24E1E]', border: 'border-[#F24E1E]/20', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { id: 2, name: 'Webflow', bg: 'bg-[#4353FF]/5', text: 'text-[#4353FF]', border: 'border-[#4353FF]/20', icon: 'https://cdn.simpleicons.org/webflow/4353FF' },
    { id: 3, name: 'Adobe XD', bg: 'bg-[#FF61F6]/5', text: 'text-[#FF61F6]', border: 'border-[#FF61F6]/20', icon: 'https://cdn.simpleicons.org/adobexd/FF61F6' },
    { id: 4, name: 'Notion', bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-200', icon: 'https://cdn.simpleicons.org/notion/111111' },
    { id: 5, name: 'Illustrator', bg: 'bg-[#FF9A00]/5', text: 'text-[#FF9A00]', border: 'border-[#FF9A00]/20', icon: 'https://cdn.simpleicons.org/adobeillustrator/FF9A00' },
    { id: 6, name: 'Photoshop', bg: 'bg-[#31A8FF]/5', text: 'text-[#31A8FF]', border: 'border-[#31A8FF]/20', icon: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF' },
    { id: 7, name: 'Framer', bg: 'bg-[#0055FF]/5', text: 'text-[#0055FF]', border: 'border-[#0055FF]/20', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
    { id: 8, name: 'Spline', bg: 'bg-[#FF00C7]/5', text: 'text-[#FF00C7]', border: 'border-[#FF00C7]/20', icon: 'https://cdn.simpleicons.org/spline/FF00C7' },
    { id: 9, name: 'Miro', bg: 'bg-[#FFD02F]/10', text: 'text-[#e5b810]', border: 'border-[#FFD02F]/30', icon: 'https://cdn.simpleicons.org/miro/e5b810' },
  ]

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
              className={`flex-shrink-0 flex flex-col w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-default ${tool.bg} ${tool.border}`}
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
