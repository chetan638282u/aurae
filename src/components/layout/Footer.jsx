import { motion } from 'framer-motion'
import { useLenis } from '../../context/LenisContext'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4.5-6.5 8-3.6z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

const quickLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const lenis = useLenis()

  const scrollTo = (href) => {
    if (lenis) lenis.scrollTo(href, { offset: -80, duration: 1.2 })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass border-t border-[rgba(255,255,255,0.3)] mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <button onClick={() => scrollTo('#hero')} className="font-serif text-2xl font-bold tracking-wide text-left" style={{ color: '#B76E79' }}>
              AURAE
            </button>
            <p className="mt-4 text-sm text-charcoal/60 leading-relaxed max-w-xs">
              Where modern science meets botanical luxury. Every ritual is designed to transform your daily routine into a moment of radiance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-charcoal/80 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-left text-charcoal/60 hover:text-rosegold transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-charcoal/80 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-charcoal/60 hover:text-rosegold hover:border-rosegold/40 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.2)]">
          <p className="text-center text-xs text-charcoal/40 tracking-wide">
            &copy; {new Date().getFullYear()} AURAE. All rights reserved. Crafted with intention.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
