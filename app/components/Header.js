import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 bg-gray-900 text-white border-b border-gray-800 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/images/minemaps_logo.webp"
                alt="MineMaps Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl"
                priority
              />
            </Link>
            <Link 
              href="/about" 
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
