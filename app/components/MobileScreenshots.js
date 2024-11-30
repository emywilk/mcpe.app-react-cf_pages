'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const screenshots = [
  { src: '/images/unnamed-4.webp', alt: 'MineMaps gameplay screenshot 1' },
  { src: '/images/unnamed-5.webp', alt: 'MineMaps gameplay screenshot 2' },
  { src: '/images/unnamed-6.webp', alt: 'MineMaps gameplay screenshot 3' },
];

export default function MobileScreenshots() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="md:hidden w-full">
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #666 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #000 !important;
          opacity: 1;
        }
      `}</style>
      <Swiper
        modules={[Pagination]}
        className="w-3/4"
        pagination={{
          clickable: true,
          el: '.swiper-custom-pagination',
        }}
        spaceBetween={20}
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={800}
                height={450}
                className="rounded-lg w-full h-auto"
                sizes="(max-width: 768px) 75vw, 100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-custom-pagination mt-4 mb-6 flex justify-center" />
    </div>
  );
}
