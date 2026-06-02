import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const PTS_PER_MONTH = 6

function buildSeries(months: number, layer: number, time: number): number[] {
  const total = months * PTS_PER_MONTH
  const out: number[] = []
  for (let i = 0; i < total; i++) {
    const m = i / PTS_PER_MONTH
    const micro = (i % PTS_PER_MONTH) / PTS_PER_MONTH
    const base =
      0.48 +
      0.2 * Math.sin(m * 0.85 + layer * 1.4 + 0.3) +
      0.14 * Math.cos(m * 1.35 - layer * 0.6) +
      0.06 * Math.sin(micro * Math.PI * 2 + layer)
    const live = Math.sin(i * 0.08 + time * 0.4 + layer) * 0.018
    out.push(clamp01(base + live))
  }
  return out
}

function clamp01(v: number) {
  return Math.max(0.1, Math.min(0.9, v))
}

function monthDensity(monthIndex: number, row: number): number {
  const seed = Math.sin(monthIndex * 1.1 + row * 2.3) * 0.5 + 0.5
  const trend = monthIndex / 11
  return clamp01(0.25 + trend * 0.45 + seed * 0.3)
}

type Layout = {
  plotX: number
  plotY: number
  plotW: number
  plotH: number
  heatY: number
  heatH: number
  monthsY: number
}

function layout(w: number, h: number): Layout {
  const pad = { l: 52, r: 12, t: 6, b: 10 }
  const heatH = 26
  const monthsBand = 18
  const heatGap = 14

  const plotX = pad.l
  const plotY = pad.t
  const plotW = w - pad.l - pad.r
  const plotH = h - pad.t - pad.b - monthsBand - heatGap - heatH
  const monthsY = plotY + plotH + 10
  const heatY = monthsY + monthsBand + heatGap

  return { plotX, plotY, plotW, plotH, heatY, heatH, monthsY }
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  dpr: number,
  staticFull = false
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const { plotX, plotY, plotW, plotH, heatY, heatH, monthsY } = layout(w, h)

  const plotBg = ctx.createLinearGradient(plotX, plotY, plotX, plotY + plotH)
  plotBg.addColorStop(0, 'rgba(255, 107, 0, 0.04)')
  plotBg.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = plotBg
  ctx.fillRect(plotX, plotY, plotW, plotH)

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
  ctx.lineWidth = 1
  for (let g = 0; g <= 5; g++) {
    const y = plotY + (g / 5) * plotH
    ctx.beginPath()
    ctx.moveTo(plotX, y)
    ctx.lineTo(plotX + plotW, y)
    ctx.stroke()
  }
  for (let m = 0; m <= 12; m++) {
    const x = plotX + (m / 12) * plotW
    ctx.beginPath()
    ctx.moveTo(x, plotY)
    ctx.lineTo(x, plotY + plotH)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
  ctx.lineWidth = 1.25
  ctx.beginPath()
  ctx.moveTo(plotX, plotY + plotH)
  ctx.lineTo(plotX + plotW, plotY + plotH)
  ctx.moveTo(plotX, plotY)
  ctx.lineTo(plotX, plotY + plotH)
  ctx.stroke()

  ctx.font = '10px "JetBrains Mono", ui-monospace, monospace'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.28)'
  for (let g = 0; g <= 4; g++) {
    const y = plotY + (1 - g / 4) * plotH
    if (g === 0) continue
    ctx.fillText(`${g * 25}%`, plotX - 10, y)
  }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.38)'
  MONTHS.forEach((label, m) => {
    const x = plotX + ((m + 0.5) / 12) * plotW
    ctx.fillText(label, x, monthsY)
  })

  const totalPts = 12 * PTS_PER_MONTH
  const toXY = (i: number, v: number) => ({
    x: plotX + (i / (totalPts - 1)) * plotW,
    y: plotY + plotH - v * plotH,
  })

  ;[0, 1, 2].forEach((layer) => {
    const data = buildSeries(12, layer, time)
    ctx.beginPath()
    data.forEach((v, i) => {
      const { x, y } = toXY(i, v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle =
      layer === 2 ? 'rgba(255, 107, 0, 0.2)' : `rgba(0, 190, 205, ${0.22 - layer * 0.05})`
    ctx.lineWidth = layer === 2 ? 1.5 : 1
    ctx.stroke()
  })

  const main = buildSeries(12, 0.5, time)
  const reveal = staticFull ? 1 : reducedMotionReveal(time)
  const endIndex = Math.floor(reveal * (totalPts - 1))

  ctx.beginPath()
  main.forEach((v, i) => {
    if (i > endIndex) return
    const { x, y } = toXY(i, v)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  const areaGrad = ctx.createLinearGradient(0, plotY, 0, plotY + plotH)
  areaGrad.addColorStop(0, 'rgba(255, 107, 0, 0.22)')
  areaGrad.addColorStop(1, 'rgba(255, 107, 0, 0)')
  ctx.lineTo(toXY(endIndex, 0).x, plotY + plotH)
  ctx.lineTo(plotX, plotY + plotH)
  ctx.closePath()
  ctx.fillStyle = areaGrad
  ctx.fill()

  ctx.beginPath()
  main.forEach((v, i) => {
    if (i > endIndex) return
    const { x, y } = toXY(i, v)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.strokeStyle = 'rgba(255, 107, 0, 0.95)'
  ctx.lineWidth = 2
  ctx.shadowColor = 'rgba(255, 107, 0, 0.45)'
  ctx.shadowBlur = 8
  ctx.stroke()
  ctx.shadowBlur = 0

  const cursorIdx = staticFull ? 1 : reducedMotionReveal(time, true)
  const ci = Math.floor(cursorIdx * (totalPts - 1))
  const cp = toXY(ci, main[ci])
  ctx.fillStyle = '#ff6b00'
  ctx.beginPath()
  ctx.arc(cp.x, cp.y, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255, 107, 0, 0.35)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cp.x, plotY)
  ctx.lineTo(cp.x, plotY + plotH)
  ctx.stroke()

  const cellW = plotW / 12
  const rows = 3
  const cellH = heatH / rows
  for (let m = 0; m < 12; m++) {
    for (let r = 0; r < rows; r++) {
      const dens = monthDensity(m, r)
      const pulse = 0.85 + Math.sin(time * 0.8 + m * 0.4 + r) * 0.15
      ctx.fillStyle = `rgba(0, 200, 210, ${dens * 0.35 * pulse})`
      ctx.fillRect(plotX + m * cellW + 1, heatY + r * cellH + 1, cellW - 2, cellH - 2)
    }
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.strokeRect(plotX, heatY, plotW, heatH)

  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.32)'
  ctx.font = '9px "JetBrains Mono", ui-monospace, monospace'
  ctx.fillText('Densidad de registros', plotX, heatY - 6)
}

function reducedMotionReveal(time: number, loop = false): number {
  if (loop) return (time * 0.08) % 1
  return Math.min(1, (time * 0.12) % 1.2)
}

const STATUS = [
  '12 meses de histórico indexados en Connect',
  'Insight · correlación sobre serie temporal',
  'Registros por turno agregados al gráfico',
  'Ventana deslizante · último punto en vivo',
]

export function InsightTelemetryViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      return { w: rect.width, h: rect.height, dpr }
    }

    let dims = resize()
    const onResize = () => {
      dims = resize()
    }
    window.addEventListener('resize', onResize)

    const paint = (time: number, full = false) => {
      drawFrame(ctx, dims.w, dims.h, time, dims.dpr, full || reducedMotion)
    }

    paint(0, true)

    if (!active || reducedMotion) {
      return () => window.removeEventListener('resize', onResize)
    }

    let raf = 0
    const loop = (now: number) => {
      paint(now * 0.001)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      dims = resize()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [active, reducedMotion])

  useEffect(() => {
    if (reducedMotion || !active) return
    const id = setInterval(() => setTick((n) => n + 1), 2800)
    return () => clearInterval(id)
  }, [active, reducedMotion])

  return (
    <div
      className="insight-viz flex h-full w-full max-w-2xl flex-col"
      aria-label="Gráfico de histórico de telemetría — 12 meses de registros SynecT Connect e Insight"
    >
      <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-0.5 font-mono text-[9px] uppercase tracking-wider">
        <span className="text-cyan-400/85">Connect · histórico</span>
        <span className="text-center text-neutral-600">Índice relativo</span>
        <span className="text-right text-synect-orange/85">Insight · análisis</span>
      </div>

      <canvas
        ref={canvasRef}
        className="block min-h-[240px] w-full flex-1 sm:min-h-[280px]"
      />

      <div className="mt-2 border-t border-white/5 pt-2">
        <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-600">
          Serie temporal 2D · eje X = meses
        </p>
        <p className="mt-0.5 font-mono text-[10px] leading-snug text-neutral-400 sm:text-xs">
          {STATUS[tick % STATUS.length]}
        </p>
      </div>
    </div>
  )
}
