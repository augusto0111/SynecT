import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { HeroDataCore } from './HeroDataCore'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const init = () => {
      particles.length = 0
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000)
      for (let i = 0; i < Math.max(count, 40); i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`
        ctx.fill()

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', () => {
      resize()
      init()
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  )
}

function HeroVisual() {
  return <HeroDataCore />
}

export function Hero() {
  return (
    <section className="section-seamless-bottom relative min-h-screen overflow-hidden pt-28 pb-20">
      <div className="aurora-bg absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-synect-orange/12 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-synect-orange/8 blur-[120px]" />
      <div className="absolute top-1/2 left-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-synect-orange/5 blur-[100px]" />
      <ParticleField />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-orange mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-synect-orange animate-pulse-glow" />
              <span className="font-mono text-xs text-synect-orange">
                ECOSISTEMA VISION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.5rem]"
            >
              Del mundo{' '}
              <span className="text-gradient glow-text">físico</span>
              <br />
              al{' '}
              <span className="text-gradient-orange glow-text">digital</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400"
            >
              Diseñamos hardware, software y agente de IA como un solo ecosistema.
              Del sensor en planta al histórico en la nube — inteligencia industrial
              que escala con tu operación.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-synect-orange px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-synect-orange-light hover:shadow-[0_0_40px_rgba(255,107,0,0.4)]"
              >
                Solicitar demo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#productos"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-neutral-300 transition-all hover:border-white/20 hover:text-white"
              >
                <Play size={14} className="text-synect-orange" />
                Ver productos
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex gap-10 border-t border-white/5 pt-8"
            >
              {[
                { value: 'VISION', label: 'Ecosistema principal' },
                { value: 'Live', label: 'Sensores en tiempo real' },
                { value: 'IA', label: 'Agente predictivo' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-synect-orange">{stat.value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
            Desplazar
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-synect-orange/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
