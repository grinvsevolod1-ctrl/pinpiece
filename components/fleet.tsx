import Image from 'next/image'
import { Reveal } from './reveal'

const VEHICLES = [
  { name: '«Газель»', cap: 'до 1,5 т', vol: '16 м³', use: 'Город, малые партии' },
  { name: '5-тонник', cap: 'до 5 т', vol: '36 м³', use: 'Область, мебель, техника' },
  { name: 'Фура 20 т', cap: 'до 20 т', vol: '92 м³', use: 'Межгород, паллеты' },
  { name: 'Рефрижератор', cap: 'до 20 т', vol: '82 м³', use: 'Температурный груз' },
]

export function Fleet() {
  return (
    <section id="fleet" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Автопарк
            </span>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Свои машины — свои сроки и цены
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Более 250 единиц техники в собственности. Не зависим от подрядчиков, поэтому держим
              стоимость ниже рынка и отвечаем за каждый рейс.
            </p>
          </Reveal>

          <Reveal>
            <div className="group relative h-72 overflow-hidden rounded-3xl border border-border sm:h-96 lg:h-full">
              <Image
                src="/truck-semi.png"
                alt="Магистральная фура PinPiece"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <div className="text-sm font-semibold uppercase tracking-widest text-signal">
                  Флагман парка
                </div>
                <div className="mt-1 text-2xl font-extrabold text-foreground">
                  Магистральные тягачи
                </div>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Тентованные и изотермические полуприцепы для дальних плеч с GPS-контролем груза.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.06}>
              <div className="group relative h-56 overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/van-city.png"
                  alt="Городской фургон PinPiece"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <div className="text-xl font-extrabold text-foreground">Городская доставка</div>
                  <p className="text-sm text-muted-foreground">Компактно, быстро, точно в окно</p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {VEHICLES.map((v, i) => (
                <Reveal key={v.name} delay={0.1 + i * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50">
                    <div className="text-lg font-bold text-foreground">{v.name}</div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span className="font-semibold text-brand">{v.cap}</span>
                      <span className="text-muted-foreground">{v.vol}</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{v.use}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
