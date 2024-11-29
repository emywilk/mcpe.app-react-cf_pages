import { getMapById } from '../utils/db';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Only process /map/[id] routes
  if (!url.pathname.startsWith('/map/')) {
    return context.next();
  }

  // Extract map ID from URL
  const mapId = url.pathname.split('/')[2];
  
  // Check if this is an API request (Accept: application/json)
  const acceptHeader = request.headers.get('Accept') || '';
  const wantsJson = acceptHeader.includes('application/json');

  try {
    // Try to get map data from D1
    const mapData = await getMapById(env, mapId);

    // If no data found in D1, use URL parameters or return 404
    if (!mapData) {
      if (wantsJson) {
        return new Response(JSON.stringify({ error: 'Map not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const params = new URLSearchParams(url.search);
      const fallbackData = {
        title: params.get('title') || 'Minecraft Map',
        desc: params.get('desc') || 'Check out this awesome Minecraft map!',
        img: params.get('img') || '/images/default-map.webp',
        types: []
      };

      if (wantsJson) {
        return new Response(JSON.stringify(fallbackData), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Redirect to the maps page if no data and not an API request
      return Response.redirect('https://mcpe.app/maps');
    }

    // Return JSON if requested
    if (wantsJson) {
      return new Response(JSON.stringify(mapData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Otherwise, let the frontend handle the route
    return context.next();
  } catch (error) {
    console.error('Error fetching map:', error);
    
    if (wantsJson) {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Redirect to maps page on error for non-API requests
    return Response.redirect('https://mcpe.app/maps');
  }
}