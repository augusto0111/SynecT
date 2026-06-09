import type { NavigateFunction } from 'react-router-dom'

export type HomeSectionId = 'inicio' | 'synect' | 'orion-catalog' | 'contacto'

const HASH_ALIASES: Record<string, HomeSectionId> = {
  inicio: 'inicio',
  synect: 'synect',
  vision: 'synect',
  ecosistema: 'synect',
  'orion-catalog': 'orion-catalog',
  orion: 'orion-catalog',
  contacto: 'contacto',
}

export function parseHomeHash(hash: string): HomeSectionId | null {
  const clean = hash.replace('#', '').toLowerCase()
  if (!clean) return null
  return HASH_ALIASES[clean] ?? null
}

export function homeSectionPath(section: HomeSectionId): string {
  if (section === 'inicio') return '/'
  return `/#${section}`
}

export function isHomeSectionActive(
  section: HomeSectionId,
  pathname: string,
  hash: string,
): boolean {
  if (pathname !== '/') return false
  if (section === 'inicio') return !hash || hash === '#inicio'
  return hash === `#${section}`
}

export function scrollToHomeSection(section: HomeSectionId): void {
  const el = document.getElementById(section)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function goToHomeSection(
  section: HomeSectionId,
  opts: { pathname: string; navigate: NavigateFunction },
): void {
  const { pathname, navigate } = opts
  navigate(homeSectionPath(section))

  if (pathname === '/') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToHomeSection(section))
    })
  }
}
