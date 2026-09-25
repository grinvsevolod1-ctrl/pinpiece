'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { submitLead, type LeadResult } from '@/lib/lead'
import { formatCareerMessage } from '@/lib/telegram'
import { LeadSent } from './lead-sent'
import { TelegramIcon } from './social-icons'
import { Wallet, GraduationCap, Clock } from 'lucide-react'

const POSITIONS = [
  'Водитель кат. B (Газель / фургон)',
  'Водитель кат. C (5–10 т)',
  'Водитель кат. CE / E (фура, дальнобой)',
  'Водитель-экспедитор',
  'Стажёр без опыта (обучение)',
  'Курьер на личном авто',
]

const EXPERIENCE = ['Без опыта', 'До 1 года', '1–3 года', 'Более 3 лет']
const LICENSES = ['Нет прав — хочу получить (поможем)', 'B', 'C', 'CE', 'D', 'E']

const PERKS = [
  { icon: Wallet, text: 'Белая зарплата, выплаты каждую неделю' },
  { icon: GraduationCap, text: 'Поможем получить права нужной категории' },
  { icon: Clock, text: 'Ответим и позовём на смену уже сегодня' },
]

export function CareerForm() {
  const [result, setResult] = useState<LeadResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [ownCar, setOwnCar] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()

    if (name.length < 2) {
      setErrorMsg('Укажите имя')
      return
    }
    if (phone && phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Укажите корректный телефон или оставьте поле пустым')
      return
    }

    const lead = {
      name,
      phone,
      city: String(fd.get('city') ?? '').trim(),
      age: String(fd.get('age') ?? '').trim(),
      position: String(fd.get('position') ?? ''),
      experience: String(fd.get('experience') ?? ''),
      license: String(fd.get('license') ?? ''),
      ownCar,
      comment: String(fd.get('comment') ?? '').trim(),
    }

    setResult(
      submitLead({
        type: 'career',
        text: formatCareerMessage(lead),
        payload: {
          name,
          phone,
          Город: lead.city,
          Возраст: lead.age,
          Позиция: lead.position,
          Опыт: lead.experience,
          'Категория прав': lead.license,
          'Свой автомобиль': ownCar ? 'да' : 'нет',
          Комментарий: lead.comment,
        },
        goal: 'career_submit',
        goalParams: { position: lead.position, license: lead.license },
      }),
    )
  }

  if (result) {
    return (
      <div className="flex min-h-96 flex-col justify-center rounded-3xl border border-border bg-card p-8">
        <LeadSent
          result={result}
          title="Анкета готова"
          resetLabel="Заполнить ещё одну анкету"
          onReset={() => setResult(null)}
        />
      </div>
    )
  }

  const selectCls =
    'h-11 w-full rounded-md border border-border bg-background/60 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring'

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="rounded-2xl border border-brand/25 bg-brand/5 p-4">
        <p className="text-sm font-semibold text-foreground">Заполните за 1 минуту — остальное решим в переписке</p>
        <ul className="mt-3 space-y-2">
          {PERKS.map((p) => (
            <li key={p.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <p.icon className="h-4.5 w-4.5 shrink-0 text-brand" />
              {p.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">Имя</Label>
          <Input id="c-name" name="name" required placeholder="Как к вам обращаться" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">
            Телефон <span className="font-normal text-muted-foreground">— необязательно</span>
          </Label>
          <Input id="c-phone" name="phone" type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-city">Город</Label>
          <Input id="c-city" name="city" placeholder="Любой город РФ" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-age">Возраст</Label>
          <Input id="c-age" name="age" type="number" min="18" placeholder="от 18 лет" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-position">Желаемая позиция</Label>
          <select id="c-position" name="position" className={selectCls} defaultValue={POSITIONS[0]}>
            {POSITIONS.map((p) => (
              <option key={p} value={p} className="bg-card">
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-experience">Опыт</Label>
          <select id="c-experience" name="experience" className={selectCls} defaultValue={EXPERIENCE[0]}>
            {EXPERIENCE.map((x) => (
              <option key={x} value={x} className="bg-card">
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-license">Категория прав</Label>
          <select id="c-license" name="license" className={selectCls} defaultValue={LICENSES[0]}>
            {LICENSES.map((x) => (
              <option key={x} value={x} className="bg-card">
                {x}
              </option>
            ))}
          </select>
          <p className="text-xs text-brand">Нет нужной категории? Поможем открыть и оплатим обучение.</p>
        </div>
        <div className="space-y-2">
          <Label>Свой автомобиль</Label>
          <button
            type="button"
            onClick={() => setOwnCar((v) => !v)}
            className={cn(
              'flex h-11 w-full items-center justify-center rounded-md border text-sm font-semibold transition-colors',
              ownCar
                ? 'border-brand bg-brand/15 text-foreground'
                : 'border-border bg-background/60 text-muted-foreground hover:text-foreground',
            )}
          >
            {ownCar ? 'Есть свой автомобиль' : 'Нет / не требуется'}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="c-comment">Комментарий</Label>
        <textarea
          id="c-comment"
          name="comment"
          rows={3}
          placeholder="Удобное время звонка, пожелания по графику и т. п."
          className="w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {errorMsg && <p className="text-sm font-medium text-destructive">{errorMsg}</p>}

      <button
        type="submit"
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
        )}
      >
        <TelegramIcon className="h-5 w-5" /> Откликнуться в Telegram
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Откроется чат с рекрутёром с готовой анкетой — останется нажать «Отправить». Нажимая кнопку, вы соглашаетесь с
        политикой обработки персональных данных.
      </p>
    </form>
  )
}
