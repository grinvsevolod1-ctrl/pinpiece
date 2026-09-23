"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

const ROLES = [
  "Пеший курьер",
  "Вело / мото курьер",
  "Автокурьер",
  "Кладовщик хаба",
  "Диспетчер",
  "Менеджер хаба",
  "Заказ доставки для бизнеса",
]

export function ApplyCta() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="apply" className="bg-brand-ink py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Оставьте заявку — перезвоним за 15 минут
          </h2>
          <p className="mt-5 max-w-md text-white/75">
            Оформим официально, обучим и выведем на линию в этом же городе. Без опыта — тоже берём.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            <li>· Работаем в 24 городах России</li>
            <li>· Оформление по ТК РФ или самозанятость</li>
            <li>· Первая выплата — уже в конце недели</li>
          </ul>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-brand-ink sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-brand" />
              <h3 className="mt-4 text-2xl font-bold">Заявка принята!</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Спасибо! Наш рекрутер свяжется с вами в ближайшие 15 минут в рабочее время.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                  Имя
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Как к вам обращаться"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-semibold">
                  Кем хотите работать
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                >
                  <option value="" disabled>
                    Выберите позицию
                  </option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-semibold">
                  Город
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  placeholder="Например, Москва"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Отправить заявку
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
