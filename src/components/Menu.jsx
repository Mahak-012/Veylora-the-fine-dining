import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const C = '#C4956A'   // caramel
const M = '#2C1810'   // mocha
const IVORY = '#FFFDF9'
const WARM  = '#FAF8F4'
const WA_GREEN = '#25D366'
const EASE = [0.22, 1, 0.36, 1]

/* ═══════════════════════════════════════════════════
   ⚠️ APNA WHATSAPP NUMBER YAHAN DALEIN
   Format: country code + number, bina + aur spaces ke
   ═══════════════════════════════════════════════════ */
const WHATSAPP_NUMBER = '923001234567'

// ── WhatsApp helpers ──
const priceOf = (p) => parseInt(String(p).replace(/\D/g, ''), 10) || 0
const fmt     = (n) => 'Rs. ' + n.toLocaleString('en-US')
const waLink  = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const waLinkForItem = (item, qty = 1) =>
  waLink(`🍽️ *New Order — Veylora*\n\n1. ${item.name} × ${qty}\n   ${fmt(priceOf(item.price) * qty)}\n\nPlease confirm my order. Thank you! 🙏`)

function WaIcon({ size = 14, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'block' }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── Ornamental divider ──
function Ornament({ color = 'rgba(196,149,106,0.4)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
      <span style={{ width: 48, height: 1, background: color }} />
      <span style={{ color: C, fontSize: 11 }}>✦</span>
      <span style={{ width: 48, height: 1, background: color }} />
    </div>
  )
}

const CATEGORIES = [
  { id: 'starters', label: 'Starters',  icon: '🥗' },
  { id: 'italian',  label: 'Italian',   icon: '🍝' },
  { id: 'chinese',  label: 'Chinese',   icon: '🥢' },
  { id: 'brownies', label: 'Desserts',  icon: '🍫' },
]

const MENU = {
  starters: [
    { name: 'Bruschetta Al Pomodoro', desc: 'Toasted ciabatta, fresh tomatoes, basil & extra virgin olive oil', price: 'Rs. 650',  badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=85' },
    { name: 'Crispy Calamari',        desc: 'Lightly battered squid rings with lemon aioli dipping sauce',      price: 'Rs. 890',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=85' },
    { name: 'Soup of the Day',        desc: 'Freshly prepared seasonal soup served with warm artisan bread',    price: 'Rs. 550',  badge: null,         img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=85' },
    { name: 'Mezze Platter',          desc: 'Hummus, tzatziki, olives, pita & stuffed grape leaves',            price: 'Rs. 1100', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=85' },
    { name: 'Garlic Mushrooms',       desc: 'Button mushrooms in garlic butter, thyme & white wine reduction',  price: 'Rs. 720',  badge: null,         img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=85' },
    { name: 'Stuffed Avocado',        desc: 'Creamy avocado with seasoned crab salad and micro greens',         price: 'Rs. 950',  badge: 'New',        img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=85' },
  ],
  italian: [
    { name: 'Spaghetti Carbonara',    desc: 'Al dente pasta, pancetta, egg yolk, Pecorino Romano, black pepper', price: 'Rs. 1250', badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=85' },
    { name: 'Penne Arrabbiata',       desc: 'Spicy tomato sauce, garlic, red chillies, fresh basil, Parmigiano', price: 'Rs. 1050', badge: null,         img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=85' },
    { name: 'Margherita Pizza',       desc: 'San Marzano tomato, fresh mozzarella di bufala, basil, olive oil',  price: 'Rs. 1450', badge: 'Popular',    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85' },
    { name: 'Risotto Funghi',         desc: 'Arborio rice with wild mushrooms, truffle oil, aged Parmigiano',    price: 'Rs. 1600', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=85' },
    { name: 'Lasagne al Forno',       desc: 'Slow-cooked Bolognese, béchamel, fresh pasta sheets, aged cheese',  price: 'Rs. 1380', badge: null,         img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=85' },
    { name: 'Tiramisu',               desc: 'Espresso-soaked ladyfingers, mascarpone cream, dark cocoa',         price: 'Rs. 750',  badge: 'New',        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=85' },
  ],
  chinese: [
    { name: 'Dim Sum Basket',         desc: 'Assorted steamed dumplings — prawn, pork & vegetable',              price: 'Rs. 980',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=85' },
    { name: 'Kung Pao Chicken',       desc: 'Wok-tossed chicken, peanuts, dried chillies, Sichuan peppercorn',   price: 'Rs. 1150', badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=85' },
    { name: 'Beef Chow Mein',         desc: 'Stir-fried egg noodles with tender beef, vegetables & soy sauce',   price: 'Rs. 1250', badge: null,         img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=85' },
    { name: 'Honey Garlic Prawns',    desc: 'Jumbo prawns glazed in honey garlic sauce, sesame & spring onion',  price: 'Rs. 1650', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=85' },
    { name: 'Vegetable Fried Rice',   desc: 'Wok-fried jasmine rice, seasonal vegetables, egg & light soy',      price: 'Rs. 850',  badge: null,         img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=85' },
    { name: 'Sweet & Sour Chicken',   desc: 'Crispy chicken in tangy sweet and sour sauce with bell peppers',    price: 'Rs. 1100', badge: 'New',        img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=85' },
  ],
  brownies: [
    { name: 'Classic Fudge Brownie',  desc: 'Rich dark chocolate brownie, gooey centre, vanilla bean ice cream', price: 'Rs. 650',  badge: 'Popular',    img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=85' },
    { name: 'Nutella Lava Brownie',   desc: 'Warm brownie with molten Nutella centre, whipped cream & hazelnuts', price: 'Rs. 780', badge: 'Must Try',   img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85' },
    { name: 'White Choc Blondie',     desc: 'Buttery white chocolate blondie, macadamia nuts, caramel drizzle',  price: 'Rs. 680',  badge: null,         img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=85' },
    { name: 'Cheesecake Brownie',     desc: 'Marbled cream cheese and chocolate brownie, fresh berry compote',   price: 'Rs. 750',  badge: "Chef's Pick", img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=85' },
    { name: 'Brownie Sundae',         desc: 'Warm brownie, two scoops gelato, hot fudge sauce, candied pecans',  price: 'Rs. 920',  badge: 'New',        img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=85' },
    { name: 'Vegan Dark Brownie',     desc: 'Guilt-free — oat flour, coconut oil, 70% dark cacao, no dairy',     price: 'Rs. 680',  badge: null,         img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=85' },
  ],
}

const BADGE = {
  "Chef's Pick": { bg: 'rgba(196,149,106,0.92)', color: '#fff' },
  'Popular':     { bg: 'rgba(184,113,78,0.92)',  color: '#fff' },
  'Must Try':    { bg: 'rgba(74,110,72,0.92)',   color: '#fff' },
  'New':         { bg: 'rgba(44,24,16,0.88)',    color: '#fff' },
}

// ── MARQUEE STRIP ──
function MarqueeStrip() {
  const items = ['Fine Dining', 'Fresh Ingredients', 'Master Chefs', 'Signature Cocktails', 'Private Dining', 'Est. 2012']
  const Row = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 48, paddingRight: 48, flexShrink: 0 }}>
      {items.map((t, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(196,149,106,0.85)', fontWeight: 500, fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap' }}>{t}</span>
          <span style={{ color: 'rgba(196,149,106,0.4)', fontSize: 10 }}>✦</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee-strip" style={{ overflow: 'hidden', padding: '16px 0', borderTop: '1px solid rgba(196,149,106,0.15)', borderBottom: '1px solid rgba(196,149,106,0.15)', background: 'rgba(44,24,16,0.025)' }}>
      <div className="marquee-track">
        <Row /><Row />
      </div>
    </div>
  )
}

// ── CART DRAWER ──
function CartDrawer({ open, onClose, cart, changeQty, removeItem, clearCart }) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  const entries = Object.values(cart)
  const total   = entries.reduce((s, e) => s + priceOf(e.item.price) * e.qty, 0)
  const count   = entries.reduce((s, e) => s + e.qty, 0)

  const sendOrder = () => {
    if (entries.length === 0) return
    const lines = entries.map((e, i) => `${i + 1}. ${e.item.name} × ${e.qty}\n   ${fmt(priceOf(e.item.price) * e.qty)}`)
    let msg = `🍽️ *New Order — Veylora*\n\n${lines.join('\n')}\n\n*Total: ${fmt(total)}*`
    if (name.trim()) msg += `\n\n👤 Name: ${name.trim()}`
    msg += `\n📦 Pickup / Delivery:`
    if (note.trim()) msg += `\n📝 Note: ${note.trim()}`
    msg += `\n\nPlease confirm my order. Thank you! 🙏`
    window.open(waLink(msg), '_blank')
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,13,8,0.6)', backdropFilter: 'blur(6px)', zIndex: 998 }}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(430px, 100vw)', background: IVORY,
              zIndex: 999, display: 'flex', flexDirection: 'column',
              boxShadow: '-24px 0 80px rgba(44,24,16,0.3)',
            }}>

            {/* Header */}
            <div style={{ padding: '26px 28px 22px', borderBottom: '1px solid rgba(196,149,106,0.15)', position: 'relative' }}>
              <button onClick={onClose}
                style={{ position: 'absolute', top: 24, right: 24, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(196,149,106,0.3)', background: 'transparent', color: M, fontSize: 15, cursor: 'pointer', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = M; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'rotate(90deg)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = M; e.currentTarget.style.transform = 'rotate(0deg)' }}>✕</button>

              <p style={{ fontSize: 10, letterSpacing: '.28em', color: C, fontWeight: 700, marginBottom: 8, fontFamily: '"DM Sans", sans-serif' }}>✦ YOUR ORDER</p>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 26, color: M, margin: 0, fontWeight: 500, lineHeight: 1.2 }}>
                {count > 0 ? (<>{count} <em style={{ color: C }}>delicious</em> item{count > 1 ? 's' : ''}</>) : 'Your Order'}
              </h3>
            </div>

            {/* Items */}
            <div className="cart-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 28px' }}>
              {entries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '70px 16px' }}>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 44, color: 'rgba(196,149,106,0.25)', margin: '0 0 16px' }}>✦</p>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 19, color: M, marginBottom: 10 }}>Nothing here yet</p>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(44,24,16,0.45)' }}>
                    Add dishes from the menu, then send<br/>your order instantly on WhatsApp
                  </p>
                </div>
              ) : entries.map(e => (
                <motion.div layout key={e.item.name}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(196,149,106,0.12)' }}>
                  <img src={e.item.img} alt={e.item.name}
                    style={{ width: 60, height: 60, borderRadius: 14, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(196,149,106,0.18)' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 14.5, color: M, margin: '0 0 4px', fontWeight: 500 }}>{e.item.name}</p>
                    <p style={{ fontSize: 13.5, color: C, fontWeight: 600, margin: 0 }}>{fmt(priceOf(e.item.price) * e.qty)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: WARM, borderRadius: 50, padding: '4px 8px', border: '1px solid rgba(196,149,106,0.15)' }}>
                    <button onClick={() => changeQty(e.item.name, -1)}
                      style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'transparent', color: M, fontSize: 15, cursor: 'pointer', lineHeight: 1, transition: 'all .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,149,106,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 700, color: M, minWidth: 16, textAlign: 'center', fontFamily: '"DM Sans", sans-serif' }}>{e.qty}</span>
                    <button onClick={() => changeQty(e.item.name, +1)}
                      style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: 'transparent', color: M, fontSize: 15, cursor: 'pointer', lineHeight: 1, transition: 'all .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,149,106,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>+</button>
                  </div>
                  <button onClick={() => removeItem(e.item.name)} title="Remove"
                    style={{ background: 'transparent', border: 'none', color: 'rgba(44,24,16,0.25)', cursor: 'pointer', fontSize: 14, padding: 4, flexShrink: 0, transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#B85C4A'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(44,24,16,0.25)'}>✕</button>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            {entries.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                style={{ padding: '20px 28px 24px', borderTop: '1px solid rgba(196,149,106,0.15)', background: WARM }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                    style={{ flex: 1, padding: '12px 15px', borderRadius: 12, border: '1.5px solid rgba(196,149,106,0.25)', background: '#fff', fontSize: 13, color: M, outline: 'none', fontFamily: '"DM Sans", sans-serif', boxSizing: 'border-box', transition: 'border-color .25s' }}
                    onFocus={e => e.target.style.borderColor = C} onBlur={e => e.target.style.borderColor = 'rgba(196,149,106,0.25)'} />
                  <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (spice, etc.)"
                    style={{ flex: 1, padding: '12px 15px', borderRadius: 12, border: '1.5px solid rgba(196,149,106,0.25)', background: '#fff', fontSize: 13, color: M, outline: 'none', fontFamily: '"DM Sans", sans-serif', boxSizing: 'border-box', transition: 'border-color .25s' }}
                    onFocus={e => e.target.style.borderColor = C} onBlur={e => e.target.style.borderColor = 'rgba(196,149,106,0.25)'} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingTop: 14, borderTop: '1px dashed rgba(196,149,106,0.35)' }}>
                  <span style={{ fontSize: 11, letterSpacing: '.22em', color: 'rgba(44,24,16,0.5)', textTransform: 'uppercase', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}>Total</span>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 600, color: M }}>
                    <span style={{ fontSize: 15, color: C, verticalAlign: 'super', marginRight: 2 }}>Rs.</span>
                    {total.toLocaleString('en-US')}
                  </span>
                </div>

                <motion.button onClick={sendOrder} whileTap={{ scale: 0.97 }}
                  className="wa-shine"
                  style={{
                    width: '100%', background: WA_GREEN, color: '#fff', border: 'none',
                    padding: '16px', borderRadius: 14, fontSize: 14.5, fontWeight: 700,
                    fontFamily: '"DM Sans", sans-serif', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: '0 10px 30px rgba(37,211,102,0.35)', letterSpacing: '.02em', position: 'relative', overflow: 'hidden',
                  }}>
                  <WaIcon size={17} />
                  Send Order on WhatsApp
                </motion.button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                  <p style={{ fontSize: 10.5, color: 'rgba(44,24,16,0.35)', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Opens in WhatsApp — just press send ✓</p>
                  <button onClick={clearCart}
                    style={{ background: 'transparent', border: 'none', fontSize: 11, color: 'rgba(44,24,16,0.4)', cursor: 'pointer', textDecoration: 'underline', fontFamily: '"DM Sans", sans-serif' }}>Clear all</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── FEATURED CARD ──
function FeaturedCard({ item, onAdd, added }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="featured-card"
      style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', minHeight: 400, cursor: 'pointer', gridColumn: 'span 2', boxShadow: hovered ? '0 30px 70px rgba(44,24,16,0.22)' : '0 12px 40px rgba(44,24,16,0.1)', transition: 'box-shadow .5s cubic-bezier(.22,1,.36,1)' }}
    >
      <motion.img src={item.img} alt={item.name}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,13,8,0.92) 0%, rgba(26,13,8,0.35) 50%, rgba(26,13,8,0.05) 100%)' }}/>

      {/* Hover frame */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, inset: hovered ? 16 : 26 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ position: 'absolute', border: '1px solid rgba(255,253,249,0.35)', borderRadius: 12, zIndex: 3, pointerEvents: 'none' }}
      />

      {item.badge && (
        <div style={{ position: 'absolute', top: 22, left: 22, background: BADGE[item.badge]?.bg, color: BADGE[item.badge]?.color, fontSize: 10, fontWeight: 700, letterSpacing: '.14em', padding: '6px 14px', borderRadius: 50, backdropFilter: 'blur(10px)', zIndex: 4, fontFamily: '"DM Sans", sans-serif' }}>✦ {item.badge.toUpperCase()}</div>
      )}

      {/* Ghost number */}
      <span style={{ position: 'absolute', top: 10, right: 28, fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 110, color: 'rgba(255,253,249,0.08)', lineHeight: 1, zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}>01</span>

      <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 36px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ width: 32, height: 1, background: C }} />
          <p style={{ fontSize: 10, letterSpacing: '.28em', color: C, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>CHEF'S SIGNATURE</p>
        </div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', color: IVORY, marginBottom: 10, fontWeight: 500, lineHeight: 1.15, fontStyle: 'italic' }}>{item.name}</h3>
        <p style={{ fontSize: 13.5, color: 'rgba(255,253,249,0.68)', marginBottom: 24, lineHeight: 1.75, maxWidth: 420 }}>{item.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 600, color: C, marginRight: 8 }}>
            <span style={{ fontSize: 13, verticalAlign: 'super', opacity: 0.8 }}>Rs.</span> {priceOf(item.price).toLocaleString('en-US')}
          </span>
          <button onClick={() => onAdd(item)}
            style={{
              background: added ? '#5A7A58' : C, color: '#fff', border: 'none',
              padding: '11px 26px', borderRadius: 50, fontSize: 12.5, fontWeight: 700,
              cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', letterSpacing: '.05em',
              transition: 'background .3s, transform .25s', boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            {added ? '✓ Added to Order' : 'Add to Order'}
          </button>
          <a href={waLinkForItem(item)} target="_blank" rel="noopener noreferrer" title="Order on WhatsApp"
            style={{ width: 40, height: 40, borderRadius: '50%', background: WA_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(37,211,102,0.4)', transition: 'transform .25s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12) rotate(8deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
            <WaIcon size={17} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── REGULAR CARD ──
function MenuCard({ item, index, onAdd, added, inCart }) {
  const [hovered, setHovered] = useState(false)

  const handleAdd = (e) => { e.stopPropagation(); onAdd(item) }

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative',
        border: `1px solid ${inCart ? 'rgba(196,149,106,0.5)' : 'rgba(196,149,106,0.14)'}`,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 26px 60px rgba(44,24,16,0.14)' : '0 4px 20px rgba(44,24,16,0.05)',
        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}>

      {/* Top accent line */}
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, ${C}, rgba(196,149,106,0.4))`, transform: hovered || inCart ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .55s cubic-bezier(.22,1,.36,1)', zIndex: 3 }} />

      {/* Image */}
      <div style={{ height: 215, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <motion.img src={item.img} alt={item.name}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>

        {/* Inner photo frame on hover */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, inset: hovered ? 12 : 22 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ position: 'absolute', border: '1px solid rgba(255,253,249,0.5)', borderRadius: 8, pointerEvents: 'none' }}
        />

        {item.badge && (
          <div style={{ position: 'absolute', top: 14, left: 14, background: BADGE[item.badge]?.bg, color: BADGE[item.badge]?.color, backdropFilter: 'blur(8px)', fontSize: 9, fontWeight: 700, letterSpacing: '.12em', padding: '5px 12px', borderRadius: 50, fontFamily: '"DM Sans", sans-serif' }}>✦ {item.badge.toUpperCase()}</div>
        )}

        {inCart > 0 && (
          <motion.div key="incart" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
            style={{ position: 'absolute', top: 14, right: 14, background: C, color: '#fff', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, boxShadow: '0 4px 12px rgba(44,24,16,0.35)', border: '2px solid #fff', fontFamily: '"DM Sans", sans-serif' }}>
            {inCart}
          </motion.div>
        )}

        {/* Quick add overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,13,8,0.55), rgba(26,13,8,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, pointerEvents: hovered ? 'auto' : 'none' }}>
          <motion.button
            animate={{ scale: hovered ? 1 : 0.8, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={handleAdd}
            style={{ background: 'rgba(255,253,249,0.95)', color: M, border: 'none', padding: '11px 24px', borderRadius: 50, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', letterSpacing: '.04em', backdropFilter: 'blur(6px)' }}>
            + Add to Order
          </motion.button>
          <motion.a
            animate={{ scale: hovered ? 1 : 0.8, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.35, delay: 0.06, ease: EASE }}
            href={waLinkForItem(item)} target="_blank" rel="noopener noreferrer" title="Direct WhatsApp order"
            style={{ width: 40, height: 40, borderRadius: '50%', background: WA_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
            <WaIcon size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 17.5, fontWeight: 500, color: M, marginBottom: 8, lineHeight: 1.3 }}>{item.name}</h3>
          <p style={{
            fontSize: 12.5, color: 'rgba(44,24,16,0.5)', lineHeight: 1.7, marginBottom: 18,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{item.desc}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px dashed rgba(196,149,106,0.3)' }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: 600, color: C }}>
            <span style={{ fontSize: 11.5, verticalAlign: 'super', opacity: 0.75, marginRight: 1 }}>Rs.</span> {priceOf(item.price).toLocaleString('en-US')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={waLinkForItem(item)} target="_blank" rel="noopener noreferrer" title="Order directly on WhatsApp"
              style={{ width: 33, height: 33, borderRadius: '50%', background: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = WA_GREEN; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.querySelector('svg path').setAttribute('fill', '#fff') }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.querySelector('svg path').setAttribute('fill', WA_GREEN) }}>
              <WaIcon size={13} color={WA_GREEN} />
            </a>
            <button onClick={handleAdd}
              style={{
                background: added ? 'rgba(90,122,88,0.12)' : 'transparent',
                border: `1px solid ${added ? '#5A7A58' : 'rgba(196,149,106,0.4)'}`,
                color: added ? '#5A7A58' : C,
                padding: '8px 18px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.35s cubic-bezier(.22,1,.36,1)', letterSpacing: '.03em',
              }}
              onMouseEnter={e => { if (!added) { e.currentTarget.style.background = M; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = M } }}
              onMouseLeave={e => { if (!added) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C; e.currentTarget.style.borderColor = 'rgba(196,149,106,0.4)' } }}>
              {added ? '✓ Added' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ═══════════ MAIN ═══════════
export default function Menu() {
  const [active, setActive] = useState('starters')
  const [search, setSearch] = useState('')
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [cart, setCart]           = useState({})
  const [cartOpen, setCartOpen]   = useState(false)
  const [toast, setToast]         = useState(null)
  const [addedName, setAddedName] = useState(null)
  const toastTimer = useRef(null)
  const addedTimer = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (item) => {
    setCart(c => ({ ...c, [item.name]: { item, qty: (c[item.name]?.qty || 0) + 1 } }))
    showToast(`✓ ${item.name} added to your order`)
    setAddedName(item.name)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setAddedName(null), 1500)
  }

  const changeQty = (name, delta) => setCart(c => {
    const next = { ...c }
    if (!next[name]) return next
    next[name] = { ...next[name], qty: next[name].qty + delta }
    if (next[name].qty <= 0) delete next[name]
    return next
  })

  const removeItem = (name) => setCart(c => { const n = { ...c }; delete n[name]; return n })
  const clearCart  = () => setCart({})

  const cartCount = Object.values(cart).reduce((s, e) => s + e.qty, 0)

  const allItems = MENU[active]
  const filtered = search.trim()
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    : allItems

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <section id="menu" ref={ref}
      style={{ padding: 'clamp(90px, 12vw, 130px) 0 0', background: IVORY, overflow: 'hidden', position: 'relative' }}>

      <style>{`
        /* Section grain */
        .menu-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.035; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        /* Marquee */
        .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
        .marquee-strip:hover .marquee-track { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        /* Ghost outlined text */
        .ghost-word {
          font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(196,149,106,0.16); color: transparent;
          user-select: none; pointer-events: none; line-height: 1;
        }

        /* WA button shine */
        .wa-shine::after { content: ''; position: absolute; top: 0; left: -80%; width: 45%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg); animation: washine 3s ease infinite; }
        @keyframes washine { 0%, 60% { left: -80% } 100% { left: 140% } }

        /* Cart pulse ring */
        .cart-fab::before { content: ''; position: absolute; inset: -5px; border-radius: 50%;
          border: 1.5px solid rgba(196,149,106,0.5); animation: cartpulse 2.4s ease-out infinite; }
        @keyframes cartpulse { 0% { transform: scale(0.92); opacity: 0.9 } 100% { transform: scale(1.35); opacity: 0 } }

        /* Thin caramel scrollbar */
        .cart-scroll::-webkit-scrollbar { width: 5px; }
        .cart-scroll::-webkit-scrollbar-track { background: transparent; }
        .cart-scroll::-webkit-scrollbar-thumb { background: rgba(196,149,106,0.3); border-radius: 10px; }

        ::selection { background: ${C}; color: #fff; }

        @media (max-width: 900px) {
          .menu-header-grid { grid-template-columns: 1fr !important; gap: 26px !important; }
          .featured-card { grid-column: span 1 !important; min-height: 330px !important; }
          .ghost-word { font-size: 5.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

      <div className="menu-grain" />

      {/* ═══ FLOATING CART FAB ═══ */}
      <motion.button
        onClick={() => setCartOpen(true)}
        className="cart-fab"
        initial={false}
        animate={{ scale: cartCount > 0 ? 1 : 0, opacity: cartCount > 0 ? 1 : 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', damping: 16, stiffness: 300 }}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 500,
          width: 62, height: 62, borderRadius: '50%', border: 'none',
          background: `linear-gradient(135deg, ${M}, #4a2c1a)`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 14px 40px rgba(44,24,16,0.45)',
          pointerEvents: cartCount > 0 ? 'auto' : 'none',
        }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {cartCount > 0 && (
          <motion.span key={cartCount}
            initial={{ scale: 0.3 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 9 }}
            style={{ position: 'absolute', top: -3, right: -3, background: C, color: '#fff', fontSize: 11.5, fontWeight: 700, minWidth: 23, height: 23, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', border: '2.5px solid #FFFDF9', fontFamily: '"DM Sans", sans-serif' }}>
            {cartCount}
          </motion.span>
        )}
      </motion.button>

      {/* ═══ TOAST ═══ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', marginLeft: -140, width: 280,
              zIndex: 600, background: M, color: IVORY, padding: '13px 22px',
              borderRadius: 14, fontSize: 12.5, fontWeight: 600, textAlign: 'center',
              fontFamily: '"DM Sans", sans-serif', boxShadow: '0 14px 40px rgba(44,24,16,0.4)',
              border: '1px solid rgba(196,149,106,0.3)',
            }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ CART DRAWER ═══ */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} changeQty={changeQty} removeItem={removeItem} clearCart={clearCart} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER — editorial style ── */}
        <div style={{ position: 'relative', marginBottom: 'clamp(36px, 5vw, 52px)' }}>
          {/* Ghost word */}
          <span className="ghost-word" style={{ position: 'absolute', top: '-0.35em', right: '-0.1em', fontSize: 'clamp(7rem, 16vw, 13rem)' }}>Menu</span>

          <div className="menu-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(30px, 5vw, 56px)', alignItems: 'flex-end', position: 'relative' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: EASE }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <span style={{ width: 44, height: 1, background: C }} />
                <span style={{ fontSize: 11, letterSpacing: '.3em', color: C, fontWeight: 700, textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>✦ Our Menu</span>
              </div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 400, color: M, lineHeight: 1.08, margin: 0, letterSpacing: '-0.01em' }}>
                Taste the<br />
                <em style={{ fontWeight: 600, color: C }}>Extraordinary</em>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease: EASE }}>
              <p style={{ fontSize: 15, color: 'rgba(44,24,16,0.55)', lineHeight: 1.85, marginBottom: 26, maxWidth: 400 }}>
                From crispy starters to indulgent desserts — every dish celebrates flavour, freshness, and culinary craft.
              </p>

              {/* Underline search */}
              <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
                <span style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: 'rgba(196,149,106,0.55)', pointerEvents: 'none' }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search dishes..."
                  style={{
                    width: '100%', paddingLeft: 30, paddingRight: 8, paddingTop: 10, paddingBottom: 12,
                    border: 'none', borderBottom: '1.5px solid rgba(196,149,106,0.3)',
                    background: 'transparent', fontSize: 14, color: M, outline: 'none',
                    fontFamily: '"DM Sans", sans-serif', transition: 'border-color 0.3s', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = C}
                  onBlur={e => e.target.style.borderColor = 'rgba(196,149,106,0.3)'}
                />
                <span style={{ position: 'absolute', bottom: -1.5, left: 0, width: search ? '100%' : 0, height: 1.5, background: C, transition: 'width .4s cubic-bezier(.22,1,.36,1)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FULL-BLEED MARQUEE ── */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.3 }}>
        <MarqueeStrip />
      </motion.div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>

        {/* ── CATEGORY TABS — sliding indicator ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          style={{ display: 'flex', gap: 10, marginTop: 'clamp(36px, 5vw, 54px)', marginBottom: 'clamp(38px, 6vw, 56px)', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => {
            const isActive = active === cat.id
            return (
              <button key={cat.id} onClick={() => { setActive(cat.id); setSearch('') }}
                style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: 9,
                  padding: '12px 26px', borderRadius: 50, border: `1px solid ${isActive ? 'transparent' : 'rgba(196,149,106,0.25)'}`,
                  background: 'transparent', color: isActive ? '#fff' : 'rgba(44,24,16,0.6)',
                  fontSize: 13.5, fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
                  cursor: 'pointer', transition: 'color .35s, border-color .35s', overflow: 'hidden',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = C; e.currentTarget.style.color = C } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(196,149,106,0.25)'; e.currentTarget.style.color = 'rgba(44,24,16,0.6)' } }}>
                {isActive && (
                  <motion.span layoutId="menuTabPill"
                    transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                    style={{ position: 'absolute', inset: 0, background: M, borderRadius: 50, border: `1px solid ${C}` }} />
                )}
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span>{cat.icon}</span>
                  {cat.label}
                  <span style={{ fontSize: 10, fontWeight: 700, background: isActive ? 'rgba(196,149,106,0.3)' : 'rgba(196,149,106,0.12)', color: isActive ? C : 'rgba(44,24,16,0.45)', padding: '2px 8px', borderRadius: 20, fontFamily: '"DM Sans", sans-serif', transition: 'all .3s' }}>
                    {MENU[cat.id].length}
                  </span>
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* ── GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div key={active + (search ? '-search' : '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '90px 20px' }}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 40, color: 'rgba(196,149,106,0.3)', margin: '0 0 18px' }}>✦</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, color: M, marginBottom: 10 }}>No dishes found</p>
                <p style={{ fontSize: 14, color: 'rgba(44,24,16,0.45)' }}>Nothing matches "{search}" — try another craving 🍽️</p>
              </div>
            ) : (
              <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
                {featured && !search && <FeaturedCard item={featured} onAdd={addToCart} added={addedName === featured.name} />}
                {(search ? filtered : rest).map((item, i) => (
                  <MenuCard key={item.name} item={item} index={i} onAdd={addToCart} added={addedName === item.name} inCart={cart[item.name]?.qty || 0} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── FOOTER NOTE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{ marginTop: 'clamp(50px, 8vw, 72px)', paddingBottom: 'clamp(70px, 9vw, 100px)' }}>
          <Ornament />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
            <p style={{ fontSize: 12.5, color: 'rgba(44,24,16,0.4)', letterSpacing: '.06em', fontFamily: '"DM Sans", sans-serif' }}>
              All dishes prepared fresh daily · Allergen info available on request
            </p>
            <button
              onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: M, border: '1px solid rgba(44,24,16,0.25)',
                padding: '13px 32px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif', letterSpacing: '.05em', transition: 'all .35s cubic-bezier(.22,1,.36,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = M; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = M; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = M; e.currentTarget.style.borderColor = 'rgba(44,24,16,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              Reserve a Table →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}