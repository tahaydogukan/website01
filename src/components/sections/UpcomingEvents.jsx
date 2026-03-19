import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { events } from '../../data/events';

const UpcomingEvents = () => {
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          title="Yaklaşan Etkinlikler"
          subtitle="Kaçırmak istemeyeceğiniz etkinliklerimize katılın"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2 group"
          >
            <div className="relative h-full rounded-2xl overflow-hidden shadow-card">
              <img
                src={upcomingEvents[0]?.image}
                alt={upcomingEvents[0]?.title}
                className="w-full h-full min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-accent-500 text-white text-sm font-medium rounded-full mb-4">
                  {upcomingEvents[0]?.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {upcomingEvents[0]?.title}
                </h3>
                <p className="text-white/80 mb-6 line-clamp-2">
                  {upcomingEvents[0]?.description}
                </p>

                <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {upcomingEvents[0]?.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {upcomingEvents[0]?.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {upcomingEvents[0]?.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Events */}
          <div className="space-y-6">
            {upcomingEvents.slice(1, 4).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 bg-secondary-50 rounded-2xl p-4 group hover:bg-secondary-100 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow">
                  <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-2">
                    {event.category}
                  </span>
                  <h4 className="font-bold text-secondary-800 mb-2 group-hover:text-primary-500 transition-colors duration-200">
                    {event.title}
                  </h4>
                  <div className="flex flex-wrap gap-3 text-secondary-500 text-sm">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            to="/etkinlikler"
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Tüm Etkinlikleri Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
