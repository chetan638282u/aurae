import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react'
import { questions, getRecommendations } from '../../data/quiz'
import products from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function SkinQuiz({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const { addItem, setIsOpen: openCart } = useCart()
  const isMobile = useIsMobile()

  const totalQuestions = questions.length

  const selectAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    if (step < totalQuestions - 1) {
      setTimeout(() => setStep((s) => s + 1), 300)
    } else {
      const recs = getRecommendations({ ...answers, [questionId]: value }, products)
      setResults(recs)
    }
  }, [step, answers, totalQuestions])

  const reset = () => {
    setStep(0)
    setAnswers({})
    setResults(null)
  }

  const handleAddAll = () => {
    results.forEach((p) => addItem(p))
    openCart(true)
    onClose()
    setTimeout(reset, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMobile ? 0 : 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[rgba(45,42,38,0.3)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: isMobile ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'rgba(255, 228, 225, 0.9)' }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-rosegold" />
                  <h2 className="font-serif text-xl font-bold text-charcoal">Skin Quiz</h2>
                </div>
                <button
                  onClick={() => { onClose(); setTimeout(reset, 300) }}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              </div>

              {!results && (
                <div className="flex items-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ background: i <= step ? '#B76E79' : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {!results && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-2">
                      Question {step + 1} of {totalQuestions}
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-charcoal mb-6">
                      {questions[step].question}
                    </h3>

                    <div className="space-y-3">
                      {questions[step].options.map((opt) => {
                        const selected = answers[questions[step].id] === opt.value
                        return (
                          <motion.button
                            key={opt.value}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => selectAnswer(questions[step].id, opt.value)}
                            className={`w-full text-left glass rounded-xl p-4 transition-all duration-300 ${
                              selected
                                ? 'border-rosegold shadow-[0_0_20px_rgba(183,110,121,0.15)]'
                                : 'hover:border-white/50'
                            }`}
                          >
                            <p className="text-sm font-medium text-charcoal">{opt.label}</p>
                            <p className="text-xs text-charcoal/50 mt-0.5">{opt.description}</p>
                          </motion.button>
                        )
                      })}
                    </div>

                    {step > 0 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setStep((s) => s - 1)}
                        className="mt-6 flex items-center gap-1 text-xs text-charcoal/50 hover:text-charcoal transition-colors"
                      >
                        <ChevronLeft size={14} />
                        Back
                      </motion.button>
                    )}
                  </motion.div>
                )}

                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-4">
                        <Sparkles size={28} className="text-rosegold" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-charcoal">Your Ritual Awaits</h3>
                      <p className="text-sm text-charcoal/60 mt-2">
                        Based on your answers, we recommend these products for you
                      </p>
                    </div>

                    <div className="space-y-3">
                      {results.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="glass rounded-xl p-4 flex items-center gap-4"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-charcoal truncate">{product.name}</p>
                            <p className="text-xs text-charcoal/50">{product.category} — ${product.price}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddAll}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={16} />
                        Add All to Cart
                      </motion.button>
                      <button
                        onClick={() => { reset() }}
                        className="text-xs text-charcoal/50 hover:text-charcoal transition-colors text-center"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
