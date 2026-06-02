const lines = [
  '[HW]  Sensores · Field Unit · pantallas industriales',
  '[SW]  Connect · Insight · consolas operativas',
  '[IA]  SynecT Intell · modelos predictivos en planta',
  '[SYS] Stack unificado · VISION planta · ORION flota',
  '[EDGE] Telemetría · sync · monitoreo 24/7',
]

export function TechMarquee() {
  const track = [...lines, ...lines]

  return (
    <div
      className="tech-marquee border-y border-white/[0.06] bg-black/40 py-2.5"
      aria-hidden="true"
    >
      <div className="tech-marquee-track">
        {track.map((line, i) => (
          <span key={`${line}-${i}`} className="tech-marquee-item">
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
