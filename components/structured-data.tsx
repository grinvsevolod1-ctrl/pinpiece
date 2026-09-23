import { FAQ_ITEMS } from './faq'

const SITE_URL = 'https://pinpiece.ru'

export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'PinPiece',
        url: SITE_URL,
        logo: `${SITE_URL}/og.png`,
        description:
          'Логистический центр грузоперевозок: доставка по городу, межгород и дальние рейсы, собственный автопарк, склад ответственного хранения.',
        telephone: '+7-800-123-45-67',
        email: 'hello@pinpiece.ru',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Логистическая, 1',
          addressLocality: 'Москва',
          addressCountry: 'RU',
        },
        areaServed: 'RU',
        sameAs: [],
      },
      {
        '@type': 'MovingCompany',
        '@id': `${SITE_URL}/#business`,
        name: 'PinPiece',
        image: `${SITE_URL}/og.png`,
        url: SITE_URL,
        telephone: '+7-800-123-45-67',
        priceRange: '₽₽',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Логистическая, 1',
          addressLocality: 'Москва',
          addressCountry: 'RU',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1240',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'PinPiece',
        inLanguage: 'ru-RU',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
