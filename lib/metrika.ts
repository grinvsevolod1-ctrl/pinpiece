// Yandex Metrika helper — счётчик и цели-конверсии для Яндекс.Директа.
// ID счётчика берётся из переменной окружения NEXT_PUBLIC_YM_ID.

export const YM_ID = process.env.NEXT_PUBLIC_YM_ID

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
  | 'phone_click' // клик по телефону
  | 'telegram_click' // клик по Telegram
  | 'vk_click' // клик по ВКонтакте
  | 'email_click' // клик по e-mail

/** Отправить достижение цели в Метрику. Безопасно вызывать даже без счётчика. */
export function reachGoal(goal: YmGoal, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.ym || !YM_ID) return
  window.ym(Number(YM_ID), 'reachGoal', goal, params)
}

/** Зафиксировать просмотр страницы (для SPA-переходов в App Router). */
export function hit(url: string) {
  if (typeof window === 'undefined' || !window.ym || !YM_ID) return
  window.ym(Number(YM_ID), 'hit', url)
}
