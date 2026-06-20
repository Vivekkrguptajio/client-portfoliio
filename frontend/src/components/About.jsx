import aboutImg from '../assets/about.png'

export default function About() {
  const aboutParagraphs = [
    "I'm not here just to design — I'm here to translate ideas into experiences.",
    "I'm Ranjeet Verma, a designer who moves between craft and code, culture and minimalism, logic and emotion.",
    "My work lives at the intersection of stories and systems — where a product can carry heritage, and an interface can feel like a conversation.",
    "From giving an organic voice to brand identities, to shaping interior identities, and bringing history alive through interactive heritage projects, every project I touch is an experiment in meaning.",
    "I don't design to impress — I design to connect. To make someone pause, feel, or remember.",
  ]

  return (
    <>
      <section id="about" className="w-full bg-white text-black py-16 md:py-28 px-5 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Profile Sketch Image */}
          <div className="relative w-full flex justify-center md:justify-start">
            <img 
              src={aboutImg} 
              alt="Sketch illustration of Ranjeet Verma" 
              className="w-full max-w-lg md:max-w-xl h-auto object-contain scale-x-[-1] md:scale-x-[-1.1] md:scale-y-[1.1] origin-center"
            />
          </div>

          {/* Right: About Text */}
          <div className="w-full md:ml-5 lg:ml-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-10">
              <span className="font-light">About </span>
              <span className="font-bold">Me</span>
            </h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              {aboutParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
