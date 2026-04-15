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
      className="relative w-full h-[140px] md:h-[170px] overflow-hidden bg-white border-y border-secondary-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Reklam Etiketi */}
      <div className="absolute top-2 right-3 z-20 px-2 py-0.5 bg-secondary-100 text-secondary-500 text-[10px] uppercase tracking-wider rounded">
        Reklam
      </div>

      {/* İçerik */}
      <div className="relative z-10 h-full container-custom flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full flex items-center justify-between gap-4 md:gap-8"
          >
            {/* Sol: Marka adı (logo benzeri) */}
            <div className="flex-shrink-0 flex flex-col items-start">
              <div
                className="text-xl md:text-3xl font-extrabold tracking-tight leading-none"
                style={{ color: currentAd.color }}
              >
                {currentAd.brand}
              </div>
              <div
                className="h-1 mt-1 rounded-full w-16 md:w-20"
                style={{ backgroundColor: currentAd.color }}
              />
            </div>

            {/* Orta: Slogan + Teklif */}
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-secondary-800 text-sm md:text-base font-semibold leading-snug truncate">
                {currentAd.tagline}
              </p>
              <p className="text-secondary-500 text-xs md:text-sm mt-0.5 truncate">
                {currentAd.offer}
              </p>
            </div>

            {/* Mobilde tek satır teklif */}
            <div className="flex-1 min-w-0 sm:hidden">
              <p className="text-secondary-700 text-xs font-medium leading-snug line-clamp-2">
                {currentAd.offer}
              </p>
            </div>

            {/* Sağ: CTA butonu */}
            {currentAd.link && currentAd.buttonText && (
              <Link
                to={currentAd.link}
                className="flex-shrink-0 inline-block px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 shadow-md whitespace-nowrap"
                style={{ backgroundColor: currentAd.color }}
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
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-secondary-100 hover:bg-secondary-200 rounded-full flex items-center justify-center text-secondary-600 transition-colors duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goToNext}
        aria-label="Sonraki reklam"
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-secondary-100 hover:bg-secondary-200 rounded-full flex items-center justify-center text-secondary-600 transition-colors duration-200"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {heroAds.map((ad, index) => (
          <button
            key={ad.id}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}. reklama git`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-1.5'
                : 'w-1.5 h-1.5 bg-secondary-300 hover:bg-secondary-400'
            }`}
            style={
              index === currentIndex
                ? { backgroundColor: currentAd.color }
                : undefined
            }
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
          className="absolute bottom-0 left-0 h-0.5 z-20"
          style={{ backgroundColor: currentAd.color }}
        />
      )}
    </section>
  );
};

export default AdCarousel;
