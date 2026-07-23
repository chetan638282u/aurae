import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import products from '../../data/products'
import { validateForm } from '../../utils/validateForm'
import Toast from './Toast'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  product: '',
  message: '',
}

export default function InquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })
  const [shake, setShake] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: validationErrors, isValid } = validateForm(values)

    if (!isValid) {
      setErrors(validationErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setSubmitted(true)

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error('Failed to submit')
    } catch {
      setSubmitted(false)
      setToast({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' })
      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000)
      return
    }

    setSubmitted(false)
    setValues(initialValues)
    setErrors({})
    setToast({ visible: true, message: 'Thank you for your inquiry. A member of our team will be in touch within 24 hours.', type: 'success' })
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000)
  }

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Begin Your Ritual</h2>
          <p className="section-subheading mt-4">
            Have a question about a product or need a personalized recommendation? We&apos;d love to hear from you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-xl mx-auto"
        >
          <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-8 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your full name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+1 (555) 000-0000"
              />
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">
                  Product Interested In
                </label>
                <select
                  name="product"
                  value={values.product}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 text-sm text-charcoal outline-none transition-colors duration-300 appearance-none cursor-pointer ${
                    errors.product ? 'border-rosegold' : 'border-charcoal/20 focus:border-rosegold'
                  }`}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name} className="text-charcoal">
                      {p.name} — ${p.price}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <p className="text-[11px] text-rosegold mt-1">{errors.product}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what you're looking for..."
                className={`w-full bg-transparent border-b py-3 text-sm text-charcoal outline-none resize-none transition-colors duration-300 ${
                  errors.message ? 'border-rosegold' : 'border-charcoal/20 focus:border-rosegold'
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-rosegold mt-1">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={submitted}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Send Inquiry
                </span>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b py-3 text-sm text-charcoal outline-none transition-colors duration-300 ${
          error ? 'border-rosegold' : 'border-charcoal/20 focus:border-rosegold'
        }`}
      />
      {error && <p className="text-[11px] text-rosegold mt-1">{error}</p>}
    </div>
  )
}
