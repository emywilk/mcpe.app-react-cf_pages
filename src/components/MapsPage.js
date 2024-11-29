import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function MapsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const lastMapElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const selectedType = searchParams.get('type');

  useEffect(() => {
    setMaps([]);
    setPage(1);
    setHasMore(true);
    window.scrollTo(0, 0);
  }, [selectedType]);

  useEffect(() => {
    const fetchMaps = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/maps?page=${page}${selectedType ? `&type=${selectedType}` : ''}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMaps(prevMaps => {
            // Filter out duplicates based on id
            const newMaps = [...prevMaps, ...data.maps];
            return newMaps.filter((map, index, self) => 
              index === self.findIndex(m => m.id === map.id)
            );
          });
          setHasMore(data.hasMore);
        }
      } catch (error) {
        console.error('Error fetching maps:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, [page, selectedType]);

  return (
    <>
      <Helmet>
        <title>{selectedType ? 
          `${selectedType} Minecraft Maps Download - Maps for Minecraft PE${selectedType.toLowerCase() === 'one block' ? ' | One Block MCPE' : ''}` : 
          'Download Minecraft Maps - Free Maps & One Block for MCPE'
        }</title>
        <meta name="description" content={selectedType ? 
          `Download free ${selectedType.toLowerCase()} maps for Minecraft${selectedType.toLowerCase() === 'one block' ? ' PE. Best One Block maps and survival islands' : ''}. Browse and install the best ${selectedType.toLowerCase()} maps for MCPE with instant download. Скачать карты для Майнкрафт.` : 
          'Download free Minecraft maps instantly! One Block maps and more for MCPE. Browse hundreds of maps including adventure maps, parkour maps, and building maps. Easy one-tap installation. Скачать карты для Майнкрафт.'
        } />
        <meta name="keywords" content={`minecraft maps download, maps for minecraft, ${selectedType ? selectedType.toLowerCase() + ' minecraft maps, ' : ''}one block minecraft, карты майнкрафт, minecraft pe maps, free minecraft maps`} />
        <link rel="canonical" href={`https://mcpe.app${location.pathname}${location.search}`} />
        <link rel="alternate" hreflang="en" href={`https://mcpe.app${location.pathname}${location.search}`} />
        <link rel="alternate" hreflang="ru" href={`https://mcpe.app/ru${location.pathname}${location.search}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": selectedType ? 
              `${selectedType} Minecraft Maps Download - Maps for Minecraft PE` : 
              'Download Minecraft Maps - Free Maps & One Block for MCPE',
            "description": selectedType ? 
              `Download free ${selectedType.toLowerCase()} maps for Minecraft PE. Browse and install the best ${selectedType.toLowerCase()} maps for MCPE with instant download.` : 
              'Download free Minecraft maps instantly! One Block maps and more for MCPE. Browse hundreds of maps including adventure maps, parkour maps, and building maps.',
            "url": `https://mcpe.app${location.pathname}${location.search}`
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {selectedType ? 
                `${selectedType} Maps for Minecraft` :
                'Download Maps for Minecraft'
              }
            </h1>
            <p className="text-xl text-gray-600">
              {selectedType 
                ? `Download and play the best ${selectedType.toLowerCase()} maps for Minecraft PE`
                : 'Browse and download free Minecraft maps with instant installation'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maps.map((map, index) => (
              <Link
                key={map.id}
                ref={index === maps.length - 1 ? lastMapElementRef : null}
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
                  {Array.isArray(map.types) && map.types.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {map.types.map(type => (
                        <button
                          key={type.id}
                          onClick={(e) => {
                            e.preventDefault();
                            setSearchParams({ type: type.id });
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          )}
          {!loading && maps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No maps found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MapsPage;
