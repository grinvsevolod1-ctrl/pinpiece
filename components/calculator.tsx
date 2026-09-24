'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { reachGoal } from '@/lib/metrika'
import {
  Truck,
  Check,
  Calculator as CalcIcon,
  Users,
  Zap,
  RefreshCw,
  Building2,
  User,
  Loader2,
} from 'lucide-react'

type Mode = 'city' | 'intercity'

const VEHICLES = [
  { id: 'gazelle', name: '«Газель» · до 1,5 т / 9 м³', base: 2500, cityKm: 35, perKm: 32, freeKg: 1500 },
  { id: 'three', name: '3-тонник · до 3 т / 16 м³', base: 3800, cityKm: 42, perKm: 40, freeKg: 3000 },
  { id: 'five', name: '5-тонник · до 5 т / 25 м³', base: 4500, cityKm: 48, perKm: 46, freeKg: 5000 },
  { id: 'ten', name: '10-тонник · до 10 т / 45 м³', base: 6500, cityKm: 55, perKm: 54, freeKg: 10000 },
  { id: 'truck', name: 'Фура · до 20 т / 92 м³', base: 9000, cityKm: 65, perKm: 62, freeKg: 20000 },
  { id: 'reefer', name: 'Рефрижератор · до 20 т', base: 11000, cityKm: 78, perKm: 74, freeKg: 20000 },
]

const LOADER_FEE = 1500
const HYDRO_FEE = 2500
const URGENT_MULT = 1.2

type Line = { label: string; value: number }

export function Calculator() {
  const [mode, setMode] = useState<Mode>('city')
  const [vehicle, setVehicle] = useState(VEHICLES[0].id)
  const [distance, setDistance] = useState('25')
  const [weight, setWeight] = useState('500')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [loaders, setLoaders] = useState(0)
  const [hydro, setHydro] = useState(false)
  const [urgent, setUrgent] = useState(false)
  const [roundTrip, setRoundTrip] = useState(false)

  const [formOpen, setFormOpen] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [unp, setUnp] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { total, lines } = useMemo(() => {
    const v = VEHICLES.find((x) => x.id === vehicle) ?? VEHICLES[0]
    const dist = Math.max(0, Number(distance) || 0)
    const w = Math.max(0, Number(weight) || 0)
    const rate = mode === 'city' ? v.cityKm : v.perKm
    const result: Line[] = []

    result.push({ label: `Подача + тариф (${v.name.split(' · ')[0]})`, value: v.base })

    let mileage = Math.round(dist * rate)
    if (roundTrip) mileage = Math.round(mileage * 1.7)
    if (mileage > 0) {
      result.push({
        label: `Пробег ${roundTrip ? '(туда-обратно) ' : ''}${dist} км × ${rate} ₽`,
        value: mileage,
      })
    }

    const overWeight = Math.max(0, w - v.freeKg)
    if (overWeight > 0) {
      const wf = Math.round(overWeight * 3)
      result.push({ label: `Перевес ${overWeight} кг × 3 ₽`, value: wf })
    }

    if (loaders > 0) {
      result.push({ label: `Грузчики ${loaders} × ${LOADER_FEE} ₽`, value: loaders * LOADER_FEE })
    }
    if (hydro) result.push({ label: 'Гидроборт', value: HYDRO_FEE })

    let subtotal = result.reduce((s, l) => s + l.value, 0)
    if (urgent) {
      const fee = Math.round(subtotal * (URGENT_MULT - 1))
      result.push({ label: 'Срочная подача (+20%)', value: fee })
      subtotal += fee
    }

    return { total: subtotal, lines: result }
  }, [mode, vehicle, distance, weight, loaders, hydro, urgent, roundTrip])

  async function submit() {
    setErrorMsg('')
    if (name.trim().length < 2) {
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
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          name,
          phone,
          isCompany,
          company: isCompany ? company : undefined,
          unp: isCompany ? unp : undefined,
          Тип: isCompany ? 'Юр. лицо' : 'Физ. лицо',
          Режим: mode === 'city' ? 'По городу' : 'Межгород',
          Транспорт: VEHICLES.find((v) => v.id === vehicle)?.name,
          Маршрут: `${from || '—'} → ${to || '—'}`,
          Расстояние: `${distance} км`,
          Вес: `${weight} кг`,
          Грузчики: loaders,
          Оценка: `${total.toLocaleString('ru-RU')} ₽`,
        }),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('sent')
      reachGoal('quote_submit', {
        mode,
        vehicle,
        isCompany,
        total,
      })
    } catch {
      setStatus('error')
      setErrorMsg('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
    }
  }

  return (
    <section id="calc" className="relative border-t border-border/60 bg-[#0a0f1c] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-4xl border border-border bg-gradient-to-br from-card to-background">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <div className="p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand">
                <CalcIcon className="h-4 w-4" /> Умный расчёт за минуту
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Рассчитайте стоимость перевозки
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-background/50 p-1.5">
                {(
                  [
                    { id: 'city', label: 'По городу' },
                    { id: 'intercity', label: 'Межгород' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMode(m.id)
                      setDistance(m.id === 'city' ? '25' : '700')
                    }}
                    className={cn(
                      'rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                      mode === m.id ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from">Откуда</Label>
                  <Input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Москва" className="h-11 border-border bg-background/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">Куда</Label>
                  <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder={mode === 'city' ? 'адрес доставки' : 'Казань'} className="h-11 border-border bg-background/60" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Транспорт</Label>
                  <select
                    id="vehicle"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="h-11 w-full rounded-md border border-border bg-background/60 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.id} className="bg-card">
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Вес груза, кг</Label>
                  <Input id="weight" type="number" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-11 border-border bg-background/60" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="distance">Расстояние, км</Label>
                  <Input id="distance" type="number" min="0" value={distance} onChange={(e) => setDistance(e.target.value)} className="h-11 border-border bg-background/60" />
                </div>
              </div>

              {/* Extras */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Users className="h-4 w-4 text-brand" /> Грузчики
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 p-1">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setLoaders(n)}
                        className={cn(
                          'h-8 w-8 rounded-full text-sm font-semibold transition-colors',
                          loaders === n ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {(
                    [
                      { key: 'hydro', label: 'Гидроборт', icon: Truck, active: hydro, toggle: () => setHydro((v) => !v) },
                      { key: 'urgent', label: 'Срочно', icon: Zap, active: urgent, toggle: () => setUrgent((v) => !v) },
                      { key: 'round', label: 'Туда-обратно', icon: RefreshCw, active: roundTrip, toggle: () => setRoundTrip((v) => !v) },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={o.toggle}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors',
                        o.active
                          ? 'border-brand bg-brand/15 text-foreground'
                          : 'border-border bg-background/40 text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <o.icon className="h-4 w-4" /> {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="relative border-t border-border bg-brand/5 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 80% 10%, #2f6bff 0, transparent 45%)' }}
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Truck className="h-4 w-4 text-brand" /> Предварительная стоимость
                </div>
                <motion.div
                  key={total}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-5xl font-extrabold tracking-tight text-foreground"
                >
                  {total.toLocaleString('ru-RU')} ₽
                </motion.div>

                {/* Breakdown */}
                <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
                  {lines.map((l) => (
                    <div key={l.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">{l.label}</span>
                      <span className="shrink-0 font-semibold text-foreground/90">
                        {l.value.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Итог зависит от точного маршрута, догруза и графика. Менеджер подтвердит цену после заявки.
                </p>

                <div className="mt-auto pt-6">
                  <AnimatePresence mode="wait">
                    {status === 'sent' ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-2xl border border-signal/40 bg-signal/10 p-4"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-signal text-signal-ink">
                          <Check className="h-5 w-5" />
                        </span>
                        <div className="text-sm">
                          <div className="font-bold text-foreground">Заявка отправлена</div>
                          <div className="text-muted-foreground">Перезвоним в течение 15 минут</div>
                        </div>
                      </motion.div>
                    ) : formOpen ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/60 p-1">
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
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Название компании" className="h-11 border-border bg-background/60" />
                            <Input value={unp} onChange={(e) => setUnp(e.target.value)} inputMode="numeric" placeholder="УНП / ИНН" className="h-11 border-border bg-background/60" />
                          </div>
                        )}

                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="h-11 border-border bg-background/60" />
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" className="h-11 border-border bg-background/60" />

                        {errorMsg && <p className="text-sm font-medium text-destructive">{errorMsg}</p>}

                        <button
                          type="button"
                          onClick={submit}
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
                            'Отправить заявку'
                          )}
                        </button>
                        <p className="text-center text-[11px] leading-snug text-muted-foreground">
                          Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        type="button"
                        onClick={() => {
                          setFormOpen(true)
                          reachGoal('calc_open', { total })
                        }}
                        className={cn(
                          buttonVariants({ size: 'lg' }),
                          'h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
                        )}
                      >
                        Оформить заявку
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
