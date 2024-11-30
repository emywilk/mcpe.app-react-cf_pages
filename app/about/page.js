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
      <main className="py-12">
        <div className="md:w-3/4 mx-auto px-4">
          <div className="flex gap-8 md:flex-row flex-col">
            <div>
              <Link 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/minemaps_logo_hd.webp"
                  alt="MineMaps app icon"
                  width={128}
                  height={128}
                  className="rounded-3xl"
                  priority
                />
              </Link>
              <h1 className="font-alata text-4xl mt-6 mb-4">Download Minecraft Maps</h1>
              <p className="text-gray-700">
                Download the best Minecraft maps for free! Browse our collection of amazing maps for Minecraft PE.<br /><br />
                With <strong>MineMaps</strong> you can explore hundreds of <strong>Minecraft maps</strong> including adventure maps, parkour maps, and building maps. <strong>Download maps for Minecraft</strong> with just one tap and start playing instantly!
              </p>
            </div>
            <div className="relative h-fit md:w-[180%]">
              <div className="absolute w-full h-full bg-yellow-400 rounded-lg transform translate-x-2 translate-y-2" />
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

          <div className="flex items-center gap-4 mt-16 md:flex-row flex-col">
            <div className="hidden md:flex md:flex-row md:gap-4 md:w-full">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="relative md:w-1/4">
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
              <p className="md:w-1/4 text-lg">
                You will find all kinds of worlds: from houses and huge cities to PvP battle mini-games and adventures, parkour, hide and seek, one block skyblock and so much more!
              </p>
            </div>
            
            <MobileScreenshots />
            
            <div className="md:hidden">
              <p className="text-lg">
                You will find all kinds of worlds: from houses and huge cities to PvP battle mini-games and adventures, parkour, hide and seek, one block skyblock and so much more!
              </p>
            </div>
          </div>
          
          <div className="text-center md:mt-32 mt-4">
            <Link 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/images/google-play-badge.webp"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="max-w-md w-full mx-auto rounded-3xl"
                priority
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
