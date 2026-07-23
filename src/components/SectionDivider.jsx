import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-xs mx-auto h-px origin-center"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(183,110,121,0.15), rgba(183,110,121,0.15), transparent)',
      }}
    />
  )
}
