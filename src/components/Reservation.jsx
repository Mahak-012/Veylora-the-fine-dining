import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

const CARAMEL = '#C4956A'
const DARK_BG = '#0B0B0B'
const IVORY   = '#FFFDF9'
const WA_GREEN = '#25D366'
const EASE    = [0.22, 1, 0.36, 1]

/* ═══════════════════════════════════════════════

const WHATSAPP_NUMBER = '923001234567'
const PHONE_DISPLAY   = '+92 300 1234567'

const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

/* ── Zone icons ── */
function ZoneIcon({ name, size = 20 }) {
  const paths = {
    table: (
      <>
        <circle cx="12" cy="5" r="2.2" />
        <path d="M12 7.2v4M4 11.2h16M6 11.2 4.5 19M18 11.2 19.5 19M8.5 11.2 8 19M15.5 11.2 16 19" />
      </>
    ),
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    window: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M4 12h16M12 3v18" />
      </>
    ),
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
    check: <path d="M20 6 9 17l-5-5" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      {paths[name]}
    </svg>
  )
}

const ZONES = [
  { id: 'main',     name: 'Main Dining',     desc: 'Vibrant & elegant atmosphere',    icon: 'table'  },
  { id: 'romantic', name: 'Romantic Booth',  desc: 'Intimate & cozy lighting',        icon: 'heart'  },
  { id: 'window',   name: 'Window View',     desc: 'Scenic street & garden view',     icon: 'window' },
  { id: 'rooftop',  name: 'Rooftop Terrace', desc: 'Open-air luxury experience',      icon: 'moon'   },
]

const OCCASIONS = ['None', 'Birthday', 'Anniversary', 'Date Night', 'Business', 'Celebration']
const TIME_SLOTS = ['18:00', '19:30', '21:00', '22:00']

const fmtTime = (t) => {
  if (!t) return '—'
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 || 12
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function Reservation() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '', time: '', guests: 2, zone: 'Main Dining',
    occasion: 'None', name: '', email: '', phone: '', requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const set = (k, v) => setFormData(f => ({ ...f, [k]: v }))

  const buildMessage = (refCode) => {
    let msg = `✦ *New Reservation — Veylora*\n\n`
    msg += `📅 Date: ${formData.date}\n`
    msg += `🕕 Time: ${fmtTime(formData.time)}\n`
    msg += `👥 Guests: ${formData.guests}\n`
    msg += `🪑 Zone: ${formData.zone}\n`
    if (formData.occasion !== 'None') msg += `🎉 Occasion: ${formData.occasion}\n`
    msg += `\n👤 Name: ${formData.name}\n`
    msg += `📧 Email: ${formData.email}\n`
    msg += `📞 Phone: ${formData.phone}\n`
    if (formData.requests.trim()) msg += `\n📝 Requests: ${formData.requests.trim()}\n`
    msg += `\n🔖 Ref: ${refCode}\n\nPlease confirm my reservation. Thank you! 🙏`
    return msg
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const refCode = 'VLR-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    setTimeout(() => {
      setLoading(false)
      setBookingRef(refCode)
      setSubmitted(true)
      window.open(waLink(buildMessage(refCode)), '_blank') // auto WhatsApp
    }, 1400)
  }

  const inputStyle = {
    width: '100%', padding: '15px 18px', background: '#151515',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
    color: '#fff', outline: 'none', fontSize: 14.5, fontFamily: '"DM Sans", sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 9,
    textTransform: 'uppercase', letterSpacing: '.18em', fontWeight: 700, fontFamily: '"DM Sans", sans-serif',
  }
  const handleFocus = (e) => { e.target.style.borderColor = CARAMEL; e.target.style.background = '#1c1c1c'; e.target.style.boxShadow = '0 0 0 4px rgba(196,149,106,0.12)' }
  const handleBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#151515'; e.target.style.boxShadow = 'none' }

  return (
    <section id="reservation" ref={ref} style={{
      position: 'relative', padding: 'clamp(90px, 12vw, 140px) 24px',
      background: DARK_BG, color: '#fff', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>

      <style>{`
        .res-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.05; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .ghost-word { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(196,149,106,0.13); color: transparent; user-select: none; pointer-events: none; line-height: 1; }

        .slot-pill { padding: '8px 16px'; }
        .slot-pill:hover { border-color: ${CARAMEL} !important; color: ${CARAMEL} !important; }

        .succ-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(196,149,106,0.5); animation: succpulse 2s ease-out infinite; }
        .succ-ring:nth-child(2) { animation-delay: 0.7s; }
        @keyframes succpulse { 0% { transform: scale(1); opacity: 0.8 } 100% { transform: scale(1.8); opacity: 0 } }

        ::selection { background: ${CARAMEL}; color: #fff; }

        @media (max-width: 820px) {
          .res-two-col { grid-template-columns: 1fr !important; }
          .res-summary { position: static !important; order: -1; }
          .ghost-word { font-size: 4.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .succ-ring { animation: none !important; }
        }
      `}</style>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600" alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, filter: 'grayscale(30%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(11,11,11,0.55) 0%, #0B0B0B 85%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B0B0B, transparent 50%)' }} />
      </div>

      <div className="res-grain" />

      {/* Corner accents */}
      {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
        <span key={v + h} style={{
          position: 'absolute', [v]: 34, [h]: 34, width: 44, height: 44, zIndex: 1, opacity: 0.5,
          [`border${v[0].toUpperCase() + v.slice(1)}`]: `2px solid ${CARAMEL}`,
          [`border${h[0].toUpperCase() + h.slice(1)}`]: `2px solid ${CARAMEL}`,
        }} />
      ))}

      <div style={{ maxWidth: 880, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── HEADER ── */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: 44 }}>
          <motion.span className="ghost-word" style={{ position: 'absolute', top: '-0.5em', left: '50%', marginLeft: '-1.2em', fontSize: 'clamp(5rem, 12vw, 9rem)', y: ghostY, whiteSpace: 'nowrap' }}>Reserve</motion.span>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16, position: 'relative' }}>
            <span style={{ width: 40, height: 1, background: CARAMEL }} />
            <span style={{ color: CARAMEL, letterSpacing: '.3em', textTransform: 'uppercase', fontSize: 11, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>✦ Gastronomic Journey</span>
            <span style={{ width: 40, height: 1, background: CARAMEL }} />
          </motion.div>

          <motion.h2 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: '"Playfair Display", serif', fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 12px', position: 'relative' }}>
            {[
              [{ t: 'Reserve' }, { t: 'Your' }],
              [{ t: 'Table', it: true }],
            ].map((line, li) => (
              <span key={li} style={{ display: 'block' }}>
                {line.map((w, wi) => (
                  <span key={w.t} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em', marginRight: '0.26em' }}>
                    <motion.span initial={{ y: '112%' }} animate={inView ? { y: '0%' } : {}}
                      transition={{ duration: 0.85, delay: 0.2 + (li * 2 + wi) * 0.09, ease: EASE }}
                      style={{ display: 'inline-block', fontStyle: w.it ? 'italic' : 'normal', fontWeight: w.it ? 600 : 400, color: w.it ? CARAMEL : IVORY }}>
                      {w.t}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, maxWidth: 440, margin: '0 auto', lineHeight: 1.8 }}>
            Select your ideal ambiance and time for an unforgettable evening.
          </motion.p>
        </div>

        {/* ── CARD ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{
            background: 'rgba(17,17,17,0.88)', backdropFilter: 'blur(25px)',
            padding: 'clamp(26px, 4.5vw, 46px)', borderRadius: 26,
            border: '1px solid rgba(196,149,106,0.22)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>

          {submitted ? (
            /* ═══ SUCCESS ═══ */
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ position: 'relative', width: 90, height: 90, margin: '0 auto 26px' }}>
                <span className="succ-ring" /><span className="succ-ring" />
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                  style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(196,149,106,0.12)', border: `2px solid ${CARAMEL}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ZoneIcon name="check" size={38} />
                </motion.div>
              </div>

              <p style={{ fontSize: 11, letterSpacing: '.3em', color: CARAMEL, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 10px', fontFamily: '"DM Sans", sans-serif' }}>Reservation Confirmed</p>
              <h3 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontFamily: '"Playfair Display", serif', color: IVORY, fontWeight: 500, margin: '0 0 12px' }}>
                We look forward to hosting you, <em style={{ color: CARAMEL }}>{formData.name.split(' ')[0]}</em> ✦
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 26px' }}>
                Your booking details have been sent to our team on WhatsApp. A confirmation will reach <span style={{ color: CARAMEL }}>{formData.email}</span> shortly.
              </p>

              {/* Booking ref */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#151515', border: '1px dashed rgba(196,149,106,0.45)', borderRadius: 12, padding: '12px 22px', marginBottom: 26 }}>
                <span style={{ fontSize: 10, letterSpacing: '.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Booking Ref</span>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: 700, color: CARAMEL, letterSpacing: '.08em' }}>{bookingRef}</span>
              </div>

              {/* Summary */}
              <div style={{ background: '#141414', padding: '22px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', maxWidth: 420, margin: '0 auto 28px', textAlign: 'left' }}>
                {[
                  ['Date', formData.date],
                  ['Time', fmtTime(formData.time)],
                  ['Guests', `${formData.guests} ${formData.guests === 1 ? 'Guest' : 'Guests'}`],
                  ['Zone', formData.zone],
                  ['Occasion', formData.occasion],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13.5, borderBottom: k !== 'Occasion' ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                    <span style={{ color: k === 'Zone' ? CARAMEL : '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={waLink(buildMessage(bookingRef))} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: WA_GREEN, color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: 50, fontSize: 13, fontWeight: 700, fontFamily: '"DM Sans", sans-serif', boxShadow: '0 8px 24px rgba(37,211,102,0.3)', transition: 'transform .25s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Resend on WhatsApp
                </a>
                <button onClick={() => { setSubmitted(false); setStep(1); setFormData(f => ({ ...f, date: '', time: '', requests: '' })) }}
                  style={{ background: 'transparent', border: `1.5px solid ${CARAMEL}`, color: CARAMEL, padding: '13px 28px', borderRadius: 50, cursor: 'pointer', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CARAMEL }}>
                  Book Another
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* ── STEP INDICATOR — animated progress ── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36 }}>
                {[
                  { n: 1, label: 'Experience & Date' },
                  { n: 2, label: 'Your Details' },
                ].map((s, i) => (
                  <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && (
                      <div style={{ width: 'clamp(40px, 8vw, 80px)', height: 1.5, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <motion.div animate={{ width: step === 2 ? '100%' : '0%' }} transition={{ duration: 0.5, ease: EASE }}
                          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: CARAMEL }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <motion.span animate={{
                        background: step >= s.n ? CARAMEL : '#222',
                        color: step >= s.n ? '#111' : '#666',
                        scale: step === s.n ? 1.12 : 1,
                      }} transition={{ duration: 0.35 }}
                        style={{ width: 26, height: 26, borderRadius: '50%', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif' }}>
                        {step > s.n ? '✓' : s.n}
                      </motion.span>
                      <span style={{ fontSize: 12.5, color: step === s.n ? '#fff' : 'rgba(255,255,255,0.35)', fontWeight: step === s.n ? 600 : 400, fontFamily: '"DM Sans", sans-serif' }}>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* ═══ STEP 1 ═══ */
                  <motion.form key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35, ease: EASE }} onSubmit={e => { e.preventDefault(); setStep(2) }}>

                    {/* Zone cards */}
                    <label style={{ ...labelStyle, marginBottom: 14 }}>Select Ambiance Zone</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
                      {ZONES.map((zone, zi) => {
                        const sel = formData.zone === zone.name
                        return (
                          <motion.div key={zone.id}
                            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + zi * 0.07, duration: 0.5, ease: EASE }}
                            onClick={() => set('zone', zone.name)}
                            whileHover={{ y: -4 }}
                            style={{
                              position: 'relative', padding: '18px 16px 16px',
                              background: sel ? 'rgba(196,149,106,0.1)' : '#151515',
                              border: `1.5px solid ${sel ? CARAMEL : 'rgba(255,255,255,0.07)'}`,
                              borderRadius: 16, cursor: 'pointer',
                              boxShadow: sel ? '0 12px 30px rgba(196,149,106,0.15)' : 'none',
                              transition: 'background .3s, border-color .3s, box-shadow .3s',
                            }}>
                            {sel && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
                                style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: CARAMEL, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(196,149,106,0.5)' }}>
                                <ZoneIcon name="check" size={12} />
                              </motion.span>
                            )}
                            <div style={{ color: sel ? CARAMEL : 'rgba(255,255,255,0.4)', marginBottom: 12, transition: 'color .3s' }}>
                              <ZoneIcon name={zone.icon} />
                            </div>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: sel ? CARAMEL : '#fff', margin: '0 0 4px', fontFamily: '"DM Sans", sans-serif' }}>{zone.name}</p>
                            <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, margin: 0 }}>{zone.desc}</p>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Date / Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 20 }}>
                      <div>
                        <label style={labelStyle}>Date</label>
                        <input type="date" required min={today} value={formData.date} onChange={e => set('date', e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, colorScheme: 'dark' }} />
                      </div>
                      <div>
                        <label style={labelStyle}>Time</label>
                        <input type="time" required value={formData.time} onChange={e => set('time', e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, colorScheme: 'dark' }} />
                      </div>
                    </div>

                    {/* Quick slots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif' }}>Popular:</span>
                      {TIME_SLOTS.map(t => (
                        <button type="button" key={t} className="slot-pill" onClick={() => set('time', t)}
                          style={{
                            padding: '7px 15px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                            background: formData.time === t ? 'rgba(196,149,106,0.15)' : 'transparent',
                            border: `1px solid ${formData.time === t ? CARAMEL : 'rgba(255,255,255,0.12)'}`,
                            color: formData.time === t ? CARAMEL : 'rgba(255,255,255,0.55)',
                            cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', transition: 'all .25s',
                          }}>
                          {fmtTime(t)}
                        </button>
                      ))}
                    </div>

                    {/* Guests stepper */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                      <div>
                        <label style={labelStyle}>Number of Guests</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#151515', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '8px 12px' }}>
                          <button type="button" onClick={() => set('guests', Math.max(1, formData.guests - 1))}
                            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#fff', fontSize: 16, cursor: 'pointer', transition: 'all .2s', flexShrink: 0 }}
                            onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = '#111' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}>−</button>
                          <span style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>
                            {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                          </span>
                          <button type="button" onClick={() => set('guests', Math.min(20, formData.guests + 1))}
                            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#fff', fontSize: 16, cursor: 'pointer', transition: 'all .2s', flexShrink: 0 }}
                            onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = '#111' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}>+</button>
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Occasion (optional)</label>
                        <select value={formData.occasion} onChange={e => set('occasion', e.target.value)}
                          onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, cursor: 'pointer' }}>
                          {OCCASIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <motion.button type="submit" whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%', background: CARAMEL, color: '#111', border: 'none',
                        padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
                        letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif',
                        boxShadow: '0 10px 30px rgba(196,149,106,0.25)', transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 38px rgba(196,149,106,0.35)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(196,149,106,0.25)' }}>
                      Continue to Details →
                    </motion.button>
                  </motion.form>
                ) : (
                  /* ═══ STEP 2 ═══ */
                  <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} onSubmit={handleSubmit}>
                    <div className="res-two-col" style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 26, alignItems: 'start' }}>

                      {/* Left — form fields */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div>
                          <label style={labelStyle}>Full Name</label>
                          <input type="text" required placeholder="John Doe" value={formData.name} onChange={e => set('name', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address</label>
                          <input type="email" required placeholder="john@example.com" value={formData.email} onChange={e => set('email', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone Number</label>
                          <input type="tel" required placeholder={PHONE_DISPLAY} value={formData.phone} onChange={e => set('phone', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Special Requests (optional)</label>
                          <textarea rows={3} placeholder="Allergies, cake, flowers, seating preference..." value={formData.requests} onChange={e => set('requests', e.target.value)} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} />
                        </div>
                      </div>

                      {/* Right — live summary */}
                      <div className="res-summary" style={{ position: 'sticky', top: 20, background: '#141414', border: '1px solid rgba(196,149,106,0.2)', borderRadius: 18, padding: '22px 22px 20px' }}>
                        <p style={{ fontSize: 10, letterSpacing: '.26em', color: CARAMEL, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 16px', fontFamily: '"DM Sans", sans-serif' }}>✦ Your Evening</p>
                        {[
                          ['Date', formData.date || '—'],
                          ['Time', fmtTime(formData.time)],
                          ['Guests', `${formData.guests}`],
                          ['Zone', formData.zone],
                          ['Occasion', formData.occasion],
                        ].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>{k}</span>
                            <span style={{ color: k === 'Zone' ? CARAMEL : '#fff', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>{v}</span>
                          </div>
                        ))}
                        <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, margin: '14px 0 0' }}>
                          Confirmation will be sent on WhatsApp & email after review.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button type="button" onClick={() => setStep(1)}
                        style={{ width: '32%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: 16, borderRadius: 14, fontWeight: 600, fontSize: 12.5, cursor: 'pointer', letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', transition: 'all .3s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = CARAMEL }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}>
                        ← Back
                      </button>
                      <motion.button type="submit" disabled={loading} whileTap={{ scale: loading ? 1 : 0.98 }}
                        style={{
                          flex: 1, background: loading ? '#8a6a4a' : CARAMEL, color: '#111', border: 'none',
                          padding: 16, borderRadius: 14, fontWeight: 700, fontSize: 13.5, cursor: loading ? 'wait' : 'pointer',
                          letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif',
                          boxShadow: '0 10px 30px rgba(196,149,106,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        }}>
                        {loading ? (
                          <>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #111', borderTopColor: 'transparent', borderRadius: '50%' }} />
                            Confirming...
                          </>
                        ) : 'Confirm Reservation ✦'}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Footer note */}
        {!submitted && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 24, letterSpacing: '.06em', fontFamily: '"DM Sans", sans-serif' }}>
            For corporate bookings or special dietary requests, call us at{' '}
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} style={{ color: CARAMEL, textDecoration: 'none' }}>{PHONE_DISPLAY}</a>
          </motion.p>
        )}
      </div>
    </section>
  )
}