import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] items-center">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center">
          <p className="font-mono text-sm font-semibold tracking-widest text-signal">ОШИБКА 404</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground text-balance md:text-6xl">
            Груз по этому адресу не найден
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground text-pretty">
            Страница переехала или никогда не существовала. Вернитесь на главную или сразу рассчитайте
            стоимость перевозки.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 rounded-full bg-brand px-6 text-base font-semibold text-white hover:bg-brand-deep',
              )}
            >
              <ArrowLeft className="h-5 w-5" /> На главную
            </a>
            <a
              href="/#calc"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'h-12 rounded-full border-border bg-transparent px-6 text-base font-semibold text-foreground hover:bg-secondary',
              )}
            >
              <Calculator className="h-5 w-5" /> Рассчитать стоимость
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
