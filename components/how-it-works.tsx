const STEPS = [
  {
    n: "01",
    title: "Заявка за минуту",
    text: "Оставляете заказ в приложении или заявку на работу на этой странице — заполнять долгие анкеты не нужно.",
  },
  {
    n: "02",
    title: "Ближайший хаб принимает",
    text: "Заказ уходит в микро-склад рядом, а кандидата приглашаем на оформление в тот же день.",
  },
  {
    n: "03",
    title: "Курьер на линии",
    text: "Оформленный по-белому курьер забирает заказ и везёт получателю с онлайн-трекингом.",
  },
  {
    n: "04",
    title: "Все довольны и с деньгами",
    text: "Клиент получил заказ вовремя, курьер — прозрачную выплату, бизнес — закрытую логистику.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand">Как это работает</p>
        <h2 className="mt-3 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">
          Четыре шага — и заказ, и человек на своём месте
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="relative rounded-3xl border border-border bg-secondary/30 p-7">
              <span className="text-5xl font-extrabold text-brand/15">{step.n}</span>
              <h3 className="mt-3 text-xl font-bold text-brand-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
