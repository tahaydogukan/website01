import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Button from '../components/ui/Button';
import { events, eventCategories } from '../data/events';

const Etkinlikler = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredEvents = events.filter((event) => {
    const categoryMatch = selectedCategory === 'Tümü' || event.category === selectedCategory;
    const statusMatch = showUpcoming ? event.status === 'upcoming' : event.status === 'past';
    return categoryMatch && statusMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Etkinlikler"
        subtitle="Düzenlediğimiz etkinlikler ve buluşmalarla hemşehrilerimizi bir araya getiriyoruz."
        breadcrumbs={[{ label: 'Etkinlikler' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            {/* Status Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-secondary-100 rounded-full p-1">
                <button
                  onClick={() => setShowUpcoming(true)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    showUpcoming
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-secondary-600 hover:text-primary-500'
                  }`}
                >
                  Yaklaşan Etkinlikler
                </button>
                <button
                  onClick={() => setShowUpcoming(false)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    !showUpcoming
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-secondary-600 hover:text-primary-500'
                  }`}
                >
                  Geçmiş Etkinlikler
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {eventCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-accent-500 text-white shadow-md'
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden group hover:shadow-elegant transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'upcoming'
                          ? 'bg-green-500 text-white'
                          : 'bg-secondary-500 text-white'
                      }`}>
                        {event.status === 'upcoming' ? 'Yaklaşan' : 'Tamamlandı'}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-secondary-700">
                        {event.category}
                      </span>
                    </div>

                    {/* Date Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center text-white">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-500 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-secondary-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-secondary-500 text-sm mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    </div>

                    {event.status === 'upcoming' && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Detayları Gör
                      </Button>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-2">
                Bu kategoride etkinlik bulunamadı
              </h3>
              <p className="text-secondary-600">
                Farklı bir kategori seçerek diğer etkinliklerimize göz atabilirsiniz.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Etkinlikler;
