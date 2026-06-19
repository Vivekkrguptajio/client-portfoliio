export default function Toolkit() {
  // Repeating the tools to create a seamless infinite marquee effect
  const tools = [
    { id: 1, type: 'triangle' },
    { id: 2, type: 'triangle' },
    { id: 3, type: 'triangle' },
    { id: 4, type: 'triangle' },
    { id: 5, type: 'triangle' },
    { id: 6, type: 'circle' },
    { id: 7, type: 'triangle' },
  ]

  // Double the array for the infinite scroll trick
  const infiniteTools = [...tools, ...tools, ...tools, ...tools]

  return (
    <section className="w-full bg-white py-12 overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 md:px-20 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          My Design Toolkit
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Marquee Wrapper */}
        <div className="flex w-[200%] animate-marquee gap-6 px-3">
          {infiniteTools.map((tool, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-default"
            >
              {tool.type === 'circle' ? (
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full shadow-inner"></div>
              ) : (
                <div 
                  className="w-0 h-0 
                  border-l-[16px] border-l-transparent 
                  border-b-[28px] border-b-gray-200 
                  border-r-[16px] border-r-transparent 
                  md:border-l-[24px] md:border-b-[40px] md:border-r-[24px]"
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
