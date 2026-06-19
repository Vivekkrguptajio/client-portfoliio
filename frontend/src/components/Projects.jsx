export default function Projects() {
  return (
    <section id="projects" className="w-full bg-white text-black py-16 md:py-28 px-5 md:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="font-light">Featured </span>
            <span className="font-bold">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base md:text-lg max-w-xl">
            A curated selection of design work spanning brand identity, digital interfaces, and interactive experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Project 1 - Sattuz */}
          <div className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-amber-50 to-orange-100 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="w-10/12 h-4/5 bg-white rounded-xl shadow-md p-5 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 flex flex-col justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs">S</div>
                  <span className="text-sm font-bold text-gray-800">Sattuz</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <div className="w-full h-3 bg-amber-50 rounded"></div>
                  <div className="w-3/4 h-3 bg-amber-50 rounded"></div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="h-12 bg-amber-100/50 rounded"></div>
                    <div className="h-12 bg-amber-100/50 rounded"></div>
                    <div className="h-12 bg-amber-100/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Brand Identity</span>
              <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-amber-700 transition-colors">Sattuz — Organic Brand Voice</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">Designing a brand identity that embodies the earthy, organic essence of traditional sattu-based nutrition for modern consumers.</p>
            </div>
          </div>

          {/* Project 2 - GutNut */}
          <div className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-green-50 to-emerald-100 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="w-10/12 h-4/5 bg-white rounded-xl shadow-md p-5 transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 flex flex-col justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xs">G</div>
                  <span className="text-sm font-bold text-gray-800">GutNut</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <div className="w-full h-3 bg-green-50 rounded"></div>
                  <div className="w-2/3 h-3 bg-green-50 rounded"></div>
                  <div className="h-16 bg-green-100/50 rounded mt-2"></div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-green-100 text-green-700 rounded-full">Brand Design</span>
              <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-green-700 transition-colors">GutNut — Health & Wellness</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">Crafting a playful yet trustworthy brand identity for a gut-health nutrition brand, emphasizing natural ingredients and well-being.</p>
            </div>
          </div>

          {/* Project 3 - Denotation Design */}
          <div className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-50 to-gray-200 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="w-10/12 h-4/5 bg-neutral-900 rounded-xl shadow-md p-5 transform group-hover:scale-105 transition-all duration-500 flex flex-col justify-between border border-neutral-800 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-neutral-400">DENOTATION</span>
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="space-y-2 mt-auto">
                  <div className="w-full h-3 bg-neutral-800 rounded"></div>
                  <div className="w-1/2 h-3 bg-neutral-800 rounded"></div>
                  <div className="h-6 bg-white/10 rounded mt-2 border border-white/20"></div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-gray-200 text-gray-700 rounded-full">Interior Identity</span>
              <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-gray-600 transition-colors">Denotation Design — Interior Identity</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">Shaping a sophisticated visual identity for an interior design studio, blending minimalism with spatial awareness in every touchpoint.</p>
            </div>
          </div>

          {/* Project 4 - Heritage for Children */}
          <div className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-rose-50 to-purple-100 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="w-10/12 h-4/5 bg-white rounded-xl shadow-md p-5 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 flex flex-col justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-200 flex items-center justify-center text-purple-800 font-bold text-xs">H</div>
                  <span className="text-sm font-bold text-gray-800">Heritage</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-14 bg-purple-50 rounded"></div>
                    <div className="h-14 bg-rose-50 rounded"></div>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Interactive Experience</span>
              <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-purple-700 transition-colors">Heritage for Children</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">Bringing history alive through interactive design — making cultural heritage accessible and engaging for young minds through playful interfaces.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
