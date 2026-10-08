import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARAMEL = '#C4956A'
const IVORY   = '#FFFDF9'
const EASE    = [0.22, 1, 0.36, 1]

/* ⚠️ Apni details yahan update karein */
const WA_NUMBER   = '923001234567'
const PHONE       = '+92 300 1234567'
const PHONE_LINK  = 'tel:+923001234567'
const EMAIL       = 'hello@veylora.com'
const ADDRESS     = '123 Main Street, Gulberg III, Lahore'
const INSTAGRAM   = 'https://instagram.com'
const FACEBOOK    = 'https://facebook.com'

const LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Our Story',   href: '#story' },
  { label: 'Menu',        href: '#menu' },
  { label: 'Gallery',     href: '#gallery' },
  { label: 'Reserve',     href: '#reservation' },
]

const HOURS = [
  { d: 'Mon – Thu', t: '5:00 PM – 11:00 PM',  days: [1, 2, 3, 4] },
  { d: 'Fri – Sun', t: '12:00 PM – 12:00 AM', days: [5, 6, 0] },
]

/* ── Open-now logic (restaurant ke hours ke mutabiq) ── */
function useOpenNow() {
  const now = new Date()
  const day  = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const isFriSun = [5, 6, 0].includes(day)
  const open = isFriSun ? hour >= 12 : (hour >= 17 && hour < 23)
  return { open, today: day }
}

/* ── Social SVG icons ── */
function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    whatsapp: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    ),
    x: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />,
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      {paths[name]}
    </svg>
  )
}

/* ── Contact line icons ── */
function ContactIcon({ name, size = 15 }) {
  const paths = {
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    phone: <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.01l-2.2 2.21z" />,
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name]}
    </svg>
  )
}

export default function Footer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { open, today } = useOpenNow()

  const [email, setEmail]     = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const toTop    = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3500)
  }

  const linkStyle = {
    color: 'rgba(255,253,249,0.5)', textDecoration: 'none', fontSize: 13.5,
    fontFamily: '"DM Sans", sans-serif', transition: 'color .3s, padding-left .3s',
    display: 'inline-flex', alignItems: 'center', gap: 0, cursor: 'pointer',
  }

  return (
    <footer ref={ref} style={{ position: 'relative', background: '#0A0A0A', overflow: 'hidden' }}>

      <style>{`
        .foot-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.04; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .foot-link:hover { color: ${CARAMEL} !important; padding-left: 6px !important; }

        .soc-btn { width: 38, }
        .soc { width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(196,149,106,0.3);
          display: flex; align-items: center; justify-content: center; color: ${CARAMEL};
          transition: all .35s cubic-bezier(.22,1,.36,1); text-decoration: none; }
        .soc:hover { background: ${CARAMEL}; color: #0A0A0A; transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(196,149,106,0.35); border-color: ${CARAMEL}; }

        .news-input { width: 100%; background: transparent; border: none; border-bottom: 1.5px solid rgba(196,149,106,0.3);
          padding: '10px 2px'; color: ${IVORY}; outline: none; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          transition: border-color .3s; }
        .news-input:focus { border-color: ${CARAMEL}; }
        .news-input::placeholder { color: rgba(255,253,249,0.3); }

        .beat { animation: heartbeat 1.6s ease-in-out infinite; display: inline-block; }
        @keyframes heartbeat { 0%, 100% { transform: scale(1) } 12% { transform: scale(1.25) } 24% { transform: scale(1) } 36% { transform: scale(1.18) } }

        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .pulse-open  { background: #4ade80; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); animation: fpulse 2s infinite; }
        .pulse-closed { background: #B85C4A; }
        @keyframes fpulse { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.45) } 70% { box-shadow: 0 0 0 8px rgba(74,222,128,0) } 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0) } }

        .giant-word { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          background: linear-gradient(to bottom, rgba(196,149,106,0.14), rgba(196,149,106,0.015));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          user-select: none; pointer-events: none; line-height: 0.9; white-space: nowrap; }

        ::selection { background: ${CARAMEL}; color: #fff; }

        @media (max-width: 860px) {
          .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 28px !important; }
          .foot-brand-col { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 520px) {
          .foot-grid { grid-template-columns: 1fr !important; }
          .giant-word { font-size: 18vw !important; }
          .foot-bottom { flex-direction: column !important; gap: 10px !important; text-align: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .beat, .pulse-open { animation: none !important; }
        }
      `}</style>

      <div className="foot-grain" />

      {/* ── TOP CTA BANNER ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            position: 'relative', marginTop: 'clamp(50px, 8vw, 80px)',
            background: 'linear-gradient(135deg, rgba(196,149,106,0.12), rgba(196,149,106,0.04))',
            border: '1px solid rgba(196,149,106,0.3)',
            borderRadius: 24, padding: 'clamp(30px, 5vw, 46px) clamp(24px, 5vw, 52px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 24, overflow: 'hidden',
          }}
        >
          {/* corner ✦ decorations */}
          <span style={{ position: 'absolute', top: 14, left: 16, color: 'rgba(196,149,106,0.4)', fontSize: 11 }}>✦</span>
          <span style={{ position: 'absolute', top: 14, right: 16, color: 'rgba(196,149,106,0.4)', fontSize: 11 }}>✦</span>
          <span style={{ position: 'absolute', bottom: 14, left: 16, color: 'rgba(196,149,106,0.4)', fontSize: 11 }}>✦</span>
          <span style={{ position: 'absolute', bottom: 14, right: 16, color: 'rgba(196,149,106,0.4)', fontSize: 11 }}>✦</span>

          <div>
            <p style={{ fontSize: 10.5, letterSpacing: '.3em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 700, margin: '0 0 10px', fontFamily: '"DM Sans", sans-serif' }}>
              ✦ Begin Your Evening
            </p>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3.4vw, 2.3rem)', fontWeight: 400, color: IVORY, margin: 0, lineHeight: 1.2 }}>
              An unforgettable table <em style={{ color: CARAMEL, fontWeight: 600 }}>awaits you</em>
            </h3>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('reservation')}
              style={{
                background: CARAMEL, color: '#0A0A0A', border: 'none',
                padding: '14px 32px', borderRadius: 50, fontSize: 13, fontWeight: 700,
                letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif', boxShadow: '0 10px 30px rgba(196,149,106,0.3)',
                transition: 'all .3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 38px rgba(196,149,106,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(196,149,106,0.3)' }}>
              Reserve a Table →
            </button>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'transparent', color: IVORY, border: '1px solid rgba(255,253,249,0.25)',
                padding: '14px 28px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                fontFamily: '"DM Sans", sans-serif', textDecoration: 'none', transition: 'all .3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = CARAMEL }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,253,249,0.25)'; e.currentTarget.style.color = IVORY }}>
              <SocialIcon name="whatsapp" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px, 8vw, 84px) clamp(20px, 5vw, 48px) 40px', position: 'relative', zIndex: 2 }}>
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 1fr 1fr', gap: 48 }}>

          {/* ── Brand + newsletter ── */}
          <motion.div className="foot-brand-col"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
            {/* Monogram */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, fontSize: 22, color: CARAMEL }}>V</span>
              <div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 600, color: IVORY, margin: 0, letterSpacing: '.02em' }}>Veylora</p>
                <p style={{ fontSize: 8.5, letterSpacing: '.34em', textTransform: 'uppercase', color: CARAMEL, margin: '3px 0 0', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>Fine Dining</p>
              </div>
            </div>

            <p style={{ color: 'rgba(255,253,249,0.45)', fontSize: 13.5, lineHeight: 1.85, maxWidth: 300, margin: '0 0 24px' }}>
              A sanctuary of flavour in the heart of the city — seasonal ingredients, old-world craft, and evenings worth remembering.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
              {[
                { name: 'instagram', href: INSTAGRAM, title: 'Instagram' },
                { name: 'facebook',  href: FACEBOOK,  title: 'Facebook' },
                { name: 'whatsapp',  href: `https://wa.me/${WA_NUMBER}`, title: 'WhatsApp' },
                { name: 'x',         href: '#',       title: 'X' },
              ].map(s => (
                <a key={s.name} className="soc" href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" title={s.title}>
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <p style={{ fontSize: 10.5, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(255,253,249,0.5)', fontWeight: 700, margin: '0 0 14px', fontFamily: '"DM Sans", sans-serif' }}>Join the Table</p>
            <form onSubmit={handleSubscribe} style={{ maxWidth: 300 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                <input
                  type="email"
                  className="news-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, paddingBottom: 10 }}
                />
                <button type="submit"
                  style={{
                    background: 'transparent', border: 'none', color: CARAMEL, cursor: 'pointer',
                    fontSize: 18, padding: '0 2px 8px', transition: 'transform .3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>→</button>
              </div>
              {subscribed && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 11.5, color: '#4ade80', margin: '10px 0 0', fontFamily: '"DM Sans", sans-serif' }}>
                  ✓ Welcome to the table — see you at dinner!
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* ── Explore ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
            <h4 style={{ color: IVORY, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.24em', margin: '0 0 22px', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {LINKS.map(l => (
                <a key={l.label} className="foot-link" style={linkStyle} onClick={() => scrollTo(l.href.slice(1))}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>
            <h4 style={{ color: IVORY, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.24em', margin: '0 0 22px', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: CARAMEL, marginTop: 2 }}><ContactIcon name="pin" /></span>
                <span style={{ color: 'rgba(255,253,249,0.5)', fontSize: 13.5, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>{ADDRESS}</span>
              </div>
              <a href={PHONE_LINK} className="foot-link" style={{ ...linkStyle, display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: CARAMEL }}><ContactIcon name="phone" /></span>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="foot-link" style={{ ...linkStyle, display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: CARAMEL }}><ContactIcon name="mail" /></span>
                {EMAIL}
              </a>
            </div>
          </motion.div>

          {/* ── Hours ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4, ease: EASE }}>
            <h4 style={{ color: IVORY, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.24em', margin: '0 0 22px', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>Hours</h4>

            {/* Open now chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: open ? 'rgba(74,222,128,0.08)' : 'rgba(184,92,74,0.08)',
              border: `1px solid ${open ? 'rgba(74,222,128,0.3)' : 'rgba(184,92,74,0.3)'}`,
              padding: '7px 14px', borderRadius: 50, marginBottom: 20,
            }}>
              <span className={`pulse-dot ${open ? 'pulse-open' : 'pulse-closed'}`} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: open ? '#4ade80' : '#B85C4A', fontFamily: '"DM Sans", sans-serif', letterSpacing: '.04em' }}>
                {open ? 'Open Now' : 'Currently Closed'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {HOURS.map(h => {
                const isToday = h.days.includes(today)
                return (
                  <div key={h.d} style={{
                    display: 'flex', justifyContent: 'space-between', gap: 14,
                    paddingBottom: 10, borderBottom: '1px dashed rgba(196,149,106,0.15)',
                  }}>
                    <span style={{ fontSize: 13, color: isToday ? CARAMEL : 'rgba(255,253,249,0.5)', fontWeight: isToday ? 600 : 400, fontFamily: '"DM Sans", sans-serif' }}>
                      {h.d}{isToday && ' ·'}
                    </span>
                    <span style={{ fontSize: 13, color: isToday ? IVORY : 'rgba(255,253,249,0.4)', fontWeight: isToday ? 600 : 400, fontFamily: '"DM Sans", sans-serif' }}>{h.t}</span>
                  </div>
                )
              })}
            </div>

            <p style={{ fontSize: 11, color: 'rgba(255,253,249,0.3)', margin: '16px 0 0', lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
              Last reservation 45 minutes before closing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── GIANT GHOST WORDMARK ── */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', overflow: 'hidden', marginBottom: -8 }}>
        <motion.span
          className="giant-word"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          style={{ fontSize: 'clamp(4rem, 13.5vw, 11rem)', display: 'inline-block' }}
        >
          Veylora
        </motion.span>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop: '1px solid rgba(196,149,106,0.12)', position: 'relative', zIndex: 2, background: 'rgba(10,10,10,0.9)' }}>
        <div className="foot-bottom" style={{
          maxWidth: 1240, margin: '0 auto', padding: '20px clamp(20px, 5vw, 48px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,253,249,0.35)', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
            © 2026 Veylora. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href="#" className="foot-link" style={{ ...linkStyle, fontSize: 12 }}>Privacy</a>
            <a href="#" className="foot-link" style={{ ...linkStyle, fontSize: 12 }}>Terms</a>
            <p style={{ fontSize: 12, color: 'rgba(255,253,249,0.35)', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
              Made with <span className="beat" style={{ color: CARAMEL }}>❤</span> by <span style={{ color: CARAMEL, fontWeight: 600 }}>Mahak</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <motion.button
        onClick={toTop}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring', damping: 14 }}
        title="Back to top"
        style={{
          position: 'absolute', top: 'clamp(50px, 8vw, 80px)', right: 'clamp(20px, 5vw, 48px)',
          transform: 'translateY(0)', zIndex: 3,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(196,149,106,0.08)', border: '1px solid rgba(196,149,106,0.35)',
          color: CARAMEL, fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.transform = 'translateY(-3px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,149,106,0.08)'; e.currentTarget.style.color = CARAMEL; e.currentTarget.style.transform = 'translateY(0)' }}>
        ↑
      </motion.button>
    </footer>
  )
}