import { getAllMaps } from './utils/db';

export async function onRequest(context) {
  // Try to get the sitemap from KV cache first
  const cacheKey = 'sitemap_xml';
  let sitemap = await context.env.CACHE.get(cacheKey);
  
  if (!sitemap) {
    // If not in cache, generate the sitemap
    const maps = await getAllMaps(context.env);
    const baseUrl = 'https://mcpe.app';

    sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  </url>
  <url>
    <loc>${baseUrl}/maps</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${maps.map(map => `
  <url>
    <loc>${baseUrl}/map/${map.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
</urlset>`;

    // Cache the sitemap for 24 hours
    await context.env.CACHE.put(cacheKey, sitemap, { expirationTtl: 86400 });
  }

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // Also tell browsers to cache for 24 hours
    }
  });
}
