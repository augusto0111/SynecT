import { motion } from 'framer-motion'
import type { DemoPanelData } from '../../lib/tech/stackDemoPanels'
import { TechDemoPanel } from './TechDemoPanel'

type TechDemoPanelStackProps = {
  panels: DemoPanelData[]
  className?: string
}

export function TechDemoPanelStack({ panels, className = '' }: TechDemoPanelStackProps) {
  return (
    <div className={className}>
      {panels.map((panel, i) => (
        <motion.div
          key={panel.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
          className="tech-demo-stack-item"
          style={{ zIndex: panels.length - i }}
        >
          <TechDemoPanel panel={panel} compact={i > 0} />
        </motion.div>
      ))}
    </div>
  )
}
