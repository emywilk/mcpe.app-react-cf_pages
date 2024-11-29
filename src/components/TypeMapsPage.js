import React from "react";
import { useParams, Link } from "react-router-dom";

function TypeMapsPage() {
  const { typeId } = useParams();
  const [maps, setMaps] = React.useState([]);
  const [typeLabel, setTypeLabel] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch(`/api/maps/type/${typeId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setMaps(data.maps);
          setTypeLabel(data.typeLabel);
        }
      } catch (error) {
        console.error('Error fetching maps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, [typeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {typeLabel} Maps
          </h1>
          <p className="text-xl text-gray-600">
            Browse all {typeLabel.toLowerCase()} maps for Minecraft
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maps.map(map => (
            <Link 
              key={map.id}
              to={`/map/${map.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="aspect-video">
                <img
                  src={map.img}
                  alt={map.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{map.title}</h2>
                <p className="text-gray-600 line-clamp-2">{map.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {maps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No maps found for this type.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TypeMapsPage;
