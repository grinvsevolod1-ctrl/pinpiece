import { Reveal } from './reveal'
import {
  ShoppingCart,
  Pill,
  Factory,
  UtensilsCrossed,
  Hammer,
  Shirt,
} from 'lucide-react'

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    title: 'E-commerce и ритейл',
    text: 'Доставка на маркетплейсы (WB, Ozon, Я.Маркет), развоз по магазинам, фулфилмент и возвраты.',
  },
  {
    icon: Pill,
    title: 'Фарма и медицина',
    text: 'Перевозки с температурным режимом и полным документооборотом. Соблюдаем холодовую цепь.',
  },
  {
    icon: Factory,
    title: 'Производство',
    text: 'Снабжение сырьём и вывоз готовой продукции. Регулярные рейсы по графику под ваш цикл.',
  },
  {
    icon: UtensilsCrossed,
    title: 'HoReCa и продукты',
    text: 'Рефрижераторы для продуктов питания. Быстрая доставка в рестораны, кафе и сети.',
  },
  {
    icon: Hammer,
    title: 'Стройка и оборудование',
    text: 'Стройматериалы, спецтехника и негабарит. Манипуляторы, тралы, согласование маршрутов.',
  },
  {
    icon: Shirt,
    title: 'Лёгкая промышленность',
    text: 'Одежда, текстиль, обувь. Сборные грузы и магистральные рейсы между регионами.',
  },
]

export function Industries() {
  return (
    <section id="industries" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">Отрасли</span>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Знаем специфику вашего бизнеса
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Для каждой отрасли — свои требования к упаковке, режиму и документам. Мы учитываем их
            заранее.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-brand/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <it.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
