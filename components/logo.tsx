export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="PinPiece" fill="none">
      <rect width="32" height="32" rx="9" fill="var(--color-signal)" />
      <path
        d="M16 5c-4.4 0-8 3.4-8 7.6 0 5.3 6.6 12 7.4 12.8.3.3.9.3 1.2 0C17.4 24.6 24 17.9 24 12.6 24 8.4 20.4 5 16 5Z"
        fill="var(--color-brand)"
      />
      <circle cx="16" cy="12.4" r="3.1" fill="var(--color-signal)" />
    </svg>
  )
}
