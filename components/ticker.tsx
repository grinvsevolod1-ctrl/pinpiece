import { ArrowRight } from 'lucide-react'

const ROUTES = [
  ['Москва', 'Санкт-Петербург'],
  ['Екатеринбург', 'Казань'],
  ['Новосибирск', 'Красноярск'],
  ['Краснодар', 'Ростов-на-Дону'],
  ['Нижний Новгород', 'Самара'],
  ['Владивосток', 'Хабаровск'],
  ['Уфа', 'Челябинск'],
  ['Пермь', 'Тюмень'],
]

export function Ticker() {
  const items = [...ROUTES, ...ROUTES]
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-4">
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {items.map((r, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-sm font-semibold text-foreground">{r[0]}</span>
            <ArrowRight className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-muted-foreground">{r[1]}</span>
            <span className="ml-4 h-1.5 w-1.5 rounded-full bg-signal" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
