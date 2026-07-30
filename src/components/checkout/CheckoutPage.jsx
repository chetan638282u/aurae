import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, Truck, Check, ChevronRight, MapPin, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import PaymentForm from './PaymentForm'
import Toast from '../contact/Toast'

const initialShipping = {
  name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States',
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart, closeCheckout, checkoutOpen } = useCart()
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState(initialShipping)
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [upiId, setUpiId] = useState('')
  const [bank, setBank] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShipping((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => { const c = { ...prev }; delete c[name]; return c })
    }
  }

  const validateShipping = () => {
    const errs = {}
    if (!shipping.name.trim() || shipping.name.trim().length < 2) errs.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) errs.email = 'Valid email required'
    if (!shipping.address.trim()) errs.address = 'Address is required'
    if (!shipping.city.trim()) errs.city = 'City is required'
    if (!shipping.zip.trim()) errs.zip = 'ZIP code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePlaceOrder = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping,
          payment: { method: paymentMethod, ...(paymentMethod === 'card' ? card : {}), ...(paymentMethod === 'upi' ? { upiId } : {}), ...(paymentMethod === 'netbanking' ? { bank } : {}) },
          items: items.map((i) => ({ product: { id: i.product.id, name: i.product.name, price: i.product.price }, quantity: i.quantity })),
          subtotal,
        }),
      })
      if (!res.ok) throw new Error('Checkout failed')
      setDone(true)
      clearCart()
    } catch {
      setToast({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' })
      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  const shippingCost = subtotal >= 75 ? 0 : 9.99
  const total = subtotal + shippingCost

  useEffect(() => {
    if (!checkoutOpen) return
    setStep(1)
    setShipping(initialShipping)
    setErrors({})
    setPaymentMethod('card')
    setCard({ number: '', expiry: '', cvv: '', name: '' })
    setUpiId('')
    setBank('')
    setDone(false)
    setSubmitting(false)
    setToast({ visible: false, message: '', type: 'success' })
  }, [checkoutOpen])

  useEffect(() => {
    if (!checkoutOpen) return
    window.history.pushState(null, '', window.location.href)
    const handleBack = () => closeCheckout()
    window.addEventListener('popstate', handleBack)
    return () => window.removeEventListener('popstate', handleBack)
  }, [checkoutOpen, closeCheckout])

  if (done) {
    return (
      <div className="absolute inset-0 overflow-y-auto bg-blush/90 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-[#B76E79]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#B76E79]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal mb-3">Order Placed!</h2>
          <p className="text-charcoal/60 text-sm mb-8 leading-relaxed">
            Thank you for your order! You will receive a confirmation email shortly at{' '}
            <span className="text-[#B76E79] font-medium">{shipping.email}</span>.
          </p>
          <button
            onClick={closeCheckout}
            className="btn-primary inline-flex"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-y-auto bg-blush/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={closeCheckout}
          className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-[#B76E79] transition-colors duration-300 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Shopping
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag size={22} className="text-[#B76E79]" />
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">Checkout</h1>
            </div>

            <div className="flex items-center gap-3 mb-8">
              {[
                { num: 1, label: 'Shipping', icon: MapPin },
                { num: 2, label: 'Payment', icon: CreditCard },
                { num: 3, label: 'Review', icon: ShieldCheck },
              ].map((s, i) => {
                const Icon = s.icon
                const active = step >= s.num
                const done = step > s.num
                return (
                  <div key={s.num} className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${active ? 'text-white' : 'text-charcoal/40'}`}
                      style={{ background: active ? '#B76E79' : 'rgba(255,255,255,0.15)' }}
                    >
                      {done ? <Check size={14} /> : s.num}
                    </span>
                    <span className={`hidden sm:inline text-xs font-medium ${active ? 'text-charcoal' : 'text-charcoal/40'}`}>
                      {s.label}
                    </span>
                    {i < 2 && <div className="w-6 sm:w-12 h-px bg-white/20 mx-1 sm:mx-2" />}
                  </div>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass rounded-2xl p-6 sm:p-8 space-y-5"
                >
                  <h2 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
                    <MapPin size={20} className="text-[#B76E79]" />
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" name="name" value={shipping.name} onChange={handleShippingChange} error={errors.name} placeholder="John Doe" />
                    <Field label="Email" name="email" type="email" value={shipping.email} onChange={handleShippingChange} error={errors.email} placeholder="john@email.com" />
                  </div>
                  <Field label="Phone (optional)" name="phone" type="tel" value={shipping.phone} onChange={handleShippingChange} placeholder="+1 (555) 000-0000" />
                  <Field label="Address" name="address" value={shipping.address} onChange={handleShippingChange} error={errors.address} placeholder="123 Main Street, Apt 4B" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="City" name="city" value={shipping.city} onChange={handleShippingChange} error={errors.city} placeholder="New York" />
                    <Field label="State" name="state" value={shipping.state} onChange={handleShippingChange} placeholder="NY" />
                    <Field label="ZIP Code" name="zip" value={shipping.zip} onChange={handleShippingChange} error={errors.zip} placeholder="10001" />
                  </div>
                  <Field label="Country" name="country" value={shipping.country} onChange={handleShippingChange} placeholder="United States" />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (validateShipping()) setStep(2) }}
                    className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass rounded-2xl p-6 sm:p-8 space-y-5"
                >
                  <h2 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
                    <CreditCard size={20} className="text-[#B76E79]" />
                    Payment Method
                  </h2>
                  <PaymentForm
                    method={paymentMethod}
                    onChange={setPaymentMethod}
                    card={card}
                    onCardChange={setCard}
                    upiId={upiId}
                    onUpiChange={setUpiId}
                    bank={bank}
                    onBankChange={setBank}
                  />
                  <div className="flex items-center gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                      className="flex-1 glass rounded-full py-3 text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass rounded-2xl p-6 sm:p-8 space-y-6"
                >
                  <h2 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#B76E79]" />
                    Review & Place Order
                  </h2>

                  <div className="glass rounded-xl p-4">
                    <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">Shipping To</p>
                    <p className="text-sm text-charcoal/70">{shipping.name} — {shipping.email}</p>
                    <p className="text-sm text-charcoal/70">{shipping.address}, {shipping.city}{shipping.state ? `, ${shipping.state}` : ''} {shipping.zip}</p>
                    <p className="text-sm text-charcoal/70">{shipping.country}</p>
                    {shipping.phone && <p className="text-sm text-charcoal/70 mt-1">{shipping.phone}</p>}
                  </div>

                  <div className="glass rounded-xl p-4">
                    <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">Payment</p>
                    <p className="text-sm text-charcoal/70 capitalize">{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}</p>
                    {paymentMethod === 'card' && <p className="text-sm text-charcoal/50">**** **** **** {card.number.slice(-4)}</p>}
                    {paymentMethod === 'upi' && <p className="text-sm text-charcoal/50">{upiId}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Check size={16} />
                        Place Order — ${total.toFixed(0)}
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-28 glass rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#B76E79]" />
                Order Summary
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/30 shrink-0 flex items-center justify-center">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{item.product.name}</p>
                      <p className="text-xs text-charcoal/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-charcoal shrink-0">${(item.product.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="text-charcoal font-medium">${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-emerald-500' : 'text-charcoal'}`}>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && subtotal > 0 && (
                  <p className="text-[10px] text-charcoal/40">Add ${(75 - subtotal).toFixed(0)} more for free shipping</p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="font-serif text-base font-bold text-charcoal">Total</span>
                  <span className="font-serif text-xl font-bold text-[#B76E79]">${total.toFixed(0)}</span>
                </div>
              </div>
              {step < 3 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (step === 1 && validateShipping()) setStep(2)
                    else if (step === 2) setStep(3)
                  }}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {step === 1 ? 'Continue' : 'Review Order'}
                  <ChevronRight size={16} />
                </motion.button>
              )}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-charcoal/30 pt-1">
                <ShieldCheck size={12} />
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={() => setToast((prev) => ({ ...prev, visible: false }))} />
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal/30 ${
          error ? 'border-[#B76E79]' : 'border-charcoal/30 focus:border-[#B76E79]'
        }`}
      />
      {error && <p className="text-[11px] text-[#B76E79] mt-1">{error}</p>}
    </div>
  )
}