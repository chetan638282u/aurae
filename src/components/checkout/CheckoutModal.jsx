import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, Check } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import Toast from '../contact/Toast'

const initialFields = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
}

export default function CheckoutModal({ isOpen, onClose }) {
  const { items, subtotal, clearCart, setIsOpen: closeCart } = useCart()
  const [step, setStep] = useState(1)
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, submitting])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setFields(initialFields)
        setErrors({})
        setDone(false)
      }, 300)
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const validateStep1 = () => {
    const errs = {}
    if (!fields.name.trim() || fields.name.trim().length < 2) errs.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Valid email required'
    if (!fields.address.trim()) errs.address = 'Address is required'
    if (!fields.city.trim()) errs.city = 'City is required'
    if (!fields.zip.trim()) errs.zip = 'ZIP code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping: fields,
          items: items.map((i) => ({
            product: { id: i.product.id, name: i.product.name, price: i.product.price },
            quantity: i.quantity,
          })),
          subtotal,
        }),
      })
      if (!res.ok) throw new Error('Checkout failed')
      setDone(true)
      clearCart()
      setToast({ visible: true, message: 'Order placed! You will receive a confirmation shortly.', type: 'success' })
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }))
        closeCart()
        onClose()
      }, 2500)
    } catch {
      setToast({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' })
      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0 : 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            style={{ background: 'rgba(45, 42, 38, 0.4)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: isMobile ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    ) : null}
                    <h2 className="font-serif text-xl font-bold text-charcoal">
                      {step === 1 ? 'Shipping' : 'Review Order'}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'text-white' : 'text-charcoal/50'}`}
                      style={{ background: step >= 1 ? '#B76E79' : 'rgba(255,255,255,0.15)' }}>
                      {step > 1 ? <Check size={12} /> : 1}
                    </span>
                    <span className={`text-xs font-medium ${step >= 1 ? 'text-charcoal' : 'text-charcoal/50'}`}>Shipping</span>
                  </div>
                  <div className="flex-1 h-px bg-white/20 mx-2" />
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'text-white' : 'text-charcoal/50'}`}
                      style={{ background: step >= 2 ? '#B76E79' : 'rgba(255,255,255,0.15)' }}>
                      2
                    </span>
                    <span className={`text-xs font-medium ${step >= 2 ? 'text-charcoal' : 'text-charcoal/50'}`}>Review</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Name" name="name" value={fields.name} onChange={handleChange} error={errors.name} placeholder="Full name" />
                        <Field label="Email" name="email" type="email" value={fields.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" />
                      </div>
                      <Field label="Phone (optional)" name="phone" type="tel" value={fields.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                      <Field label="Address" name="address" value={fields.address} onChange={handleChange} error={errors.address} placeholder="Street address" />
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Field label="City" name="city" value={fields.city} onChange={handleChange} error={errors.city} placeholder="City" />
                        <Field label="State" name="state" value={fields.state} onChange={handleChange} placeholder="State" />
                        <Field label="ZIP" name="zip" value={fields.zip} onChange={handleChange} error={errors.zip} placeholder="ZIP code" />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { if (validateStep1()) setStep(2) }}
                        className="btn-primary w-full mt-2"
                      >
                        Continue to Review
                      </motion.button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="space-y-4"
                    >
                      <div className="glass rounded-xl p-4 space-y-3">
                        <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Order Summary</p>
                        {items.map((item) => (
                          <div key={item.product.id} className="flex items-center justify-between text-sm">
                            <span className="text-charcoal/70 truncate mr-2">
                              {item.product.name} <span className="text-charcoal/40">×{item.quantity}</span>
                            </span>
                            <span className="font-medium text-charcoal shrink-0">
                              ${(item.product.price * item.quantity).toFixed(0)}
                            </span>
                          </div>
                        ))}
                        <div className="pt-3 mt-3 border-t border-white/20 flex items-center justify-between">
                          <span className="text-sm font-semibold text-charcoal">Total</span>
                          <span className="font-serif text-lg font-bold text-charcoal">${subtotal.toFixed(0)}</span>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4">
                        <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Shipping To</p>
                        <p className="text-sm text-charcoal/70">{fields.name}</p>
                        <p className="text-sm text-charcoal/70">{fields.email}</p>
                        <p className="text-sm text-charcoal/70">
                          {fields.address}, {fields.city}{fields.state ? `, ${fields.state}` : ''} {fields.zip}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Check size={16} />
                            Place Order
                          </span>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={() => setToast((prev) => ({ ...prev, visible: false }))} />
    </>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 placeholder-charcoal/60 ${
          error ? 'border-rosegold' : 'border-charcoal/30 focus:border-rosegold'
        }`}
      />
      {error && <p className="text-[11px] text-rosegold mt-1">{error}</p>}
    </div>
  )
}
