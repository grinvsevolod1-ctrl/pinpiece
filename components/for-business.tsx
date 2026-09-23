import Image from "next/image"
import { Check } from "lucide-react"

const POINTS = [
  "Закрытые документы: акты, счета, ЭДО — всё по-белому",
  "Интеграция по API за 1 день или готовые модули для маркетплейсов",
  "Микро-склады и фулфилмент: храним, комплектуем, доставляем",
  "Персональный менеджер и SLA по срокам доставки",
]

export function ForBusiness() {
  return (
    <section id="business" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Бизнесу</p>
          <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">
            Логистика, за которую не стыдно перед налоговой
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground">
            Подключите доставку, фулфилмент и хранение в одном окне. Полностью официальный подрядчик —
            прозрачные документы и предсказуемые сроки для вашего бизнеса.
          </p>

          <ul className="mt-8 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm text-brand-ink">{point}</span>
              </li>
            ))}
          </ul>

          <a
            href="#apply"
            className="mt-9 inline-flex rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Обсудить доставку для бизнеса
          </a>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border">
          <Image
            src="/warehouse.png"
            alt="Логистический хаб PinPiece с сотрудниками и посылками"
            width={720}
            height={620}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
