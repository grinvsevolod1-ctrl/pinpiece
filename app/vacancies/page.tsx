import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { CareerForm } from '@/components/career-form'
import {
  Truck,
  MapPin,
  Wallet,
  GraduationCap,
  ShieldCheck,
  Clock,
  Fuel,
  CalendarCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Работа водителем — вакансии по всей России',
  description:
    'Ищем водителей категорий B, C, CE, E, курьеров и стажёров без опыта от 18 лет по всем городам России. Официальное трудоустройство, белая зарплата, еженедельные выплаты, свежий автопарк и обучение с нуля.',
  alternates: { canonical: '/vacancies' },
  openGraph: {
    title: 'Работа водителем в PinPiece — вакансии по всей России',
    description:
      'Водители кат. B/C/CE/E, курьеры и стажёры без опыта от 18 лет. Белая зарплата, еженедельные выплаты, обучение.',
    url: '/vacancies',
  },
}

const POSITIONS = [
  {
    title: 'Водитель категории B',
    tag: 'Город',
    desc: 'Газель, фургон, каблук. Доставка по городу и области, ежедневные маршруты.',
    salary: 'от $1000',
  },
  {
    title: 'Водитель категории C',
    tag: '5–10 тонн',
    desc: 'Среднетоннажные машины, региональные рейсы, работа с ЭДО и документами.',
    salary: 'от $1500',
  },
  {
    title: 'Водитель категории CE / E',
    tag: 'Дальнобой',
    desc: 'Фуры и сцепки, межгород и дальние рейсы. Свежие тягачи, топливные карты.',
    salary: 'от $2000',
  },
  {
    title: 'Водитель-экспедитор',
    tag: 'Город / межгород',
    desc: 'Перевозка с сопровождением груза, приём и сдача по накладным.',
    salary: 'от $1200',
  },
  {
    title: 'Стажёр без опыта',
    tag: 'Обучение',
    desc: 'Возьмём без опыта от 18 лет. Наставник, обучение маршрутам и документам.',
    salary: 'от $800',
  },
  {
    title: 'Курьер на личном авто',
    tag: 'Гибкий график',
    desc: 'Доставка по городу на своём автомобиле. Компенсация топлива, свободный график.',
    salary: 'от $900',
  },
]

const PERKS = [
  { icon: Wallet, title: 'Белая зарплата', desc: 'Официальное трудоустройство по ТК РФ, выплаты без задержек.' },
  { icon: CalendarCheck, title: 'Выплаты каждую неделю', desc: 'Аванс и понятная система расчёта за рейсы и часы.' },
  { icon: GraduationCap, title: 'Берём без опыта', desc: 'Обучаем с нуля от 18 лет: наставник, маршруты, документы.' },
  { icon: MapPin, title: 'Все города России', desc: 'Вакансии в каждом регионе — работайте рядом с домом.' },
  { icon: Truck, title: 'Свежий автопарк', desc: 'Технически исправные машины 2021–2025 годов, ТО за наш счёт.' },
  { icon: Fuel, title: 'Топливные карты', desc: 'Заправки без личных расходов, оплата платных дорог.' },
  { icon: ShieldCheck, title: 'Поддержка 24/7', desc: 'Диспетчер и техпомощь на линии в любое время суток.' },
  { icon: Clock, title: 'Гибкий график', desc: 'Город, межгород или вахта — подберём под вас.' },
]

export default function VacanciesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero-highway.png"
              alt=""
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          </div>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
                <Truck className="h-4 w-4" /> Набор в команду
              </span>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black tracking-tight text-foreground sm:text-6xl">
                Работа для водителей по всей России
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                Приглашаем водителей категорий B, C, CE, E, курьеров и стажёров без опыта.
                От 18 лет, с опытом и без — обучим с нуля. Официально, с белой зарплатой и
                еженедельными выплатами.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#apply"
                  className="inline-flex h-12 items-center rounded-full bg-brand px-7 text-base font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  Оставить анкету
                </a>
                <a
                  href="#positions"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-base font-semibold text-foreground transition-colors hover:border-brand"
                >
                  Смотреть вакансии
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Positions */}
        <section id="positions" className="scroll-mt-24 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">Открытые вакансии</span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Кого мы ищем
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {POSITIONS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-brand/50">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
                        {p.tag}
                      </span>
                      <span className="text-sm font-bold text-signal">{p.salary}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-foreground">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    <a
                      href="#apply"
                      className="mt-5 inline-flex items-center text-sm font-semibold text-brand hover:underline"
                    >
                      Откликнуться →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="border-t border-border/60 bg-[#0a0f1c] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">Условия</span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Почему у нас хорошо работать
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PERKS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.04}>
                  <div className="h-full rounded-3xl border border-border bg-card/60 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="scroll-mt-24 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-widest text-brand">Анкета</span>
                <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Оставьте заявку — перезвоним в течение дня
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  Заполните короткую анкету. Рекрутёр расскажет про условия, график и оформление.
                  Опыт не обязателен — обучаем с нуля.
                </p>
                <ul className="mt-8 space-y-3">
                  {['От 18 лет, гражданство РФ или разрешение на работу', 'С опытом и без — берём и обучаем', 'Работаем во всех городах России', 'Помощь с медсправкой и оформлением'].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-foreground/90">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-signal" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <CareerForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
