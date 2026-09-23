import { Logo } from "./logo"

const COLS = [
  {
    title: "Компания",
    links: ["О PinPiece", "Вакансии", "Новости", "Контакты"],
  },
  {
    title: "Сервисы",
    links: ["Доставка по городу", "Фулфилмент", "Хранение", "API для бизнеса"],
  },
  {
    title: "Документы",
    links: ["Политика конфиденциальности", "Оферта", "Реквизиты", "Безопасность"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-extrabold">PinPiece</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Белая логистика города. Быстрая доставка и честная работа для каждого — от курьера до менеджера.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/75 transition-colors hover:text-signal">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} PinPiece. Все права защищены.</span>
          <span>ООО «ПинПис» · ИНН 7700000000 · pinpiece.ru</span>
        </div>
      </div>
    </footer>
  )
}
