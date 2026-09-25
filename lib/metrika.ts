// Yandex Metrika helper — счётчик и цели-конверсии для Яндекс.Директа.
// ID счётчика можно переопределить через NEXT_PUBLIC_YM_ID, иначе используется рабочий.

export const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? '112993063'

// Персональная сборка tag.js: настройки счётчика вшиты в скрипт. Общий tag.js без ?id=
// при ssr:true молча игнорирует init, и счётчик не создаётся вовсе.
export const YM_TAG_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`

declare global {
  interface Window {
    ym?: (
      id: number,
      action: string,
      ...params: unknown[]
    ) => void
  }
}

/** Цели (goals). Точно эти же идентификаторы нужно завести в интерфейсе Метрики. */
export type YmGoal =
  | 'quote_submit' // заявка из калькулятора
  | 'contact_submit' // заявка из формы контактов
  | 'career_submit' // отклик на вакансию
  | 'calc_open' // открыл форму заявки в калькуляторе (микроконверсия)
  | 'calc_start' // нажал «Рассчитать» и перешёл к калькулятору (микроконверсия)
  | 'vacancies_open' // открыл страницу вакансий (микроконверсия)
  | 'telegram_click' // клик по Telegram
  | 'vk_click' // клик по ВКонтакте
  | 'email_click' // клик по e-mail

/** Отправить достижение цели в Метрику. Безопасно вызывать даже без счётчика. */
export function reachGoal(goal: YmGoal, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.ym || !YM_ID) return
  window.ym(Number(YM_ID), 'reachGoal', goal, params)
}

export interface YmHitOptions {
  title?: string
  referer?: string
  params?: Record<string, unknown>
}

/**
 * Зафиксировать просмотр страницы. Счётчик инициализирован с defer:true,
 * поэтому каждый просмотр (включая первую загрузку) отправляется только отсюда.
 */
export function hit(url: string, options?: YmHitOptions) {
  if (typeof window === 'undefined' || !window.ym || !YM_ID) return
  window.ym(Number(YM_ID), 'hit', url, options)
}
