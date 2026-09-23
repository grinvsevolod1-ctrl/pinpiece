import { Clock, Route, Smartphone, Users } from "lucide-react"

const CARDS = [
  {
    icon: Clock,
    title: "60 минут по городу",
    text: "Умная маршрутизация и микро-склады рядом с клиентом. Заказ едет к получателю, пока конкуренты ищут курьера.",
  },
  {
    icon: Users,
    title: "Люди — не расходник",
    text: "Мы строим бизнес вокруг команды. Каждый курьер оформлен, застрахован и знает свой доход на неделю вперёд.",
  },
  {
    icon: Route,
    title: "Прозрачные выплаты",
    text: "Видно каждую доставку и каждый рубль в приложении. Никаких штрафов из воздуха и серых удержаний.",
  },
  {
    icon: Smartphone,
    title: "Одно приложение",
    text: "Клиент отслеживает заказ, курьер — заказы и деньги, бизнес — всю логистику. Единая платформа PinPiece.",
  },
]

export function ValueProps() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand">Почему PinPiece</p>
        <h2 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">
          Быстрая доставка, которая держится на честной команде
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group rounded-3xl border border-border bg-secondary/40 p-7 transition-colors hover:border-brand hover:bg-white"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
