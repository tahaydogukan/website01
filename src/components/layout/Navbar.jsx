import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hakkımızda', path: '/hakkimizda' },
  { name: 'Tarihçe', path: '/tarihce' },
  { name: 'Etkinlikler', path: '/etkinlikler' },
  { name: 'Duyurular', path: '/duyurular' },
  { name: 'Galeri', path: '/galeri' },
  { name: 'Firmalar', path: '/firmalar' },
  { name: 'Erzurum Kültürü', path: '/erzurum-kulturu' },
  { name: 'İletişim', path: '/iletisim' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/', label: 'Instagram' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      {/* Üst bilgi şeridi - kaydırıldığında gizlenir */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block border-b border-white/15 overflow-hidden"
          >
            <div className="container-custom py-2.5">
              <div className="flex items-center justify-between text-sm text-white/85">
                {/* Sol: İletişim */}
                <div className="flex items-center gap-6">
                  <a
                    href="tel:+902121234567"
                    className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">(0212) 123 45 67</span>
                  </a>
                  <a
                    href="mailto:info@erzurumlulardernegi.org"
                    className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">info@erzurumlulardernegi.org</span>
                  </a>
                </div>

                {/* Sağ: Sosyal medya */}
                <div className="flex items-center gap-2.5">
                  <span className="text-white/70 mr-1">Bizi takip edin:</span>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors duration-200"
                    >
                      <social.icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ana Navbar */}
      <div
        className={`container-custom transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${
                isScrolled ? 'bg-primary-500' : 'bg-white'
              }`}
            >
              <span
                className={`text-3xl font-bold ${
                  isScrolled ? 'text-white' : 'text-primary-500'
                }`}
              >
                E
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl md:text-2xl font-bold leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-primary-500' : 'text-white'
                }`}
              >
                Erzurumlular
              </span>
              <span
                className={`text-base transition-colors duration-300 ${
                  isScrolled ? 'text-secondary-600' : 'text-white/80'
                }`}
              >
                Derneği
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? isScrolled
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-white bg-white/20'
                      : isScrolled
                      ? 'text-secondary-700 hover:text-primary-500 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              to="/uyelik"
              variant={isScrolled ? 'primary' : 'white'}
              size="md"
            >
              Üye Ol
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'text-primary-500 hover:bg-primary-50'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-primary-500 bg-primary-50'
                            : 'text-secondary-700 hover:text-primary-500 hover:bg-primary-50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Button to="/uyelik" variant="primary" className="w-full">
                    Üye Ol
                  </Button>
                </motion.div>

                {/* Mobil iletişim + sosyal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  className="pt-4 mt-2 border-t border-secondary-200 space-y-2"
                >
                  <a
                    href="tel:+902121234567"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-600"
                  >
                    <Phone className="w-4 h-4 text-primary-500" />
                    (0212) 123 45 67
                  </a>
                  <a
                    href="mailto:info@erzurumlulardernegi.org"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-600"
                  >
                    <Mail className="w-4 h-4 text-primary-500" />
                    info@erzurumlulardernegi.org
                  </a>
                  <div className="flex items-center gap-3 px-4 pt-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
