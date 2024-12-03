'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MapCard = forwardRef(({ map }, ref) => {
  return (
    <Link
      ref={ref}
      href={`/map/${map.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="aspect-video relative">
        <Image
          src={map.img}
          alt={map.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 line-clamp-1 text-gray-900">{map.title}</h2>
          <p className="text-gray-600 line-clamp-2">{map.desc}</p>
        </div>
        {map.types && (
          <div className="mt-3 flex flex-wrap gap-2">
            {map.types.map((type) => (
              <span
                key={type.id}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
              >
                {type.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
})

MapCard.displayName = 'MapCard'

export default MapCard
