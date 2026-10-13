import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-primary-700">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900" />
        <img src="/hero-landscape.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 border border-white/10 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 py-10 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 border border-white/20 bg-white/5 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6">
              1992’den beri · Pendik, İstanbul
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight text-balance"
          >
            Memleket Sevgisi,{' '}
            <span className="block text-accent-300">Dayanışmanın Adresi.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Erzurum'un köklü kültürünü, Dadaşlık ruhunu ve yardımlaşma geleneğini
            Pendik Kaynarca'da yaşatıyor; geleceğe birlikte yürüyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <Button
              to="/uyelik"
              variant="white"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Üye Ol
            </Button>
            <Button
              to="/hakkimizda"
              variant="outlineWhite"
              size="lg"
            >
              Bizi Tanıyın
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 mt-10 max-w-xl mx-auto"
          >
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Calendar className="w-6 h-6 md:w-7 md:h-7 text-accent-400 mx-auto mb-1" />
              <div className="text-xl md:text-2xl font-bold text-white">1992</div>
              <div className="text-xs text-white/70">Kuruluş Yılı</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <MapPin className="w-6 h-6 md:w-7 md:h-7 text-accent-400 mx-auto mb-1" />
              <div className="text-xl md:text-2xl font-bold text-white">Pendik</div>
              <div className="text-xs text-white/70">İstanbul</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Clock className="w-6 h-6 md:w-7 md:h-7 text-accent-400 mx-auto mb-1" />
              <div className="text-xl md:text-2xl font-bold text-white">09–23</div>
              <div className="text-xs text-white/80">Çalışma Saatleri</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
