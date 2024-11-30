import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'MineMaps - Download Free Minecraft PE Maps & One Block Maps',
  description: 'Download free Minecraft PE maps instantly! Browse hundreds of amazing maps including One Block, Adventure, Parkour, and Mini Games for MCPE. Easy one-tap installation.',
  metadataBase: new URL('https://mcpe.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'ru-RU': '/ru',
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/minemaps_logo.webp', sizes: '180x180', type: 'image/webp' },
      { url: '/images/minemaps_logo_hd.webp', sizes: '512x512', type: 'image/webp' }
    ],
    apple: [
      { url: '/images/minemaps_logo.webp', sizes: '180x180', type: 'image/webp' }
    ]
  },
  appleWebApp: {
    title: 'MineMaps',
    statusBarStyle: 'default',
    capable: true
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#16a34a' },
    { media: '(prefers-color-scheme: dark)', color: '#15803d' }
  ],
  colorScheme: 'light dark'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'url': 'https://mcpe.app/',
              'potentialAction': [{
                '@type': 'SearchAction',
                'target': {
                  '@type': 'EntryPoint',
                  'urlTemplate': 'https://mcpe.app/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }]
            })
          }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
