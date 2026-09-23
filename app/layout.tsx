import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const SITE_URL = 'https://pinpiece.ru'
const TITLE = 'PinPiece — логистический центр грузоперевозок'
const DESCRIPTION =
  'PinPiece — грузоперевозки по городу, межгород и дальние рейсы. Собственный автопарк из 250+ машин, склад ответственного хранения, страховка груза до 10 млн ₽, отслеживание в реальном времени и расчёт стоимости за минуту.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · PinPiece',
  },
  description: DESCRIPTION,
  applicationName: 'PinPiece',
  generator: 'v0.app',
  keywords: [
    'грузоперевозки',
    'перевозка грузов',
    'логистический центр',
    'доставка по городу',
    'межгород',
    'дальние рейсы',
    'сборные грузы',
    'рефрижератор',
    'негабарит',
    'склад ответственного хранения',
    'фулфилмент',
    'автопарк',
  ],
  authors: [{ name: 'PinPiece' }],
  creator: 'PinPiece',
  publisher: 'PinPiece',
  alternates: {
    canonical: SITE_URL,
  },
  category: 'logistics',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'PinPiece',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'PinPiece — логистический центр грузоперевозок',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070b14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
