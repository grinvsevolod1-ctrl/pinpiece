'use client'

import { useState } from 'react'
import { Reveal } from './reveal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'

const CONTACTS = [
  { icon: Phone, label: 'Телефон', value: '8 800 123-45-67', href: 'tel:+78001234567' },
  { icon: Mail, label: 'Почта', value: 'hello@pinpiece.ru', href: 'mailto:hello@pinpiece.ru' },
  { icon: MapPin, label: 'Адрес хаба', value: 'Москва, ул. Логистическая, 1', href: null },
  { icon: Clock, label: 'Режим работы', value: 'Диспетчерская 24/7', href: null },
]

export function Contacts() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacts" className="border-t border-border/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">
                Контакты
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Оставьте заявку — перезвоним за 15 минут
              </h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Расскажите про груз и маршрут. Менеджер рассчитает стоимость и подберёт машину.
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
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a href={c.href} className="font-bold text-foreground hover:text-brand">
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
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              {sent ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-14 w-14 text-signal" />
                  <h3 className="mt-4 text-2xl font-bold text-foreground">Заявка принята</h3>
                  <p className="mt-2 max-w-xs text-muted-foreground">
                    Менеджер свяжется с вами в течение 15 минут в рабочее время.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-brand hover:underline"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" name="name" required placeholder="Как к вам обращаться" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Маршрут</Label>
                    <Input id="route" name="route" placeholder="Откуда → Куда" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Что везём</Label>
                    <Input
                      id="cargo"
                      name="cargo"
                      placeholder="Тип груза, вес, объём"
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
                    )}
                  >
                    Отправить заявку
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
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
