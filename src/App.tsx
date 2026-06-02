import { TechShell } from './components/tech/TechShell'
import { TechMarquee } from './components/tech/TechMarquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SocialProof } from './components/SocialProof'
import { WhatIsSynecT } from './components/WhatIsSynecT'
import { ComparisonSection } from './components/ComparisonSection'
import { SynectEcosystem } from './components/SynectEcosystem'
import { TechnologyBenefitsSection } from './components/TechnologyBenefitsSection'
import { TrustSection } from './components/TrustSection'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionProgress } from './components/SectionProgress'

function App() {
  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Ir al contenido principal
      </a>
      <TechShell />
      <Navbar />
      <main id="contenido-principal" className="relative z-10 pb-16 lg:pb-0">
        <Hero />
        <TechMarquee />
        <SocialProof />
        <WhatIsSynecT />
        <ComparisonSection />
        <SynectEcosystem />
        <TechnologyBenefitsSection />
        <TrustSection />
        <About />
        <Contact />
      </main>
      <SectionProgress />
      <Footer />
    </>
  )
}

export default App
