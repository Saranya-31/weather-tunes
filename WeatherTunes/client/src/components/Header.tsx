import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-float">
              <i className="fas fa-cloud-sun text-yellow-300"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">WeatherTunes</h1>
              <p className="text-xs text-white/80">Weather meets Music</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#weather" 
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Weather
            </a>
            <a 
              href="#music" 
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Music
            </a>
            <a 
              href="#about" 
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
          </nav>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#weather" 
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Weather
              </a>
              <a 
                href="#music" 
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Music
              </a>
              <a 
                href="#about" 
                className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
