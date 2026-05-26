import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SocialProof } from './components/SocialProof'
import { ImpactBand } from './components/ImpactBand'
import { SynectEcosystem } from './components/SynectEcosystem'
import { Solutions } from './components/Solutions'
import { TrustSection } from './components/TrustSection'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Ir al contenido principal
      </a>
      <Navbar />
      <main id="contenido-principal" className="pb-16 lg:pb-0">
        <Hero />
        <SocialProof />
        <ImpactBand />
        <SynectEcosystem />
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
