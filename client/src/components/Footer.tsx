export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">
                <i className="fas fa-cloud-sun text-yellow-300"></i>
              </div>
              <h3 className="text-xl font-bold text-white">WeatherTunes</h3>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Discover the perfect soundtrack for your weather. Real-time weather updates paired with curated playlists for every mood and condition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-xl">
                <i className="fab fa-spotify"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#weather" 
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Weather
                </a>
              </li>
              <li>
                <a 
                  href="#music" 
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Music
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
              </li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">API Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2024 WeatherTunes. All rights reserved. Powered by OpenWeatherMap & Spotify APIs.
          </p>
        </div>
      </div>
    </footer>
  );
}
