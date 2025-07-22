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
      onError: (error) => {
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
      fog: "fas fa-smog text-gray-400",
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
                placeholder="e.g., Mumbai, Delhi, Bangalore, Chennai, Kolkata..."
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
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
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

          {/* Quick City Buttons for Indian Cities */}
          <div className="mt-4">
            <p className="text-white/70 text-sm mb-3">Popular Indian Cities:</p>
            <div className="flex flex-wrap gap-2">
              {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSearchQuery(city);
                    searchWeather(city, {
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
                  }}
                  disabled={isPending}
                  className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 text-white/90 hover:text-white rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  {city}
                </button>
              ))}
            </div>
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
                {/* Humidity */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-blue-300 mb-2">
                    <i className="fas fa-tint"></i>
                  </div>
                  <p className="text-white/80 text-sm">Humidity</p>
                  <p className="text-xl font-semibold text-white">{weather.main.humidity}%</p>
                </div>

                {/* Wind Speed */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-green-300 mb-2">
                    <i className="fas fa-wind"></i>
                  </div>
                  <p className="text-white/80 text-sm">Wind Speed</p>
                  <p className="text-xl font-semibold text-white">{weather.wind.speed} m/s</p>
                </div>

                {/* Latitude */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-purple-300 mb-2">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <p className="text-white/80 text-sm">Latitude</p>
                  <p className="text-lg font-semibold text-white">{weather.coord.lat.toFixed(4)}</p>
                </div>

                {/* Longitude */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center animate-slide-up">
                  <div className="text-2xl text-orange-300 mb-2">
                    <i className="fas fa-compass"></i>
                  </div>
                  <p className="text-white/80 text-sm">Longitude</p>
                  <p className="text-lg font-semibold text-white">{weather.coord.lon.toFixed(4)}</p>
                </div>
              </div>
            </div>

            {/* Additional Weather Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                <div className="text-2xl text-yellow-300 mb-2">
                  <i className="fas fa-eye"></i>
                </div>
                <p className="text-white/80 text-sm">Visibility</p>
                <p className="text-lg font-semibold text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                <div className="text-2xl text-red-300 mb-2">
                  <i className="fas fa-thermometer-half"></i>
                </div>
                <p className="text-white/80 text-sm">Pressure</p>
                <p className="text-lg font-semibold text-white">{weather.main.pressure} hPa</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                <div className="text-2xl text-blue-300 mb-2">
                  <i className="fas fa-sun"></i>
                </div>
                <p className="text-white/80 text-sm">Sea Level</p>
                <p className="text-lg font-semibold text-white">
                  {weather.main.sea_level || weather.main.pressure} hPa
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
