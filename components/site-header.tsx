"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"

const NAV = [
  { label: "Как это работает", href: "#how" },
  { label: "Вакансии", href: "#vacancies" },
  { label: "Бизнесу", href: "#business" },
  { label: "О компании", href: "#about" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 text-white" aria-label="PinPiece — на главную">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-extrabold tracking-tight">PinPiece</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-sm font-semibold text-white/70">RU</span>
          <a
            href="#apply"
            className="rounded-full bg-signal px-5 py-2 text-sm font-bold text-signal-ink transition-transform hover:-translate-y-0.5"
          >
            Стать курьером
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-base font-medium text-white/90"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#apply"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-signal px-5 py-3 text-center text-sm font-bold text-signal-ink"
          >
            Стать курьером
          </a>
        </div>
      )}
    </header>
  )
}
