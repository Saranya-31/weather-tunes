import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API endpoint using free wttr.in service
  app.get("/api/weather", async (req, res) => {
    try {
      const { city } = req.query;
      
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ 
          message: "City parameter is required" 
        });
      }

      console.log(`Fetching weather for city: ${city}`);

      // Using wttr.in API which is free and doesn't require API key
      const weatherResponse = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
        {
          headers: {
            'User-Agent': 'WeatherTunes-App'
          }
        }
      );

      if (!weatherResponse.ok) {
        console.error(`Weather API error ${weatherResponse.status}`);
        if (weatherResponse.status === 404) {
          return res.status(404).json({ 
            message: "City not found" 
          });
        }
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();
      
      // Transform wttr.in format to match OpenWeatherMap format for frontend compatibility
      const current = weatherData.current_condition[0];
      const location = weatherData.nearest_area[0];
      
      const transformedData = {
        coord: {
          lat: parseFloat(location.latitude),
          lon: parseFloat(location.longitude)
        },
        weather: [{
          id: parseInt(current.weatherCode),
          main: getWeatherMain(current.weatherCode),
          description: current.weatherDesc[0].value.toLowerCase(),
          icon: current.weatherCode
        }],
        main: {
          temp: parseFloat(current.temp_C),
          feels_like: parseFloat(current.FeelsLikeC),
          temp_min: parseFloat(current.temp_C) - 2,
          temp_max: parseFloat(current.temp_C) + 2,
          pressure: parseInt(current.pressure),
          humidity: parseInt(current.humidity),
          sea_level: parseInt(current.pressure)
        },
        visibility: parseInt(current.visibility) * 1000, // Convert km to meters
        wind: {
          speed: parseFloat(current.windspeedKmph) / 3.6, // Convert km/h to m/s
          deg: parseInt(current.winddirDegree)
        },
        clouds: {
          all: parseInt(current.cloudcover)
        },
        name: location.areaName[0].value,
        sys: {
          country: location.country[0].value
        }
      };

      res.json(transformedData);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        message: "Failed to fetch weather data" 
      });
    }
  });

  // Helper function to map weather codes to main weather types
  function getWeatherMain(code: string): string {
    const weatherCode = parseInt(code);
    if ([113].includes(weatherCode)) return "Clear";
    if ([116, 119, 122].includes(weatherCode)) return "Clouds";
    if ([143, 248, 260].includes(weatherCode)) return "Mist";
    if ([176, 179, 182, 185, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 356, 359, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395].includes(weatherCode)) return "Rain";
    if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 368, 371, 374, 377, 395].includes(weatherCode)) return "Snow";
    if ([200, 386, 389, 392].includes(weatherCode)) return "Thunderstorm";
    return "Clear";
  }

  const httpServer = createServer(app);
  return httpServer;
}
