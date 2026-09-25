'use client'

import { useState } from 'react'
import { CheckCircle2, Copy, Check } from 'lucide-react'
import { TelegramIcon } from './social-icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { LeadResult } from '@/lib/lead'

type Props = {
  result: LeadResult
  title: string
  onReset: () => void
  resetLabel?: string
  compact?: boolean
}

export function LeadSent({ result, title, onReset, resetLabel = 'Заполнить ещё одну', compact = false }: Props) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    try {
      await navigator.clipboard.writeText(result.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // буфер обмена недоступен — остаётся кнопка «Открыть Telegram»
    }
  }

  const hint = result.opened
    ? 'Мы открыли Telegram с готовым текстом заявки — нажмите «Отправить» в чате. Если вкладка не появилась, откройте её кнопкой ниже.'
    : 'Браузер не дал открыть новую вкладку. Нажмите кнопку — откроется чат с менеджером с уже заполненным текстом заявки.'

  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center text-center',
        compact ? 'gap-3 rounded-2xl border border-signal/40 bg-signal/10 p-4' : 'min-h-72 justify-center gap-4',
      )}
    >
      <CheckCircle2 className={cn('text-signal', compact ? 'h-9 w-9' : 'h-14 w-14')} />
      <div className="flex flex-col gap-2">
        <h3 className={cn('font-bold text-foreground', compact ? 'text-lg' : 'text-2xl')}>{title}</h3>
        <p className={cn('max-w-sm text-muted-foreground', compact ? 'text-sm' : 'text-base')}>{hint}</p>
      </div>

      <div className={cn('flex w-full flex-col gap-2', compact ? '' : 'max-w-xs')}>
        <a
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-12 w-full rounded-full bg-brand text-base font-semibold text-white hover:bg-brand-deep',
          )}
        >
          <TelegramIcon className="h-5 w-5" /> Открыть Telegram
        </a>
        <button
          type="button"
          onClick={copyText}
          className={cn(
            buttonVariants({ size: 'lg', variant: 'outline' }),
            'h-12 w-full rounded-full border-border bg-transparent text-base font-semibold text-foreground hover:bg-card',
          )}
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 text-signal" /> Скопировано
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" /> Скопировать текст
            </>
          )}
        </button>
      </div>

      <button type="button" onClick={onReset} className="text-sm font-semibold text-brand hover:underline">
        {resetLabel}
      </button>
    </div>
  )
}
