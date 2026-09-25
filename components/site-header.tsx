'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { reachGoal } from '@/lib/metrika'
import { Menu, X } from 'lucide-react'
import { SOCIALS, TelegramIcon, VkIcon } from './social-icons'

const NAV = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Направления', href: '/#directions' },
  { label: 'Автопарк', href: '/#fleet' },
  { label: 'Вакансии', href: '/vacancies' },
  { label: 'Контакты', href: '/#contacts' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => item.href === '/vacancies' && reachGoal('vacancies_open')}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5">
            <a
              href={SOCIALS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal('telegram_click')}
              aria-label="Telegram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <TelegramIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href={SOCIALS.vk}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal('vk_click')}
              aria-label="ВКонтакте"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <VkIcon className="h-4.5 w-4.5" />
            </a>
          </div>
          <a
            href="/#calc"
            onClick={() => reachGoal('calc_start')}
            className={cn(
              buttonVariants(),
              'h-10 rounded-full bg-brand px-5 font-semibold text-white hover:bg-brand-deep',
            )}
          >
            Рассчитать
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (item.href === '/vacancies') reachGoal('vacancies_open')
                  setOpen(false)
                }}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground/90"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#calc"
              onClick={() => {
                reachGoal('calc_start')
                setOpen(false)
              }}
              className={cn(
                buttonVariants(),
                'mt-4 h-11 rounded-full bg-brand font-semibold text-white hover:bg-brand-deep',
              )}
            >
              Рассчитать стоимость
            </a>
            <div className="mt-4 flex gap-3">
              <a
                href={SOCIALS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal('telegram_click')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground"
              >
                <TelegramIcon className="h-5 w-5" /> Telegram
              </a>
              <a
                href={SOCIALS.vk}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal('vk_click')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground"
              >
                <VkIcon className="h-5 w-5" /> ВКонтакте
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
