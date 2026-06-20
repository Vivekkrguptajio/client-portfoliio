import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 4000)
    }
  }

  return (
    <section id="contact" className="w-full bg-white text-black py-16 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Left: Contact Info + Social */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-light">Get in </span>
            <span className="font-bold">Touch</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Have a project idea, a design challenge, or just want to say hi? I'm always open to new conversations and collaborations.
          </p>

          {/* Social / Contact Links */}
          <div className="space-y-5">
            
            {/* Email */}
            <a href="mailto:ranjeetkumar.verma@nift.alumni.in" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
              </div>
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">ranjeetkumar.verma@nift.alumni.in</span>
            </a>

            {/* Phone */}
            <a href="tel:+916205508988" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"/></svg>
              </div>
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">+91 6205508988</span>
            </a>

            {/* Socials Row */}
            <div className="flex items-center gap-4 pt-4">
              {/* Behance */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-600 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 576 512" fill="currentColor"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white text-gray-600 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/ranjeet-kumar-verma-66a866278/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-700 hover:text-white text-gray-600 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 text-sm transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 text-sm transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">Message</label>
              <textarea 
                id="message" 
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/20 text-sm transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 animate-scale-in">
                <span>✓</span>
                Thank you! Ranjeet will get back to you shortly.
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold tracking-wider text-xs uppercase py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform active:scale-[0.98]"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
