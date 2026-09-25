'use client'

import { useEffect, useState } from 'react'
import { SOCIALS, TelegramIcon } from './social-icons'
import { reachGoal } from '@/lib/metrika'
import { X } from 'lucide-react'

export function FloatingCta() {
  const [mounted, setMounted] = useState(false)
  const [hint, setHint] = useState(false)

  // Appear after a short delay so it doesn't fight the hero for attention.
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 1200)
    const t2 = setTimeout(() => setHint(true), 2600)
    const t3 = setTimeout(() => setHint(false), 9000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-end gap-3 transition-all duration-500 ${
        mounted ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {hint && (
        <div className="relative mb-1 hidden max-w-[15rem] rounded-2xl border border-border bg-card/95 px-4 py-3 text-sm text-foreground shadow-xl shadow-black/40 backdrop-blur sm:block">
          <button
            type="button"
            aria-label="Скрыть подсказку"
            onClick={() => setHint(false)}
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="font-semibold">Нужен расчёт или консультация?</p>
          <p className="mt-0.5 text-muted-foreground">Ответим онлайн за пару минут.</p>
          <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border bg-card/95" />
        </div>
      )}

      <a
        href={SOCIALS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => reachGoal('telegram_click')}
        aria-label="Онлайн-консультация"
        className="group relative flex h-14 items-center gap-0 overflow-hidden rounded-full bg-brand pl-4 pr-4 text-white shadow-xl shadow-brand/30 transition-all hover:bg-brand-deep sm:hover:pr-5"
      >
        <span className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-brand/40" />
        <TelegramIcon className="h-6 w-6 shrink-0" />
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-base font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[12rem] group-hover:opacity-100">
          Онлайн-консультация
        </span>
      </a>
    </div>
  )
}
