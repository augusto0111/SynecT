import { Outlet } from 'react-router-dom'
import { TechShell } from '../components/tech/TechShell'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function SiteLayout() {
  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Ir al contenido principal
      </a>
      <TechShell />
      <Navbar />
      <main id="contenido-principal" className="relative z-10 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}
