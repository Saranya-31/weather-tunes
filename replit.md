# WeatherTunes Application

## Overview

WeatherTunes is a full-stack web application that combines real-time weather information with curated music playlists. Users can search for weather data by city and get matched with Spotify playlists that complement the current weather conditions. The app features a modern, responsive design with weather-based dynamic backgrounds and smooth transitions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with weather endpoint
- **Development Setup**: tsx for TypeScript execution in development

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Storage Abstraction**: In-memory storage implementation for development with interface for easy database integration

## Key Components

### Frontend Components
1. **WeatherInfo**: Handles weather search functionality and displays weather data
2. **SpotifyPlayer**: Renders embedded Spotify playlists based on weather conditions
3. **Header/Footer**: Navigation and branding components
4. **UI Components**: Comprehensive set of reusable components from shadcn/ui

### Backend Components
1. **Weather API**: Proxy endpoint for OpenWeatherMap API integration
2. **Routes System**: Modular route registration system
3. **Storage Interface**: Abstracted storage layer with memory implementation
4. **Vite Integration**: Development server setup with HMR support

### Weather-to-Music Mapping
- Clear weather → Upbeat/Good Vibes playlists
- Rainy weather → Lo-Fi/Chill beats
- Cloudy weather → Relaxing/Ambient music
- Thunderstorms → Calm/Focus music

## Data Flow

1. **Weather Search**: User enters city name → Frontend calls `/api/weather` → Backend fetches from wttr.in API → Weather data returned with condition mapping
2. **Playlist Selection**: Weather condition triggers playlist selection → SpotifyPlayer component renders appropriate embedded playlist
3. **Dynamic Theming**: Weather condition updates background gradient and overall app theme
4. **Error Handling**: Toast notifications for API errors and validation feedback

## External Dependencies

### APIs
- **wttr.in Weather API**: Real-time weather data (free service, no API key required)
- **Spotify Web Player**: Embedded playlist functionality

### Key Libraries
- **Frontend**: React, TanStack Query, Wouter, Tailwind CSS, Radix UI, React Hook Form
- **Backend**: Express.js, Drizzle ORM, Neon serverless database driver
- **Development**: Vite, TypeScript, tsx, esbuild

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (optional for current implementation)
- No weather API key required (using free wttr.in service)

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script

### Development vs Production
- **Development**: Vite dev server with HMR, tsx for TypeScript execution
- **Production**: Built static files served by Express, compiled server bundle

### Hosting Considerations
- Designed for platforms supporting Node.js and PostgreSQL
- No external API keys required for basic weather functionality
- Static assets served from Express in production

## Recent Changes: Latest modifications with dates

**2025-07-20**: 
- ✓ Switched from OpenWeatherMap API to free wttr.in weather service
- ✓ Added comprehensive Indian cities support with quick-access buttons
- ✓ Implemented dynamic weather-based background images 
- ✓ Enhanced error handling and user feedback systems
- ✓ Created complete project synopsis document with technical specifications
- ✓ Updated CSS animations and glassmorphism effects
- ✓ Fixed Font Awesome CSS import ordering issues

The application follows a modern full-stack TypeScript architecture with clear separation of concerns, making it easy to extend with additional features like user authentication, playlist customization, or additional weather data sources.