import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MapPage() {
  const { id } = useParams();
  const [mapData, setMapData] = useState({
    title: 'Minecraft Map',
    desc: 'Check out this awesome Minecraft map!',
    img: '/images/default-map.webp'
  });

  useEffect(() => {
    // Here you would typically fetch the map data using the ID
    // For now, we'll use URL parameters as in the original version
    const params = new URLSearchParams(window.location.search);
    setMapData({
      title: params.get('title') || 'Minecraft Map',
      desc: params.get('desc') || 'Check out this awesome Minecraft map!',
      img: params.get('img') || '/images/default-map.webp'
    });
  }, [id]);

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Title and Image */}
        <div className="space-y-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {mapData.title}
          </h1>
          <div className="w-full h-[400px] relative rounded-xl shadow-lg bg-gray-100">
            <img 
              src={mapData.img} 
              alt={mapData.title} 
              className="w-full h-full object-contain absolute top-0 left-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column - Description and Button */}
        <div className="space-y-6 md:pt-8 text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            {mapData.desc}
          </p>
          
          <div className="transition-transform hover:scale-105">
            <a 
              href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=map_page&utm_medium=website&utm_campaign=map_share" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <img 
                className="w-full" 
                src="/images/google-play-badge.png" 
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
