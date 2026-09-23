const STATS = [
  { value: "1 930+", label: "курьеров оформлено официально" },
  { value: "24", label: "города присутствия" },
  { value: "58 мин", label: "средняя доставка по городу" },
  { value: "100%", label: "белых выплат без исключений" },
]

export function Stats() {
  return (
    <section id="about" className="bg-brand py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl font-extrabold tracking-tight text-signal sm:text-5xl">{stat.value}</div>
            <div className="mt-2 text-sm text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
