# Changelog

## 25.09.2026 — Аудит проекта: зависимости, конфиг, служебные страницы, политика ПДн

**Что было.** После доработки форм провели полный аудит проекта на «идеальное» состояние.

**Что сделано.**
- Зависимости — обновлены до актуальных: `next` 16.3.3 → 16.3.6, `react`/`react-dom` → 19.3.0, `framer-motion` → 13.4.3, `lucide-react` → 1.48.0, `@base-ui/react` → 1.8.0, `tailwind-merge` → 3.7.0, `typescript` → 5.9.3, `eslint` 9 + `eslint-config-next` 16.3.6. Удалены лишние пакеты `cn` (фейковый, дублирует `lib/utils`) и `shadcn` из prod-зависимостей (перенесён в dev). Транзитивные уязвимости из `pnpm audit` (`nanoid`, `browserslist`, `baseline-browser-mapping` — только build-time через babel/postcss) закрыты через `overrides` в `pnpm-workspace.yaml`; там же зафиксирован `allowBuilds.unrs-resolver: false`, чтобы `pnpm install` не ругался. `pnpm install --frozen-lockfile` проходит.
- `next.config.mjs` — убраны `typescript.ignoreBuildErrors: true` (сборка теперь падает на ошибках типов, как и должна) и `images.unoptimized: true` (включён оптимизатор: AVIF/WebP, ресайз под viewport). Добавлен `agentRules: false` — Next 16.3 иначе генерирует `AGENTS.md`/`CLAUDE.md` в корне при каждом `dev`.
- Код — `cn` в `components/ui/{accordion,input,label}.tsx` переведён с пакета `cn` на `@/lib/utils`. Все внутренние ссылки (`site-header`, `site-footer`, `logo`, `not-found`, `error`) переведены с `<a>` на `next/link` — навигация стала клиентской, без полной перезагрузки; у бургер-кнопки добавлены `aria-expanded`/`aria-controls`. В `floating-cta.tsx` удалено мёртвое состояние `dismissed`. На `<html>` добавлен `data-scroll-behavior="smooth"` (требование Next при `scroll-behavior: smooth` в CSS). В футере вместо двух мёртвых ссылок `href="#"` («Политика конфиденциальности», «Договор оферты») — одна рабочая на `/privacy`.
- `app/sitemap.ts` — добавлен `/vacancies` (раньше в sitemap была только главная).
- Служебные страницы — `app/not-found.tsx` (404 в стиле сайта с хедером/футером и CTA), `app/error.tsx` (error boundary с «Обновить», «На главную» и ссылкой на Telegram), `app/manifest.ts` (PWA-манифест: имя, цвета, иконка).
- Политика ПДн — новая страница `app/privacy/page.tsx` (152-ФЗ: какие данные, зачем, как передаются в Telegram, Метрика/cookies, права, контакты). Ссылка на неё — в футере и под кнопкой отправки во всех трёх формах (`contacts.tsx`, `calculator.tsx`, `career-form.tsx`): раньше был просто текст «соглашаетесь с политикой», на которую нельзя было перейти.
- Инфраструктура — `eslint.config.mjs` (flat config на `eslint-config-next`), скрипты `lint` и `typecheck` в `package.json`; `.gitignore` дополнен `*.tsbuildinfo`, `next-env.d.ts`.

**Как проверено.**
- `pnpm audit` — «No known vulnerabilities found»; `pnpm install --frozen-lockfile` — ок.
- `pnpm typecheck` (tsc --noEmit) — 0 ошибок; `pnpm lint` — 0 ошибок (одно осознанное `eslint-disable` для `<noscript><img>` пикселя Метрики).
- `next build` — 10 маршрутов, все статические кроме `/api/lead`.
- Production-режим (`next start`, порт 3100): hero-картинка отдаётся как `/_next/image?url=%2Fhero-highway.png&w=3840`, оптимизатор возвращает `image/avif` 48.8 КБ вместо исходных 1.68 МБ (в 34 раза меньше). В dev-превью v0 оптимизатор принудительно отключён средой (`modifyConfig from v0-preview`) — это не баг проекта.
- curl: `/`, `/vacancies`, `/privacy`, `/sitemap.xml`, `/manifest.webmanifest`, `/robots.txt` — 200; `/nope-404` — 404. Sitemap содержит обе страницы. Security-заголовки на месте (`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `HSTS`), `X-Powered-By` отсутствует.
- Браузер (agent-browser, 1478×879, dark): `/privacy` и `/nope-404` отрендерены без визуальных дефектов (скриншоты); клик «Вакансии» в хедере — переход без перезагрузки страницы (`beforeunload` не сработал, `location.pathname === '/vacancies'`). На главной и `/vacancies` по 2 ссылки на `/privacy` (форма + футер).

## 25.09.2026 — Формы: заявка собирается в готовое сообщение и открывается в Telegram менеджера

**Что было.** Три формы (контакты, калькулятор, анкета вакансий) отправляли данные `fetch`-ом на `/api/lead` и показывали «Заявка отправлена, перезвоним». Но доставка ботом включается только переменными `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID`, которых в проде нет — заявки оседали в логах сервера, пользователь получал ложное «отправлено», а обратной связи в Telegram не было вообще.

**Что сделано.**
- `lib/telegram.ts` — новый модуль: `TELEGRAM_USERNAME = 'pinpiece'`, `TELEGRAM_URL`, `buildTelegramDraftLink(text)` (deep-link `https://t.me/pinpiece?text=<url-encoded>`, формат по core.telegram.org/api/links — Telegram открывает чат с уже подставленным текстом), `openTelegram()` (открывает в новой вкладке, возвращает `false`, если браузер заблокировал попап), три шаблона сообщений: `formatContactMessage`, `formatQuoteMessage`, `formatCareerMessage` — читаемый текст с приветствием, полями заявки и пустыми полями, которые просто пропускаются.
- `lib/lead.ts` — `submitLead({ type, text, payload, goal })`: единая точка отправки. Формирует ссылку, открывает Telegram, шлёт цель в Метрику и в фоне (`fetch` с `keepalive: true`, ошибки глотаются) дублирует данные на `/api/lead` как резервный канал — лид не теряется, даже если пользователь закроет Telegram, не нажав «Отправить». Возвращает `LeadResult { link, opened, text }`.
- `components/lead-sent.tsx` — новый экран после отправки (полный и `compact` для калькулятора): заголовок «Заявка готова», подсказка «нажмите Отправить в открывшемся чате», кнопка-ссылка «Открыть Telegram» (та же deep-link — работает, если попап заблокирован или пользователь закрыл вкладку), кнопка «Скопировать текст» (буфер обмена + подтверждение «Скопировано»), ссылка «Изменить заявку». `role="status"`, `aria-live`.
- `components/contacts.tsx`, `components/calculator.tsx`, `components/career-form.tsx` — убраны `fetch`/`loading`/`error`-состояния и ложное «перезвоним через 15 минут»; валидация оставлена (имя, телефон ≥10 цифр, УНП ≥9 цифр для компаний; в анкете телефон стал необязательным, но если введён — проверяется). Кнопки переименованы в «Отправить в Telegram» / «Откликнуться в Telegram» с иконкой Telegram, подписи под кнопками честно объясняют, что откроется чат с готовым текстом. Калькулятор передаёт в сообщение также дополнительные опции (гидроборт, срочность, туда-обратно) и оценку стоимости.
- `components/social-icons.tsx` — `SOCIALS.telegram` берётся из `TELEGRAM_URL`, адрес задан в одном месте.
- `app/api/lead/route.ts`, `.env.example` — описана новая роль роута как резервного канала; логика не менялась.

**Как проверено.**
- Браузер (agent-browser, 1478×879, dark), `window.open` и `fetch` перехвачены: форма контактов (юр. лицо) → открыт `t.me/pinpiece?text=…`, текст: «Здравствуйте! Хочу заказать перевозку. Имя: Иван / Телефон: +7 999 123-45-67 / Компания: ООО Ромашка / УНП: 7701234567 / Маршрут: Москва → Казань / Груз: Паллеты, 2 т»; параллельно ушёл POST `/api/lead` с `keepalive: true` и теми же данными. Экран «Заявка готова» с кнопками «Открыть Telegram» (`target=_blank rel=noopener`) и «Скопировать текст».
- Калькулятор: Москва → Казань, гидроборт, Пётр, +79001112233 → deep-link с режимом, транспортом, расстоянием, весом, грузчиками, «Дополнительно: гидроборт», оценкой в $; компактный экран внутри карточки без переполнения.
- Анкета `/vacancies`: телефон «123» → ошибка «Укажите корректный телефон или оставьте поле пустым», окно не открылось; пустой телефон + город/возраст/комментарий → deep-link с анкетой. При заблокированном попапе (`window.open` вернул `null`) показывается подсказка «Браузер не открыл Telegram — нажмите кнопку ниже».
- `curl https://t.me/pinpiece?text=…` — HTTP 200; `curl -X POST localhost:3000/api/lead` — `{"ok":true}` 200.
- `tsc --noEmit`, `eslint` по изменённым файлам, `next build` — без ошибок.

**Как поменять адрес.** `TELEGRAM_USERNAME` в `lib/telegram.ts` — кнопки форм, экран «Заявка готова» и иконки соцсетей подхватят автоматически.

## 25.09.2026 — Яндекс Метрика: счётчик 112993063 не загружался

**Что было.** Поддержка Метрики сообщила: на сайте стоит модифицированный код счётчика, который не загружается, поэтому клики из Директа не сходятся с визитами. Причина: скрипт подключался как общий `mc.yandex.ru/metrika/tag.js` (без `?id=`), а в `init` передавался флаг `ssr:true`. Общий `tag.js` при `ssr:true` молча пропускает `init` (он ожидает персональную сборку `tag.js?id=<номер>`), поэтому объект счётчика вообще не создавался: `ym('getClientID')` не отвечал, запросов на `mc.yandex.ru/watch/112993063` не было. Кроме того, счётчик грузился через `next/script` после гидратации, а не из `<head>`.

**Что сделано.**
- `lib/metrika.ts` — константа `YM_TAG_SRC = https://mc.yandex.ru/metrika/tag.js?id=112993063` (актуальный код с вкладки «Счётчик»). `hit()` теперь принимает `title`/`referer`/`params`.
- `components/yandex-metrika.tsx` — `YandexMetrikaScript`: официальный инлайн-код счётчика, рендерится в серверный HTML в `<head>`. `init` с `defer:true` по инструкции «Установка и настройка счётчика для SPA-сайтов», первый просмотр отправляется сразу методом `hit`. `YandexMetrika` (в `<body>`) — noscript-пиксель и трекер клиентских переходов.
- `components/yandex-metrika-pageviews.tsx` — новый клиентский компонент: на каждое изменение `usePathname`/`useSearchParams` шлёт `ym('hit', url, { title, referer })` (п. 3 инструкции). Первую загрузку не дублирует.
- `app/layout.tsx` — `<YandexMetrikaScript />` добавлен в `<head>`.

**Как проверено.**
- `curl localhost:3000` — в серверном HTML внутри `<head>` есть `tag.js?id=112993063`, `ym(112993063,'init',{…defer:true…})` и `ym(112993063,'hit',…)`.
- Браузер (agent-browser): после загрузки `/` — ровно один запрос инициализации (`watch/112993063?…nohit=1`) и один просмотр (`[HIT] /`); `ym(112993063,'getClientID')` возвращает ClientID (счётчик реально создан). `history.pushState('/?utm_test=spa')` — ушёл один `[HIT] /?utm_test=spa` с `page-ref=/`. Ошибок в консоли нет.
- `tsc --noEmit` — без ошибок.

**Проверить после деплоя.** В Метрике → Настройки → «Счётчик» должно стать «Счётчик установлен корректно»; в отчёте «Директ, сводка» визиты должны сойтись с кликами. Цели (`quote_submit`, `contact_submit`, `career_submit` и микроконверсии) отправляются тем же `ym()` и продолжат работать.
