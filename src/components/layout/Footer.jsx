import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';

const quickLinks = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hakkımızda', path: '/hakkimizda' },
  { name: 'Etkinlikler', path: '/etkinlikler' },
  { name: 'Duyurular', path: '/duyurular' },
];

const usefulLinks = [
  { name: 'Galeri', path: '/galeri' },
  { name: 'Üyelik', path: '/uyelik' },
  { name: 'Erzurum Kültürü', path: '/erzurum-kulturu' },
  { name: 'İletişim', path: '/iletisim' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' },
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
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary-500">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Erzurumlular</span>
                <span className="text-sm text-white/80">Derneği</span>
              </div>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              Kültürümüzü yaşatıyor, dayanışmamızı büyütüyor ve geleceğe birlikte yürüyoruz.
              Birlik ve beraberlik içinde Erzurum sevgisini yaşatmak için çalışıyoruz.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
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
                  Atatürk Caddesi No: 123<br />
                  Kadıköy, İstanbul
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-400" />
                <a href="tel:+902121234567" className="text-white/80 hover:text-white transition-colors duration-200">
                  (0212) 123 45 67
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-400" />
                <a href="mailto:info@erzurumlulardernegi.org" className="text-white/80 hover:text-white transition-colors duration-200">
                  info@erzurumlulardernegi.org
                </a>
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
              © {currentYear} Erzurumlular Derneği. Tüm hakları saklıdır.
            </p>
            <p className="text-white/60 text-sm flex items-center">
              Birlik ve dayanışma ile <Heart className="w-4 h-4 mx-1 text-red-400" /> güçleniyoruz.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
