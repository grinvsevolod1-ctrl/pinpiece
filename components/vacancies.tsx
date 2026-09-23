import { Bike, Car, Footprints, Boxes, Headset, Briefcase, ArrowUpRight } from "lucide-react"

const JOBS = [
  {
    icon: Footprints,
    role: "Пеший курьер",
    salary: "от 65 000 ₽",
    tags: ["Смены от 4 ч", "Без опыта"],
    hot: true,
  },
  {
    icon: Bike,
    role: "Вело / мото курьер",
    salary: "от 90 000 ₽",
    tags: ["Свой транспорт", "Бонусы за скорость"],
    hot: true,
  },
  {
    icon: Car,
    role: "Автокурьер",
    salary: "от 120 000 ₽",
    tags: ["Компенсация ГСМ", "Крупные заказы"],
    hot: true,
  },
  {
    icon: Boxes,
    role: "Кладовщик хаба",
    salary: "от 70 000 ₽",
    tags: ["Тёплый склад", "График 2/2"],
  },
  {
    icon: Headset,
    role: "Диспетчер",
    salary: "от 75 000 ₽",
    tags: ["Удалённо", "Обучение"],
  },
  {
    icon: Briefcase,
    role: "Менеджер хаба",
    salary: "от 130 000 ₽",
    tags: ["Рост из курьеров", "Премии за KPI"],
  },
]

export function Vacancies() {
  return (
    <section id="vacancies" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">Открытые вакансии</p>
            <h2 className="mt-3 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl">
              Нам нужны все. Особенно — курьеры
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Мы растём в 24 городах и набираем людей ежедневно. Все позиции — с белым оформлением.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((job) => (
            <a
              key={job.role}
              href="#apply"
              className="group relative flex flex-col rounded-3xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
            >
              {job.hot && (
                <span className="absolute right-6 top-6 rounded-full bg-signal px-3 py-1 text-xs font-bold text-signal-ink">
                  Срочно
                </span>
              )}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <job.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-ink">{job.role}</h3>
              <div className="mt-1 text-2xl font-extrabold text-brand">{job.salary}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-brand-ink/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand">
                Откликнуться
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
