import { Reveal } from './reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FAQ_ITEMS = [
  {
    q: 'Как быстро вы подаёте машину?',
    a: 'По городу — от 1 часа с момента подтверждения заявки. На межгород машину подаём в согласованное окно, обычно в течение того же или следующего дня.',
  },
  {
    q: 'Как рассчитывается стоимость перевозки?',
    a: 'Цена зависит от типа перевозки (город или межгород), класса машины, веса и объёма груза, а также расстояния. Предварительную стоимость можно получить в калькуляторе на сайте за минуту, точную — у менеджера после уточнения деталей груза.',
  },
  {
    q: 'Вы работаете с юридическими лицами и НДС?',
    a: 'Да. Работаем по договору с юрлицами и ИП, предоставляем полный пакет закрывающих документов, поддерживаем ЭДО и работу с НДС. Также возможна оплата от физических лиц.',
  },
  {
    q: 'Застрахован ли груз?',
    a: 'Ответственность перевозчика застрахована на сумму до $100 000. По запросу оформляем дополнительное страхование конкретного груза на его полную стоимость.',
  },
  {
    q: 'Можно ли отследить груз в пути?',
    a: 'Да, все машины оснащены GPS. Вы получаете статусы по этапам доставки и можете уточнить местоположение груза у персонального менеджера в любой момент 24/7.',
  },
  {
    q: 'Какие грузы вы не перевозите?',
    a: 'Мы не работаем с запрещёнными к перевозке грузами, опасными веществами без соответствующего допуска и товарами без сопроводительных документов. По спецгрузам и негабариту — согласуем условия индивидуально.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Вопросы и ответы
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Отвечаем на частые вопросы
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Accordion className="mt-12 w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-3 overflow-hidden rounded-2xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
