import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SignInModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('signin')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[rgba(45,42,38,0.3)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-blush/90 glass-strong rounded-3xl p-8 shadow-[0_16px_48px_rgba(0,0,0,0.12)] relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-charcoal/50 mt-1 tracking-wide">
                {tab === 'signin' ? 'Sign in to your AURAE account' : 'Join the AURAE community'}
              </p>
            </div>

            <div className="flex bg-white/10 rounded-xl p-1 mb-6">
              <button
                onClick={() => setTab('signin')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  tab === 'signin'
                    ? 'bg-white/30 text-charcoal shadow-sm'
                    : 'text-charcoal/50 hover:text-charcoal/70'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  tab === 'signup'
                    ? 'bg-white/30 text-charcoal shadow-sm'
                    : 'text-charcoal/50 hover:text-charcoal/70'
                }`}
              >
                Sign Up
              </button>
            </div>

            {tab === 'signin' ? (
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="btn-primary w-full mt-2"
                >
                  Sign In
                </motion.button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="btn-primary w-full mt-2"
                >
                  Create Account
                </motion.button>
              </div>
            )}

            <p className="text-[10px] text-charcoal/30 text-center mt-5 leading-relaxed">
              By continuing, you agree to AURAE's Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}