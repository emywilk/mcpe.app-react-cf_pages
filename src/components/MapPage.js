import React from "react";
import { useParams } from "react-router-dom";

function MapPage() {
  const { id } = useParams();
  const [mapData, setMapData] = React.useState({
    title: "Minecraft Map",
    desc: "Check out this awesome Minecraft map!",
    img: "/images/default-map.webp",
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMapData({
      title: params.get("title") || "Minecraft Map",
      desc: params.get("desc") || "Check out this awesome Minecraft map!",
      img: params.get("img") || "/images/default-map.webp",
    });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            MineMaps
          </h1>
          <p className="text-xl text-gray-600">
            Install hundreds of awesome maps for Minecraft in one click!
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image and Title */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={mapData.img}
                  alt={mapData.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {mapData.title}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {mapData.desc}
              </p>
            </div>
          </div>

          {/* Right Column - Stats and CTA */}
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Primary CTA */}
              <a
                href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=map_share&utm_medium=website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img
                  src="/images/google-play-badge.webp"
                  alt="Get it on Google Play"
                  className="w-full object-cover rounded-3xl"
                />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">10M+</p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">4.5★</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">#1</p>
                <p className="text-sm text-gray-600">Maps App</p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                MineMaps Features
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  One-click maps installation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Compatible with latest Minecraft version
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Regular updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
