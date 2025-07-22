# WeatherTunes - Complete Code Implementation

## Project Structure

```
weather-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WeatherInfo.tsx
│   │   │   └── SpotifyPlayer.tsx
│   │   ├── pages/
│   │   │   ├── home.tsx
│   │   │   └── not-found.tsx
│   │   ├── hooks/
│   │   │   └── useWeather.ts
│   │   ├── lib/
│   │   │   ├── weatherApi.ts
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
└── package.json
```

## Key Features

### 1. Dynamic Weather Backgrounds
- **Clear/Sunny**: Bright sunny summer landscape
- **Rain**: Rainy cityscape with water droplets
- **Clouds**: Dramatic cloudy sky
- **Thunderstorm**: Dark storm clouds with lightning
- **Snow**: Winter snowy landscape
- **Mist/Fog**: Misty forest or foggy scene

### 2. Weather Data Display
- Temperature (Celsius)
- Humidity percentage
- Wind speed (m/s)
- Latitude and Longitude coordinates
- Visibility
- Atmospheric pressure
- Sea level pressure

### 3. Spotify Music Integration
Weather-based playlist recommendations:
- Clear → Good Vibes
- Rain → Lo-Fi Rainy Beats  
- Clouds → Chill Vibes
- Thunderstorm → Calm Focus

### 4. Responsive Design
- Mobile-first approach
- Glassmorphism effects
- Smooth animations
- Hover effects

## Core Components

### Header Component (`client/src/components/Header.tsx`)
```tsx
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
            <a href="#weather" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Weather</a>
            <a href="#music" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Music</a>
            <a href="#about" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">About</a>
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
              <a href="#weather" className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2">Weather</a>
              <a href="#music" className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2">Music</a>
              <a href="#about" className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2">About</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
```

### WeatherInfo Component (`client/src/components/WeatherInfo.tsx`)
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWeather } from "@/hooks/useWeather";
import { useToast } from "@/hooks/use-toast";

interface WeatherInfoProps {
  onWeatherChange: (condition: string) => void;
}

export default function WeatherInfo({ onWeatherChange }: WeatherInfoProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: weather, mutate: searchWeather, isPending } = useWeather();
  const { toast } = useToast();

  const handleWeatherSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    searchWeather(searchQuery.trim(), {
      onSuccess: (data) => {
        onWeatherChange(data.weather[0].main.toLowerCase());
      },
      onError: () => {
        toast({
          title: "Error",
          description: "City not found. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const getWeatherIcon = (condition: string) => {
    const iconMap: { [key: string]: string } = {
      clear: "fas fa-sun text-yellow-300",
      rain: "fas fa-cloud-rain text-blue-300",
      clouds: "fas fa-cloud text-gray-300",
      thunderstorm: "fas fa-bolt text-purple-300",
      snow: "fas fa-snowflake text-blue-200",
      mist: "fas fa-smog text-gray-400",
    };
    return iconMap[condition.toLowerCase()] || "fas fa-sun text-yellow-300";
  };

  return (
    <section id="weather" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="cityInput" className="block text-sm font-medium text-white/90 mb-2">
                Enter City Name
              </Label>
              <Input
                id="cityInput"
                type="text"
                placeholder="e.g., New York, London, Tokyo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleWeatherSearch()}
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                disabled={isPending}
              />
            </div>
            <Button
              onClick={handleWeatherSearch}
              disabled={isPending}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              {isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Searching...
                </>
              ) : (
                <>
                  <i className="fas fa-search mr-2"></i>
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        {weather && (
          <>
            {/* Weather Display Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Main Weather Card */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float">
                    <i className={getWeatherIcon(weather.weather[0].main)}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{weather.name}</h3>
                  <div className="text-5xl font-bold text-white mb-2">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <p className="text-white/80 text-lg capitalize">{weather.weather[0].description}</p>
                  <p className="text-white/60 text-sm mt-2">
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-blue-300 mb-2">
                    <i className="fas fa-tint"></i>
                  </div>
                  <p className="text-white/80 text-sm">Humidity</p>
                  <p className="text-xl font-semibold text-white">{weather.main.humidity}%</p>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-green-300 mb-2">
                    <i className="fas fa-wind"></i>
                  </div>
                  <p className="text-white/80 text-sm">Wind Speed</p>
                  <p className="text-xl font-semibold text-white">{weather.wind.speed} m/s</p>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-purple-300 mb-2">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <p className="text-white/80 text-sm">Latitude</p>
                  <p className="text-lg font-semibold text-white">{weather.coord.lat.toFixed(4)}</p>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-orange-300 mb-2">
                    <i className="fas fa-compass"></i>
                  </div>
                  <p className="text-white/80 text-sm">Longitude</p>
                  <p className="text-lg font-semibold text-white">{weather.coord.lon.toFixed(4)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

### SpotifyPlayer Component (`client/src/components/SpotifyPlayer.tsx`)
```tsx
interface SpotifyPlayerProps {
  weatherCondition: string;
}

export default function SpotifyPlayer({ weatherCondition }: SpotifyPlayerProps) {
  const weatherPlaylists = {
    clear: {
      name: 'Good Vibes',
      embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC',
      description: 'Perfect for clear, sunny weather',
      icon: 'fas fa-sun text-yellow-300'
    },
    rain: {
      name: 'Lo-Fi Rainy Beats',
      embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR',
      description: 'Cozy tunes for rainy days',
      icon: 'fas fa-cloud-rain text-blue-300'
    },
    clouds: {
      name: 'Chill Vibes',
      embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6',
      description: 'Relaxing music for cloudy weather',
      icon: 'fas fa-cloud text-gray-300'
    },
    thunderstorm: {
      name: 'Calm Focus',
      embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      description: 'Peaceful sounds for stormy weather',
      icon: 'fas fa-bolt text-purple-300'
    }
  };

  const currentPlaylist = weatherPlaylists[weatherCondition as keyof typeof weatherPlaylists] || weatherPlaylists.clear;

  return (
    <section id="music" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Perfect Playlist for Your Weather</h2>
          <p className="text-white/80">Music that matches your current atmosphere</p>
        </div>

        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">
                <i className="fab fa-spotify text-green-400"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentPlaylist.name}</h3>
                <p className="text-white/70">{currentPlaylist.description}</p>
              </div>
            </div>
            <div className="text-2xl text-white/80">
              <i className={currentPlaylist.icon}></i>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden">
            <iframe
              src={`${currentPlaylist.embedUrl}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Footer Component (`client/src/components/Footer.tsx`)
```tsx
export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">
                <i className="fas fa-cloud-sun text-yellow-300"></i>
              </div>
              <h3 className="text-xl font-bold text-white">WeatherTunes</h3>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Discover the perfect soundtrack for your weather. Real-time weather updates paired with curated playlists.
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
```

## Backend Implementation

### Server Routes (`server/routes.ts`)
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/weather", async (req, res) => {
    try {
      const { city } = req.query;
      
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ 
          message: "City parameter is required" 
        });
      }

      const apiKey = process.env.OPENWEATHER_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          message: "Weather API key not configured" 
        });
      }

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          return res.status(404).json({ 
            message: "City not found" 
          });
        }
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();
      res.json(weatherData);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        message: "Failed to fetch weather data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

## Environment Variables Required

```
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

## How to Run

1. Install dependencies: `npm install`
2. Add your OpenWeatherMap API key to environment variables
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:5000`

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter, TanStack Query
- **Backend**: Node.js, Express.js, TypeScript
- **APIs**: OpenWeatherMap API, Spotify Web Player
- **UI**: Radix UI components, FontAwesome icons
- **Build**: Vite, esbuild

This complete implementation provides a fully functional weather app with dynamic backgrounds, comprehensive weather data, and music integration.