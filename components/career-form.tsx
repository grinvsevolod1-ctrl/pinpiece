'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2, Loader2 } from 'lucide-react'

const POSITIONS = [
  'Водитель кат. B (Газель / фургон)',
  'Водитель кат. C (5–10 т)',
  'Водитель кат. CE / E (фура, дальнобой)',
  'Водитель-экспедитор',
  'Стажёр без опыта (обучение)',
  'Курьер на личном авто',
]

const EXPERIENCE = ['Без опыта', 'До 1 года', '1–3 года', 'Более 3 лет']
const LICENSES = ['Нет прав', 'B', 'C', 'CE', 'D', 'E']

export function CareerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [ownCar, setOwnCar] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()

    if (name.length < 2) {
      setErrorMsg('Укажите имя')
      return
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Укажите корректный телефон')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'career',
          name,
          phone,
          Город: String(fd.get('city') ?? ''),
          Возраст: String(fd.get('age') ?? ''),
          Позиция: String(fd.get('position') ?? ''),
          Опыт: String(fd.get('experience') ?? ''),
          'Категория прав': String(fd.get('license') ?? ''),
          'Свой автомобиль': ownCar ? 'да' : 'нет',
          Комментарий: String(fd.get('comment') ?? ''),
        }),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('sent')
    } catch {
      setStatus('error')
      setErrorMsg('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-signal" />
        <h3 className="mt-4 text-2xl font-bold text-foreground">Анкета отправлена</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Рекрутёр свяжется с вами в течение дня, расскажет про условия и график.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-brand hover:underline"
        >
          Отправить ещё одну
        </button>
      </div>
    )
  }

  const selectCls =
    'h-11 w-full rounded-md border border-border bg-background/60 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring'

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">Имя</Label>
          <Input id="c-name" name="name" required placeholder="Как к вам обращаться" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">Телефон</Label>
          <Input id="c-phone" name="phone" type="tel" inputMode="tel" required placeholder="+7 (___) ___-__-__" />
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
        disabled={status === 'loading'}
        className={cn(
          buttonVariants({ size: 'lg' }),
          'h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep disabled:opacity-70',
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Отправляем…
          </>
        ) : (
          'Откликнуться'
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
      </p>
    </form>
  )
}
