import { cn } from '@/lib/utils'

export function Logo({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'md' | 'lg'
}) {
  return (
    <a
      href="/"
      aria-label="PinPiece — на главную"
      className={cn('group inline-flex select-none flex-col leading-none', className)}
    >
      <span
        className={cn(
          'font-black uppercase tracking-[-0.055em] text-foreground',
          size === 'lg' ? 'text-3xl' : 'text-xl',
        )}
      >
        <span className="text-foreground">PIN</span>
        <span className="bg-gradient-to-r from-brand to-[#5b8bff] bg-clip-text text-transparent">
          PIECE
        </span>
        <span className="ml-0.5 inline-block h-1.5 w-1.5 translate-y-[-0.15em] rounded-[2px] bg-signal align-baseline transition-transform duration-300 group-hover:rotate-45" />
      </span>
      <span
        className={cn(
          'mt-1 block h-[2px] w-0 rounded-full bg-gradient-to-r from-brand to-signal transition-all duration-300 group-hover:w-full',
        )}
      />
      <span
        className={cn(
          'mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground',
          size === 'lg' ? 'text-[11px]' : 'text-[10px]',
        )}
      >
        Логистический центр
      </span>
    </a>
  )
}
