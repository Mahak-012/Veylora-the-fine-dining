import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Home',        id: 'home'        },
  { label: 'Menu',        id: 'menu'        },
  { label: 'Our Story',   id: 'story'       },
  { label: 'Gallery',     id: 'gallery'     },
  { label: 'Reservation', id: 'reservation' },
]

const CARAMEL = '#C4956A'
const MOCHA   = '#2C1810'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [isMobile, setIsMobile] = useState(false)

  // Screen resize detect karne ke liye taake burger sirf choti screens par aaye
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setOpen(false) // Badi screen hone par mobile menu close kar do
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      LINKS.forEach(l => {
        const el = document.getElementById(l.id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 100 && bottom >= 100) setActive(l.id)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(250, 248, 244, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(196, 149, 106, 0.15)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px rgba(44, 24, 16, 0.04)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ 
          maxWidth: 1280, 
          margin: '0 auto', 
          padding: '0 24px', 
          height: scrolled ? 70 : 86, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          transition: 'height 0.4s ease'
        }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              padding: 0
            }}
          >
            <span style={{ 
              fontFamily: '"Playfair Display", serif', 
              fontSize: '1.7rem', 
              fontWeight: 600, 
              color: MOCHA, 
              lineHeight: 1, 
              letterSpacing: '.02em' 
            }}>
              Veylora
            </span>
            <span style={{ 
              fontSize: 9.5, 
              letterSpacing: '.3em', 
              textTransform: 'uppercase', 
              color: CARAMEL, 
              fontWeight: 600, 
              marginTop: 3 
            }}>
              Fine Dining
            </span>
          </button>

          {/* Desktop Links (Sirf bari screen par dikhenge) */}
          <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 4 }}>
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px 18px', 
                  borderRadius: 30,
                  fontSize: 14, 
                  fontWeight: 500,
                  color: active === l.id ? CARAMEL : 'rgba(44, 24, 16, 0.65)',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => e.currentTarget.style.color = CARAMEL}
                onMouseLeave={e => e.currentTarget.style.color = active === l.id ? CARAMEL : 'rgba(44, 24, 16, 0.65)'}
              >
                {l.label}
                {active === l.id && (
                  <motion.span 
                    layoutId="activeIndicator"
                    style={{ 
                      position: 'absolute', 
                      bottom: 2, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      width: 16, 
                      height: 2, 
                      borderRadius: 2, 
                      background: CARAMEL 
                    }} 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo('reservation')}
              style={{
                background: `linear-gradient(135deg, ${CARAMEL} 0%, #b38257 100%)`,
                color: '#fff', 
                border: 'none',
                padding: '11px 26px', 
                borderRadius: 50,
                fontSize: 13.5, 
                fontWeight: 600, 
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '.04em', 
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(196,149,106,0.3)',
              }}
            >
              Reserve a Table
            </motion.button>
          </div>

          {/* Hamburger Button (Sirf choti/mobile screen par dikhega) */}
          {isMobile && (
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle Menu"
              style={{ 
                background: 'rgba(196, 149, 106, 0.1)', 
                border: '1px solid rgba(196, 149, 106, 0.2)', 
                cursor: 'pointer', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                width: 44,
                height: 44,
                borderRadius: '50%',
                gap: 5, 
                padding: 0,
                zIndex: 110
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', 
                  height: 1.5, 
                  borderRadius: 2,
                  background: MOCHA, 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: i === 1 ? 14 : 20,
                  transform: open && i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' :
                             open && i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', 
              top: scrolled ? 70 : 86, 
              left: 0, 
              right: 0, 
              zIndex: 95,
              background: 'rgba(250, 248, 244, 0.98)', 
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(196,149,106,0.15)',
              padding: '24px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: 8,
            }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: active === l.id ? 'rgba(196,149,106,0.1)' : 'transparent',
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '12px 16px', 
                  borderRadius: 10, 
                  textAlign: 'left',
                  fontSize: 16, 
                  fontWeight: 500,
                  color: active === l.id ? CARAMEL : MOCHA,
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {l.label}
              </motion.button>
            ))}
            
            <button
              onClick={() => scrollTo('reservation')}
              style={{
                background: CARAMEL, 
                color: '#fff', 
                border: 'none',
                padding: '14px', 
                borderRadius: 50, 
                marginTop: 12,
                fontSize: 14, 
                fontWeight: 600, 
                fontFamily: '"DM Sans", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(196,149,106,0.3)',
              }}
            >
              Reserve a Table ✦
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 86 }} />
    </>
  )
}