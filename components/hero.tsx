import { ShieldCheck, Zap } from "lucide-react"
import { Ticker } from "./ticker"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand text-white">
      {/* decorative sketch-style shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full border-2 border-white" />
        <div className="absolute right-10 top-24 h-40 w-40 rotate-12 rounded-3xl border-2 border-white" />
        <div className="absolute bottom-8 left-1/3 h-24 w-24 rounded-full border-2 border-dashed border-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium">
          <ShieldCheck className="h-4 w-4 text-signal" />
          100% белое оформление · официально с первого дня
        </div>

        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          Белая логистика{" "}
          <span className="text-signal">города</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg text-white/80 sm:text-xl">
          PinPiece доставляет заказы за 60 минут — и оформляет каждого сотрудника в белую.
          Официальный договор, белая зарплата и выплаты каждую неделю. Курьеру, кладовщику, диспетчеру, менеджеру.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#apply"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-base font-bold text-signal-ink transition-transform hover:-translate-y-0.5"
          >
            <Zap className="h-5 w-5" />
            Работать в белую
          </a>
          <a
            href="#business"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/15"
          >
            Заказать доставку
          </a>
        </div>
      </div>

      <Ticker />
    </section>
  )
}
