import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const C = '#C4956A'   // caramel
const M = '#2C1810'   // mocha
const IVORY = '#FFFDF9'
const WARM  = '#FAF8F4'

const CATEGORIES = [
  { id: 'starters', label: 'Starters',  icon: '🥗' },
  { id: 'italian',  label: 'Italian',   icon: '🍝' },
  { id: 'chinese',  label: 'Chinese',   icon: '🥢' },
  { id: 'brownies', label: 'Desserts',  icon: '🍫' },
]

const MENU = {
  starters: [
    { name: 'Bruschetta Al Pomodoro', desc: 'Toasted ciabatta, fresh tomatoes, basil & extra virgin olive oil',        price: 'Rs. 650',  badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=85' },
    { name: 'Crispy Calamari',        desc: 'Lightly battered squid rings with lemon aioli dipping sauce',              price: 'Rs. 890',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=85' },
    { name: 'Soup of the Day',        desc: 'Freshly prepared seasonal soup served with warm artisan bread',            price: 'Rs. 550',  badge: null,         img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=85' },
    { name: 'Mezze Platter',          desc: 'Hummus, tzatziki, olives, pita & stuffed grape leaves',                    price: 'Rs. 1100', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=85' },
    { name: 'Garlic Mushrooms',       desc: 'Button mushrooms in garlic butter, thyme & white wine reduction',      price: 'Rs. 720',  badge: null,         img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=85' },
    { name: 'Stuffed Avocado',        desc: 'Creamy avocado with seasoned crab salad and micro greens',                price: 'Rs. 950',  badge: 'New',        img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=85' },
  ],
  italian: [
    { name: 'Spaghetti Carbonara',    desc: 'Al dente pasta, pancetta, egg yolk, Pecorino Romano, black pepper',        price: 'Rs. 1250', badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=85' },
    { name: 'Penne Arrabbiata',       desc: 'Spicy tomato sauce, garlic, red chillies, fresh basil, Parmigiano',      price: 'Rs. 1050', badge: null,         img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=85' },
    { name: 'Margherita Pizza',       desc: 'San Marzano tomato, fresh mozzarella di bufala, basil, olive oil',        price: 'Rs. 1450', badge: 'Popular',    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=85' },
    { name: 'Risotto Funghi',         desc: 'Arborio rice with wild mushrooms, truffle oil, aged Parmigiano',          price: 'Rs. 1600', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=85' },
    { name: 'Lasagne al Forno',       desc: 'Slow-cooked Bolognese, béchamel, fresh pasta sheets, aged cheese',        price: 'Rs. 1380', badge: null,         img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=85' },
    { name: 'Tiramisu',               desc: 'Espresso-soaked ladyfingers, mascarpone cream, dark cocoa',               price: 'Rs. 750',  badge: 'New',        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=85' },
  ],
  chinese: [
    { name: 'Dim Sum Basket',         desc: 'Assorted steamed dumplings — prawn, pork & vegetable',                    price: 'Rs. 980',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=85' },
    { name: 'Kung Pao Chicken',       desc: 'Wok-tossed chicken, peanuts, dried chillies, Sichuan peppercorn',      price: 'Rs. 1150', badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&q=85' },
    { name: 'Beef Chow Mein',         desc: 'Stir-fried egg noodles with tender beef, vegetables & soy sauce',      price: 'Rs. 1250', badge: null,         img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=85' },
    { name: 'Honey Garlic Prawns',    desc: 'Jumbo prawns glazed in honey garlic sauce, sesame & spring onion',        price: 'Rs. 1650', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=85' },
    { name: 'Vegetable Fried Rice',   desc: 'Wok-fried jasmine rice, seasonal vegetables, egg & light soy',            price: 'Rs. 850',  badge: null,         img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=85' },
    { name: 'Sweet & Sour Chicken',   desc: 'Crispy chicken in tangy sweet and sour sauce with bell peppers',          price: 'Rs. 1100', badge: 'New',        img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=85' },
  ],
  brownies: [
    { name: 'Classic Fudge Brownie',  desc: 'Rich dark chocolate brownie, gooey centre, vanilla bean ice cream',       price: 'Rs. 650',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=85' },
    { name: 'Nutella Lava Brownie',   desc: 'Warm brownie with molten Nutella centre, whipped cream & hazelnuts',      price: 'Rs. 780',  badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85' },
    { name: 'White Choc Blondie',     desc: 'Buttery white chocolate blondie, macadamia nuts, caramel drizzle',         price: 'Rs. 680',  badge: null,         img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=85' },
    { name: 'Cheesecake Brownie',     desc: 'Marbled cream cheese and chocolate brownie, fresh berry compote',         price: 'Rs. 750',  badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=85' },
    { name: 'Brownie Sundae',         desc: 'Warm brownie, two scoops gelato, hot fudge sauce, candied pecans',        price: 'Rs. 920',  badge: 'New',        img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=85' },
    { name: 'Vegan Dark Brownie',     desc: 'Guilt-free — oat flour, coconut oil, 70% dark cacao, no dairy',           price: 'Rs. 680',  badge: null,         img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=85' },
  ],
}

const BADGE = {
  "Chef's Pick": { bg: 'rgba(196,149,106,0.18)', color: C },
  'Popular':     { bg: 'rgba(180,100,70,0.14)',  color: '#B8714E' },
  'Must Try':    { bg: 'rgba(90,122,88,0.13)',   color: '#4A6E48' },
  'New':         { bg: 'rgba(44,24,16,0.09)',    color: M },
}

// ── FEATURED HERO CARD ──
function FeaturedCard({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="featured-card"
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        minHeight: 380, cursor: 'pointer', gridColumn: 'span 2',
      }}
    >
      <motion.img src={item.img} alt={item.name}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(44,24,16,0.9) 0%, rgba(44,24,16,0.25) 55%, transparent 100%)',
      }}/>
      {item.badge && (
        <div style={{
          position: 'absolute', top: 20, left: 20,
          background: BADGE[item.badge]?.bg,
          color: BADGE[item.badge]?.color,
          fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
          padding: '5px 12px', borderRadius: 50,
          backdropFilter: 'blur(10px)', zIndex: 2
        }}>{item.badge}</div>
      )}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '28px 32px' }}>
        <p style={{ fontSize: 10, letterSpacing: '.18em', color: C, marginBottom: 8, fontWeight: 600 }}>
          FEATURED DISH
        </p>
        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
          color: '#fff', marginBottom: 8, fontWeight: 500, lineHeight: 1.2,
        }}>{item.name}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20, lineHeight: 1.7 }}>
          {item.desc}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 22, fontWeight: 600, color: C,
          }}>{item.price}</span>
          <button
            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: C, color: '#fff', border: 'none',
              padding: '10px 24px', borderRadius: 50,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif', letterSpacing: '.04em',
            }}>
            Order This
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── REGULAR CARD ──
function MenuCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [added,   setAdded]   = useState(false)

  const handleOrder = (e) => {
    e.stopPropagation()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: WARM, borderRadius: 16,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        border: `1px solid ${hovered ? 'rgba(196,149,106,0.35)' : 'rgba(196,149,106,0.12)'}`,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 48px rgba(44,24,16,0.12)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>

      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <motion.img src={item.img} alt={item.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>

        {item.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: BADGE[item.badge]?.bg,
            color: BADGE[item.badge]?.color,
            backdropFilter: 'blur(8px)',
            fontSize: 9, fontWeight: 700, letterSpacing: '.1em',
            padding: '4px 10px', borderRadius: 50,
          }}>{item.badge}</div>
        )}

        {/* Quick add overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(44,24,16,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <motion.button
            animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOrder}
            style={{
              background: added ? '#5A7A58' : '#fff',
              color: added ? '#fff' : M,
              border: 'none', padding: '10px 22px',
              borderRadius: 50, fontSize: 12,
              fontWeight: 700, cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'background 0.3s',
            }}>
            {added ? '✓ Added!' : 'Quick Order'}
          </motion.button>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 17, fontWeight: 500,
            color: M, marginBottom: 7, lineHeight: 1.3,
          }}>{item.name}</h3>
          <p style={{
            fontSize: 13, color: 'rgba(44,24,16,0.52)',
            lineHeight: 1.7, marginBottom: 16,
          }}>{item.desc}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 19, fontWeight: 600, color: C,
          }}>{item.price}</span>
          <button onClick={handleOrder}
            style={{
              background: added ? 'rgba(90,122,88,0.12)' : 'transparent',
              border: `1px solid ${added ? '#5A7A58' : 'rgba(196,149,106,0.35)'}`,
              color: added ? '#5A7A58' : C,
              padding: '7px 16px', borderRadius: 50,
              fontSize: 12, fontWeight: 600,
              fontFamily: '"DM Sans", sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { if (!added) { e.currentTarget.style.background = C; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = C } }}
            onMouseLeave={e => { if (!added) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C; e.currentTarget.style.borderColor = 'rgba(196,149,106,0.35)' } }}>
            {added ? '✓ Ordered' : 'Order →'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active,  setActive]  = useState('starters')
  const [search,  setSearch]  = useState('')
  const [prevCat, setPrevCat] = useState('starters')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const allItems = MENU[active]
  const filtered = search.trim()
    ? allItems.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.desc.toLowerCase().includes(search.toLowerCase())
      )
    : allItems

  const featured  = filtered[0]
  const rest      = filtered.slice(1)

  const changeCategory = (id) => {
    setPrevCat(active)
    setActive(id)
    setSearch('')
  }

  return (
    <section
      id="menu"
      ref={ref}
      style={{ padding: 'clamp(80px, 12vw, 120px) 0', background: IVORY, overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>

        {/* ── HEADER ── */}
        <div className="menu-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(30px, 5vw, 48px)', alignItems: 'flex-end', marginBottom: 'clamp(40px, 7vw, 64px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}>
            <div style={{
              width: 36, height: 2,
              background: C, marginBottom: 22,
            }}/>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 400, color: M,
              lineHeight: 1.15, marginBottom: 0,
            }}>
              A menu crafted<br/>
              <em style={{ fontWeight: 600, color: C }}>with passion</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}>
            <p style={{
              fontSize: '15px', color: 'rgba(44,24,16,0.55)',
              lineHeight: 1.85, marginBottom: 24, maxWidth: 400,
            }}>
              From crispy starters to indulgent desserts — every dish celebrates flavour, freshness, and culinary craft.
            </p>

            {/* Search */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
              <span style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 15, color: 'rgba(196,149,106,0.6)',
                pointerEvents: 'none',
              }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search dishes..."
                style={{
                  width: '100%', paddingLeft: 38, paddingRight: 14,
                  paddingTop: 10, paddingBottom: 10,
                  border: '1.5px solid rgba(196,149,106,0.25)',
                  borderRadius: 50, background: WARM,
                  fontSize: 13, color: M, outline: 'none',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'border-color 0.25s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = C}
                onBlur={e => e.target.style.borderColor = 'rgba(196,149,106,0.25)'}
              />
            </div>
          </motion.div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ display: 'flex', gap: 8, marginBottom: 'clamp(36px, 6vw, 52px)', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => {
            const isActive = active === cat.id
            return (
              <button key={cat.id} onClick={() => changeCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px', borderRadius: 50,
                  border: `1.5px solid ${isActive ? C : 'rgba(196,149,106,0.22)'}`,
                  background: isActive ? M : 'transparent',
                  color: isActive ? '#fff' : 'rgba(44,24,16,0.6)',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: '"DM Sans", sans-serif',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = C; e.currentTarget.style.color = C } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(196,149,106,0.22)'; e.currentTarget.style.color = 'rgba(44,24,16,0.6)' } }}>
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* ── GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(44,24,16,0.4)', fontSize: 15 }}>
                No dishes match "{search}" — try something else 🍽️
              </div>
            ) : (
              <div className="menu-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}>
                {/* Featured — spans 2 cols on wide screens */}
                {featured && !search && (
                  <FeaturedCard item={featured} />
                )}

                {/* Rest of items */}
                {(search ? filtered : rest).map((item, i) => (
                  <MenuCard key={item.name} item={item} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── FOOTER NOTE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: 'clamp(40px, 7vw, 56px)', paddingTop: 32,
            borderTop: '1px solid rgba(196,149,106,0.14)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
          <p style={{ fontSize: 13, color: 'rgba(44,24,16,0.38)', letterSpacing: '.03em' }}>
            All dishes prepared fresh daily · Allergen info available on request
          </p>
          <button
            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: M, color: '#fff',
              border: 'none', padding: '11px 28px',
              borderRadius: 50, fontSize: 13,
              fontWeight: 600, cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Reserve a Table
          </button>
        </motion.div>
      </div>

      {/* ✅ Responsive CSS Media Query */}
      <style>{`
        @media (max-width: 900px) {
          .menu-header-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .featured-card {
            grid-column: span 1 !important;
            min-height: 320px !important;
          }
        }
      `}</style>
    </section>
  )
}