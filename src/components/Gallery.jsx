import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

const CARAMEL = '#C4956A'
const IVORY   = '#FFFDF9'
const DARK    = '#111009'
const EASE    = [0.22, 1, 0.36, 1]

const FILTERS = [
  { id: 'all',      label: 'All Frames' },
  { id: 'ambiance', label: 'Ambiance' },
  { id: 'cuisine',  label: 'Cuisine' },
  { id: 'moments',  label: 'Moments' },
]

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80', label: 'Dining Hall',    cat: 'ambiance', size: 'lg'   },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', label: 'Plated Dishes',  cat: 'cuisine',  size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80',    label: 'Bar & Lounge',   cat: 'ambiance', size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', label: 'Chef at Work',   cat: 'moments',  size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',    label: 'Private Dining', cat: 'ambiance', size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', label: 'Table Setting',  cat: 'ambiance', size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80',    label: 'Dessert Bar',    cat: 'cuisine',  size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80',    label: 'Pasta Station',  cat: 'cuisine',  size: 'sm'   },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',    label: 'Wine Cellar',    cat: 'ambiance', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80',    label: 'Evening Service',cat: 'moments',  size: 'wide' },
]

/* ── Word-by-word masked heading ── */
function RevealWords({ words, base = 0, inView }) {
  return (
    <>
      {words.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.map((w, wi) => (
            <span key={w.t} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em', marginRight: '0.26em' }}>
              <motion.span
                initial={{ y: '112%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.85, delay: base + (li * 3 + wi) * 0.08, ease: EASE }}
                style={{ display: 'inline-block', fontStyle: w.it ? 'italic' : 'normal', fontWeight: w.it ? 600 : 400, color: w.it ? CARAMEL : IVORY }}
              >{w.t}</motion.span>
            </span>
          ))}
        </span>
      ))}
    </>
  )
}

/* ── Lightbox ── */
function Lightbox({ list, state, setState, onClose }) {
  const [index, direction] = state
  const item = list[index]

  const go = (dir) => setState(([i]) => [(i + dir + list.length) % list.length, dir])
  const jump = (i) => { if (i !== index) setState([i, i > index ? 1 : -1]) }

  /* Keyboard + scroll lock */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft')  go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [list.length])

  /* Preload neighbours */
  useEffect(() => {
    if (index === null) return
    ;[1, -1].forEach(d => {
      const img = new Image()
      img.src = list[(index + d + list.length) % list.length].src.replace('w=600', 'w=1400').replace('w=900', 'w=1400')
    })
  }, [index, list])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,8,6,0.94)', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      {/* Top bar — counter + close */}
      <div style={{ position: 'absolute', top: 22, left: 26, zIndex: 5, display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: '"DM Sans", sans-serif' }}>
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 26, color: CARAMEL, fontWeight: 600 }}>{String(index + 1).padStart(2, '0')}</span>
        <span style={{ fontSize: 13, color: 'rgba(255,253,249,0.4)' }}>/ {String(list.length).padStart(2, '0')}</span>
      </div>
      <button onClick={onClose}
        style={{ position: 'absolute', top: 18, right: 20, zIndex: 5, width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,253,249,0.06)', border: '1px solid rgba(255,253,249,0.15)', color: '#fff', fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', transition: 'all .3s' }}
        onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.transform = 'rotate(90deg)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,253,249,0.06)'; e.currentTarget.style.transform = 'rotate(0deg)' }}>✕</button>

      {/* Image stage — swipe supported */}
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: 'min(900px, 94vw)' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            src={item.src.replace('w=600', 'w=1400').replace('w=900', 'w=1400')}
            alt={item.label}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1) }}
            initial={{ opacity: 0, x: direction >= 0 ? 70 : -70, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction >= 0 ? -70 : 70, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ width: '100%', maxHeight: '68vh', objectFit: 'cover', borderRadius: 18, display: 'block', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', cursor: 'grab' }}
          />
        </AnimatePresence>

        {/* Prev / Next */}
        <button onClick={e => { e.stopPropagation(); go(-1) }}
          style={{ position: 'absolute', left: -18, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(17,16,9,0.75)', border: '1px solid rgba(196,149,106,0.4)', color: CARAMEL, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', transition: 'all .25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17,16,9,0.75)'; e.currentTarget.style.color = CARAMEL }}>‹</button>
        <button onClick={e => { e.stopPropagation(); go(1) }}
          style={{ position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(17,16,9,0.75)', border: '1px solid rgba(196,149,106,0.4)', color: CARAMEL, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', transition: 'all .25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17,16,9,0.75)'; e.currentTarget.style.color = CARAMEL }}>›</button>

        {/* Caption */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '26px 24px 18px', background: 'linear-gradient(to top, rgba(10,8,6,0.88), transparent)', borderRadius: '0 0 18px 18px', pointerEvents: 'none' }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 3vw, 23px)', color: IVORY, fontWeight: 500, margin: 0, fontStyle: 'italic' }}>{item.label}</p>
          <p style={{ fontSize: 10, color: CARAMEL, marginTop: 6, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, margin: '6px 0 0', fontFamily: '"DM Sans", sans-serif' }}>✦ {item.cat} · Veylora</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div onClick={e => e.stopPropagation()} className="thumbs"
        style={{ display: 'flex', gap: 8, marginTop: 20, maxWidth: '90vw', overflowX: 'auto', padding: '6px 2px' }}>
        {list.map((im, i) => (
          <button key={im.label + i} onClick={() => jump(i)}
            style={{
              width: 58, height: 42, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
              border: `2px solid ${i === index ? CARAMEL : 'transparent'}`,
              opacity: i === index ? 1 : 0.4,
              transform: i === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'all .3s', cursor: 'pointer', padding: 0, background: 'none',
            }}>
            <img src={im.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Bento tile with shimmer + corners ── */
function Tile({ img, idx, inView, onOpen, setHovered, hovered }) {
  const [loaded, setLoaded] = useState(false)
  const hov = hovered === idx
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`g-${img.size}`}
      onClick={() => onOpen(idx)}
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
      style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', minHeight: 190, background: 'rgba(255,253,249,0.04)' }}
    >
      {/* Shimmer while loading */}
      {!loaded && <div className="shimmer" style={{ position: 'absolute', inset: 0 }} />}

      <img src={img.src} alt={img.label} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0,
          opacity: loaded ? 1 : 0, transition: 'opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1), filter .5s',
          transform: hov ? 'scale(1.07)' : 'scale(1)',
          filter: hov ? 'brightness(0.72) saturate(1.08)' : 'brightness(0.82)',
        }} />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.55), transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(196,149,106,0.16), transparent)', opacity: hov ? 1 : 0, transition: 'opacity .4s' }} />

      {/* Label */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 15px',
        transform: hov ? 'translateY(0)' : 'translateY(10px)', opacity: hov ? 1 : 0, transition: 'all .4s cubic-bezier(.22,1,.36,1)' }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 15, color: IVORY, fontWeight: 500, margin: 0 }}>{img.label}</p>
        <p style={{ fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: CARAMEL, margin: '4px 0 0', fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>{img.cat}</p>
      </div>

      {/* Expand icon */}
      <div style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%',
        background: 'rgba(196,149,106,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hov ? 1 : 0, transform: hov ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-45deg)', transition: 'all .35s cubic-bezier(.22,1,.36,1)', fontSize: 13, color: '#fff' }}>⤢</div>

      {/* Corner accents */}
      <span style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, borderTop: `1.5px solid ${CARAMEL}`, borderLeft: `1.5px solid ${CARAMEL}`, opacity: hov ? 0.9 : 0.25, transition: 'opacity .35s' }} />
      <span style={{ position: 'absolute', bottom: 10, right: 10, width: 20, height: 20, borderBottom: `1.5px solid ${CARAMEL}`, borderRight: `1.5px solid ${CARAMEL}`, opacity: hov ? 0.9 : 0.25, transition: 'opacity .35s' }} />
    </motion.div>
  )
}

/* ═══════════ MAIN ═══════════ */
export default function Gallery() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const [filter, setFilter]     = useState('all')
  const [hovered, setHovered]   = useState(null)
  const [lb, setLb]             = useState([null, 0])   // [index, direction]

  const filtered = filter === 'all' ? IMAGES : IMAGES.filter(i => i.cat === filter)

  const openLightbox = (idx) => setLb([idx, 0])
  const closeLightbox = () => setLb([null, 0])
  const changeFilter = (id) => { setFilter(id); setLb([null, 0]); setHovered(null) }

  return (
    <>
      <section id="gallery" ref={ref} style={{ padding: 'clamp(80px, 11vw, 120px) 0', background: DARK, overflow: 'hidden', position: 'relative' }}>

        <style>{`
          .gal-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.05; z-index: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

          .ghost-word { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
            -webkit-text-stroke: 1px rgba(196,149,106,0.14); color: transparent; user-select: none; pointer-events: none; line-height: 1; }

          .shimmer { background: linear-gradient(100deg, rgba(196,149,106,0.05) 30%, rgba(196,149,106,0.13) 50%, rgba(196,149,106,0.05) 70%); background-size: 200% 100%; animation: shimmer 1.6s infinite; }
          @keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }

          .bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(190px, auto); grid-auto-flow: dense; gap: 12px; }
          .g-lg   { grid-column: span 2; grid-row: span 2; }
          .g-wide { grid-column: span 2; }

          .thumbs::-webkit-scrollbar { height: 4px; }
          .thumbs::-webkit-scrollbar-thumb { background: rgba(196,149,106,0.3); border-radius: 10px; }

          ::selection { background: ${CARAMEL}; color: #fff; }

          @media (max-width: 900px) {
            .bento { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: minmax(170px, auto); }
          }
          @media (max-width: 560px) {
            .bento { grid-template-columns: 1fr !important; }
            .g-lg, .g-wide { grid-column: span 1 !important; grid-row: span 1 !important; }
            .ghost-word { font-size: 5rem !important; }
            .thumbs { display: none !important; }
          }
          @media (prefers-reduced-motion: reduce) {
            .shimmer { animation: none !important; }
          }
        `}</style>

        <div className="gal-grain" />
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 'min(760px, 92vw)', height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,149,106,0.07), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 2 }}>

          {/* ── HEADER ── */}
          <div style={{ position: 'relative', textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 54px)' }}>
            <motion.span className="ghost-word" style={{ position: 'absolute', top: '-0.45em', left: '50%', marginLeft: '-0.5em', fontSize: 'clamp(6rem, 15vw, 12rem)', y: ghostY, whiteSpace: 'nowrap' }}>Gallery</motion.span>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 18, position: 'relative' }}>
              <span style={{ width: 44, height: 1, background: CARAMEL, opacity: 0.5 }} />
              <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>✦ Our Ambiance</span>
              <span style={{ width: 44, height: 1, background: CARAMEL, opacity: 0.5 }} />
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3 }}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 400, lineHeight: 1.12, margin: '0 0 16px', position: 'relative' }}>
              <RevealWords inView={inView} words={[[{ t: 'A Space Crafted' }], [{ t: 'for' }, { t: 'Moments', it: true }]]} />
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
              style={{ color: 'rgba(255,253,249,0.42)', fontSize: 13.5, letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>
              {IMAGES.length} frames · shot inside Veylora · click to explore
            </motion.p>
          </div>

          {/* ── FILTER TABS ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {FILTERS.map(f => {
              const count = f.id === 'all' ? IMAGES.length : IMAGES.filter(i => i.cat === f.id).length
              const isActive = filter === f.id
              return (
                <button key={f.id} onClick={() => changeFilter(f.id)}
                  style={{ position: 'relative', padding: '10px 24px', borderRadius: 50, border: `1px solid ${isActive ? 'transparent' : 'rgba(196,149,106,0.25)'}`,
                    background: 'transparent', color: isActive ? '#fff' : 'rgba(255,253,249,0.55)', fontSize: 12.5, fontWeight: 600,
                    fontFamily: '"DM Sans", sans-serif', letterSpacing: '.06em', cursor: 'pointer', transition: 'color .35s, border-color .35s' }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = CARAMEL; e.currentTarget.style.color = CARAMEL } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(196,149,106,0.25)'; e.currentTarget.style.color = 'rgba(255,253,249,0.55)' } }}>
                  {isActive && <motion.span layoutId="galTabPill" transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(196,149,106,0.16)', borderRadius: 50, border: `1px solid ${CARAMEL}` }} />}
                  <span style={{ position: 'relative', zIndex: 1 }}>{f.label} · {count}</span>
                </button>
              )
            })}
          </motion.div>

          {/* ── BENTO GRID ── */}
          <motion.div layout className="bento">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <Tile key={img.label} img={img} idx={idx} inView={inView}
                  onOpen={openLightbox} hovered={hovered} setHovered={setHovered} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}>
              <span style={{ width: 48, height: 1, background: 'rgba(196,149,106,0.35)' }} />
              <span style={{ color: CARAMEL, fontSize: 11 }}>✦</span>
              <span style={{ width: 48, height: 1, background: 'rgba(196,149,106,0.35)' }} />
            </div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ig-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: CARAMEL, fontSize: 12.5, fontWeight: 700,
                letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(196,149,106,0.35)',
                padding: '13px 32px', borderRadius: 50, transition: 'all .35s cubic-bezier(.22,1,.36,1)', fontFamily: '"DM Sans", sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.background = CARAMEL; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(196,149,106,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = CARAMEL; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              Follow @veylora
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lb[0] !== null && (
          <Lightbox list={filtered} state={lb} setState={setLb} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  )
}