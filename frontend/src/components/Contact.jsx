import { useState, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import contactImg from '../assets/Contactimg.gif'

export default function Contact() {
  const { profileDetails } = useContext(PortfolioContext)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle submission
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="w-full bg-white text-black py-16 md:py-28 relative overflow-hidden">
      <div className="max-w-[1050px] mx-auto px-6 relative">
        
        {/* Main Content Block (Offset for Desktop GIF) */}
        <div className="md:pl-[260px] relative z-20">
          
          {/* Title */}
          <div className="mb-14">
            <h2 className="text-[2.5rem] md:text-[4rem] font-mondwest text-gray-900 leading-none tracking-wide">
              Let's talk for<br/>
              <span className="italic">Something special</span>
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Name :</label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-900 focus:border-black bg-transparent py-1 outline-none transition-colors text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Email ID :</label>
                <input 
                  type="email" 
                  className="w-full border-b border-gray-900 focus:border-black bg-transparent py-1 outline-none transition-colors text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Phone No :</label>
                <input 
                  type="tel" 
                  className="w-full border-b border-gray-900 focus:border-black bg-transparent py-1 outline-none transition-colors text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-2">Message :</label>
              <textarea 
                rows="1"
                className="w-full border-b border-gray-900 focus:border-black bg-transparent py-1 outline-none transition-colors resize-none overflow-hidden text-sm"
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  e.target.style.height = 'auto';
                  e.target.style.height = (e.target.scrollHeight) + 'px';
                }}
              />
            </div>

          </form>

          {/* Footer Area aligned with Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 items-end pb-4">
            
            {/* Credits Info */}
            <div className="text-left">
              <h4 className="text-base font-bold text-gray-900">{profileDetails.firstName} {profileDetails.lastName}</h4>
              <p className="text-[12px] font-bold text-gray-900 mt-1">{profileDetails.location}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                WEBSITE 2026 - DESIGN BY RANJEET
              </p>
            </div>

            {/* Reach out */}
            <div className="flex items-center justify-start md:justify-end gap-3">
              <span className="text-[9px] font-bold text-gray-900 uppercase tracking-widest leading-[1.4] text-right">
                REACH OUT TO ME<br/>OVER HERE AT :
              </span>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a href={profileDetails?.socialLinks?.instagram || '#'} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </a>
                
                {/* Twitter / X */}
                <a href={profileDetails?.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href={profileDetails?.socialLinks?.linkedin || '#'} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-700 hover:text-white text-gray-600 transition-all duration-300 shadow-sm">
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Desktop GIF (absolute to the left) */}
        <div className="hidden md:block absolute bottom-0 left-0 w-[240px] z-10">
          <img src={contactImg} alt="Contact Hiiii" className="w-full h-auto object-contain" />
        </div>
        
        {/* Mobile GIF */}
        <div className="md:hidden mt-12 w-48 -ml-2 relative z-10">
          <img src={contactImg} alt="Contact Hiiii" className="w-full h-auto object-contain" />
        </div>

      </div>
    </section>
  )
}
