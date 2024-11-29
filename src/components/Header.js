import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header className="sticky top-0 bg-gray-900 text-white border-b border-gray-800 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img className="h-12" src="/images/minemaps_logo.webp" alt="MineMaps Logo" />
            </Link>
            <Link to="/maps" className="text-lg font-medium hover:text-gray-300 transition-colors">
              Maps
            </Link>
            <Link to="/about" className="text-lg font-medium hover:text-gray-300 transition-colors">
              About
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>

          <a 
            href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=mcpe.app&utm_medium=website&utm_campaign=header" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img className="h-12" src="/images/google-play-badge.webp" alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
