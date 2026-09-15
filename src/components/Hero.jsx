import { motion } from 'framer-motion'

const CARAMEL = '#C4956A'
const MOCHA   = '#2C1810'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', background: '#1a0d08' }}>

      {/* Single Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600"
          alt="Restaurant"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.55) contrast(1.05)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(44,24,16,0.6) 0%, rgba(196,149,106,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.75) 0%, transparent 55%)' }} />
      </div>

      {/* Decorative frame lines */}
      <div style={{ position: 'absolute', top: 32, left: 32, right: 32, bottom: 32, border: '1px solid rgba(196,149,106,0.2)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: `2px solid ${CARAMEL}`, borderLeft: `2px solid ${CARAMEL}`, zIndex: 2, opacity: 0.7 }} />
      <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: `2px solid ${CARAMEL}`, borderRight: `2px solid ${CARAMEL}`, zIndex: 2, opacity: 0.7 }} />
      <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: `2px solid ${CARAMEL}`, borderLeft: `2px solid ${CARAMEL}`, zIndex: 2, opacity: 0.7 }} />
      <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: `2px solid ${CARAMEL}`, borderRight: `2px solid ${CARAMEL}`, zIndex: 2, opacity: 0.7 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 48px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <span style={{ width: 36, height: 1, background: CARAMEL }} />
            <span style={{ fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 600 }}>
              ✦ Fine Dining Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1.06, marginBottom: 28 }}
          >
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', fontWeight: 700, color: '#FFFDF9' }}>
              Where Every
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', fontWeight: 400, fontStyle: 'italic', color: CARAMEL }}>
              Bite Tells
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', fontWeight: 700, color: '#FFFDF9' }}>
              a Story
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: 'rgba(255,253,249,0.75)', fontSize: 16, lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}
          >
            A sanctuary of flavours crafted with love, tradition, and the finest ingredients from around the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}
          >
            <button
              onClick={() => scrollTo('reservation')}
              className="btn-shine"
              style={{
                background: CARAMEL, color: '#fff', border: 'none',
                padding: '14px 32px', borderRadius: 50,
                fontSize: 13.5, fontWeight: 700, fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '.05em', cursor: 'pointer',
                boxShadow: '0 6px 28px rgba(196,149,106,0.45)',
                transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(196,149,106,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(196,149,106,0.45)' }}
            >
              Reserve a Table →
            </button>
            <button
              onClick={() => scrollTo('menu')}
              style={{
                background: 'transparent', color: '#FFFDF9',
                border: '1.5px solid rgba(255,253,249,0.35)',
                padding: '14px 32px', borderRadius: 50,
                fontSize: 13.5, fontWeight: 500, fontFamily: '"DM Sans", sans-serif',
                cursor: 'pointer', transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = CARAMEL }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,253,249,0.35)'; e.currentTarget.style.color = '#FFFDF9' }}
            >
              Explore Menu
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ display: 'flex', gap: 36, paddingTop: 24, borderTop: '1px solid rgba(196,149,106,0.25)' }}
          >
            {[['4.9★', 'Guest Rating'], ['200+', 'Menu Items'], ['12+', 'Years of Love']].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 26, fontWeight: 600, color: CARAMEL, lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,253,249,0.55)', marginTop: 4 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(196,149,106,0.6)' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(196,149,106,0.6), transparent)' }} />
      </div>
    </section>
  )
}