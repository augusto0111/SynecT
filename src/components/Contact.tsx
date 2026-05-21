import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, CheckCircle2 } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const nombre = (data.get('nombre') as string).trim()
    const email = (data.get('email') as string).trim()
    const empresa = (data.get('empresa') as string).trim()
    const mensaje = (data.get('mensaje') as string).trim()

    const newErrors: Record<string, string> = {}
    if (!nombre) newErrors.nombre = 'Ingresá tu nombre'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Ingresá un email válido'
    if (!empresa) newErrors.empresa = 'Ingresá tu empresa o industria'
    if (!mensaje) newErrors.mensaje = 'Contanos sobre tu operación'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setFormState('submitting')

    const subject = encodeURIComponent(`Demo SynecT — ${empresa}`)
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nEmpresa: ${empresa}\n\n${mensaje}`
    )

    window.location.href = `mailto:contacto@synect.io?subject=${subject}&body=${body}`

    setTimeout(() => {
      setFormState('success')
      form.reset()
    }, 600)
  }

  return (
    <section id="contacto" className="section-seamless relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong glow-orange relative overflow-hidden rounded-3xl p-10 sm:p-16"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-synect-orange/10 blur-[80px]" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-synect-orange">
                Contacto
              </p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                ¿Listo para conectar
                <br />
                <span className="text-gradient-orange">tu industria?</span>
              </h2>
              <p className="mt-4 max-w-md text-neutral-400">
                Agenda una demo personalizada y descubre cómo SynecT puede transformar la
                operación de tu planta con telemetría, IA predictiva y dashboards de alto
                impacto.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:contacto@synect.io"
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Mail size={16} className="text-synect-orange" />
                  contacto@synect.io
                </a>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <MapPin size={16} className="text-synect-orange" />
                  Argentina — Expansión global
                </div>
              </div>
            </div>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <CheckCircle2 className="mx-auto text-synect-orange" size={48} />
                <h3 className="mt-4 text-xl font-bold">¡Solicitud preparada!</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Se abrió tu cliente de correo con los datos completos. Si no se abrió,
                  escribinos directamente a{' '}
                  <a href="mailto:contacto@synect.io" className="text-synect-orange">
                    contacto@synect.io
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="mt-6 text-sm text-neutral-500 underline hover:text-white"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="mb-1.5 block text-xs text-neutral-500">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-synect-orange/40"
                      placeholder="Tu nombre"
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                    />
                    {errors.nombre && (
                      <p id="nombre-error" className="mt-1 text-xs text-red-400">
                        {errors.nombre}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs text-neutral-500">
                      Email corporativo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-synect-orange/40"
                      placeholder="tu@empresa.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="empresa" className="mb-1.5 block text-xs text-neutral-500">
                    Empresa / Industria
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-synect-orange/40"
                    placeholder="Nombre de empresa o sector"
                    aria-invalid={!!errors.empresa}
                    aria-describedby={errors.empresa ? 'empresa-error' : undefined}
                  />
                  {errors.empresa && (
                    <p id="empresa-error" className="mt-1 text-xs text-red-400">
                      {errors.empresa}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="mensaje" className="mb-1.5 block text-xs text-neutral-500">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Cuéntanos sobre tu operación..."
                    rows={4}
                    className="glass w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-synect-orange/40"
                    aria-invalid={!!errors.mensaje}
                    aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
                  />
                  {errors.mensaje && (
                    <p id="mensaje-error" className="mt-1 text-xs text-red-400">
                      {errors.mensaje}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-synect-orange py-3.5 text-sm font-semibold text-black transition-all hover:bg-synect-orange-light hover:shadow-[0_0_40px_rgba(255,107,0,0.3)] disabled:opacity-60"
                >
                  {formState === 'submitting' ? 'Preparando...' : 'Solicitar demo'}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
