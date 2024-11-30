import { getAllMaps } from '@/app/lib/db';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

// Define map types for type-specific pages
const mapTypes = [
  'one block',
  'survival',
  'adventure',
  'parkour',
  'pvp',
  'redstone',
  'creation',
  'horror',
  'game'
];

export async function GET(request) {
  // Try to get the sitemap from KV cache first
  const cacheKey = 'sitemap_xml';
  const env = request.cf;
  let sitemap = await env.CACHE.get(cacheKey);
  
  if (!sitemap) {
    // If not in cache, generate the sitemap
    const maps = await getAllMaps(env);
    const baseUrl = 'https://mcpe.app';

    // Generate URLs for static and type-specific pages
    const staticUrls = `
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Generate URLs for type-specific pages
    const typeUrls = mapTypes.map(type => `
  <url>
    <loc>${baseUrl}/?type=${encodeURIComponent(type)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    // Generate URLs for individual map pages
    const mapUrls = maps.map(map => `
  <url>
    <loc>${baseUrl}/map/${map.id}</loc>
    <lastmod>${new Date(map.updated_at || map.created_at || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

    sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${typeUrls}
  ${mapUrls}
</urlset>`;

    // Cache the sitemap for 24 hours
    await env.CACHE.put(cacheKey, sitemap, { expirationTtl: 86400 });
  }

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // Also tell browsers to cache for 24 hours
    }
  });
}
