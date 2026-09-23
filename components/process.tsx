import { Reveal } from './reveal'
import { ClipboardList, PackageCheck, Navigation, FileCheck2 } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Заявка и расчёт',
    text: 'Оставляете параметры груза — за минуту считаем стоимость и подбираем машину.',
  },
  {
    icon: PackageCheck,
    title: 'Подача и погрузка',
    text: 'Подаём транспорт в назначенное окно. Экспедитор и грузчики — по запросу.',
  },
  {
    icon: Navigation,
    title: 'Перевозка с трекингом',
    text: 'Следите за грузом онлайн. Диспетчер на связи 24/7 на всём маршруте.',
  },
  {
    icon: FileCheck2,
    title: 'Выгрузка и документы',
    text: 'Аккуратная выгрузка и закрывающие документы через ЭДО в тот же день.',
  },
]

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Как работаем
          </span>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Четыре шага от заявки до подписи на выгрузке
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative">
                  <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card text-brand shadow-lg shadow-black/40">
                    <s.icon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
