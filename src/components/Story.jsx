import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const CARAMEL = '#C4956A'
const MOCHA   = '#2C1810'
const IVORY   = '#FFFDF9'
const WARM    = '#FAF8F4'
const EASE    = [0.22, 1, 0.36, 1]

/* ── Elegant line icons (emoji ki jagah) ── */
function LineIcon({ name, size = 24 }) {
  const paths = {
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    chef: (
      <>
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
        <path d="M6 17h12" />
      </>
    ),
    flame: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </>
    ),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      {paths[name]}
    </svg>
  )
}

const VALUES = [
  { icon: 'leaf',  title: 'Farm to Table',   desc: 'We source ingredients daily from local farms and trusted suppliers to ensure peak freshness in every dish.' },
  { icon: 'chef',  title: 'Master Chefs',    desc: 'Our culinary team brings decades of international training and a deep love for authentic flavours.' },
  { icon: 'flame', title: 'Warm Ambiance',   desc: 'Every corner of Veylora is designed to make you feel at home — elegant yet deeply comfortable.' },
  { icon: 'globe', title: 'Sustainable',     desc: 'We are committed to eco-friendly practices — from packaging to energy use, every choice is intentional.' },
]

/* ── Count-up hook (scroll pe trigger hota hai) ── */
function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return [ref, value]
}

function Stat({ value, suffix = '', label }) {
  const [ref, n] = useCountUp(value)
  return (
    <div ref={ref}>
      <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: CARAMEL, lineHeight: 1, margin: 0 }}>
        {n}{suffix}
      </p>
      <p style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(44,24,16,0.5)', marginTop: 7, fontWeight: 600, margin: 0 }}>
        {label}
      </p>
    </div>
  )
}

/* ── Ornamental divider ── */
function Ornament() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
      <span style={{ width: 48, height: 1, background: 'rgba(196,149,106,0.4)' }} />
      <span style={{ color: CARAMEL, fontSize: 11 }}>✦</span>
      <span style={{ width: 48, height: 1, background: 'rgba(196,149,106,0.4)' }} />
    </div>
  )
}

/* ── Value card (numbered + sweep line + icon flip) ── */
function ValueCard({ v, i, inView }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="value-card"
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'default',
        background: hov ? '#FFFFFF' : IVORY,
        borderRadius: 20, padding: '34px 28px 32px',
        border: `1px solid ${hov ? 'rgba(196,149,106,0.45)' : 'rgba(196,149,106,0.16)'}`,
        boxShadow: hov ? '0 26px 54px rgba(44,24,16,0.1)' : '0 8px 24px rgba(44,24,16,0.03)',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'all .45s cubic-bezier(.22,1,.36,1)',
      }}
    >
      {/* Ghost number */}
      <span style={{
        position: 'absolute', top: 16, right: 22,
        fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700,
        fontSize: 46, lineHeight: 1, userSelect: 'none',
        color: hov ? 'rgba(196,149,106,0.32)' : 'rgba(196,149,106,0.13)',
        transition: 'color .45s',
      }}>
        0{i + 1}
      </span>

      {/* Icon */}
      <div style={{
        width: 58, height: 58, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? CARAMEL : 'rgba(196,149,106,0.1)',
        color: hov ? '#fff' : CARAMEL,
        transform: hov ? 'rotate(-6deg) scale(1.06)' : 'rotate(0deg) scale(1)',
        boxShadow: hov ? '0 12px 26px rgba(196,149,106,0.35)' : 'none',
        transition: 'all .45s cubic-bezier(.22,1,.36,1)',
        marginBottom: 20,
      }}>
        <LineIcon name={v.icon} />
      </div>

      <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: 19, fontWeight: 600, color: MOCHA, marginBottom: 10, margin: '0 0 10px' }}>{v.title}</h4>
      <p style={{ fontSize: 13.5, color: 'rgba(44,24,16,0.58)', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
    </motion.div>
  )
}

export default function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const ghostY     = useTransform(scrollYProgress, [0, 1], [50, -50])

  /* Heading words */
  const L1 = [{ t: 'Born' }, { t: 'from' }, { t: 'a' }, { t: 'Passion', it: true }]
  const L2 = [{ t: 'for' }, { t: 'Honest' }, { t: 'Flavours' }]
  const renderWords = (words, base) => (
    <span style={{ display: 'block' }}>
      {words.map((w, i) => (
        <span key={w.t} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em', marginRight: '0.26em' }}>
          <motion.span
            initial={{ y: '112%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.85, delay: base + i * 0.09, ease: EASE }}
            style={{
              display: 'inline-block',
              fontStyle: w.it ? 'italic' : 'normal',
              fontWeight: w.it ? 600 : 400,
              color: w.it ? CARAMEL : MOCHA,
            }}
          >{w.t}</motion.span>
        </span>
      ))}
    </span>
  )

  return (
    <section id="story" ref={ref} style={{ padding: 'clamp(100px, 14vw, 160px) 0', background: WARM, overflow: 'hidden', position: 'relative' }}>

      <style>{`
        .story-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.035; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        .ghost-word {
          font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(196,149,106,0.16); color: transparent;
          user-select: none; pointer-events: none; line-height: 1;
        }

        .spin-slow { animation: spin360 22s linear infinite; }
        @keyframes spin360 { to { transform: rotate(360deg) } }

        .floaty { animation: floatbob 5.5s ease-in-out infinite; }
        @keyframes floatbob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }

        .value-card::before {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px;
          background: linear-gradient(90deg, ${CARAMEL}, rgba(196,149,106,0.25));
          transform: scaleX(0); transform-origin: left;
          transition: transform .55s cubic-bezier(.22,1,.36,1);
        }
        .value-card:hover::before { transform: scaleX(1); }

        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 10px #4ade80; animation: livepulse 2s infinite; flex-shrink: 0; }
        @keyframes livepulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.45 } }

        ::selection { background: ${CARAMEL}; color: #fff; }

        @media (max-width: 900px) {
          .story-split { grid-template-columns: 1fr !important; gap: 76px !important; }
          .ghost-word { font-size: 5.5rem !important; }
        }
        @media (max-width: 640px) {
          .story-rotator { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .spin-slow, .floaty, .live-dot { animation: none !important; }
        }
      `}</style>

      {/* Ambient glows + grain */}
      <div style={{ position: 'absolute', top: '8%', left: '-6%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(196,149,106,0.09), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '4%', right: '-6%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(196,149,106,0.07), transparent 70%)', pointerEvents: 'none' }} />
      <div className="story-grain" />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 2 }}>

        {/* Ghost word */}
        <motion.span className="ghost-word" style={{ position: 'absolute', top: -30, right: '-0.05em', fontSize: 'clamp(6rem, 15vw, 12rem)', y: ghostY }}>
          Legacy
        </motion.span>

        {/* ═══ TOP SPLIT ═══ */}
        <div className="story-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', marginBottom: 'clamp(76px, 9vw, 116px)' }}>

          {/* ── LEFT: Cinematic video composition ── */}
          <motion.div style={{ position: 'relative', scale: imageScale }}>

            {/* Offset gallery frame (behind video) */}
            <div style={{ position: 'absolute', top: -18, left: -18, right: 18, bottom: 18, border: '1.5px solid rgba(196,149,106,0.4)', borderRadius: 24, pointerEvents: 'none' }} />

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ position: 'relative', zIndex: 1, borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 34px 70px rgba(44,24,16,0.18)' }}
            >
              <video
                src="/video.mp4"
                poster="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=80"
                autoPlay loop muted playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92) saturate(1.05)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.4) 0%, transparent 50%)' }} />

              {/* Inner mat frame — gallery style */}
              <span style={{ position: 'absolute', inset: 14, border: '1px solid rgba(255,253,249,0.28)', borderRadius: 14, pointerEvents: 'none', zIndex: 2 }} />

              {/* Live badge */}
              <div style={{ position: 'absolute', top: 26, left: 26, zIndex: 3, background: 'rgba(11,11,11,0.6)', backdropFilter: 'blur(10px)', padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="live-dot" />
                <span style={{ color: '#fff', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>Live Kitchen</span>
              </div>
            </motion.div>

            {/* Rotating Est. badge — top right */}
            <motion.div
              className="story-rotator"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8, type: 'spring', damping: 14 }}
              style={{ position: 'absolute', top: -34, right: -34, zIndex: 4, width: 118, height: 118 }}
            >
              <div className="spin-slow" style={{ position: 'absolute', inset: 0 }}>
                <svg viewBox="0 0 118 118" width="118" height="118" style={{ display: 'block' }}>
                  <defs>
                    <path id="storyCircle" d="M 59,59 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="none" />
                  </defs>
                  <circle cx="59" cy="59" r="57.5" fill="rgba(250,248,244,0.96)" stroke="rgba(196,149,106,0.5)" strokeWidth="1" />
                  <text fill={MOCHA} style={{ fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>
                    <textPath href="#storyCircle" textLength="272" lengthAdjust="spacingAndGlyphs">Veylora ✦ Est. 2012 ✦ Fine Dining ✦</textPath>
                  </text>
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: CARAMEL, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, boxShadow: '0 8px 20px rgba(196,149,106,0.45)' }}>✦</span>
              </div>
            </motion.div>

            {/* Floating chef image — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.8, type: 'spring', damping: 16 }}
              style={{ position: 'absolute', bottom: -30, right: -30, zIndex: 4, width: 'clamp(110px, 20vw, 160px)', height: 'clamp(110px, 20vw, 160px)' }}
            >
              <div className="floaty" style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', border: '6px solid #FAF8F4', boxShadow: '0 24px 48px rgba(44,24,16,0.22)' }}>
                <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&q=80" alt="Head chef plating a signature dish" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

            {/* Years badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              style={{ position: 'absolute', bottom: -26, left: -26, zIndex: 4, background: CARAMEL, color: '#fff', padding: '16px 22px', borderRadius: 18, boxShadow: '0 16px 36px rgba(196,149,106,0.45)' }}
            >
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 700, lineHeight: 1, margin: 0 }}>12+</p>
              <p style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', marginTop: 6, opacity: 0.92, fontWeight: 700, margin: 0 }}>Years of Legacy</p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ width: 44, height: 1, background: CARAMEL }} />
              <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>✦ Our Heritage</span>
            </div>

            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, color: MOCHA, lineHeight: 1.14, margin: '0 0 26px', letterSpacing: '-0.01em' }}>
              {renderWords(L1, 0.35)}
              {renderWords(L2, 0.7)}
            </h2>

            <p style={{ color: 'rgba(44,24,16,0.62)', fontSize: 15.5, lineHeight: 1.9, marginBottom: 18 }}>
              Veylora was established with a singular vision — to transform dining into an emotional experience where exceptional ingredients meet heartfelt culinary artistry. What began as an intimate family kitchen has evolved into an iconic destination.
            </p>
            <p style={{ color: 'rgba(44,24,16,0.62)', fontSize: 15.5, lineHeight: 1.9, marginBottom: 0 }}>
              Our master chefs travel globally to master heritage techniques, returning to craft menus that balance timeless traditions with contemporary innovation. Every single plate narrates a distinct tale of dedication.
            </p>

            {/* Chef signature */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}
            >
              <span style={{ width: 44, height: 1, background: 'rgba(196,149,106,0.5)' }} />
              <div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 22, color: MOCHA, margin: 0, lineHeight: 1.2 }}>Alessandro Moretti</p>
                <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: CARAMEL, margin: '6px 0 0', fontWeight: 700 }}>Founder & Executive Chef</p>
              </div>
            </motion.div>

            {/* Stats — count up */}
            <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 44px)', paddingTop: 30, marginTop: 32, borderTop: '1px solid rgba(196,149,106,0.25)', flexWrap: 'wrap' }}>
              <Stat value={200} suffix="+" label="Dishes Crafted" />
              <Stat value={50}  suffix="K+" label="Happy Guests" />
              <Stat value={3}   suffix=""  label="Global Awards" />
            </div>
          </motion.div>
        </div>

        {/* ═══ VALUES ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Ornament />
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', fontWeight: 400, color: MOCHA, margin: '20px 0 0' }}>
            The <em style={{ color: CARAMEL, fontWeight: 600 }}>Veylora</em> Promise
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} v={v} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}