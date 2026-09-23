export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-[0_0_24px_-4px] shadow-brand/70">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2c-3.6 0-6.5 2.9-6.5 6.5 0 4.6 6.5 13.5 6.5 13.5s6.5-8.9 6.5-13.5C18.5 4.9 15.6 2 12 2Z"
            fill="#fff"
          />
          <circle cx="12" cy="8.4" r="2.4" fill="#2f6bff" />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-foreground">
        Pin<span className="text-brand">Piece</span>
      </span>
    </a>
  )
}
