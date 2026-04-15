import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

// Sosyal medya hesaplarını gerçek URL'leriniz ile güncellemek için
// aşağıdaki href alanlarını değiştirin.
const socialLinks = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/',
    label: 'Instagram',
  },
];

const TopBar = () => {
  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-[60] bg-primary-700 text-white text-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between py-2">
          {/* Sol: İletişim bilgileri */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+902121234567"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(0212) 123 45 67</span>
            </a>
            <a
              href="mailto:info@erzurumlulardernegi.org"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@erzurumlulardernegi.org</span>
            </a>
          </div>

          {/* Sağ: Sosyal medya */}
          <div className="flex items-center space-x-2">
            <span className="text-white/70 text-xs mr-2">Bizi takip edin:</span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
