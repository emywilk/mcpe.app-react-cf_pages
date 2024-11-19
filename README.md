# MCPE.app - Minecraft Maps Platform

A modern web platform for discovering and sharing Minecraft maps, with seamless integration to the MCPE Maps Android app.

## Features

- Browse and discover Minecraft maps
- Dynamic map pages with social media preview support
- Server-side meta tags injection for optimal sharing
- Mobile-first responsive design with Tailwind CSS
- Direct integration with MCPE Maps Android app
- SEO-optimized content

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Deployment**: Cloudflare Pages
- **Serverless Functions**: Cloudflare Workers
- **Carousel**: Swiper
- **Package Manager**: npm/bun

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or bun package manager
- Wrangler CLI (for Cloudflare Pages deployment)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or if using bun
bun install
```

## Development

To run the development server:

```bash
npm run dev
# or
bun run dev
```

This will:
1. Build the React application
2. Start Wrangler Pages dev server
3. Watch for changes

For React-only development without Cloudflare Workers:
```bash
npm run dev-react
# or
bun run dev-react
```

## Building for Production

```bash
npm run build
# or
bun run build
```

This creates a production build in the `build` directory and copies the serverless functions.

## Deployment

Deploy to Cloudflare Pages:

```bash
npm run deploy
# or
bun run deploy
```

## Project Structure

- `/src` - React application source code
  - `/components` - React components including MapPage
- `/public` - Static assets including images
- `/functions` - Cloudflare Workers functions
  - `/map/[id].js` - Server-side meta tags injection for social sharing
- `/build` - Production build output

## Map Sharing

Maps can be shared with custom metadata using URL parameters:
- `title` - The title of the map
- `desc` - Description of the map
- `img` - URL to the map's preview image

Example:
```
https://mcpe.app/map/123?title=My%20Cool%20Map&desc=An%20awesome%20adventure%20map&img=/images/maps/123.jpg
