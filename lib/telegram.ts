export const TELEGRAM_USERNAME = 'pinpiece'
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`
export const SITE_HOST = 'pinpiece.ru'

/**
 * Deep-link Telegram `t.me/<username>?text=<draft>` открывает чат с менеджером
 * и подставляет текст в поле ввода — пользователю остаётся нажать «Отправить».
 * https://core.telegram.org/api/links#public-username-links
 */
export function buildTelegramDraftLink(text: string): string {
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`
}

/**
 * Открывает Telegram в новой вкладке. Вызывать синхронно из обработчика клика —
 * после await браузер считает окно всплывающим и блокирует его.
 * Возвращает false, если окно всё же заблокировано: тогда показываем кнопку-ссылку.
 */
export function openTelegram(link: string): boolean {
  const win = window.open(link, '_blank')
  if (!win) return false
  win.opener = null
  return true
}

type FieldValue = string | number | null | undefined
export type MessageField = [label: string, value: FieldValue]

function composeMessage(intro: string, fields: MessageField[]): string {
  const rows = fields.flatMap(([label, value]) => {
    if (value === undefined || value === null) return []
    const text = String(value).trim()
    return text ? [`${label}: ${text}`] : []
  })
  return [intro, '', ...rows].join('\n')
}

type ClientFields = {
  name: string
  phone: string
  isCompany: boolean
  company?: string
  unp?: string
}

function clientFields(lead: ClientFields): MessageField[] {
  return [
    ['Имя', lead.name],
    ['Телефон', lead.phone],
    ['Клиент', lead.isCompany ? 'Компания' : 'Физлицо'],
    ['Компания', lead.isCompany ? lead.company : undefined],
    ['УНП / ИНН', lead.isCompany ? lead.unp : undefined],
  ]
}

export type ContactLead = ClientFields & {
  route?: string
  cargo?: string
}

export function formatContactMessage(lead: ContactLead): string {
  return composeMessage(`Здравствуйте! Оставляю заявку на перевозку с сайта ${SITE_HOST}.`, [
    ...clientFields(lead),
    ['Маршрут', lead.route],
    ['Груз', lead.cargo],
  ])
}

export type QuoteLead = ClientFields & {
  mode: string
  vehicle: string
  route: string
  distanceKm: string
  weightKg: string
  loaders: number
  extras: string[]
  estimate: string
}

export function formatQuoteMessage(lead: QuoteLead): string {
  return composeMessage(`Здравствуйте! Рассчитал стоимость на сайте ${SITE_HOST} и хочу оформить заявку.`, [
    ...clientFields(lead),
    ['Перевозка', lead.mode],
    ['Транспорт', lead.vehicle],
    ['Маршрут', lead.route],
    ['Расстояние', `${lead.distanceKm} км`],
    ['Вес груза', `${lead.weightKg} кг`],
    ['Грузчики', lead.loaders > 0 ? lead.loaders : undefined],
    ['Дополнительно', lead.extras.length ? lead.extras.join(', ') : undefined],
    ['Предварительная оценка', lead.estimate],
  ])
}

export type CareerLead = {
  name: string
  phone: string
  city: string
  age: string
  position: string
  experience: string
  license: string
  ownCar: boolean
  comment: string
}

export function formatCareerMessage(lead: CareerLead): string {
  return composeMessage(`Здравствуйте! Хочу откликнуться на вакансию водителя (${SITE_HOST}/vacancies).`, [
    ['Имя', lead.name],
    ['Телефон', lead.phone],
    ['Город', lead.city],
    ['Возраст', lead.age],
    ['Позиция', lead.position],
    ['Опыт', lead.experience],
    ['Категория прав', lead.license],
    ['Свой автомобиль', lead.ownCar ? 'есть' : 'нет'],
    ['Комментарий', lead.comment],
  ])
}
