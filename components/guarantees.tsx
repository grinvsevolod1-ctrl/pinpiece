import { Reveal } from './reveal'
import { ShieldCheck, FileCheck2, BadgeRussianRuble, Clock4 } from 'lucide-react'

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Страхование каждого груза',
    text: 'Ответственность перевозчика застрахована на сумму до 10 млн ₽. Оформляем страховку груза под полную стоимость по запросу.',
  },
  {
    icon: FileCheck2,
    title: 'Договор и полный пакет',
    text: 'Работаем по договору с юрлицами и ИП. ЭДО, счета-фактуры, УПД и транспортные накладные — закрывающие в тот же день.',
  },
  {
    icon: BadgeRussianRuble,
    title: 'Фиксированная цена',
    text: 'Стоимость закрепляем в заявке до старта рейса. Никаких доплат за пробки, ожидание или топливо в пути.',
  },
  {
    icon: Clock4,
    title: 'Компенсация за срыв срока',
    text: 'Если не успели в согласованное окно доставки по нашей вине — компенсируем. Это прописано в договоре.',
  },
]

export function Guarantees() {
  return (
    <section id="guarantees" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">
                Гарантии
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Отвечаем за груз юридически
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Прозрачные условия, официальные документы и реальная ответственность за сохранность
                и сроки. Всё фиксируется в договоре.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-3xl font-extrabold text-foreground">99,4%</dt>
                  <dd className="text-sm text-muted-foreground">рейсов точно в срок</dd>
                </div>
                <div>
                  <dt className="text-3xl font-extrabold text-foreground">10 млн ₽</dt>
                  <dd className="text-sm text-muted-foreground">максимальное покрытие</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-card p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand">
                    <g.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
