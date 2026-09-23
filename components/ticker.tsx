const ITEMS = [
  { value: "12 480", label: "доставок сегодня" },
  { value: "1 930", label: "курьеров на линии" },
  { value: "58 мин", label: "средняя доставка" },
  { value: "до 4 200 ₽", label: "выплата курьеру в день" },
  { value: "каждую пятницу", label: "белая зарплата" },
  { value: "24 города", label: "работаем в России" },
  { value: "0 ₽", label: "серых схем" },
  { value: "4.9 / 5", label: "оценка клиентов" },
]

export function Ticker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative border-t border-white/10 bg-brand-deep">
      <div className="flex overflow-hidden py-4">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((item, i) => (
            <div key={i} className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
              <span className="text-lg font-extrabold text-signal">{item.value}</span>
              <span className="text-sm text-white/70">{item.label}</span>
              <span aria-hidden className="ml-8 text-white/20">
                /
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
