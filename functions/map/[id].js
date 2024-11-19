export async function onRequest(context) {
    console.log('Function called:', new Date().toISOString());
    console.log('Request URL:', context.request.url);
    
    const { request } = context;
    const url = new URL(request.url);
  
    console.log('Injecting meta tags...');
    
    // Only process /map/[id] routes
    if (!url.pathname.startsWith('/map/')) {
      return context.next();
    }
  
    // Get the response from the origin
    const response = await context.next();
    const contentType = response.headers.get('content-type');
    
    // Only process HTML responses
    if (!contentType || !contentType.includes('text/html')) {
      return response;
    }
  
    // Get URL parameters
    const params = new URLSearchParams(url.search);
    const title = params.get('title') || 'Minecraft Map';
    const desc = params.get('desc') || 'Check out this awesome Minecraft map!';
    const img = params.get('img') || '/images/default-map.webp';
  
    // Create meta tags
    const metaTags = `
      <meta name="description" content="${desc}">
      <meta property="og:title" content="${title} - MineMaps">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${img}">
      <meta property="og:url" content="${url.href}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="MineMaps">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title} - MineMaps">
      <meta name="twitter:description" content="${desc}">
      <meta name="twitter:image" content="${img}">
    `;
  
    // Get the response text
    let html = await response.text();
  
    // Insert meta tags after the <head> tag
    html = html.replace('</head>', `${metaTags}</head>`);
  
    // Return modified response
    return new Response(html, {
      headers: response.headers
    });
  }
  