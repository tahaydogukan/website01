import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920"
          alt="Erzurum manzarası"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/90 via-primary-600/85 to-primary-700/90" />
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
      <div className="container-custom relative z-20 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
              Erzurumlular Derneği'ne Hoş Geldiniz
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Birlikte{' '}
            <span className="text-accent-400">Daha Güçlüyüz</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Erzurumlular Derneği olarak kültürümüzü yaşatıyor, dayanışmamızı büyütüyor
            ve geleceğe birlikte yürüyoruz. Hemşehrilerimizi bir araya getirerek
            birlik ve beraberliği güçlendiriyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
              variant="ghost"
              size="lg"
              className="text-white border-2 border-white/30 hover:bg-white/10"
            >
              Bizi Tanıyın
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Users className="w-8 h-8 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white">1500+</div>
              <div className="text-sm text-white/70">Aktif Üye</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Calendar className="w-8 h-8 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/70">Yıllık Etkinlik</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Heart className="w-8 h-8 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white">25</div>
              <div className="text-sm text-white/70">Yıllık Tecrübe</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
