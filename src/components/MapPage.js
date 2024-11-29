import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function MapPage() {
  const { id } = useParams();
  const [mapData, setMapData] = React.useState({
    title: "Loading...",
    desc: "Loading map details...",
    types: [],
    img: "/images/default-map.webp",
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Reset scroll position when map page loads
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  React.useEffect(() => {
    const fetchMapData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/map/${id}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.status}`);
        }
        const data = await response.json();
        console.log('Map data received:', data);
        setMapData(data);
      } catch (error) {
        console.error('Error fetching map data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMapData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Error Loading Map</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/maps" className="text-blue-500 hover:underline">
              Browse other maps
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${mapData.title} - Minecraft PE Map Download`}</title>
        <meta name="description" content={`Download ${mapData.title} map for Minecraft PE. ${mapData.desc?.slice(0, 150)}...`} />
        <meta name="keywords" content={`minecraft ${mapData.title}, minecraft pe map, ${mapData.types?.map(t => t.label).join(', ')}, mcpe map download`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": mapData.title,
            "applicationCategory": "Game Map",
            "operatingSystem": "Android",
            "description": mapData.desc,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

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
              <div className="map-details">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {mapData.title}
                </h1>
                {mapData.types && mapData.types.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mapData.types.map(type => (
                      <Link
                        key={type.id}
                        to={`/maps?type=${type.id}`}
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {type.label}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="map-description text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {mapData.desc}
                </div>
              </div>
            </div>

            {/* Right Column - Stats and CTA */}
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Primary CTA */}
                <a
                  href={`https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=map_sharing&utm_content=${encodeURIComponent(mapData.title)}&utm_medium=website`}
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
    </>
  );
}

export default MapPage;
