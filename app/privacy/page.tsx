import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TELEGRAM_URL } from '@/lib/telegram'

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Какие данные PinPiece получает через формы на сайте, для чего они используются, как передаются в Telegram и как отозвать согласие.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const UPDATED = '25 сентября 2026'
const EMAIL = 'hello@pinpiece.ru'

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: '1. Общие положения',
    body: (
      <>
        <p>
          Настоящая политика описывает, как логистический центр PinPiece (далее — «Оператор») обрабатывает
          персональные данные посетителей сайта pinpiece.ru (далее — «Сайт») в соответствии с Федеральным
          законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>
        <p>
          Используя формы на Сайте, вы подтверждаете, что ознакомились с политикой и даёте согласие на
          обработку данных на описанных ниже условиях.
        </p>
      </>
    ),
  },
  {
    title: '2. Какие данные мы получаем',
    body: (
      <>
        <p>Только то, что вы сами вводите в формы Сайта:</p>
        <ul>
          <li>
            <strong>Заявка на перевозку и расчёт стоимости:</strong> имя, телефон, для юридических лиц —
            название компании и УНП/ИНН, а также описание груза и маршрута.
          </li>
          <li>
            <strong>Анкета соискателя:</strong> имя, телефон, город, возраст, желаемая позиция, опыт,
            категория водительских прав, наличие своего автомобиля, комментарий.
          </li>
          <li>
            <strong>Технические данные:</strong> обезличенная статистика посещений (страницы, устройство,
            браузер, источник перехода), собираемая сервисом Яндекс Метрика с помощью cookies.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Как работают формы и передача в Telegram',
    body: (
      <>
        <p>
          После нажатия кнопки «Отправить в Telegram» Сайт собирает введённые данные в текст сообщения и
          открывает чат с менеджером PinPiece в Telegram. Сообщение отправляется{' '}
          <strong>вами, из вашего аккаунта Telegram</strong>, и вы можете изменить или не отправлять его.
          Обработка данных в Telegram регулируется политикой Telegram.
        </p>
        <p>
          Параллельно копия заявки передаётся на сервер Оператора, чтобы обращение не потерялось, если
          сообщение в Telegram не было отправлено. Эти данные используются исключительно для связи с вами по
          вашему обращению.
        </p>
      </>
    ),
  },
  {
    title: '4. Цели обработки',
    body: (
      <ul>
        <li>расчёт стоимости и организация перевозки по вашей заявке;</li>
        <li>обратная связь: звонок или сообщение по указанному телефону;</li>
        <li>рассмотрение анкеты соискателя и приглашение на собеседование;</li>
        <li>анализ посещаемости и улучшение работы Сайта (обезличенно).</li>
      </ul>
    ),
  },
  {
    title: '5. Правовые основания',
    body: (
      <p>
        Обработка ведётся на основании вашего согласия, которое вы выражаете, отправляя форму (ст. 6 и 9
        152-ФЗ), а также для заключения и исполнения договора перевозки, инициатором которого вы являетесь.
      </p>
    ),
  },
  {
    title: '6. Кому передаются данные',
    body: (
      <>
        <p>
          Данные не продаются и не передаются третьим лицам для их собственных целей. Доступ к ним имеют
          только сотрудники Оператора, отвечающие за обработку заявок и подбор персонала.
        </p>
        <p>
          Для работы Сайта используются сервисы: Telegram (мессенджер, в который вы отправляете сообщение
          самостоятельно), Яндекс Метрика (статистика), хостинг-провайдер Сайта. Каждый сервис обрабатывает
          данные по собственной политике.
        </p>
      </>
    ),
  },
  {
    title: '7. Сроки хранения',
    body: (
      <p>
        Данные заявок хранятся до достижения цели обработки, но не более 3 лет с момента последнего обращения.
        Анкеты соискателей — до 1 года. По вашему запросу данные удаляются раньше.
      </p>
    ),
  },
  {
    title: '8. Cookies и Яндекс Метрика',
    body: (
      <p>
        Сайт использует cookies сервиса Яндекс Метрика для сбора обезличенной статистики. Вы можете отключить
        cookies в настройках браузера — Сайт продолжит работать, но статистика собираться не будет.
      </p>
    ),
  },
  {
    title: '9. Ваши права',
    body: (
      <>
        <p>Вы вправе в любой момент:</p>
        <ul>
          <li>запросить, какие данные о вас обрабатываются;</li>
          <li>потребовать их уточнения, блокирования или удаления;</li>
          <li>отозвать согласие на обработку.</li>
        </ul>
        <p>
          Для этого напишите на <a href={`mailto:${EMAIL}`}>{EMAIL}</a> или в{' '}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          . Мы ответим в течение 10 рабочих дней.
        </p>
      </>
    ),
  },
  {
    title: '10. Изменения политики',
    body: (
      <p>
        Актуальная версия всегда опубликована на этой странице. При существенных изменениях дата обновления
        вверху страницы меняется.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-32 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-signal">Документы</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground text-balance md:text-5xl">
          Политика обработки персональных данных
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Обновлено: {UPDATED}</p>

        <div className="mt-12 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-brand [&_a:hover]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Остались вопросы по обработке данных? Напишите на{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-brand hover:underline">
            {EMAIL}
          </a>{' '}
          или вернитесь на{' '}
          <Link href="/" className="font-semibold text-brand hover:underline">
            главную
          </Link>
          .
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
