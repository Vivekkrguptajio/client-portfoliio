export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold text-lg tracking-tight">
              Ranjeet Verma.
            </span>
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-semibold uppercase tracking-wider hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {['Behance', 'Instagram', 'LinkedIn'].map((social) => (
              <a 
                key={social} 
                href={social === 'LinkedIn' ? 'https://www.linkedin.com/in/ranjeet-kumar-verma-66a866278/' : '#'} 
                target={social === 'LinkedIn' ? '_blank' : undefined}
                rel={social === 'LinkedIn' ? 'noreferrer' : undefined}
                className="text-xs font-medium hover:text-white transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ranjeet Verma. All rights reserved. Designed & crafted with care.
          </p>
        </div>

      </div>
    </footer>
  )
}
