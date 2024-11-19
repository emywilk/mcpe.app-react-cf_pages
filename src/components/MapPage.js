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
    <div>
      <h1>{mapData.title}</h1>
      <img src={mapData.img} alt={mapData.title} className="w-full rounded-lg mb-4" />
      <p className="text-lg mb-8">{mapData.desc}</p>
      
      <div className="text-center">
        <a 
          href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=map_page&utm_medium=website&utm_campaign=map_share" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img 
            className="max-w-md w-full mx-auto" 
            src="/images/google-play-badge.png" 
            alt="Get it on Google Play"
          />
        </a>
      </div>
    </div>
  );
}

export default MapPage;
