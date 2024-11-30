import { getAllMaps, getUniqueMapTypes } from "@/app/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 86400; // 24 hours

export async function GET(request, context) {
  try {
    // Get DB from either context.env (Cloudflare) or process.env (local)
    const env = context?.env || { DB: process.env.DB };
    const maps = await getAllMaps(env);
    const mapTypes = await getUniqueMapTypes(env);
    const baseUrl = "https://mcpe.app";

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
    const typeUrls = mapTypes
      .map(
        (type) => `
  <url>
    <loc>${baseUrl}/?type=${encodeURIComponent(type)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("");

    // Generate URLs for individual map pages
    const mapUrls = (maps || [])
      .map(
        (map) => `
  <url>
    <loc>${baseUrl}/map/${map.id}</loc>
    <lastmod>${new Date(
      map.updated_at || map.created_at || Date.now()
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${typeUrls}
  ${mapUrls}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400", // Tell browsers to cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(`Error generating sitemap: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
