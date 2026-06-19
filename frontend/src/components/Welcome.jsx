export default function Welcome() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 px-5 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
            Welcome to my creative journey!
          </h3>
        </div>
        <div>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            I'm a passionate UX/UI designer, currently shaping my skills through a transformative journey at <span className="font-bold text-gray-900">NIFT</span>. With a passion for creative, intuitive, and engaging user experiences, I craft solutions to solve real-world design challenges.
          </p>
        </div>
      </div>
    </section>
  )
}
