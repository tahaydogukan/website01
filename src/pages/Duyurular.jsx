import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Bell, AlertCircle } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import { announcements, announcementCategories } from '../data/announcements';

const Duyurular = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [expandedId, setExpandedId] = useState(null);

  const filteredAnnouncements = announcements.filter((announcement) => {
    return selectedCategory === 'Tümü' || announcement.category === selectedCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Duyurular"
        subtitle="Derneğimizden en güncel haberler, duyurular ve bilgilendirmeler."
        breadcrumbs={[{ label: 'Duyurular' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {announcementCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Announcements List */}
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredAnnouncements.map((announcement, index) => (
                <motion.article
                  key={announcement.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-card overflow-hidden border-l-4 ${
                    announcement.important ? 'border-red-500' : 'border-primary-500'
                  }`}
                >
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {announcement.important && (
                        <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Önemli
                        </span>
                      )}
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                        {announcement.category}
                      </span>
                      <span className="flex items-center text-secondary-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-secondary-800 mb-4">
                      {announcement.title}
                    </h2>

                    {/* Content */}
                    <div className="text-secondary-600 leading-relaxed">
                      {expandedId === announcement.id ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {announcement.content}
                        </motion.p>
                      ) : (
                        <p>{announcement.summary}</p>
                      )}
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={() => setExpandedId(
                        expandedId === announcement.id ? null : announcement.id
                      )}
                      className="inline-flex items-center mt-4 text-primary-500 font-medium hover:text-primary-600 transition-colors duration-200 group"
                    >
                      {expandedId === announcement.id ? 'Daha Az Göster' : 'Devamını Oku'}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        expandedId === announcement.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredAnnouncements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-2">
                Bu kategoride duyuru bulunamadı
              </h3>
              <p className="text-secondary-600">
                Farklı bir kategori seçerek diğer duyurularımıza göz atabilirsiniz.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Duyurular;
