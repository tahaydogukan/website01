import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin, Clock } from 'lucide-react';
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
  const menuButton = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOnResize = () => {
      if (window.innerWidth >= 1280) setIsOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnResize);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [isOpen]);

  const linkStyles = ({ isActive }) =>
    `rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
      isActive
        ? 'bg-primary-50 text-primary-500'
        : 'text-secondary-600 hover:bg-secondary-50 hover:text-primary-500'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-secondary-200 shadow-soft">
      <div className="hidden md:block bg-primary-500 text-white/90">
        <div className="container-custom flex items-center justify-between gap-4 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a href="mailto:kay.erz.der@gmail.com" className="flex items-center gap-2 hover:text-white">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>kay.erz.der@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              Her gün 09.00 – 23.00
            </span>
          </div>
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Pendik, İstanbul
          </span>
        </div>
      </div>

      <div className="container-custom flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg" aria-label="Pendik Kaynarca Erzurumlular Derneği — Ana sayfa">
          <img
            src="/images/dernek-logo.png"
            alt="Pendik Kaynarca Erzurumlular Kültür ve Dayanışma Derneği logosu"
            width="64"
            height="64"
            className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block text-base sm:text-xl font-bold leading-tight text-primary-500">Pendik Kaynarca</span>
            <span className="block text-xs sm:text-sm text-secondary-600 mt-1">Erzurumlular Derneği</span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden sm:block">
            <Button to="/uyelik" size="sm">Üye Ol</Button>
          </div>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-secondary-200 text-primary-500 hover:bg-secondary-50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <nav aria-label="Ana menü" className="hidden xl:block border-t border-secondary-100">
        <div className="container-custom flex items-center justify-between gap-1 py-1">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkStyles}>
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <nav
        id="mobile-navigation"
        aria-label="Mobil menü"
        hidden={!isOpen}
        className="xl:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-120px)] overflow-y-auto bg-white border-b border-secondary-200 shadow-elegant"
      >
        <div className="container-custom grid gap-1 py-4">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkStyles} onClick={() => setIsOpen(false)}>
              {link.name}
            </NavLink>
          ))}
          <Button to="/uyelik" className="w-full mt-3" onClick={() => setIsOpen(false)}>Üye Ol</Button>
          <a href="mailto:kay.erz.der@gmail.com" className="flex items-center gap-2 border-t border-secondary-200 mt-3 px-4 pt-4 pb-2 text-sm text-secondary-600">
            <Mail className="w-4 h-4" aria-hidden="true" /> kay.erz.der@gmail.com
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
