import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Hakkimizda from './pages/Hakkimizda'
import Etkinlikler from './pages/Etkinlikler'
import Duyurular from './pages/Duyurular'
import Galeri from './pages/Galeri'
import Uyelik from './pages/Uyelik'
import Iletisim from './pages/Iletisim'
import ErzurumKulturu from './pages/ErzurumKulturu'
import ScrollToTop from './components/ui/ScrollToTop'
import BackToTop from './components/ui/BackToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/etkinlikler" element={<Etkinlikler />} />
            <Route path="/duyurular" element={<Duyurular />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/uyelik" element={<Uyelik />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="/erzurum-kulturu" element={<ErzurumKulturu />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <BackToTop />
    </>
  )
}

export default App
