interface SpotifyPlayerProps {
  weatherCondition: string;
}

export default function SpotifyPlayer({ weatherCondition }: SpotifyPlayerProps) {
  // Spotify playlist mapping
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
  
  const allPlaylists = [
    { condition: 'clear', ...weatherPlaylists.clear },
    { condition: 'rain', ...weatherPlaylists.rain },
    { condition: 'clouds', ...weatherPlaylists.clouds },
    { condition: 'thunderstorm', ...weatherPlaylists.thunderstorm }
  ];

  return (
    <section id="music" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Perfect Playlist for Your Weather</h2>
          <p className="text-white/80">Music that matches your current atmosphere</p>
        </div>

        {/* Current Playlist Display */}
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

          {/* Spotify Embed Player */}
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

        {/* Weather-Playlist Mapping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allPlaylists.map((playlist, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-200 cursor-pointer ${
                weatherCondition === playlist.condition ? 'ring-2 ring-white/40' : ''
              }`}
            >
              <div className="text-2xl mb-2">
                <i className={playlist.icon}></i>
              </div>
              <h4 className="text-white font-semibold mb-1 capitalize">{playlist.condition}</h4>
              <p className="text-white/70 text-sm">{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
