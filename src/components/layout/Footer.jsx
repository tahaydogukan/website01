import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Clock,
  Heart,
} from 'lucide-react';

const quickLinks = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hakkımızda', path: '/hakkimizda' },
  { name: 'Tarihçe', path: '/tarihce' },
  { name: 'Etkinlikler', path: '/etkinlikler' },
  { name: 'Duyurular', path: '/duyurular' },
];

const usefulLinks = [
  { name: 'Galeri', path: '/galeri' },
  { name: 'Firmalar', path: '/firmalar' },
  { name: 'Üyelik', path: '/uyelik' },
  { name: 'Erzurum Kültürü', path: '/erzurum-kulturu' },
  { name: 'İletişim', path: '/iletisim' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-500 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/dernek-logo.png"
                alt="Pendik Kaynarca Erzurumlular Kültür ve Dayanışma Derneği logosu"
                width="64"
                height="64"
                loading="lazy"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <div className="flex min-w-0 flex-col">
                <span className="text-base font-bold">Pendik Kaynarca Erzurumlular</span>
                <span className="text-sm text-white/80">Kültür ve Dayanışma Derneği</span>
              </div>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              Memleket sevgisini, kültürümüzü ve dayanışma ruhunu 1992'den beri yaşatıyoruz.
            </p>
            <p className="text-accent-300 font-semibold">Memleket Sevgisi, Dayanışmanın Adresi.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6">Faydalı Linkler</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-accent-400" />
                <span className="text-white/80">
                  Esenler Mah., Mercan Sok., No: 7<br />
                  Pendik, İstanbul
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-400" />
                <a href="mailto:kay.erz.der@gmail.com" className="text-white/80 hover:text-white transition-colors duration-200">
                  kay.erz.der@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent-400" />
                <span className="text-white/80">Her gün 09.00 – 23.00</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Pendik Kaynarca Erzurumlular Kültür ve Dayanışma Derneği. Tüm hakları saklıdır.
            </p>
            <p className="text-white/60 text-sm flex items-center">
              Birlik ve dayanışma ile <Heart className="w-4 h-4 mx-1 text-red-400" /> güçleniyoruz.
            </p>
            <Link to="/yonetim" className="text-white/70 hover:text-white text-xs min-h-11 inline-flex items-center">Yönetici Girişi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
