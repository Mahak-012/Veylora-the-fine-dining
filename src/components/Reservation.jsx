import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARAMEL = '#C4956A'
const DARK_BG = '#0B0B0B'

const ZONES = [
  { id: 'main', name: 'Main Dining', desc: 'Vibrant & elegant atmosphere' },
  { id: 'romantic', name: 'Romantic Booth', desc: 'Intimate & cozy lighting' },
  { id: 'window', name: 'Window View', desc: 'Scenic street & garden view' },
  { id: 'rooftop', name: 'Rooftop Terrace', desc: 'Open-air luxury experience' },
]

export default function Reservation() {
  const [step, setStep] = useState(1) // 1: Details, 2: Personal Info
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2 Guests',
    zone: 'Main Dining',
    name: '',
    email: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    color: '#fff',
    outline: 'none',
    fontSize: '15px',
    fontFamily: 'inherit',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = CARAMEL
    e.target.style.background = '#1e1e1e'
    e.target.style.boxShadow = `0 0 0 4px rgba(196,149,106,0.12)`
  }

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
    e.target.style.background = '#161616'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section 
      id="reservation" 
      style={{ 
        position: 'relative',
        padding: 'clamp(90px, 12vw, 130px) 24px', 
        background: DARK_BG, 
        color: '#fff', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic Background Image + Premium Gradients */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600" 
          alt="Restaurant Interior" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'grayscale(20%)' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(11,11,11,0.6) 0%, #0B0B0B 85%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B0B0B, transparent 50%)' }} />
      </div>

      {/* Luxury Corner Accents */}
      <div style={{ position: 'absolute', top: 35, left: 35, width: 45, height: 45, borderTop: `2px solid ${CARAMEL}`, borderLeft: `2px solid ${CARAMEL}`, opacity: 0.5, zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 35, right: 35, width: 45, height: 45, borderTop: `2px solid ${CARAMEL}`, borderRight: `2px solid ${CARAMEL}`, opacity: 0.5, zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 35, left: 35, width: 45, height: 45, borderBottom: `2px solid ${CARAMEL}`, borderLeft: `2px solid ${CARAMEL}`, opacity: 0.5, zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 35, right: 35, width: 45, height: 45, borderBottom: `2px solid ${CARAMEL}`, borderRight: `2px solid ${CARAMEL}`, opacity: 0.5, zIndex: 1 }} />

      <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}
          >
            <span style={{ width: 35, height: 1, background: CARAMEL }} />
            <span style={{ color: CARAMEL, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 600 }}>
              ✦ Gastronomic Journey
            </span>
            <span style={{ width: 35, height: 1, background: CARAMEL }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: '"Playfair Display", serif', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Reserve Your <span style={{ fontStyle: 'italic', color: CARAMEL, fontWeight: 600 }}>Table</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: '#888', fontSize: '15px', marginTop: '12px', maxWidth: '460px', margin: '10px auto 0' }}
          >
            Select your ideal ambiance and time for an unforgettable evening.
          </motion.p>
        </div>

        {/* Main Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(18, 18, 18, 0.9)',
            backdropFilter: 'blur(25px)',
            padding: 'clamp(28px, 5vw, 48px)',
            borderRadius: '28px',
            border: '1px solid rgba(196,149,106,0.22)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {submitted ? (
            /* Success State */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '30px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                style={{
                  width: 85, height: 85, borderRadius: '50%',
                  background: 'rgba(196,149,106,0.12)',
                  border: `2px solid ${CARAMEL}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <span style={{ fontSize: 38, color: CARAMEL }}>✓</span>
              </motion.div>

              <h3 style={{ fontSize: 'clamp(24px, 4vw, 30px)', fontFamily: '"Playfair Display", serif', color: CARAMEL, marginBottom: '12px', fontWeight: 500 }}>
                Table Reserved Successfully!
              </h3>
              <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.6, maxWidth: 420, margin: '0 auto 24px' }} >
                We are thrilled to host you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. A confirmation has been emailed to <span style={{ color: CARAMEL }}>{formData.email}</span>.
              </p>

              {/* Booking Summary Box */}
              <div style={{ background: '#161616', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', maxWidth: '400px', margin: '0 auto 30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ color: '#777' }}>Date & Time:</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{formData.date} at {formData.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ color: '#777' }}>Guests:</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{formData.guests}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#777' }}>Ambiance Zone:</span>
                  <span style={{ color: CARAMEL, fontWeight: 600 }}>{formData.zone}</span>
                </div>
              </div>

              <button
                onClick={() => { setSubmitted(false); setStep(1); }}
                style={{
                  background: 'transparent',
                  border: `1.5px solid ${CARAMEL}`,
                  color: CARAMEL,
                  padding: '12px 30px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#111' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CARAMEL }}
              >
                Book Another Table
              </button>
            </motion.div>
          ) : (
            <div>
              {/* Progress Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: CARAMEL, color: '#111', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                  <span style={{ fontSize: '13px', color: step === 1 ? '#fff' : '#666', fontWeight: step === 1 ? 600 : 400 }}>Experience & Date</span>
                </div>
                <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: step === 2 ? CARAMEL : '#222', color: step === 2 ? '#111' : '#666', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>2</span>
                  <span style={{ fontSize: '13px', color: step === 2 ? '#fff' : '#666', fontWeight: step === 2 ? 600 : 400 }}>Your Details</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* Step 1 Form */
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleNext}
                  >
                    {/* Zone Selection Cards */}
                    <div style={{ marginBottom: '28px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
                        Select Ambiance Zone
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
                        {ZONES.map((zone) => {
                          const isSelected = formData.zone === zone.name
                          return (
                            <div
                              key={zone.id}
                              onClick={() => setFormData({ ...formData, zone: zone.name })}
                              style={{
                                padding: '14px 16px',
                                background: isSelected ? 'rgba(196,149,106,0.12)' : '#161616',
                                border: `1.5px solid ${isSelected ? CARAMEL : 'rgba(255,255,255,0.06)'}`,
                                borderRadius: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                              }}
                            >
                              <p style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? CARAMEL : '#fff', marginBottom: '4px' }}>{zone.name}</p>
                              <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.3 }}>{zone.desc}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Grid Inputs: Date, Time, Guests */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Date</label>
                        <input
                          type="date"
                          required
                          min={today}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={{ ...inputStyle, colorScheme: 'dark' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Time</label>
                        <input
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={{ ...inputStyle, colorScheme: 'dark' }}
                        />
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Number of Guests</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={inputStyle}
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                          <option>6 Guests</option>
                          <option>8+ Guests (VIP Group)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: CARAMEL,
                        color: '#111',
                        border: 'none',
                        padding: '16px',
                        borderRadius: '14px',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        boxShadow: '0 10px 30px rgba(196,149,106,0.25)',
                        transition: 'all 0.3s',
                      }}
                    >
                      Continue to Details →
                    </button>
                  </motion.form>
                ) : (
                  /* Step 2 Form */
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        style={{
                          width: '35%',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff',
                          padding: '16px',
                          borderRadius: '14px',
                          fontWeight: '600',
                          fontSize: '13px',
                          cursor: 'pointer',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '65%',
                          background: loading ? '#8a6a4a' : CARAMEL,
                          color: '#111',
                          border: 'none',
                          padding: '16px',
                          borderRadius: '14px',
                          fontWeight: '700',
                          fontSize: '14px',
                          cursor: loading ? 'wait' : 'pointer',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          boxShadow: '0 10px 30px rgba(196,149,106,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #111', borderTopColor: 'transparent', borderRadius: '50%' }}
                            />
                            Confirming...
                          </>
                        ) : (
                          'Confirm Reservation ✦'
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Footer Support Info */}
        {!submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '24px', letterSpacing: '1px' }}
          >
            📞 For corporate bookings or special dietary requests, call us at +92 300 1234567
          </motion.p>
        )}

      </div>
    </section>
  )
}