import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const CARAMEL = '#C4956A'
const CREAM = '#FFFDF9'
const EASE = [0.22, 1, 0.36, 1]

const HEADLINE = [
  { words: ['Where', 'Every'], italic: false },
  { words: ['Bite', 'Tells'], italic: true },
  { words: ['a', 'Story'], italic: false },
]

const PARTICLES = [
  { top: '24%', left: '12%', size: 3, delay: 0 },
  { top: '62%', left: '7%', size: 2, delay: 1.4 },
  { top: '28%', left: '84%', size: 3, delay: 0.7 },
  { top: '70%', left: '80%', size: 2, delay: 2 },
  { top: '46%', left: '93%', size: 2.5, delay: 2.6 },
  { top: '84%', left: '28%', size: 2, delay: 1 },
]

/* Animated count-up hook */
function useCountUp(target, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Number((target * eased).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, decimals])
  return value
}

function Stat({ value, suffix = '', decimals = 0, label }) {
  const n = useCountUp(value, 1800, decimals)
  return (
    <div>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 600, color: CARAMEL, lineHeight: 1 }}>
        {n}{suffix}
      </p>
      <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,253,249,0.55)', marginTop: 7, fontFamily: '"DM Sans", sans-serif' }}>
        {label}
      </p>
    </div>
  )
}

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  /* Mouse parallax — butter smooth via springs */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 45, damping: 18 })
  const sy = useSpring(my, { stiffness: 45, damping: 18 })
  const bgX = useTransform(sx, (v) => v * -26)
  const bgY = useTransform(sy, (v) => v * -18)
  const glowX = useTransform(sx, (v) => v * 50)
  const glowY = useTransform(sy, (v) => v * 36)

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', background: '#1a0d08' }}>
      <style>{`
        /* Cinematic slow zoom */
        @keyframes kenburns { 0% { transform: scale(1) translateY(0) } 100% { transform: scale(1.14) translateY(-1.5%) } }
        .kenburns { animation: kenburns 24s ease-in-out infinite alternate; will-change: transform; }

        /* Film grain texture */
        .grain { position: absolute; inset: 0; z-index: 4; pointer-events: none; opacity: 0.05; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        /* Floating embers */
        .particle { position: absolute; z-index: 3; border-radius: 50%; background: rgba(196,149,106,0.75);
          box-shadow: 0 0 10px rgba(196,149,106,0.7); animation: floaty 6s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0); opacity: 0.3 } 50% { transform: translateY(-18px); opacity: 0.9 } }

        /* Decorative frame */
        .hero-frame { position: absolute; top: 32px; left: 32px; right: 32px; bottom: 32px; border: 1px solid rgba(196,149,106,0.18); z-index: 5; pointer-events: none; }
        .hero-corner { position: absolute; width: 42px; height: 42px; z-index: 6; opacity: 0.85; pointer-events: none; }
        .hero-corner.tl { top: 22px; left: 22px; border-top: 2px solid #C4956A; border-left: 2px solid #C4956A; }
        .hero-corner.tr { top: 22px; right: 22px; border-top: 2px solid #C4956A; border-right: 2px solid #C4956A; }
        .hero-corner.bl { bottom: 22px; left: 22px; border-bottom: 2px solid #C4956A; border-left: 2px solid #C4956A; }
        .hero-corner.br { bottom: 22px; right: 22px; border-bottom: 2px solid #C4956A; border-right: 2px solid #C4956A; }

        /* Shine button */
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after { content: ''; position: absolute; top: 0; left: -80%; width: 45%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg); transition: left 0.6s ease; }
        .btn-shine:hover::after { left: 130%; }
        .btn-arrow { display: inline-block; margin-left: 8px; transition: transform 0.25s ease; }
        button:hover .btn-arrow { transform: translateX(5px); }

        /* Rotating badge */
        .spin-slow { animation: spin360 20s linear infinite; }
        @keyframes spin360 { to { transform: rotate(360deg) } }

        /* Scroll dot */
        .scroll-dot { position: absolute; top: 0; left: 50%; margin-left: -2.5px; width: 5px; height: 5px; border-radius: 50%;
          background: #C4956A; animation: scrolldot 2.2s ease-in-out infinite; }
        @keyframes scrolldot { 0% { top: 0; opacity: 0 } 20% { opacity: 1 } 80% { opacity: 1 } 100% { top: calc(100% - 5px); opacity: 0 } }

        /* Open-now pulse */
        .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #7BC47F; animation: pulse 2s infinite; flex-shrink: 0; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(123,196,127,0.45) } 50% { box-shadow: 0 0 0 6px rgba(123,196,127,0) } }

        .hero-pad { padding: 0 64px; }

        @media (prefers-reduced-motion: reduce) {
          .kenburns, .spin-slow, .particle, .scroll-dot, .pulse-dot { animation: none !important; }
        }

        /* Responsive */
        @media (max-width: 1100px) { .hero-rotator { display: none; } .hero-pad { padding: 0 44px; } }
        @media (max-width: 768px) {
          .hero-frame { top: 14px; left: 14px; right: 14px; bottom: 14px; }
          .hero-corner, .hero-michelin, .hero-bottombar { display: none; }
          .hero-pad { padding: 0 26px; }
          .hero-stats { gap: 28px !important; }
        }
        @media (max-height: 660px) { .hero-bottombar { display: none; } }
      `}</style>

      {/* Background with parallax + Ken Burns zoom */}
      <motion.div style={{ position: 'absolute', inset: -48, zIndex: 0, x: bgX, y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80&auto=format&fit=crop"
          alt="Elegant fine-dining restaurant interior"
          className="kenburns"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.5) contrast(1.08) saturate(1.05)' }}
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(135deg, rgba(44,24,16,0.65) 0%, rgba(196,149,106,0.08) 55%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top, rgba(26,13,8,0.85) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,13,8,0.5) 100%)' }} />

      {/* Mouse-follow caramel glow */}
      <motion.div style={{ position: 'absolute', top: '18%', left: '58%', width: 620, height: 620, borderRadius: '50%', zIndex: 1, filter: 'blur(8px)', background: 'radial-gradient(circle, rgba(196,149,106,0.13), transparent 65%)', x: glowX, y: glowY }} />

      {/* Film grain + embers */}
      <div className="grain" />
      {PARTICLES.map((p, i) => (
        <span key={i} className="particle" style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: `${p.delay}s` }} />
      ))}

      {/* Frame + corners */}
      <div className="hero-frame" />
      <div className="hero-corner tl" />
      <div className="hero-corner tr" />
      <div className="hero-corner bl" />
      <div className="hero-corner br" />

      {/* Michelin badge */}
      <motion.div
        className="hero-michelin"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
        style={{ position: 'absolute', top: 58, right: 58, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 999, border: '1px solid rgba(196,149,106,0.45)', background: 'rgba(44,24,16,0.45)', backdropFilter: 'blur(8px)' }}
      >
        <span style={{ color: CARAMEL, fontSize: 11 }}>★</span>
        <span style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: CREAM, fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>Michelin Guide 2025</span>
      </motion.div>

      {/* Rotating circular badge */}
      <motion.div
        className="hero-rotator"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
        style={{ position: 'absolute', right: 84, bottom: 130, zIndex: 10, width: 132, height: 132 }}
      >
        <div className="spin-slow" style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 132 132" width="132" height="132" style={{ display: 'block' }}>
            <defs>
              <path id="heroCircle" d="M 66,66 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="none" />
            </defs>
            <text fill={CARAMEL} style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
              <textPath href="#heroCircle" textLength="312" lengthAdjust="spacingAndGlyphs">Est. 2012 ✦ Fine Dining ✦ Fine Wines ✦</textPath>
            </text>
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(196,149,106,0.5)', background: 'rgba(44,24,16,0.4)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: CARAMEL, fontSize: 17 }}>✦</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="hero-pad" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}
          >
            <span style={{ width: 44, height: 1, background: CARAMEL }} />
            <span style={{ fontSize: 12, letterSpacing: '.26em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>
              ✦ Fine Dining Experience
            </span>
          </motion.div>

          {/* Headline — word by word reveal */}
          <h1 style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1.1, margin: '0 0 30px', textShadow: '0 4px 40px rgba(0,0,0,0.35)' }}>
            {HEADLINE.map((line, li) => (
              <span key={li} style={{ display: 'block', fontSize: 'clamp(2.6rem, 6vw, 5.2rem)' }}>
                {line.words.map((word, wi) => (
                  <span
                    key={wi}
                    style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em', marginRight: '0.26em' }}
                  >
                    <motion.span
                      initial={{ y: '112%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, delay: 0.3 + (li * 2 + wi) * 0.09, ease: EASE }}
                      style={{
                        display: 'inline-block',
                        fontWeight: line.italic ? 500 : 700,
                        fontStyle: line.italic ? 'italic' : 'normal',
                        color: line.italic ? CARAMEL : CREAM,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            style={{ color: 'rgba(255,253,249,0.78)', fontSize: 16.5, lineHeight: 1.85, maxWidth: 470, marginBottom: 42, fontWeight: 300, fontFamily: '"DM Sans", sans-serif' }}
          >
            An intimate sanctuary of flavour — seasonal ingredients, old-world craft, and warm hospitality, plated with love from around the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 54 }}
          >
            <button
              onClick={() => scrollTo('reservation')}
              className="btn-shine"
              style={{ background: CARAMEL, color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 50, fontSize: 13.5, fontWeight: 700, fontFamily: '"DM Sans", sans-serif', letterSpacing: '.05em', cursor: 'pointer', boxShadow: '0 6px 28px rgba(196,149,106,0.45)', transition: 'all .25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(196,149,106,0.55)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(196,149,106,0.45)' }}
            >
              Reserve a Table <span className="btn-arrow">→</span>
            </button>
            <button
              onClick={() => scrollTo('menu')}
              style={{ background: 'transparent', color: CREAM, border: '1.5px solid rgba(255,253,249,0.35)', padding: '14px 32px', borderRadius: 50, fontSize: 13.5, fontWeight: 500, fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all .25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = CARAMEL }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,253,249,0.35)'; e.currentTarget.style.color = CREAM }}
            >
              Explore Menu
            </button>
          </motion.div>

          {/* Stats — animated counters */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            style={{ display: 'flex', gap: 46, paddingTop: 26, borderTop: '1px solid rgba(196,149,106,0.25)' }}
          >
            <Stat value={4.9} suffix="★" decimals={1} label="Guest Rating" />
            <Stat value={200} suffix="+" label="Signature Dishes" />
            <Stat value={12} suffix="+" label="Years of Excellence" />
          </motion.div>
        </div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        className="hero-bottombar"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
        style={{ position: 'absolute', bottom: 46, left: 64, right: 64, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(196,149,106,0.22)', paddingTop: 18, gap: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: 11.5, letterSpacing: '.08em', color: 'rgba(255,253,249,0.7)', fontFamily: '"DM Sans", sans-serif' }}>Open Daily · 12:00 PM – 11:00 PM</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(196,149,106,0.75)', fontFamily: '"DM Sans", sans-serif' }}>Scroll</span>
          <div style={{ position: 'relative', width: 1, height: 34, background: 'rgba(196,149,106,0.25)' }}>
            <span className="scroll-dot" />
          </div>
        </div>

        <a
          href="tel:+12125550184"
          style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: 'rgba(255,253,249,0.7)', fontSize: 11.5, letterSpacing: '.08em', fontFamily: '"DM Sans", sans-serif', transition: 'color .25s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = CARAMEL)}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,253,249,0.7)')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={CARAMEL}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" /></svg>
          +1 (212) 555-0184
        </a>
      </motion.div>
    </section>
  )
}