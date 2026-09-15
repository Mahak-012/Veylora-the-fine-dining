import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CARAMEL = '#C4956A'
const MOCHA   = '#2C1810'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80', label: 'Dining Hall',    size: 'large'  },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', label: 'Plated Dishes',  size: 'small'  },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80', label: 'Bar & Lounge',   size: 'small'  },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', label: 'Chef at Work',   size: 'tall'   },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', label: 'Private Dining', size: 'small'  },
  { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', label: 'Table Setting',  size: 'small'  },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80', label: 'Dessert Bar',    size: 'wide'   },
  { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80', label: 'Pasta Station',  size: 'small'  },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', label: 'Wine Cellar',    size: 'small'  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [hovered,  setHovered]  = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <section id="gallery" ref={ref} style={{ padding: 'clamp(70px, 10vw, 100px) 0', background: '#111009', overflow: 'hidden', position: 'relative' }}>

        {/* Subtle bg glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 'min(700px, 90vw)', height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,149,106,0.06), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 60px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}
            >
              <span style={{ width: 36, height: 1, background: CARAMEL, opacity: 0.5 }} />
              <span style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 600 }}>Our Ambiance</span>
              <span style={{ width: 36, height: 1, background: CARAMEL, opacity: 0.5 }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 400, color: '#FFFDF9', lineHeight: 1.15 }}
            >
              A Space Crafted for <span style={{ fontStyle: 'italic', color: CARAMEL, fontWeight: 600 }}>Moments</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ color: 'rgba(255,253,249,0.4)', fontSize: 14.5, marginTop: 14, letterSpacing: '.06em' }}
            >
              Click any image to explore ✦
            </motion.p>
          </div>

          {/* ── BENTO GRID ── */}
          <div className="bento-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>

            {/* Row 1: large + 2 small */}
            <BentoItem img={IMAGES[0]} inView={inView} delay={0} className="bento-large" style={{ gridColumn: '1/3', gridRow: '1/3' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={0} />
            <BentoItem img={IMAGES[1]} inView={inView} delay={0.08} style={{ gridColumn: '3/4', gridRow: '1/2' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={1} />
            <BentoItem img={IMAGES[2]} inView={inView} delay={0.12} style={{ gridColumn: '4/5', gridRow: '1/2' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={2} />

            {/* Row 2 continued */}
            <BentoItem img={IMAGES[3]} inView={inView} delay={0.16} style={{ gridColumn: '3/4', gridRow: '2/3' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={3} />
            <BentoItem img={IMAGES[4]} inView={inView} delay={0.20} style={{ gridColumn: '4/5', gridRow: '2/3' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={4} />

            {/* Row 3: 2 small + wide spans 2 */}
            <BentoItem img={IMAGES[5]} inView={inView} delay={0.24} style={{ gridColumn: '1/2', gridRow: '3/4' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={5} />
            <BentoItem img={IMAGES[6]} inView={inView} delay={0.28} className="bento-wide" style={{ gridColumn: '2/4', gridRow: '3/4' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={6} />
            <BentoItem img={IMAGES[7]} inView={inView} delay={0.32} style={{ gridColumn: '4/5', gridRow: '3/4' }} onOpen={setLightbox} hovered={hovered} setHovered={setHovered} idx={7} />
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: CARAMEL, fontSize: 13, fontWeight: 600, letterSpacing: '.1em',
                textTransform: 'uppercase', textDecoration: 'none',
                border: '1px solid rgba(196,149,106,0.3)',
                padding: '11px 28px', borderRadius: 50,
                transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CARAMEL }}
            >
              📸 &nbsp; Follow Us on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,8,6,0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 860, width: '100%', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
            >
              <img src={IMAGES[lightbox]?.src.replace('w=600','w=1200')} alt="" style={{ width: '100%', display: 'block', maxHeight: '75vh', objectFit: 'cover' }} />

              {/* Label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 18px', background: 'linear-gradient(to top, rgba(10,8,6,0.85), transparent)' }}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 3vw, 22px)', color: '#FFFDF9', fontWeight: 500 }}>{IMAGES[lightbox]?.label}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,253,249,0.5)', marginTop: 4, letterSpacing: '.12em', textTransform: 'uppercase' }}>Veylora · Fine Dining</p>
              </div>

              {/* Close btn */}
              <button
                onClick={() => setLightbox(null)}
                style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,8,6,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
              >
                ×
              </button>

              {/* Prev / Next */}
              {lightbox > 0 && (
                <button onClick={e => { e.stopPropagation(); setLightbox(i => i - 1) }}
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(196,149,106,0.85)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ‹
                </button>
              )}
              {lightbox < IMAGES.length - 1 && (
                <button onClick={e => { e.stopPropagation(); setLightbox(i => i + 1) }}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(196,149,106,0.85)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ›
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Fully Responsive CSS Breakpoints */}
      <style>{`
        @media(max-width: 900px) {
          .bento-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-container > div {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 220px !important;
          }
          .bento-large {
            grid-column: span 2 !important;
          }
        }
        @media(max-width: 540px) {
          .bento-container {
            grid-template-columns: 1fr !important;
          }
          .bento-large {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </>
  )
}

// ── Bento Item Component ──
function BentoItem({ img, inView, delay, style, className = '', onOpen, hovered, setHovered, idx }) {
  const CARAMEL = '#C4956A'
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22,1,0.36,1] }}
      className={className}
      style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', minHeight: 200, ...style }}
      onClick={() => onOpen(idx)}
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0,
          transform: hovered === idx ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
          filter: hovered === idx ? 'brightness(0.75)' : 'brightness(0.82)',
        }}
      />

      {/* Gradient overlay always */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.55) 0%, transparent 55%)' }} />

      {/* Hover overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(196,149,106,0.18), transparent)`, opacity: hovered === idx ? 1 : 0, transition: 'opacity .4s' }} />

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px',
        transform: hovered === idx ? 'translateY(0)' : 'translateY(8px)',
        opacity: hovered === idx ? 1 : 0,
        transition: 'all .35s cubic-bezier(.22,1,.36,1)',
      }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 15, color: '#FFFDF9', fontWeight: 500 }}>{img.label}</p>
      </div>

      {/* Expand icon */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 32, height: 32, borderRadius: '50%',
        background: 'rgba(196,149,106,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered === idx ? 1 : 0,
        transform: hovered === idx ? 'scale(1)' : 'scale(0.7)',
        transition: 'all .3s',
        fontSize: 13, color: '#fff',
      }}>
        ⤢
      </div>

      {/* Gold corner accent */}
      <div style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, borderTop: `1.5px solid ${CARAMEL}`, borderLeft: `1.5px solid ${CARAMEL}`, opacity: hovered === idx ? 0.8 : 0.25, transition: 'opacity .3s' }} />
      <div style={{ position: 'absolute', bottom: 10, right: 10, width: 20, height: 20, borderBottom: `1.5px solid ${CARAMEL}`, borderRight: `1.5px solid ${CARAMEL}`, opacity: hovered === idx ? 0.8 : 0.25, transition: 'opacity .3s' }} />
    </motion.div>
  )
}