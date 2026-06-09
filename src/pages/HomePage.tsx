import { Hero } from '../components/Hero'
import { OrionShowroomSection } from '../components/OrionShowroomSection'
import { VisionShowroomSection } from '../components/VisionShowroomSection'
import { Contact } from '../components/Contact'
import { useHomeHashScroll } from '../hooks/useHomeHashScroll'

export function HomePage() {
  useHomeHashScroll()

  return (
    <div className="home-scroll-snap">
      <Hero />
      <VisionShowroomSection />
      <OrionShowroomSection />
      <Contact />
    </div>
  )
}
