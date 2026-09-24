'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { reachGoal } from '@/lib/metrika'
import { SOCIALS, TelegramIcon } from './social-icons'
import { ArrowRight, MapPin, ShieldCheck, Truck } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/hero-highway.png"
          alt="Автопарк PinPiece на трассе"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/65 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      <div
        className="absolute inset-0 animate-grid opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 30% 40%, black, transparent 75%)',
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-24 pb-16 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-foreground/90 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-signal" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Логистический центр полного цикла · 24/7
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Грузоперевозки, которые{' '}
          <span className="text-brand">доезжают вовремя</span> — по городу и за 5000 км
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Собственный автопарк, склад ответственного хранения и отслеживание груза в реальном
          времени. Берём на себя весь путь — от погрузки до подписи на выгрузке.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#calc"
            onClick={() => reachGoal('calc_start')}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group h-13 rounded-full bg-brand px-7 text-base font-semibold text-white hover:bg-brand-deep',
            )}
          >
            Рассчитать перевозку
            <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-13 rounded-full border-border bg-card/40 px-7 text-base font-semibold text-foreground backdrop-blur hover:bg-card',
            )}
          >
            Смотреть услуги
          </a>
          <a
            href={SOCIALS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => reachGoal('telegram_click')}
            className="group inline-flex items-center gap-2 text-base font-semibold text-foreground/90 transition-colors hover:text-brand"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40 backdrop-blur transition-colors group-hover:border-brand">
              <TelegramIcon className="h-5 w-5 text-brand" />
            </span>
            Задать вопрос онлайн
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease }}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {[
            { icon: Truck, title: '250+ машин', sub: 'от «Газели» до фуры' },
            { icon: MapPin, title: '180 городов', sub: 'по всей России и СНГ' },
            { icon: ShieldCheck, title: 'Страховка груза', sub: 'до 10 млн ₽' },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card/75 p-4 shadow-lg shadow-black/30 backdrop-blur-md"
            >
              <s.icon className="h-5 w-5 text-brand" />
              <div className="mt-2 text-base font-bold text-foreground">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
