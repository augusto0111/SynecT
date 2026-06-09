import type { MouseEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  goToHomeSection,
  homeSectionPath,
  isHomeSectionActive,
  type HomeSectionId,
} from '../lib/navigation/homeScroll'

type HomeSectionLinkProps = {
  section: HomeSectionId
  className?: string | ((props: { isActive: boolean }) => string)
  children: ReactNode
  onNavigate?: () => void
  'aria-label'?: string
}

export function HomeSectionLink({
  section,
  className,
  children,
  onNavigate,
  'aria-label': ariaLabel,
}: HomeSectionLinkProps) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const isActive = isHomeSectionActive(section, pathname, hash)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onNavigate?.()
    goToHomeSection(section, { pathname, navigate })
  }

  const resolvedClass =
    typeof className === 'function' ? className({ isActive }) : className

  return (
    <a
      href={homeSectionPath(section)}
      onClick={handleClick}
      className={resolvedClass}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}
