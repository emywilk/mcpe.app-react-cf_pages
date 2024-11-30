import { Suspense } from 'react';
import MapsGrid from './components/MapsGrid';
import PageLayout from './components/PageLayout';
import { fetchMaps } from './actions/maps';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const { type } = await searchParams;
  
  return {
    title: type ? 
      `${type} Minecraft Maps Download - Maps for Minecraft PE${type.toLowerCase() === 'one block' ? ' | One Block MCPE' : ''}` : 
      'Download Minecraft Maps - Free Maps & One Block for MCPE',
    description: type ? 
      `Download free ${type.toLowerCase()} maps for Minecraft${type.toLowerCase() === 'one block' ? ' PE. Best One Block maps and survival islands' : ''}. Browse and install the best ${type.toLowerCase()} maps for MCPE with instant download. Скачать карты для Майнкрафт.` : 
      'Download free Minecraft maps instantly! One Block maps and more for MCPE. Browse hundreds of maps for Minecraft PE with instant download. Скачать карты для Майнкрафт.',
    keywords: `minecraft maps download, maps for minecraft, ${type ? type.toLowerCase() + ' minecraft maps, ' : ''}one block minecraft, карты майнкрафт, minecraft pe maps, free minecraft maps`,
    alternates: {
      canonical: `https://mcpe.app${type ? `/maps?type=${type}` : ''}`,
      languages: {
        'en': `https://mcpe.app${type ? `/maps?type=${type}` : ''}`,
        'ru': `https://mcpe.app/ru${type ? `/maps?type=${type}` : ''}`
      }
    },
    other: {
      'google-play-app': 'app-id=mnw.mcpe_maps'
    }
  };
}

export function generateStructuredData(maps = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Download Minecraft Maps - Free Maps & One Block for MCPE',
    description: 'Download free Minecraft maps instantly! One Block maps and more for MCPE. Browse hundreds of maps including adventure maps, parkour maps, and building maps.',
    url: 'https://mcpe.app',
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

export default async function HomePage({ searchParams }) {
  const { type, page: pageParam } = await searchParams;
  const page = parseInt(pageParam, 10) || 1;

  const initialData = await fetchMaps({
    page,
    type
  });

  // Capitalize first letter of each word in type
  const formattedType = type
    ? type.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : '';

  const title = type ? <><strong>{formattedType}</strong> maps for Minecraft</> : 'MineMaps: download Minecraft maps';
  const description = type 
    ? <>Found {initialData.total} <strong>{formattedType}</strong> maps for Minecraft PE</>
    : 'Install hundreds of awesome maps for Minecraft in one click!';

  const structuredData = generateStructuredData(initialData.maps);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageLayout
        title={title}
        description={description}
      >
        <Suspense>
          <MapsGrid 
            initialData={initialData} 
            selectedType={type} 
          />
        </Suspense>
      </PageLayout>
    </>
  );
}
