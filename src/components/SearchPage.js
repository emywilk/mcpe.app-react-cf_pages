import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset scroll position when query changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    const searchMaps = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`Search request failed: ${response.status}`);
        }
        const data = await response.json();
        console.log('Search results:', data); // For debugging
        setMaps(data.maps || []);
      } catch (error) {
        console.error('Error searching maps:', error);
      } finally {
        setLoading(false);
      }
    };

    searchMaps();
  }, [query]);

  return (
    <>
      <Helmet>
        <title>{`Search Results for "${query}" - Minecraft PE Maps`}</title>
        <meta name="description" content={`Search results for "${query}". Find and download free Minecraft PE maps including adventure maps, parkour maps, and more.`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-4xl font-black text-gray-900 mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Search Results for "{query}"
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : maps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {maps.map((map) => (
                <Link
                  key={map.id}
                  to={`/map/${map.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <img
                      src={map.img}
                      alt={map.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{map.title}</h2>
                    <p className="text-gray-600 line-clamp-2">{map.desc}</p>
                    {map.types && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {map.types.map((type) => (
                          <span
                            key={type.id}
                            className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                          >
                            {type.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No maps found</h2>
              <p className="text-gray-600">
                Try different keywords or browse our{' '}
                <Link to="/maps" className="text-blue-500 hover:underline">
                  collection of maps
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
