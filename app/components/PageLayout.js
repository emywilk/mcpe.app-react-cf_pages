import Image from 'next/image';

export default function PageLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <div className="text-xl text-gray-600 mb-6">
              {description}
            </div>
          )}
          <a 
            href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=mcpe.app&utm_medium=website&utm_campaign=homepage" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/google-play-badge.webp"
              alt="Get it on Google Play"
              width={153}
              height={48}
              className="h-12"
            />
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
