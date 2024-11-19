import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
    <>
      <Helmet>
        <title>{mapData.title} - MineMaps</title>
        <meta property="og:title" content={`${mapData.title} - MineMaps`} />
        <meta property="og:description" content={mapData.desc} />
        <meta property="og:image" content={mapData.img} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${mapData.title} - MineMaps`} />
        <meta name="twitter:description" content={mapData.desc} />
        <meta name="twitter:image" content={mapData.img} />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{mapData.title}</h1>
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
      </main>
    </>
  );
}

export default MapPage;
