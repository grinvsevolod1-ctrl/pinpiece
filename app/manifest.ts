import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PinPiece — логистический центр грузоперевозок',
    short_name: 'PinPiece',
    description:
      'Грузоперевозки по городу, межгород и дальние рейсы. Собственный автопарк, склад ответственного хранения, расчёт стоимости за минуту.',
    lang: 'ru',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b14',
    theme_color: '#070b14',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
