type Props = {
  size?: 'sm' | 'lg'
  className?: string
}

const sizes = {
  sm: 'text-xl',
  lg: 'text-[clamp(3.5rem,14vw,7rem)]',
} as const

export function SynectLogo({ size = 'sm', className = '' }: Props) {
  return (
    <span
      className={`synect-wordmark ${sizes[size]} font-medium leading-none tracking-tight text-white ${className}`}
      aria-label="SynecT"
    >
      SynecT
    </span>
  )
}
