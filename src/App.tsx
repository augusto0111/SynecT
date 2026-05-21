import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ImpactBand } from './components/ImpactBand'
import { VisionEcosystem } from './components/VisionEcosystem'
import { ProductShowcase } from './components/ProductShowcase'
import { Solutions } from './components/Solutions'
import { TrustSection } from './components/TrustSection'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <ImpactBand />
        <VisionEcosystem />
        <ProductShowcase />
        <Solutions />
        <TrustSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
