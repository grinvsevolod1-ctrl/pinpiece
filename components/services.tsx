import { Reveal } from './reveal'
import { Building2, Route, Boxes, Warehouse, Snowflake, Container, ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Building2,
    title: 'Перевозки по городу',
    text: 'Доставка от 1 часа по городу и области. Экспедитор, грузчики и подъём на этаж по запросу.',
    tag: 'от 1 ч',
  },
  {
    icon: Route,
    title: 'Межгород и дальние рейсы',
    text: 'Магистральные перевозки по всей России и СНГ. Прямые рейсы без перегрузок в пути.',
    tag: 'до 5000 км',
  },
  {
    icon: Boxes,
    title: 'Сборные грузы',
    text: 'Платите только за своё место в фуре. Идеально для партий, которые не заполняют машину целиком.',
    tag: 'LTL',
  },
  {
    icon: Warehouse,
    title: 'Склад и фулфилмент',
    text: 'Ответственное хранение, комплектация заказов, кросс-докинг и обработка возвратов.',
    tag: '3PL',
  },
  {
    icon: Snowflake,
    title: 'Рефрижераторные перевозки',
    text: 'Температурный режим от −25 до +25 °C с контролем на всём маршруте. Продукты, фарма, косметика.',
    tag: '−25…+25 °C',
  },
  {
    icon: Container,
    title: 'Негабарит и спецтехника',
    text: 'Перевозим тяжёлое и нестандартное: оборудование, стройматериалы, технику. Согласуем маршрут.',
    tag: '20+ т',
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">Услуги</span>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Один центр — весь спектр грузоперевозок
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Подбираем формат под задачу и бюджет — от одной коробки по городу до фуры через всю
            страну.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-6 flex items-center gap-1.5 text-xl font-bold text-foreground">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 -translate-y-0.5 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
