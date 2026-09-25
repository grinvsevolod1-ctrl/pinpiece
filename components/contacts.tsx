'use client'

import { useState } from 'react'
import { Reveal } from './reveal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { reachGoal } from '@/lib/metrika'
import { submitLead, type LeadResult } from '@/lib/lead'
import { formatContactMessage } from '@/lib/telegram'
import { LeadSent } from './lead-sent'
import { Mail, MapPin, Clock, Building2, User } from 'lucide-react'
import { SOCIALS, TelegramIcon, VkIcon } from './social-icons'

const CONTACTS = [
  { icon: Mail, label: 'Почта', value: 'hello@pinpiece.ru', href: 'mailto:hello@pinpiece.ru' },
  { icon: MapPin, label: 'Адрес хаба', value: 'Москва, ул. Логистическая, 1', href: null },
  { icon: Clock, label: 'Режим работы', value: 'Диспетчерская 24/7', href: null },
]

export function Contacts() {
  const [isCompany, setIsCompany] = useState(false)
  const [result, setResult] = useState<LeadResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const unp = String(fd.get('unp') ?? '').trim()
    const route = String(fd.get('route') ?? '').trim()
    const cargo = String(fd.get('cargo') ?? '').trim()

    if (name.length < 2) {
      setErrorMsg('Укажите имя')
      return
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Укажите корректный телефон')
      return
    }
    if (isCompany && unp.replace(/\D/g, '').length < 9) {
      setErrorMsg('Укажите УНП / ИНН (мин. 9 цифр)')
      return
    }

    const lead = {
      name,
      phone,
      isCompany,
      company: isCompany ? company : undefined,
      unp: isCompany ? unp : undefined,
      route,
      cargo,
    }

    setResult(
      submitLead({
        type: 'contact',
        text: formatContactMessage(lead),
        payload: {
          name,
          phone,
          isCompany,
          company: lead.company,
          unp: lead.unp,
          Маршрут: route,
          Груз: cargo,
        },
        goal: 'contact_submit',
        goalParams: { isCompany },
      }),
    )
  }

  return (
    <section id="contacts" className="border-t border-border/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">Контакты</span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Оставьте заявку — перезвоним за 15 минут
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Расскажите про груз и маршрут — мы соберём заявку в сообщение и откроем чат с менеджером в
                Telegram. Он рассчитает стоимость и подберёт машину.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {CONTACTS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                      {c.href ? (
                        <a
                          href={c.href}
                          onClick={() => reachGoal('email_click')}
                          className="font-bold text-foreground hover:text-brand"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <div className="font-bold text-foreground">{c.value}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Мы в мессенджерах</div>
                <div className="mt-3 flex gap-3">
                  <a
                    href={SOCIALS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => reachGoal('telegram_click')}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <TelegramIcon className="h-5 w-5" /> Telegram
                  </a>
                  <a
                    href={SOCIALS.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => reachGoal('vk_click')}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <VkIcon className="h-5 w-5" /> ВКонтакте
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              {result ? (
                <LeadSent result={result} title="Заявка готова" onReset={() => setResult(null)} />
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/50 p-1">
                    <button
                      type="button"
                      onClick={() => setIsCompany(false)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        !isCompany ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <User className="h-4 w-4" /> Физлицо
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCompany(true)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        isCompany ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <Building2 className="h-4 w-4" /> Компания
                    </button>
                  </div>

                  {isCompany && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Компания</Label>
                        <Input id="company" name="company" placeholder="ООО «Ромашка»" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unp">УНП / ИНН</Label>
                        <Input id="unp" name="unp" inputMode="numeric" placeholder="Напр. 7701234567" />
                      </div>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" name="name" required placeholder="Как к вам обращаться" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" name="phone" type="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Маршрут</Label>
                    <Input id="route" name="route" placeholder="Откуда → Куда" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Что везём</Label>
                    <Input id="cargo" name="cargo" placeholder="Тип груза, вес, объём" />
                  </div>

                  {errorMsg && <p className="text-sm font-medium text-destructive">{errorMsg}</p>}

                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
                    )}
                  >
                    <TelegramIcon className="h-5 w-5" /> Отправить в Telegram
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Откроется чат с менеджером с готовым текстом заявки — останется нажать «Отправить». Нажимая
                    кнопку, вы соглашаетесь с политикой обработки персональных данных.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
