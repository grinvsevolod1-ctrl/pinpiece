import { Reveal } from './reveal'

const CLIENTS = [
  'МегаМаркет',
  'ТехноЛайн',
  'ФармаДом',
  'СтройБаза',
  'ГрандРитейл',
  'Эко-Продукт',
  'АвтоДеталь',
  'НордФиш',
]

export function Clients() {
  return (
    <section aria-label="Нам доверяют" className="border-b border-border/60 py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Нам доверяют более 4 800 компаний
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {CLIENTS.map((name, i) => (
            <Reveal key={name} delay={i * 0.04}>
              <div className="flex h-12 items-center justify-center rounded-xl border border-border/60 bg-card/40 px-3 text-center text-sm font-bold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                {name}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
