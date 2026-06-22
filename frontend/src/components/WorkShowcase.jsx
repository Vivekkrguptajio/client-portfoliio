import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import wordGif from '../assets/word.gif'

export default function WorkShowcase() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Scale stops before taking over the full screen (around the navbar edge)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.8])
  
  // Image zooms inside the box while the box grows
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Border radius reduces slightly but stays rounded at max scale
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["30px", "16px"])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, borderRadius }} 
          className="aspect-video w-[80vw] md:w-[640px] overflow-hidden flex items-center justify-center shadow-2xl bg-black"
        >
          <motion.img 
            style={{ scale: imageScale }}
            src={wordGif} 
            alt="Work Showcase" 
            className="w-full h-full object-cover" 
          />
        </motion.div>
      </div>
    </section>
  )
}
