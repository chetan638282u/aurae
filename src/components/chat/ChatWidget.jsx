import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Bot, Heart, ShoppingBag } from 'lucide-react'
import products from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function ChatMessage({ message }) {
  const isBot = message.role === 'bot'
  const time = message.time || new Date()

  const { addItem, setIsOpen: setCartOpen } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  let content = message.content
  let product = null

  if (isBot) {
    const match = content.match(/\[PRODUCT_ID:(\d+)\]/i)
    if (match) {
      const productId = parseInt(match[1], 10)
      product = products.find((p) => p.id === productId)
      content = content.replace(/\[PRODUCT_ID:\d+\]/gi, '').trim()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} mb-3 w-full`}
    >
      <span className={`text-[10px] font-medium tracking-wide mb-1 ${isBot ? 'text-charcoal/40 ml-1' : 'text-charcoal/40 mr-1'}`}>
        {isBot ? 'AURAE' : 'You'}
      </span>
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-white/80 rounded-2xl rounded-bl-md text-charcoal'
            : 'rounded-2xl rounded-br-md text-white'
        }`}
        style={
          isBot
            ? {}
            : { background: '#B76E79' }
        }
      >
        {content}

        {product && (
          <div className="mt-3 pt-3 border-t border-charcoal/10 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded overflow-hidden shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold font-serif text-charcoal line-clamp-2 leading-tight">{product.name}</p>
                <p className="text-xs text-charcoal/60 mt-0.5">${product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addItem(product)
                  setCartOpen(true)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-charcoal text-white rounded text-[10px] font-medium tracking-wide hover:bg-rosegold transition-colors"
              >
                <ShoppingBag size={12} />
                ADD TO CART
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${
                  isWishlisted(product.id)
                    ? 'border-rosegold text-rosegold bg-rosegold/10'
                    : 'border-charcoal/20 text-charcoal hover:border-rosegold hover:text-rosegold'
                }`}
              >
                <Heart size={12} className={isWishlisted(product.id) ? 'fill-rosegold' : ''} />
              </button>
            </div>
          </div>
        )}
      </div>
      <span className="text-[9px] text-charcoal/30 mt-0.5 px-1">{formatTime(time)}</span>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-start mb-3"
    >
      <span className="text-[10px] font-medium tracking-wide text-charcoal/40 ml-1 mb-1">AURAE</span>
      <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
        <span className="text-xs text-charcoal/50">typing</span>
        <span className="inline-flex">
          <span className="animate-pulse" style={{ animationDelay: '0ms' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
        </span>
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

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'bot', content: data.reply, time: new Date() }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', content: `Error: ${err.message}`, time: new Date() }])
    }

    setIsTyping(false)
  }, [messages])

  const handleSend = useCallback((overrideText) => {
    const text = (typeof overrideText === 'string' ? overrideText : inputValue).trim()
    if (!text || isTyping) return

    setMessages((prev) => [...prev, { role: 'user', content: text, time: new Date() }])
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
              className="fixed z-[80] bottom-24 right-6 w-[320px] sm:w-[360px] h-[480px] flex flex-col bg-blush/90 glass-strong rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full glass flex items-center justify-center" style={{ color: '#B76E79' }}>
                    <Bot size={18} />
                  </div>
                  <div>
                    <span className="font-serif text-base font-bold tracking-wide" style={{ color: '#B76E79' }}>
                      AURAE
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#B76E79] shadow-[0_0_6px_rgba(183,110,121,0.5)]" />
                      <span className="text-[10px] text-charcoal/40 tracking-wide">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 scroll-smooth">
                {messages.length === 0 && (
                  <div className="mb-4 flex flex-col items-start mt-2">
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-1.5">Hi, I am Auraea.</h3>
                    <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                      I'm your personal assistant, here to help you navigate our collection, recommend products perfectly suited for your skin type, and assist with any details like our Refund Policy. How can I guide you today?
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 w-full">
                      {[
                        'I have oily skin, what do you recommend?', 
                        'Could you suggest products for dry skin?', 
                        'What works best for all skin types?', 
                        'Can you explain your refund policy?'
                      ].map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(reply)}
                          className="px-3 py-1.5 text-[10px] font-medium text-left bg-white/60 border border-white/40 rounded-full text-charcoal hover:bg-[#B76E79] hover:text-white hover:border-[#B76E79] transition-all duration-300 shadow-sm shadow-black/5"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

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
                    maxLength={500}
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
