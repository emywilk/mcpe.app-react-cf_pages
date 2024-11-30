'use server'

import { getMaps } from '../lib/db'

const mockDB = {
  prepare: (query) => ({
    bind: (...params) => ({
      first: async () => ({ total: 0 }),
      all: async () => ({ results: [] })
    })
  })
}

export async function fetchMaps({ page = 1, type = null, limit = 12 } = {}) {
  try {
    const data = await getMaps({
      DB: process.env.DB || mockDB
    }, {
      page,
      type,
      limit
    })

    return {
      maps: data.maps,
      hasMore: data.total > page * limit,
      total: data.total
    }
  } catch (error) {
    console.error('Error fetching maps:', error)
    throw new Error('Failed to fetch maps')
  }
}

export async function searchMaps({ query, page = 1, limit = 12 }) {
  try {
    const env = { DB: process.env.DB || mockDB }
    const searchQuery = `%${query}%`
    
    // First get total count
    const countSql = `
      SELECT COUNT(*) as total
      FROM maps 
      WHERE name LIKE ? OR description LIKE ?
    `
    const totalResult = await env.DB.prepare(countSql)
      .bind(searchQuery, searchQuery)
      .first()
    
    // Then get paginated results
    const sql = `
      SELECT id, name, description, type 
      FROM maps 
      WHERE name LIKE ? OR description LIKE ?
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
    `
    
    const offset = (page - 1) * limit
    const maps = await env.DB.prepare(sql)
      .bind(searchQuery, searchQuery, limit, offset)
      .all()

    const total = totalResult?.total || 0
    
    return {
      maps: maps.results.map(map => ({
        id: map.id,
        title: map.name,
        desc: map.description?.replace(/\\r\\n|\\n/g, '\n'),
        types: map.type ? map.type.split(/\s*,\s*/)
          .map(type => ({
            id: type.trim().toLowerCase(),
            label: type.trim().toLowerCase() === 'pvp' ? 'PvP' :
                   type.trim().toLowerCase() === 'game' ? 'Mini Game' :
                   type.trim().charAt(0).toUpperCase() + type.trim().slice(1).toLowerCase()
          }))
          .filter(type => type.id) : [],
        img: `https://mcpe.app/images/maps/l_size/${map.id}.webp`
      })),
      hasMore: total > page * limit,
      total
    }
  } catch (error) {
    console.error('Error searching maps:', error)
    throw new Error('Failed to search maps')
  }
}
