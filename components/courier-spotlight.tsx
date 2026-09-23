import Image from "next/image"
import { Check } from "lucide-react"

const PERKS = [
  "Официальный доход до 120 000 ₽ в месяц",
  "Выплаты каждую неделю, аванс — по запросу",
  "Гибкий график: смены от 4 часов, выход когда удобно",
  "Оплачиваем связь, экипировку и термосумку",
  "Бесплатное обучение и наставник на первую неделю",
  "Карьерный рост: курьер → бригадир → менеджер хаба",
]

export function CourierSpotlight() {
  return (
    <section className="bg-brand-ink py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="/courier.png"
              alt="Курьер PinPiece в фирменной форме с термосумкой"
              width={720}
              height={820}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-signal px-5 py-4 text-signal-ink shadow-xl sm:right-6">
            <div className="text-2xl font-extrabold leading-none">до 4 200 ₽</div>
            <div className="text-xs font-semibold">за смену на линии</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-widest text-signal">Курьер — главный человек</p>
          <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Без курьеров нет PinPiece. Поэтому им — по-белому
          </h2>
          <p className="mt-5 max-w-lg text-white/75">
            В обычной доставке курьер — самое незащищённое звено. У нас наоборот: курьер — фундамент компании.
            Мы оформляем официально, платим прозрачно и держимся за каждого.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-signal-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm text-white/90">{perk}</span>
              </li>
            ))}
          </ul>

          <a
            href="#apply"
            className="mt-9 inline-flex rounded-full bg-signal px-7 py-3.5 text-base font-bold text-signal-ink transition-transform hover:-translate-y-0.5"
          >
            Хочу в команду курьеров
          </a>
        </div>
      </div>
    </section>
  )
}
