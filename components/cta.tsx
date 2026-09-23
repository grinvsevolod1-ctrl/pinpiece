import Image from 'next/image'
import { Reveal } from './reveal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Phone, ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-border">
            <Image
              src="/cargo-loading.png"
              alt="Погрузка груза на складе PinPiece"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
            <div className="relative grid gap-8 p-8 sm:p-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="max-w-xl text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Готовы перевезти груз уже сегодня?
                </h2>
                <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                  Оставьте заявку — рассчитаем маршрут, подберём машину и подадим транспорт в
                  ближайшее окно.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="#calc"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group h-14 rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
                  )}
                >
                  Рассчитать стоимость
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+78001234567"
                  className="flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-base font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
                >
                  <Phone className="h-5 w-5 text-brand" />
                  8 800 123-45-67
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
