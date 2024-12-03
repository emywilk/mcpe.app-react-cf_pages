import Image from 'next/image';
import Link from 'next/link';
import MobileScreenshots from '@/app/components/MobileScreenshots';

export const runtime = 'edge';

export const metadata = {
  title: 'About MineMaps - Download Minecraft Maps for MCPE',
  description: 'Download the best Minecraft maps for free! Browse our collection of amazing maps for Minecraft PE. Explore hundreds of adventure maps, parkour maps, and building maps.',
  openGraph: {
    title: 'About MineMaps - Download Minecraft Maps for MCPE',
    description: 'Download the best Minecraft maps for free! Browse our collection of amazing maps for Minecraft PE.',
    images: [{ url: 'https://mcpe.app/images/minemaps_logo_hd.webp', width: 512, height: 512 }],
  },
};

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=mcpe.app&utm_medium=website&utm_campaign=homepage';

const screenshots = [
  { src: '/images/unnamed-4.webp', alt: 'MineMaps gameplay screenshot 1' },
  { src: '/images/unnamed-5.webp', alt: 'MineMaps gameplay screenshot 2' },
  { src: '/images/unnamed-6.webp', alt: 'MineMaps gameplay screenshot 3' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <main className="py-6 md:py-12">
        <div className="md:w-3/4 mx-auto px-4">
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-8">
            <div className="text-center md:text-left max-w-xl">
              <Link 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/minemaps_logo_hd.webp"
                  alt="MineMaps app icon"
                  width={96}
                  height={96}
                  className="rounded-2xl md:rounded-3xl md:w-32 md:h-32 w-24 h-24"
                  priority
                />
              </Link>
              <h1 className="font-alata text-3xl md:text-4xl mt-4 md:mt-6 mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Download Minecraft Maps
              </h1>
              <p className="text-gray-700 text-sm md:text-base">
                Download the best Minecraft maps for free! Browse our collection of amazing maps for Minecraft PE.<br /><br />
                With <strong>MineMaps</strong> you can explore hundreds of <strong>Minecraft maps</strong> including adventure maps, parkour maps, and building maps. <strong>Download maps for Minecraft</strong> with just one tap and start playing instantly!
              </p>
            </div>
            <div className="relative h-fit md:w-[180%] mt-6 md:mt-0">
              <div className="absolute w-full h-full bg-yellow-400 rounded-lg transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2" />
              <Image
                src="/images/unnamed-3.webp"
                alt="MineMaps app screenshot"
                width={800}
                height={450}
                className="relative rounded-lg w-full"
                priority
              />
            </div>
          </div>

          <div className="mt-8 md:mt-16">
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="relative">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={800}
                    height={450}
                    className="rounded-lg w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <MobileScreenshots />
            </div>
            <p className="text-center md:text-left text-sm md:text-lg mt-6 md:mt-8 text-gray-700 px-4 md:px-0">
              You will find all kinds of worlds: from houses and huge cities to PvP battle mini-games and adventures, parkour, hide and seek, one block skyblock and so much more!
            </p>
          </div>
          
          <div className="text-center mt-8 md:mt-16">
            <Link 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto"
            >
              <Image
                src="/images/google-play-badge.webp"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="max-w-md w-full mx-auto rounded-2xl md:rounded-3xl"
                priority
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
