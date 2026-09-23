'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Truck, Check, Calculator as CalcIcon } from 'lucide-react'

type Mode = 'city' | 'intercity'

const VEHICLES = [
  { id: 'gazelle', name: '«Газель» · до 1,5 т', base: 2500, perKm: 32 },
  { id: 'five', name: '5-тонник · до 5 т', base: 4500, perKm: 46 },
  { id: 'truck', name: 'Фура · до 20 т', base: 9000, perKm: 62 },
  { id: 'reefer', name: 'Рефрижератор · до 20 т', base: 11000, perKm: 74 },
]

export function Calculator() {
  const [mode, setMode] = useState<Mode>('city')
  const [vehicle, setVehicle] = useState(VEHICLES[0].id)
  const [distance, setDistance] = useState('600')
  const [weight, setWeight] = useState('500')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [sent, setSent] = useState(false)

  const estimate = useMemo(() => {
    const v = VEHICLES.find((x) => x.id === vehicle) ?? VEHICLES[0]
    const w = Math.max(0, Number(weight) || 0)
    const weightFee = Math.round(w * 4)
    if (mode === 'city') {
      return v.base + weightFee
    }
    const d = Math.max(0, Number(distance) || 0)
    return Math.round(v.base * 1.4 + d * v.perKm + weightFee)
  }, [mode, vehicle, distance, weight])

  return (
    <section id="calc" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-4xl border border-border bg-gradient-to-br from-card to-background">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <div className="p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand">
                <CalcIcon className="h-4 w-4" /> Расчёт за минуту
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Узнайте стоимость перевозки
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
                    onClick={() => setMode(m.id)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      mode === m.id
                        ? 'bg-brand text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from">Откуда</Label>
                  <Input
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Москва"
                    className="h-11 border-border bg-background/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">Куда</Label>
                  <Input
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={mode === 'city' ? 'по городу' : 'Казань'}
                    className="h-11 border-border bg-background/60"
                  />
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
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="h-11 border-border bg-background/60"
                  />
                </div>

                {mode === 'intercity' && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="distance">Расстояние, км</Label>
                    <Input
                      id="distance"
                      type="number"
                      min="0"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="h-11 border-border bg-background/60"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="relative border-t border-border bg-brand/5 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 80% 10%, #2f6bff 0, transparent 45%)',
                }}
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Truck className="h-4 w-4 text-brand" /> Предварительная стоимость
                </div>
                <motion.div
                  key={estimate}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 text-5xl font-extrabold tracking-tight text-foreground"
                >
                  {estimate.toLocaleString('ru-RU')} ₽
                </motion.div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Итог зависит от точного маршрута, догруза и доп. услуг. Менеджер подтвердит цену
                  после заявки.
                </p>

                <div className="mt-6 space-y-2">
                  {['Подача машины', 'GPS-трекинг груза', 'Документы через ЭДО'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-signal" /> {f}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  {sent ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-signal/40 bg-signal/10 p-4">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-signal-ink">
                        <Check className="h-5 w-5" />
                      </span>
                      <div className="text-sm">
                        <div className="font-bold text-foreground">Заявка принята</div>
                        <div className="text-muted-foreground">Перезвоним в течение 15 минут</div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setSent(true)}
                      size="lg"
                      className="h-13 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep"
                    >
                      Оформить заявку
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
