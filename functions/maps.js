import { getMaps } from './utils/db';

export async function onRequest(context) {
  const { request, env } = context;
  const acceptHeader = request.headers.get('Accept') || '';
  
  // Only handle JSON requests, let normal page requests pass through
  if (!acceptHeader.includes('application/json')) {
    return context.next();
  }

  // Handle API request
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const type = url.searchParams.get('type');

  try {
    const { maps, total, totalPages } = await getMaps(env, { page, type });

    return new Response(JSON.stringify({
      maps,
      hasMore: page < totalPages,
      pagination: {
        total,
        page,
        totalPages
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('D1 query error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      maps: [],
      hasMore: false,
      pagination: {
        total: 0,
        page,
        totalPages: 0
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
