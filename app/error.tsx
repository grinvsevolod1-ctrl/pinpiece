'use client'

import { useEffect } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TELEGRAM_URL } from '@/lib/telegram'
import { RefreshCw, Home } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center">
        <p className="font-mono text-sm font-semibold tracking-widest text-signal">СБОЙ НА МАРШРУТЕ</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground text-balance md:text-5xl">
          Что-то пошло не так
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground text-pretty">
          Страница не загрузилась. Попробуйте обновить её — если ошибка повторится, напишите нам в Telegram,
          мы поможем оформить заявку вручную.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-muted-foreground">Код ошибки: {error.digest}</p>
        ) : null}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-12 rounded-full bg-brand px-6 text-base font-semibold text-white hover:bg-brand-deep',
            )}
          >
            <RefreshCw className="h-5 w-5" /> Обновить
          </button>
          <a
            href="/"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'h-12 rounded-full border-border bg-transparent px-6 text-base font-semibold text-foreground hover:bg-secondary',
            )}
          >
            <Home className="h-5 w-5" /> На главную
          </a>
        </div>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-sm font-semibold text-brand hover:underline"
        >
          Написать в Telegram
        </a>
      </div>
    </main>
  )
}
