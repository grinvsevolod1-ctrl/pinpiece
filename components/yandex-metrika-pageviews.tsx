'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { hit } from '@/lib/metrika'

/**
 * Отправляет ym('hit') на каждый клиентский переход App Router. Первый просмотр страницы
 * уже отправлен инлайн-скриптом счётчика в <head>, поэтому при монтировании только
 * запоминаем текущий URL — он станет referer для следующего просмотра.
 */
export function YandexMetrikaPageviews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousUrl = useRef<string | null>(null)

  useEffect(() => {
    const query = searchParams.toString()
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ''}`

    if (previousUrl.current === null) {
      previousUrl.current = url
      return
    }
    if (previousUrl.current === url) return

    hit(url, { title: document.title, referer: previousUrl.current })
    previousUrl.current = url
  }, [pathname, searchParams])

  return null
}
