import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Menu         from './components/Menu'
import Story        from './components/Story'
import Gallery      from './components/Gallery'
import Reservation  from './components/Reservation'
import Footer       from './components/Footer'

export default function App() {
  return (
    <div style={{ background: '#FAF8F4', fontFamily: '"DM Sans", sans-serif' }}>
      <Navbar />
      <Hero />
      <Menu />
      <Story />
      <Gallery />
      <Reservation />
      <Footer />
    </div>
  )
}