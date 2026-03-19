import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { announcements } from '../../data/announcements';

const FeaturedAnnouncements = () => {
  const featuredAnnouncements = announcements.filter(a => a.important).slice(0, 3);

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <SectionTitle
          title="Önemli Duyurular"
          subtitle="Derneğimizden en güncel haberleri ve duyuruları takip edin"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAnnouncements.map((announcement, index) => (
            <motion.article
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    announcement.important
                      ? 'bg-red-100 text-red-600'
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    {announcement.important ? 'Önemli' : announcement.category}
                  </span>
                  <div className="flex items-center text-secondary-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {announcement.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-500 transition-colors duration-200 line-clamp-2">
                  {announcement.title}
                </h3>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {announcement.summary}
                </p>

                <Link
                  to="/duyurular"
                  className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors duration-200 group"
                >
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            to="/duyurular"
            variant="secondary"
            icon={<Bell className="w-5 h-5" />}
            iconPosition="left"
          >
            Tüm Duyuruları Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAnnouncements;
