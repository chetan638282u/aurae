import { motion } from 'framer-motion'
import { Star, ShieldCheck } from 'lucide-react'

const avatarGradients = [
  'linear-gradient(135deg, #B76E79, #D4A0A7)',
  'linear-gradient(135deg, #C9A96E, #DEC28C)',
  'linear-gradient(135deg, #8B9DAF, #B0C4D8)',
  'linear-gradient(135deg, #A8B5A2, #C5D4C0)',
  'linear-gradient(135deg, #C49A8C, #D9BDB2)',
  'linear-gradient(135deg, #9B8EB5, #BEB2D4)',
]

export default function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 md:p-8 flex flex-col"
    >
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? 'text-rosegold' : 'text-charcoal/15'}
            fill={i < review.rating ? '#B76E79' : 'none'}
          />
        ))}
      </div>

      <p className="text-sm md:text-base text-charcoal/70 leading-relaxed italic flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold uppercase text-white shrink-0"
          style={{
            background: avatarGradients[index % avatarGradients.length],
          }}
        >
          {review.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-medium text-charcoal">{review.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <ShieldCheck size={11} className="text-green-500" />
            <p className="text-[10px] text-green-600/70 tracking-wider uppercase font-medium">Verified Client</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
