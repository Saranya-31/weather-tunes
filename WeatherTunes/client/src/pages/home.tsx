import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherInfo from "@/components/WeatherInfo";
import SpotifyPlayer from "@/components/SpotifyPlayer";

export default function Home() {
  const [weatherCondition, setWeatherCondition] = useState<string>("clear");

  // Weather-based background themes with actual images
  const weatherThemes = {
    clear: "weather-bg-clear",
    rain: "weather-bg-rain", 
    clouds: "weather-bg-clouds",
    thunderstorm: "weather-bg-thunderstorm",
    snow: "weather-bg-snow",
    mist: "weather-bg-mist",
    fog: "weather-bg-mist",
    drizzle: "weather-bg-rain",
  };

  const currentTheme = weatherThemes[weatherCondition as keyof typeof weatherThemes] || weatherThemes.clear;

  return (
    <div className={`min-h-screen transition-all duration-1000 ${currentTheme}`}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Discover Weather & Music
            </h2>
            <p className="text-lg text-white/90 mb-8 animate-fade-in">
              Get real-time weather updates with perfectly curated playlists for every mood
            </p>
          </div>
        </section>

        <WeatherInfo onWeatherChange={setWeatherCondition} />
        <SpotifyPlayer weatherCondition={weatherCondition} />

        {/* Features Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl text-blue-300 mb-3">
                    <i className="fas fa-globe"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Global Weather</h3>
                  <p className="text-white/70 text-sm">Real-time weather data for cities worldwide</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-300 mb-3">
                    <i className="fas fa-music"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Playlists</h3>
                  <p className="text-white/70 text-sm">Curated music based on weather conditions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-purple-300 mb-3">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Responsive Design</h3>
                  <p className="text-white/70 text-sm">Perfect experience on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
