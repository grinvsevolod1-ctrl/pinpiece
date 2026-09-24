import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type LeadPayload = {
  type?: 'quote' | 'contact' | 'career'
  name?: string
  phone?: string
  isCompany?: boolean
  company?: string
  unp?: string
  [key: string]: unknown
}

function digitsOnly(v: unknown): string {
  return typeof v === 'string' ? v.replace(/\D/g, '') : ''
}

function isValidPhone(v: unknown): boolean {
  const d = digitsOnly(v)
  return d.length >= 10 && d.length <= 15
}

export async function POST(req: Request) {
  let data: LeadPayload
  try {
    data = (await req.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const phone = typeof data.phone === 'string' ? data.phone.trim() : ''

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: 'name_required' }, { status: 422 })
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: 'phone_invalid' }, { status: 422 })
  }
  if (data.isCompany) {
    const unp = digitsOnly(data.unp)
    if (unp.length < 9) {
      return NextResponse.json({ ok: false, error: 'unp_invalid' }, { status: 422 })
    }
  }

  const lead = {
    ...data,
    name,
    phone,
    receivedAt: new Date().toISOString(),
  }

  // Optional delivery to Telegram if a bot is configured for the project.
  // Falls back to server logging so the endpoint always accepts valid leads.
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (token && chatId) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          parse_mode: 'HTML',
          text: formatLead(lead),
        }),
      })
    } catch (err) {
      console.log('[v0] lead telegram delivery failed:', err)
    }
  } else {
    console.log('[v0] new lead received:', JSON.stringify(lead))
  }

  return NextResponse.json({ ok: true })
}

function formatLead(lead: LeadPayload & { receivedAt: string }): string {
  const lines: string[] = []
  const heading =
    lead.type === 'career'
      ? '🚚 Новый отклик на вакансию'
      : lead.type === 'quote'
        ? '🧮 Заявка из калькулятора'
        : '📩 Заявка с сайта'
  lines.push(`<b>${heading}</b>`)
  lines.push(`Имя: ${lead.name}`)
  lines.push(`Телефон: ${lead.phone}`)
  if (lead.isCompany) {
    lines.push(`Компания: ${lead.company ?? '—'}`)
    lines.push(`УНП/ИНН: ${lead.unp ?? '—'}`)
  }
  for (const [key, value] of Object.entries(lead)) {
    if (['type', 'name', 'phone', 'isCompany', 'company', 'unp', 'receivedAt'].includes(key)) continue
    if (value === undefined || value === null || value === '') continue
    lines.push(`${key}: ${String(value)}`)
  }
  return lines.join('\n')
}
