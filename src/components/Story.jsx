import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const CARAMEL = '#C4956A'
const MOCHA   = '#2C1810'

const VALUES = [
  { icon: '🌿', title: 'Farm to Table',    desc: 'We source ingredients daily from local farms and trusted suppliers to ensure peak freshness in every dish.' },
  { icon: '👨‍🍳', title: 'Master Chefs',     desc: 'Our culinary team brings decades of international training and a deep love for authentic flavours.' },
  { icon: '🕯️', title: 'Warm Ambiance',    desc: 'Every corner of Veylora is designed to make you feel at home — elegant yet deeply comfortable.' },
  { icon: '♻️', title: 'Sustainable',      desc: 'We are committed to eco-friendly practices — from packaging to energy use, every choice is intentional.' },
]

export default function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  // Scroll Parallax for immersive depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <section 
      id="story" 
      ref={ref} 
      style={{ 
        padding: 'clamp(100px, 14vw, 160px) 0', 
        background: '#FAF8F4', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Decorative Ambient Glow */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 2 }}>

        {/* Top split */}
        <div 
          className="story-split"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 'clamp(40px, 6vw, 80px)', 
            alignItems: 'center', 
            marginBottom: 'clamp(80px, 10vw, 120px)' 
          }}
        >

          {/* Left — CINEMATIC VIDEO CONTAINER */}
          <motion.div
            style={{ position: 'relative', scale: imageScale }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 30px 60px rgba(44,24,16,0.15)' }}
            >
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92) saturate(1.05)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.4) 0%, transparent 50%)' }} />

              {/* Floating Live Badge inside Video */}
              <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(11, 11, 11, 0.65)', backdropFilter: 'blur(10px)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
                <span style={{ color: '#fff', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>Live Kitchen Experience</span>
              </div>
            </motion.div>

            {/* Floating small image */}
            <motion.div
              className="float"
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
              style={{ 
                position: 'absolute', 
                bottom: -28, 
                right: -28, 
                width: 'clamp(100px, 22vw, 170px)', 
                height: 'clamp(100px, 22vw, 170px)', 
                borderRadius: 20, 
                overflow: 'hidden', 
                border: '5px solid #FAF8F4', 
                boxShadow: '0 20px 40px rgba(44,24,16,0.2)' 
              }}
            >
              <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&q=80" alt="Chef" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Years Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ 
                position: 'absolute', 
                top: 28, 
                left: 'clamp(-12px, -2vw, -24px)', 
                background: CARAMEL, 
                color: '#fff', 
                padding: 'clamp(12px, 2.2vw, 16px) clamp(16px, 2.8vw, 22px)', 
                borderRadius: 16, 
                boxShadow: '0 12px 30px rgba(196,149,106,0.4)' 
              }}
            >
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, lineHeight: 1 }}>12+</p>
              <p style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', letterSpacing: '.15em', textTransform: 'uppercase', marginTop: 4, opacity: 0.9, fontWeight: 600 }}>Years of Legacy</p>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 36, height: 1.5, background: CARAMEL }} />
              <span style={{ fontSize: 12, letterSpacing: '.25em', textTransform: 'uppercase', color: CARAMEL, fontWeight: 700 }}>Our Heritage</span>
            </div>

            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, color: MOCHA, lineHeight: 1.12, marginBottom: 28 }}>
              Born from a <span style={{ fontStyle: 'italic', color: CARAMEL, fontWeight: 600 }}>Passion</span><br />for Honest Flavours
            </h2>

            <p style={{ color: 'rgba(44,24,16,0.65)', fontSize: '15.5px', lineHeight: 1.9, marginBottom: 20 }}>
              Veylora was established with a singular vision — to transform dining into an emotional experience where exceptional ingredients meet heartfelt culinary artistry. What began as an intimate family kitchen has evolved into an iconic destination.
            </p>
            <p style={{ color: 'rgba(44,24,16,0.65)', fontSize: '15.5px', lineHeight: 1.9, marginBottom: 40 }}>
              Our master chefs travel globally to master heritage techniques, returning to craft menus that balance timeless traditions with contemporary innovation. Every single plate narrates a distinct tale of dedication.
            </p>

            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 36px)', paddingTop: 32, borderTop: '1px solid rgba(196,149,106,0.25)', flexWrap: 'wrap' }}>
              {[['200+', 'Dishes Crafted'], ['50K+', 'Happy Guests'], ['3', 'Global Awards']].map(([n, l], idx) => (
                <motion.div 
                  key={l}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + (idx * 0.15), duration: 0.6 }}
                >
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: CARAMEL, lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: '11.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(44,24,16,0.5)', marginTop: 6, fontWeight: 600 }}>{l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 24 }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (0.1 * i), ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                background: '#FFFDF9', 
                borderRadius: 20, 
                padding: '32px 28px', 
                border: '1px solid rgba(196,149,106,0.16)', 
                boxShadow: '0 10px 30px rgba(44,24,16,0.03)',
                transition: 'all .4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderColor = CARAMEL; 
                e.currentTarget.style.transform = 'translateY(-6px)'; 
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(196,149,106,0.12)';
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderColor = 'rgba(196,149,106,0.16)'; 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(44,24,16,0.03)';
                e.currentTarget.style.background = '#FFFDF9';
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16, background: 'rgba(196,149,106,0.1)', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}>{v.icon}</div>
              <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '19px', fontWeight: 600, color: MOCHA, marginBottom: 10 }}>{v.title}</h4>
              <p style={{ fontSize: '14px', color: 'rgba(44,24,16,0.6)', lineHeight: 1.75 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .story-split {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}