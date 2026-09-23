import Image from 'next/image'
import { Reveal } from './reveal'
import { Truck, ShieldCheck, Radar, FileText, Headphones, Wallet } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Собственный автопарк', text: '250+ машин без посредников' },
  { icon: ShieldCheck, title: 'Страховка груза', text: 'Ответственность до 10 млн ₽' },
  { icon: Radar, title: 'Трекинг 24/7', text: 'GPS и статусы в реальном времени' },
  { icon: FileText, title: 'ЭДО и полный пакет', text: 'Закрывающие в тот же день' },
  { icon: Headphones, title: 'Личный менеджер', text: 'Один контакт по всем рейсам' },
  { icon: Wallet, title: 'Прозрачная цена', text: 'Без скрытых доплат в пути' },
]

export function Advantages() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-80 overflow-hidden rounded-3xl border border-border sm:h-[30rem]">
              <Image
                src="/hub-aerial.png"
                alt="Логистический хаб PinPiece с высоты"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute left-6 top-6 rounded-2xl border border-border bg-card/70 px-5 py-4 backdrop-blur">
                <div className="text-3xl font-extrabold text-foreground">15 000 м²</div>
                <div className="text-sm text-muted-foreground">склад ответственного хранения</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">
                Почему PinPiece
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Логистика, за которую отвечаем головой
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {ITEMS.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                      <it.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-bold text-foreground">{it.title}</div>
                      <div className="text-sm text-muted-foreground">{it.text}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
