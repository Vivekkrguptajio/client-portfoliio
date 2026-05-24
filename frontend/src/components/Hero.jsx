import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-5 md:px-20 bg-white relative"
    >
      {/* Doodle Illustration */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-4 animate-fade-up">
        <img 
          src="/profile_sketch.png" 
          alt="Sketch illustration of Ranjeet Verma" 
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Name + Title */}
      <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-handwriting text-3xl md:text-4xl text-purple-800 tracking-wide font-bold">
          Ranjeet Verma
        </h2>
        <h1 className="font-handwriting text-5xl md:text-6xl text-purple-800 font-extrabold mt-1">
          Ux/Ui Designer
        </h1>
      </div>

      {/* Typewriter Animation */}
      <div className="max-w-2xl text-center min-h-[80px] flex items-center justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <TypeAnimation
          sequence={[
            "I'm not here just to design — I'm here to translate ideas into experiences.",
            2000,
            "My work lives at the intersection of stories and systems.",
            2000,
            "I don't design to impress — I design to connect.",
            2000,
          ]}
          wrapper="p"
          speed={40}
          className="text-gray-600 text-base md:text-lg leading-relaxed italic"
          repeat={Infinity}
        />
      </div>

      {/* Decorative wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-6 md:h-10 overflow-hidden">
        <svg viewBox="0 0 1200 40" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,20 Q300,40 600,20 Q900,0 1200,20 L1200,40 L0,40 Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  )
}
