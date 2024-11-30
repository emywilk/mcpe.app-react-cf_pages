import { notFound } from 'next/navigation';
import { searchMaps } from '@/app/lib/db';
import MapsGrid from '@/app/components/MapsGrid';
import PageLayout from '@/app/components/PageLayout';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  const cleanQuery = query.replace(/[^\w\s-]/g, '').trim();
  
  const title = cleanQuery ? 
    `"${cleanQuery}" - Search Minecraft PE Maps` :
    'Search Minecraft PE Maps - Download Free MCPE Maps';
    
  const description = cleanQuery ?
    `Search results for "${cleanQuery}". Download free Minecraft PE maps including adventure maps, parkour maps, and more. Browse our collection of MCPE maps with instant download.` :
    'Search and download free Minecraft PE maps. Find adventure maps, parkour maps, mini games, and more for MCPE. Easy one-tap installation.';
  
  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://mcpe.app/search?q=${encodeURIComponent(cleanQuery)}`,
      languages: {
        'en': `https://mcpe.app/search?q=${encodeURIComponent(cleanQuery)}`,
        'ru': `https://mcpe.app/ru/search?q=${encodeURIComponent(cleanQuery)}`
      }
    },
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION,
      'google-play-app': 'app-id=mnw.mcpe_maps'
    },
  };
}

function generateStructuredData(query, maps = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Search Results for "${query}" - Minecraft PE Maps`,
    description: `Search results for "${query}". Download free Minecraft PE maps including adventure maps, parkour maps, and more.`,
    url: `https://mcpe.app/search?q=${encodeURIComponent(query)}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: maps.map((map, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: map.title,
          applicationCategory: 'Game Map',
          operatingSystem: 'Android',
          description: map.desc,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      }))
    }
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  const page = Number(params?.page) || 1;
  const limit = 12;
  
  if (!query) {
    return (
      <PageLayout
        title="Search Minecraft Maps"
        description="Search and download free Minecraft PE maps. Find adventure maps, parkour maps, mini games, and more for MCPE. Easy one-tap installation."
      >
        <MapsGrid 
          initialData={{ maps: [], total: 0 }}
          searchQuery=""
        />
      </PageLayout>
    );
  }

  try {
    const cleanQuery = query.replace(/[^\w\s-]/g, '').trim();
    const env = { 
      DB: process.env.DB || {
        prepare: (query) => ({
          bind: (...params) => ({
            first: async () => ({ total: 0 }),
            all: async () => ({ results: [] })
          })
        })
      }
    };
    
    const result = await searchMaps(env, cleanQuery, { page, limit });
    const initialData = {
      maps: result.maps,
      total: result.total,
      hasMore: result.total > page * limit
    };
    const structuredData = generateStructuredData(cleanQuery, result.maps);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PageLayout
          title={`Search results for "${cleanQuery}"`}
          description={initialData.total > 0 
            ? <>Found <strong>{initialData.total}</strong> Minecraft maps matching &quot;{cleanQuery}&quot;.</>
            : 'No maps found. Try different keywords or browse our collection of free Minecraft PE maps including adventure maps, parkour maps, and more.'}
        >
          <MapsGrid 
            initialData={initialData}
            searchQuery={cleanQuery}
            page={page}
          />
        </PageLayout>
      </>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <PageLayout
        title="Search Error"
        description="Sorry, there was an error processing your search. Please try again to find and download free Minecraft PE maps."
      >
        <MapsGrid 
          initialData={{ maps: [], total: 0 }}
          searchQuery={query}
        />
      </PageLayout>
    );
  }
}
