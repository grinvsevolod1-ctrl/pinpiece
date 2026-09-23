import { Logo } from './logo'
import { Phone, Mail, MapPin } from 'lucide-react'

const COLS = [
  {
    title: 'Услуги',
    links: [
      { label: 'По городу', href: '#services' },
      { label: 'Межгород', href: '#services' },
      { label: 'Сборные грузы', href: '#services' },
      { label: 'Рефрижератор', href: '#services' },
      { label: 'Склад и фулфилмент', href: '#services' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'Автопарк', href: '#fleet' },
      { label: 'География', href: '#coverage' },
      { label: 'Гарантии', href: '#guarantees' },
      { label: 'Отрасли', href: '#industries' },
      { label: 'Отзывы', href: '#reviews' },
    ],
  },
  {
    title: 'Клиентам',
    links: [
      { label: 'Расчёт стоимости', href: '#calc' },
      { label: 'Направления и цены', href: '#directions' },
      { label: 'Вопросы и ответы', href: '#faq' },
      { label: 'Контакты', href: '#contacts' },
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
              <a href="tel:+78001234567" className="flex items-center gap-2 text-foreground">
                <Phone className="h-4 w-4 text-brand" /> 8 800 123-45-67
              </a>
              <a href="mailto:hello@pinpiece.ru" className="flex items-center gap-2 text-foreground">
                <Mail className="h-4 w-4 text-brand" /> hello@pinpiece.ru
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand" /> Москва, ул. Логистическая, 1
              </div>
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
