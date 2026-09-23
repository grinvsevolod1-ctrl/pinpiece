import { FileCheck2, Wallet, HeartPulse, Landmark } from "lucide-react"

const ITEMS = [
  { icon: FileCheck2, title: "Договор ТК РФ", text: "Или самозанятость — на выбор, всё официально" },
  { icon: Wallet, title: "Белая зарплата", text: "Полностью на карту, с отчислениями и справкой 2-НДФЛ" },
  { icon: HeartPulse, title: "ДМС и страховка", text: "Медстраховка и страхование жизни на линии" },
  { icon: Landmark, title: "Пенсия и стаж", text: "Идут отчисления в ПФР и налоговую с первого дня" },
]

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-none bg-border sm:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="bg-white px-5 py-7 sm:px-7">
            <item.icon className="h-7 w-7 text-brand" strokeWidth={2.2} />
            <h3 className="mt-4 text-base font-bold text-brand-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
