import { Reveal } from './reveal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const ROUTES = [
  { from: 'Москва', to: 'Санкт-Петербург', km: '710 км', time: '1 сутки', price: 'от 18 900 ₽' },
  { from: 'Москва', to: 'Казань', km: '820 км', time: '1 сутки', price: 'от 21 500 ₽' },
  { from: 'Москва', to: 'Екатеринбург', km: '1790 км', time: '2 суток', price: 'от 39 800 ₽' },
  { from: 'Москва', to: 'Краснодар', km: '1350 км', time: '2 суток', price: 'от 31 200 ₽' },
  { from: 'Санкт-Петербург', to: 'Нижний Новгород', km: '1080 км', time: '2 суток', price: 'от 27 400 ₽' },
  { from: 'Екатеринбург', to: 'Новосибирск', km: '1520 км', time: '2 суток', price: 'от 35 600 ₽' },
]

export function Directions() {
  return (
    <section id="directions" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Направления и цены
            </span>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Популярные маршруты
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Ориентировочная стоимость магистрального рейса до 20 тонн. Точную цену рассчитаем под
              ваш груз.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#calc"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-11 rounded-full border-border bg-card px-6 font-semibold text-foreground hover:bg-card/70',
              )}
            >
              Рассчитать свой маршрут
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
            <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr_auto] gap-4 border-b border-border px-7 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground lg:grid">
              <span>Маршрут</span>
              <span>Расстояние</span>
              <span>Срок</span>
              <span>Стоимость</span>
              <span className="w-24" />
            </div>
            <ul>
              {ROUTES.map((r) => (
                <li
                  key={`${r.from}-${r.to}`}
                  className="grid grid-cols-1 gap-2 border-b border-border/60 px-7 py-5 transition-colors last:border-0 hover:bg-brand/[0.04] lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-4"
                >
                  <div className="flex items-center gap-2 text-base font-bold text-foreground">
                    {r.from}
                    <ArrowRight className="h-4 w-4 text-brand" />
                    {r.to}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="lg:hidden">Расстояние: </span>
                    {r.km}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="lg:hidden">Срок: </span>
                    {r.time}
                  </div>
                  <div className="text-base font-bold text-foreground">{r.price}</div>
                  <a
                    href="#calc"
                    className="justify-self-start rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white lg:justify-self-end"
                  >
                    Заказать
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
