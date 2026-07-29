import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Building2, Banknote } from 'lucide-react'

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
]

const banks = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra', 'Yes Bank', 'Punjab National Bank', 'Bank of Baroda',
  'Canara Bank', 'Union Bank of India',
]

export default function PaymentForm({ method, onChange, card, onCardChange, upiId, onUpiChange, bank, onBankChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => {
          const Icon = m.icon
          const selected = method === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-300 ${
                selected
                  ? 'border-[#B76E79] bg-[#B76E79]/10'
                  : 'border-white/20 bg-white/30 hover:bg-white/40'
              }`}
            >
              <Icon size={20} className={selected ? 'text-[#B76E79]' : 'text-charcoal/50'} />
              <span className={`text-sm font-medium ${selected ? 'text-[#B76E79]' : 'text-charcoal/70'}`}>
                {m.label}
              </span>
            </button>
          )
        })}
      </div>

      {method === 'card' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">Card Number</label>
            <input
              type="text"
              value={card.number}
              onChange={(e) => onCardChange({ ...card, number: e.target.value.replace(/\D/g, '').slice(0, 16) })}
              placeholder="1234 5678 9012 3456"
              className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79] placeholder:text-charcoal/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">Expiry</label>
              <input
                type="text"
                value={card.expiry}
                onChange={(e) => onCardChange({ ...card, expiry: e.target.value.slice(0, 5) })}
                placeholder="MM/YY"
                className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79] placeholder:text-charcoal/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">CVV</label>
              <input
                type="text"
                value={card.cvv}
                onChange={(e) => onCardChange({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="123"
                className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79] placeholder:text-charcoal/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">Cardholder Name</label>
            <input
              type="text"
              value={card.name}
              onChange={(e) => onCardChange({ ...card, name: e.target.value })}
              placeholder="Name on card"
              className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79] placeholder:text-charcoal/30"
            />
          </div>
        </motion.div>
      )}

      {method === 'upi' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => onUpiChange(e.target.value)}
              placeholder="username@upi"
              className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79] placeholder:text-charcoal/30"
            />
          </div>
          <p className="text-[11px] text-charcoal/40">Enter your UPI ID to receive a payment request.</p>
        </motion.div>
      )}

      {method === 'netbanking' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5"
        >
          <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-1.5">Select Bank</label>
          <select
            value={bank}
            onChange={(e) => onBankChange(e.target.value)}
            className="w-full bg-transparent border-b border-charcoal/30 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-[#B76E79]"
          >
            <option value="">Choose your bank</option>
            {banks.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </motion.div>
      )}

      {method === 'cod' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5"
        >
          <p className="text-sm text-charcoal/70">Pay with cash when your order is delivered. No additional charges.</p>
        </motion.div>
      )}
    </div>
  )
}