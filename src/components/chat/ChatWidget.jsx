import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'

const botResponses = [
  "Thank you for reaching out to AURAE. Our Radiance Renewal Serum is one of our most popular products — it's formulated with 15% Vitamin C for a luminous, even-toned complexion. Would you like me to tell you more about it?",
  "Great question! All AURAE products are cruelty-free, dermatologist-tested, and formulated with clean, clinically-proven ingredients. We never use parabens, sulfates, or synthetic fragrances.",
  "I'd recommend starting with our Gentle Foaming Cleanser, then the Calming Barrier Serum, and finishing with the Dewy Gel Moisturizer. That combination works beautifully for most skin types.",
  "Our Overnight Restorative Cream is perfect for dry or mature skin. It contains a pentapeptide complex and bakuchiol to support collagen while you sleep. Wake up to visibly smoother, firmer skin.",
  "We offer free shipping on orders over $75, and all orders come with a 30-day satisfaction guarantee. If you're not completely happy, we'll refund your purchase — no questions asked.",
  "The Mineral Tinted SPF 50 is a 100% mineral sunscreen with a universal tint that adapts to most skin tones. It's reef-safe and doubles as a lightweight tinted moisturizer.",
  "You can layer the Brightening Eye Concentrate under your moisturizer morning and evening. The metal rollerball gives a gentle micro-massage that helps depuff. Use it consistently for best results!",
  "Absolutely — all of our products are suitable for sensitive skin. I particularly recommend the Calming Barrier Serum, which is formulated with five essential ceramides and centella asiatica to soothe and repair.",
]

function getRandomResponse() {
  return botResponses[Math.floor(Math.random() * botResponses.length)]
}

function ChatMessage({ message }) {
  const isBot = message.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'glass rounded-2xl rounded-bl-md text-charcoal/80'
            : 'rounded-2xl rounded-br-md text-white'
        }`}
        style={
          isBot
            ? {}
            : { background: '#B76E79' }
        }
      >
        {message.content}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-3"
    >
      <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rosegold/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-rosegold/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-rosegold/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true)
      setShowPulse(false)
      const timer = setTimeout(() => {
        setMessages([{ role: 'bot', content: 'Hi! Welcome to AURAE. How can I help you today?' }])
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen, hasOpened])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = useCallback(async (text) => {
    const history = messages.map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'bot', content: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', content: getRandomResponse() }])
    }

    setIsTyping(false)
  }, [messages])

  const handleSend = useCallback(() => {
    const text = inputValue.trim()
    if (!text || isTyping) return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInputValue('')
    setIsTyping(true)

    sendMessage(text)
  }, [inputValue, isTyping, sendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed z-[80] bottom-24 right-6 w-[320px] sm:w-[360px] h-[480px] flex flex-col glass-strong rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 shrink-0">
                <div>
                  <span className="font-serif text-lg font-bold tracking-wide" style={{ color: '#B76E79' }}>
                    AURAE
                  </span>
                  <p className="text-[11px] text-charcoal/50 font-light tracking-wide mt-0.5">Ask us anything</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 scroll-smooth">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} />
                ))}
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 px-5 py-4 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                  />
                  <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-rosegold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(183,110,121,0.25)]"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          ...(showPulse ? {
            boxShadow: [
              '0 0 0 0 rgba(183,110,121,0.4)',
              '0 0 0 12px rgba(183,110,121,0)',
              '0 0 0 0 rgba(183,110,121,0)',
            ],
          } : {}),
        }}
        transition={{
          scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 0.5 },
          boxShadow: { duration: 1.5, repeat: showPulse ? 2 : 0, ease: 'easeOut' },
        }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 24px rgba(183,110,121,0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full glass flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(183,110,121,0.2)] transition-shadow duration-300"
        style={{ borderColor: 'rgba(183,110,121,0.2)' }}
      >
        {isOpen ? (
          <X size={22} className="text-rosegold" />
        ) : (
          <MessageCircle size={22} className="text-rosegold" />
        )}
      </motion.button>
    </>
  )
}
