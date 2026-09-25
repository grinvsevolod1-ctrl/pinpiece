import { Suspense } from 'react'
import { YM_ID, YM_TAG_SRC } from '@/lib/metrika'
import { YandexMetrikaPageviews } from '@/components/yandex-metrika-pageviews'

// Официальный код счётчика (вкладка «Счётчик» в настройках Метрики) + defer:true по инструкции
// для SPA: автоматическая отправка просмотра отключена, просмотры передаются методом hit.
// Первый просмотр уходит сразу отсюда (до гидратации React), последующие клиентские
// переходы — из YandexMetrikaPageviews.
const counterCode = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, 'script', '${YM_TAG_SRC}', 'ym');

ym(${YM_ID}, 'init', {ssr:true, defer:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
ym(${YM_ID}, 'hit', window.location.href);
`

/**
 * Инлайн-код счётчика для <head>. Рендерится в серверный HTML и выполняется до гидратации,
 * поэтому очередь ym() уже существует к моменту первого hit и первых целей.
 */
export function YandexMetrikaScript() {
  if (!YM_ID) return null

  return (
    <script id="yandex-metrika" dangerouslySetInnerHTML={{ __html: counterCode }} />
  )
}

/** noscript-пиксель и трекер SPA-просмотров — размещаются в <body>. */
export function YandexMetrika() {
  if (!YM_ID) return null

  return (
    <>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <YandexMetrikaPageviews />
      </Suspense>
    </>
  )
}
