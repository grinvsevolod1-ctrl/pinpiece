import { Reveal } from './reveal'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Алексей Морозов',
    role: 'Логист, «ГрандРитейл»',
    text: 'Возят на наши распределительные центры уже второй год. Ни одного срыва по срокам, машины всегда подают вовремя. Документы приходят в тот же день.',
    initials: 'АМ',
  },
  {
    name: 'Ирина Соколова',
    role: 'Владелец интернет-магазина',
    text: 'Подключили фулфилмент — теперь не думаю про склад и упаковку вообще. Заказы уезжают на маркетплейсы день в день, возвраты обрабатывают сами.',
    initials: 'ИС',
  },
  {
    name: 'Дмитрий Кузнецов',
    role: 'Директор по закупкам',
    text: 'Возили негабаритное оборудование из Екатеринбурга. Согласовали маршрут, сопровождение, всё привезли без единой царапины. Рекомендую.',
    initials: 'ДК',
  },
]

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="border-y border-border/60 bg-[#0a0f1c] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">
                Отзывы
              </span>
              <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Клиенты остаются с нами
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-signal text-signal" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground">4.9 из 5</span>
                <span className="text-muted-foreground"> · 1 240 оценок</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <Quote className="h-8 w-8 text-brand/40" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                    {r.initials}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
