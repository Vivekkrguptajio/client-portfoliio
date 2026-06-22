import { motion } from 'framer-motion'

export default function Approach() {
  const icons = [
    { src: "/logo/Frame 1.svg", text: "love what we do" },
    { src: "/logo/Frame 2.svg", text: "roots to visuals" },
    { src: "/logo/Frame 3.svg", text: "calm process" },
    { src: "/logo/Frame 4.svg", text: "effeiceny first" },
    { src: "/logo/Frame 5.svg", text: "creative minds" },
    { src: "/logo/Frame 6.svg", text: "fueled by curiosity" }
  ];

  return (
    <section id="approach" className="w-full bg-white text-black py-20 md:py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-32">
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Left Side: Small Title */}
          <div className="w-full md:w-1/4">
            <p className="text-gray-400 text-base md:text-lg font-neuebit font-semibold tracking-normal uppercase">
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
              className="text-4xl md:text-6xl lg:text-[72px] leading-[1.1] font-neuebit font-medium tracking-tight"
            >
              <span className="text-[#111111]">
                We combine creativity, strategic ideas <br className="hidden lg:block" />
                and technology{" "}
              </span>
              <span className="text-gray-400">
                to create bespoke <br className="hidden lg:block" />
                solutions that drive your success.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* SVG Icons Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-wrap items-center justify-between gap-6"
        >
          {icons.map((item, index) => (
            <div key={index} className="relative group opacity-80 hover:opacity-100 transition-opacity duration-300 w-24 h-24 flex items-center justify-center">
              
              {/* Tooltip */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 text-sm font-medium text-black opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 translate-y-2 group-hover:translate-y-0">
                {item.text}
              </div>

              <img src={item.src} alt={item.text} className="w-full h-full object-contain" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
