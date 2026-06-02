import type { VisualType } from './types'

export type DataStoryStep = {
  id: string
  question: string
  lens: string
  product: string
  description: string
  detail: string
  visual: VisualType
  href: string
}

export const dataStoryIntro = {
  eyebrow: 'Un dato, tres preguntas',
  title: 'El mismo activo.',
  subtitle: 'Tres formas de entenderlo.',
  description:
    'SynecT Vision, Connect + Insight e Intell no compiten entre sí: responden preguntas distintas sobre la misma telemetría. Ejemplo ilustrativo — TANQUE_PRINCIPAL.',
}

export const dataStorySteps: DataStoryStep[] = [
  {
    id: 'now',
    question: '¿Qué pasa ahora?',
    lens: 'Tiempo presente',
    product: 'SynecT Vision',
    description:
      'El operador ve nivel, tendencia y alertas en pantalla — junto al tanque, sin rondas ni planillas.',
    detail: 'Visibilidad in situ · umbrales · reacción inmediata',
    visual: 'vision',
    href: '#ecosistema-vision',
  },
  {
    id: 'past',
    question: '¿Qué pasó antes?',
    lens: 'Historial y contexto',
    product: 'Connect + Insight',
    description:
      'Connect guardó cada lectura. Insight muestra patrones por turno, picos anómalos y KPIs para decidir con datos.',
    detail: 'Historial soberano · dashboards · correlaciones',
    visual: 'analytics',
    href: '#ecosistema-connect',
  },
  {
    id: 'future',
    question: '¿Qué puede pasar?',
    lens: 'Anticipación',
    product: 'SynecT Intell',
    description:
      'Sobre ese historial, Intell detecta firmas de riesgo y sugiere ventanas de acción antes de un evento crítico.',
    detail: 'Modelos propios · alertas predictivas · optimización',
    visual: 'terminal',
    href: '#ecosistema-intell',
  },
]
