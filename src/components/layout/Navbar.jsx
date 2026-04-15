import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
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
      className={`fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-primary-500' : 'bg-white'}`}>
              <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-primary-500'}`}>E</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-500' : 'text-white'}`}>
                Erzurumlular
              </span>
              <span className={`text-sm transition-colors duration-300 ${isScrolled ? 'text-secondary-600' : 'text-white/80'}`}>
                Derneği
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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
            <Button to="/uyelik" variant={isScrolled ? 'primary' : 'white'} size="sm">
              Üye Ol
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled ? 'text-primary-500 hover:bg-primary-50' : 'text-white hover:bg-white/10'
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
