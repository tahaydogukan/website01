import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroAds } from '../../data/ads';

// Anasayfa üst reklam carousel'i. 4 saniyede bir otomatik değişir.
// Kullanıcı ok tuşlarına basarak veya alttaki noktalara tıklayarak da geçiş yapabilir.

const AUTO_ROTATE_MS = 4000;

const AdCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroAds.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroAds.length) % heroAds.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const currentAd = heroAds[currentIndex];

  if (!heroAds.length) return null;

  return (
    <section
      className="relative w-full h-[280px] md:h-[340px] overflow-hidden bg-primary-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Arka plan görsel geçişleri */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentAd.accent}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* İçerik */}
      <div className="relative z-10 h-full container-custom flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-white"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              {currentAd.title}
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-5 leading-relaxed drop-shadow-md">
              {currentAd.subtitle}
            </p>
            {currentAd.link && currentAd.buttonText && (
              <Link
                to={currentAd.link}
                className="inline-block bg-white text-primary-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-secondary-50 transition-colors duration-200 shadow-lg"
              >
                {currentAd.buttonText}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ok Tuşları */}
      <button
        onClick={goToPrevious}
        aria-label="Önceki reklam"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        aria-label="Sonraki reklam"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroAds.map((ad, index) => (
          <button
            key={ad.id}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}. reklama git`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* İlerleme çubuğu */}
      {!isPaused && (
        <motion.div
          key={currentAd.id}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTO_ROTATE_MS / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-1 bg-accent-400 z-20"
        />
      )}
    </section>
  );
};

export default AdCarousel;
