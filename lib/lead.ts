import { reachGoal, type YmGoal } from './metrika'
import { buildTelegramDraftLink, openTelegram } from './telegram'

export type LeadType = 'contact' | 'quote' | 'career'

export type LeadResult = {
  /** Ссылка t.me с готовым текстом — для кнопки «Открыть Telegram», если вкладку заблокировали. */
  link: string
  /** Текст заявки — для кнопки «Скопировать». */
  text: string
  /** Удалось ли открыть Telegram сразу из обработчика клика. */
  opened: boolean
}

type SubmitLeadOptions = {
  type: LeadType
  text: string
  payload: Record<string, unknown>
  goal: YmGoal
  goalParams?: Record<string, unknown>
}

/**
 * Основной канал заявки — Telegram: открываем чат с менеджером с уже заполненным
 * текстом. Параллельно, не блокируя пользователя, дублируем данные на /api/lead
 * (лог сервера или бот, если настроен), чтобы лид не потерялся, даже если
 * сообщение в Telegram так и не отправят.
 */
export function submitLead({ type, text, payload, goal, goalParams }: SubmitLeadOptions): LeadResult {
  const link = buildTelegramDraftLink(text)
  const opened = openTelegram(link)
  backupLead({ type, ...payload })
  reachGoal(goal, { ...goalParams, telegramOpened: opened })
  return { link, text, opened }
}

function backupLead(payload: Record<string, unknown>) {
  try {
    void fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // keepalive: запрос доживёт, даже если вкладка тут же уйдёт в Telegram
      keepalive: true,
    }).catch(() => undefined)
  } catch {
    // резервный канал — его сбой не должен ломать основной сценарий
  }
}
