// Transform map types with consistent formatting
const transformMapTypes = (type) => {
  return type ? type.split(/\s*,\s*/)
    .map(type => ({
      id: type.trim().toLowerCase(),
      label: type.trim().toLowerCase() === 'pvp' ? 'PvP' :
             type.trim().toLowerCase() === 'game' ? 'Mini Game' :
             type.trim().charAt(0).toUpperCase() + type.trim().slice(1).toLowerCase()
    }))
    .filter(type => type.id) : [];
};

// Format map data for response
const formatMapData = (map) => ({
  id: map.id,
  title: map.name,
  desc: map.description?.replace(/\\r\\n|\\n/g, '\n'),
  types: transformMapTypes(map.type),
  img: `https://mcpe.app/images/maps/l_size/${map.id}.webp`
});

// Get maps with pagination and optional type filter
export async function getMaps(env, { page = 1, type = null, limit = 12 } = {}) {
  const offset = (page - 1) * limit;
  let query = 'SELECT id, name, description, type FROM maps';
  let countQuery = 'SELECT COUNT(*) as total FROM maps';
  const params = [];

  if (type) {
    query += ' WHERE type LIKE ?';
    countQuery += ' WHERE type LIKE ?';
    params.push(`%${type}%`);
  }

  query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  // Get total count for pagination
  const totalResult = await env.DB.prepare(countQuery)
    .bind(...(type ? [`%${type}%`] : []))
    .first();
  const totalMaps = totalResult?.total || 0;

  const maps = await env.DB.prepare(query)
    .bind(...params)
    .all();

  return {
    maps: maps.results.map(formatMapData),
    total: totalMaps,
    page,
    hasMore: totalMaps > (page * limit)
  };
}

// Get single map by ID
export async function getMapById(env, mapId) {
  const map = await env.DB.prepare(
    'SELECT id, name, description, type FROM maps WHERE id = ?'
  )
  .bind(mapId)
  .first();
  
  return map ? formatMapData(map) : null;
}

// Get all maps for sitemap
export async function getAllMaps(env) {
  const maps = await env.DB.prepare('SELECT id FROM maps ORDER BY id DESC')
    .all();
  return maps.results;
}

// Search maps by query
export async function searchMaps(env, query, { page = 1, limit = 12 } = {}) {
  if (!query) return { maps: [], total: 0 };
  
  const offset = (page - 1) * limit;
  const searchQuery = `%${query}%`;

  // First get total count
  const countResult = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM maps WHERE name LIKE ? OR description LIKE ?'
  )
  .bind(searchQuery, searchQuery)
  .first();
  
  // Then get paginated results
  const maps = await env.DB.prepare(
    'SELECT id, name, description, type FROM maps WHERE name LIKE ? OR description LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?'
  )
  .bind(searchQuery, searchQuery, limit, offset)
  .all();
  
  return {
    maps: maps.results.map(formatMapData),
    total: countResult?.total || 0
  };
}
