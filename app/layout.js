import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'MCPE App',
  description: 'MCPE App - Your Minecraft PE Resource',
  metadataBase: new URL('https://mcpe.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'ru-RU': '/ru',
    },
  },
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
