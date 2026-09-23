import { Reveal } from './reveal'
import { Counter } from './counter'

const HUB = { x: 250, y: 210, label: 'Москва' }
const NODES = [
  { x: 120, y: 120, label: 'СПб' },
  { x: 400, y: 100, label: 'Екатеринбург' },
  { x: 560, y: 150, label: 'Новосибирск' },
  { x: 680, y: 240, label: 'Иркутск' },
  { x: 740, y: 130, label: 'Владивосток' },
  { x: 470, y: 300, label: 'Казань' },
  { x: 180, y: 320, label: 'Краснодар' },
  { x: 330, y: 330, label: 'Самара' },
]

const STATS = [
  { to: 180, suffix: '+', label: 'городов присутствия' },
  { to: 5, suffix: ' млн км', label: 'пробег автопарка в год' },
  { to: 99.4, decimals: 1, suffix: '%', label: 'доставок в срок' },
  { to: 24, suffix: '/7', label: 'диспетчерская поддержка' },
]

export function Coverage() {
  return (
    <section id="coverage" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand">
                География
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Единая сеть маршрутов от Калининграда до Владивостока
              </h2>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Магистральные хабы в ключевых регионах позволяют строить прямые рейсы и держать
                сроки даже на самых дальних плечах.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-extrabold text-foreground sm:text-4xl">
                      <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-border bg-card/60 p-4 backdrop-blur">
              <svg viewBox="0 0 800 400" className="w-full" role="img" aria-label="Схема маршрутной сети PinPiece">
                {NODES.map((n, i) => (
                  <path
                    key={i}
                    d={`M ${HUB.x} ${HUB.y} Q ${(HUB.x + n.x) / 2} ${Math.min(HUB.y, n.y) - 50} ${n.x} ${n.y}`}
                    fill="none"
                    stroke="#2f6bff"
                    strokeWidth="1.5"
                    strokeDasharray="6 8"
                    strokeOpacity="0.7"
                    className="animate-dash"
                  />
                ))}
                {NODES.map((n, i) => (
                  <g key={`n-${i}`}>
                    <circle cx={n.x} cy={n.y} r="5" fill="#eef2fb" />
                    <text
                      x={n.x}
                      y={n.y - 12}
                      fill="#8b97b3"
                      fontSize="12"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
                <circle cx={HUB.x} cy={HUB.y} r="16" fill="#2f6bff" fillOpacity="0.25">
                  <animate attributeName="r" values="16;26;16" dur="2.6s" repeatCount="indefinite" />
                  <animate
                    attributeName="fill-opacity"
                    values="0.35;0;0.35"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={HUB.x} cy={HUB.y} r="8" fill="#2f6bff" />
                <text
                  x={HUB.x}
                  y={HUB.y + 30}
                  fill="#eef2fb"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {HUB.label}
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
