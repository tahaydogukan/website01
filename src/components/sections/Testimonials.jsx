import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const testimonials = [
  {
    id: 1,
    name: 'Mustafa Özdemir',
    role: 'Dernek Üyesi - 15 Yıl',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    content: 'Erzurumlular Derneği sayesinde İstanbul\'da memleketimi hiç özlemiyorum. Her etkinlikte sanki Erzurum\'dayım gibi hissediyorum. Bu ailenin bir parçası olmaktan gurur duyuyorum.',
  },
  {
    id: 2,
    name: 'Zeynep Yıldız',
    role: 'Dernek Üyesi - 8 Yıl',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    content: 'Derneğimizin düzenlediği kültürel etkinlikler çocuklarıma Erzurum kültürünü tanıtmamda çok yardımcı oldu. Bar oyunları kursları, yöresel yemek günleri... Her biri ayrı bir değer.',
  },
  {
    id: 3,
    name: 'Hüseyin Çelik',
    role: 'Dernek Üyesi - 20 Yıl',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    content: 'Yıllardır bu derneğin bir ferdi olmaktan mutluluk duyuyorum. Dayanışma ruhu, yardımlaşma kültürü ve samimi ortam... Erzurum\'un gerçek temsilcileri burada.',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <SectionTitle
          title="Üyelerimizden"
          subtitle="Derneğimiz hakkında üyelerimizin görüşleri"
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-elegant p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
                      />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                        <Quote className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    <p className="text-lg md:text-xl text-secondary-700 italic leading-relaxed mb-6">
                      "{testimonials[current].content}"
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-secondary-800">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-secondary-500">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center text-secondary-600 hover:text-primary-500 hover:shadow-elegant transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === current
                        ? 'bg-primary-500 w-8'
                        : 'bg-secondary-300 hover:bg-secondary-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center text-secondary-600 hover:text-primary-500 hover:shadow-elegant transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
