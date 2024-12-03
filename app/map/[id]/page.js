import { getMapById } from '@/app/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const runtime = 'edge';

export async function generateMetadata(props) {
  const params = await props.params;
  const env = {
    DB: process.env.DB || {
      prepare: (query) => ({
        bind: (...params) => ({
          first: async () => null
        })
      })
    }
  };

  const map = await getMapById(env, params.id);
  if (!map) return {
    title: 'MineMaps - Minecraft PE Map Download',
    description: 'Download Minecraft PE maps for free. Browse our collection of amazing maps for MCPE.',
  };

  const title = `${map.title} - Minecraft PE Map Download`;
  const description = `Download ${map.title} map for Minecraft PE. ${map.desc?.slice(0, 150)}...`;
  
  return {
    title,
    description,
    keywords: `minecraft ${map.title}, minecraft pe map, ${map.types?.map(t => t.label).join(', ')}, mcpe map download`,
    alternates: {
      canonical: `https://mcpe.app/map/${map.id}`,
      languages: {
        'en': `https://mcpe.app/map/${map.id}`,
        'ru': `https://mcpe.app/ru/map/${map.id}`
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://mcpe.app/map/${map.id}`,
      images: [{
        url: map.img,
        width: 1200,
        height: 630,
        alt: map.title
      }]
    },
    other: {
      'google-play-app': 'app-id=mnw.mcpe_maps'
    }
  };
}

export function generateStructuredData(map) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: map.title,
    applicationCategory: 'Game Map',
    operatingSystem: 'Android',
    description: map.desc,
    image: map.img,
    url: `https://mcpe.app/map/${map.id}`,
    genre: map.types?.map(t => t.label).join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: map.rating ? {
      '@type': 'AggregateRating',
      ratingValue: map.rating,
      ratingCount: map.ratingCount || 1,
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };
}

export default async function MapPage(props) {
  const params = await props.params;
  const env = {
    DB: process.env.DB || {
      prepare: (query) => ({
        bind: (...params) => ({
          first: async () => null
        })
      })
    }
  };

  const map = await getMapById(env, params.id);
  
  if (!map) {
    notFound();
  }

  const structuredData = generateStructuredData(map);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              MineMaps
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Install hundreds of awesome maps for Minecraft in one click!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image and Title */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={map.img}
                    alt={map.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Title and Description */}
              <div className="map-details">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {map.title}
                </h1>
                {map.types && map.types.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {map.types.map(type => (
                      <Link
                        key={type.id}
                        href={`/maps?type=${type.id}`}
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {type.label}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="map-description text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {map.desc}
                </div>
              </div>
            </div>

            {/* Right Column - Stats and CTA */}
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Primary CTA */}
                <a
                  href={`https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=map_sharing&utm_content=${encodeURIComponent(map.title)}&utm_medium=website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full"
                >
                  <Image
                    src="/images/google-play-badge.webp"
                    alt="Get it on Google Play"
                    width={646}
                    height={250}
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
