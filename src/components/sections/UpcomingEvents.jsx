import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { events, getEventStatus } from '../../data/events';

const UpcomingEvents = () => {
  const upcoming = events.filter((event) => getEventStatus(event) === 'upcoming').sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const hasUpcoming = upcoming.length > 0;
  const visibleEvents = (hasUpcoming ? upcoming : [...events].sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt))).slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle title={hasUpcoming ? 'Yaklaşan Etkinlikler' : 'Etkinlik Arşivi'} subtitle={hasUpcoming ? 'Bir sonraki buluşmamızda siz de aramızda olun' : 'Geçmiş buluşmalarımıza göz atın. Yeni programlar duyurulduğunda burada yer alacak.'} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleEvents.map((event, index) => (
            <motion.article key={event.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.08}} className="group rounded-2xl border border-secondary-200 overflow-hidden bg-white shadow-soft">
              <Link to={`/etkinlikler/${event.id}`} className="block h-full" aria-label={`${event.title} — Detayları gör`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary-500">{event.category}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm text-secondary-500 mb-3"><Calendar className="w-4 h-4" aria-hidden="true" /><time dateTime={event.startsAt}>{event.date}</time></div>
                  <h3 className="text-xl font-bold text-primary-500 mb-3 group-hover:text-accent-700">{event.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary-600 line-clamp-2 mb-5">{event.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-secondary-600"><span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{event.time}</span><span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />{event.location}</span></div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 mt-5">Detayları gör <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-8"><Button to="/etkinlikler" icon={<ArrowRight className="w-4 h-4" />}>Tüm Etkinlikleri Görüntüle</Button></div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
