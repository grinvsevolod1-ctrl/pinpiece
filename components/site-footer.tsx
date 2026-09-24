import { Logo } from './logo'
import { Mail, MapPin } from 'lucide-react'
import { SOCIALS, TelegramIcon, VkIcon } from './social-icons'

const COLS = [
  {
    title: 'Услуги',
    links: [
      { label: 'По городу', href: '/#services' },
      { label: 'Межгород', href: '/#services' },
      { label: 'Сборные грузы', href: '/#services' },
      { label: 'Рефрижератор', href: '/#services' },
      { label: 'Склад и фулфилмент', href: '/#services' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'Автопарк', href: '/#fleet' },
      { label: 'География', href: '/#coverage' },
      { label: 'Гарантии', href: '/#guarantees' },
      { label: 'Вакансии', href: '/vacancies' },
      { label: 'Отзывы', href: '/#reviews' },
    ],
  },
  {
    title: 'Клиентам',
    links: [
      { label: 'Расчёт стоимости', href: '/#calc' },
      { label: 'Направления и цены', href: '/#directions' },
      { label: 'Вопросы и ответы', href: '/#faq' },
      { label: 'Контакты', href: '/#contacts' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              PinPiece — логистический центр полного цикла. Грузоперевозки по городу, межгород и
              дальние рейсы с собственным автопарком.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="mailto:hello@pinpiece.ru" className="flex items-center gap-2 text-foreground">
                <Mail className="h-4 w-4 text-brand" /> hello@pinpiece.ru
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand" /> Москва, ул. Логистическая, 1
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIALS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIALS.vk}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <VkIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-bold text-foreground">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} PinPiece. Все права защищены.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Политика конфиденциальности
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
