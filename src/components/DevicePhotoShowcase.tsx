import { motion } from 'framer-motion'

type DevicePhotoShowcaseProps = {
  src: string
  alt: string
  label: string
  sublabel: string
  maxWidth?: 'md' | 'lg' | 'xl'
  variant?: 'sharp' | 'soft' | 'integrated'
}

export function DevicePhotoShowcase({
  src,
  alt,
  label,
  sublabel,
  maxWidth = 'lg',
  variant = 'sharp',
}: DevicePhotoShowcaseProps) {
  const widthClass = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[maxWidth]

  const imageClass =
    variant === 'integrated'
      ? 'device-photo-integrated'
      : variant === 'sharp'
        ? 'device-photo-sharp'
        : 'device-photo-soft'

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-synect-orange/20 blur-[100px]" />

      <div className="relative flex min-h-[400px] w-full items-center justify-center sm:min-h-[460px]">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative z-10 w-full"
        >
          <motion.img
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={src}
            alt={alt}
            className={`relative z-10 mx-auto w-full select-none ${widthClass} ${imageClass} drop-shadow-[0_40px_80px_rgba(255,107,0,0.15)]`}
            draggable={false}
          />
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-0 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-synect-orange/20 blur-2xl" />

        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap">
          <span className="text-synect-orange">{label}</span>
          <span className="mx-2 text-neutral-700">|</span>
          <span className="text-neutral-500">{sublabel}</span>
        </div>
      </div>
    </div>
  )
}
