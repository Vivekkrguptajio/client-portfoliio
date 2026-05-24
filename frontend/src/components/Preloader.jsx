import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [fadeExit, setFadeExit] = useState(false)
  
  // Cache-bust so browser re-downloads GIF on every refresh (replays from frame 1)
  const [gifSrc] = useState(() => `/preloader/Preloader.gif?t=${Date.now()}`)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setFadeExit(true)
      const removeTimer = setTimeout(() => {
        document.body.style.overflow = ''
        onComplete()
      }, 1000) // 1 second smooth fade out
      return () => clearTimeout(removeTimer)
    }, 7000) // full GIF loop — 7 seconds to let the entire animation play

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out ${
        fadeExit ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img 
        src={gifSrc} 
        alt="" 
        className={`w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] object-contain select-none transition-transform duration-1000 ease-in-out ${
          fadeExit ? 'scale-95' : 'scale-100'
        }`}
      />
    </div>
  )
}
