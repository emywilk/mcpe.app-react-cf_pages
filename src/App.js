import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Swiper } from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MapPage from './components/MapPage';
import MapsPage from './components/MapsPage';
import SearchPage from './components/SearchPage';
import Header from './components/Header';

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const swiper = new Swiper(".mySwiper", {
        modules: [Pagination],
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }, []);

  const AboutPage = () => (
    <div className="bg-white">
      <main className="py-12">
        <div className="md:w-3/4 mx-auto px-4">
          <div className="flex gap-8 md:flex-row flex-col">
            <div>
              <a href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=mcpe.app&utm_medium=website&utm_campaign=homepage" target="_blank" rel="noopener noreferrer">
                <img className="rounded-3xl w-32 h-32" src="images/minemaps_logo_hd.webp" alt="MineMaps app icon" />
              </a>
              <h1 className="font-alata text-4xl mt-6 mb-4">Download Minecraft Maps</h1>
              <p className="text-gray-700">
                Download the best Minecraft maps for free! Browse our collection of amazing maps for Minecraft PE.<br /><br />
                With <strong>MineMaps</strong> you can explore hundreds of <strong>Minecraft maps</strong> including adventure maps, parkour maps, and building maps. <strong>Download maps for Minecraft</strong> with just one tap and start playing instantly!
              </p>
            </div>
            <div className="relative h-fit md:w-[180%]">
              <div className="absolute w-full h-full bg-yellow-400 rounded-lg transform translate-x-2 translate-y-2"></div>
              <img className="relative rounded-lg w-full" src="images/unnamed-3.webp" alt="MineMaps app screenshot" />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-16 md:flex-row flex-col">
            <div className="hidden md:flex md:flex-row md:gap-4 md:w-full">
              <img className="rounded-lg md:w-1/4" src="images/unnamed-4.webp" alt="MineMaps gameplay screenshot 1" />
              <img className="rounded-lg md:w-1/4" src="images/unnamed-5.webp" alt="MineMaps gameplay screenshot 2" />
              <img className="rounded-lg md:w-1/4" src="images/unnamed-6.webp" alt="MineMaps gameplay screenshot 3" />
              <p className="md:w-1/4 text-lg">
                You will find all kinds of worlds: from houses and huge cities to PvP battle mini-games and adventures, parkour, hide and seek, one block skyblock and so much more!
              </p>
            </div>
            <div className="md:hidden w-full">
              <div className="swiper mySwiper w-3/4">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img className="rounded-lg w-full" src="images/unnamed-4.webp" alt="MineMaps gameplay screenshot 1" />
                  </div>
                  <div className="swiper-slide">
                    <img className="rounded-lg w-full" src="images/unnamed-5.webp" alt="MineMaps gameplay screenshot 2" />
                  </div>
                  <div className="swiper-slide">
                    <img className="rounded-lg w-full" src="images/unnamed-6.webp" alt="MineMaps gameplay screenshot 3" />
                  </div>
                </div>
              </div>
              <div className="swiper-pagination !relative !bottom-0 mt-4 mb-6"></div>
              <p className="text-lg">
                You will find all kinds of worlds: from houses and huge cities to PvP battle mini-games and adventures, parkour, hide and seek, one block skyblock and so much more!
              </p>
            </div>
          </div>
          
          <div className="text-center md:mt-32 mt-4">
            <a href="https://play.google.com/store/apps/details?id=mnw.mcpe_maps&utm_source=mcpe.app&utm_medium=website&utm_campaign=homepage" target="_blank" rel="noopener noreferrer">
              <img className="max-w-md w-full mx-auto" src="images/google-play-badge.webp" alt="Get it on Google Play" />
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>ANZOR KUNASHEV<br />emywilk@gmail.com</p>
        </div>
      </footer>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<MapsPage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/map/:id" element={<MapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
