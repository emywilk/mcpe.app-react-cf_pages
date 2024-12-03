'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import MapCard from './MapCard'
import { fetchMaps, searchMaps } from '../actions/maps'

export default function MapsGrid({ initialData, selectedType, searchQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Initialize with server-side data
  const [maps, setMaps] = useState(initialData?.maps || [])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialData?.hasMore || false)
  const [page, setPage] = useState(1)
  const observer = useRef()
  const prevPath = useRef(`${pathname}?${searchParams}`)

  // Reset scroll on route change
  useEffect(() => {
    const currentPath = `${pathname}?${searchParams}`
    if (prevPath.current !== currentPath) {
      window.scrollTo(0, 0)
      prevPath.current = currentPath
    }
  }, [pathname, searchParams])

  // Update state when initialData changes (e.g. new search results)
  useEffect(() => {
    setMaps(initialData?.maps || [])
    setHasMore(initialData?.hasMore || false)
  }, [initialData])

  // Reset state when type or search query changes
  useEffect(() => {
    setPage(1)
    window.scrollTo(0, 0)
  }, [selectedType, searchQuery])

  const lastMapElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  // Load more maps when page changes
  useEffect(() => {
    const loadMoreMaps = async () => {
      if (page === 1) return // Skip first page as it's loaded via SSR
      
      setLoading(true)
      try {
        let data
        if (searchQuery) {
          data = await searchMaps({
            query: searchQuery,
            page,
            limit: 12
          })
        } else {
          data = await fetchMaps({
            page,
            type: selectedType,
            limit: 12
          })
        }
        
        if (data?.maps) {
          setMaps(prev => [...prev, ...data.maps])
          setHasMore(data.hasMore)
        }
      } catch (error) {
        console.error('Error loading more maps:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMoreMaps()
  }, [page, selectedType, searchQuery])

  if (!maps?.length && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No maps found</h2>
        {searchQuery && (
          <p className="text-gray-600">
            Try different keywords or browse our{' '}
            <Link href="/" className="text-blue-500 hover:underline">
              collection of maps
            </Link>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {maps.map((map, index) => {
          if (maps.length === index + 1) {
            return <MapCard ref={lastMapElementRef} key={map.id} map={map} />
          }
          return <MapCard key={map.id} map={map} />
        })}
      </div>

      {loading && (
        <div className="flex justify-center py-4 md:py-8">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
    </div>
  )
}
