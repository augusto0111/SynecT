import type { ReactNode } from 'react'

type SectionHeaderProps = {
  code: string
  title: ReactNode
  subtitle?: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  code,
  title,
  subtitle,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <p className="tech-eyebrow">{code}</p>
      <h2 className="tech-title mt-3">{title}</h2>
      {subtitle && (
        <p className={`tech-subtitle mt-1 ${centered ? '' : ''}`}>{subtitle}</p>
      )}
      {description && (
        <p className={`mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
