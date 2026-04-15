import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  Tag,
  Share2,
  CheckCircle,
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import { events } from '../data/events';

const EtkinlikDetay = () => {
  const { id } = useParams();
  const event = useMemo(
    () => events.find((e) => String(e.id) === String(id)),
    [id]
  );

  // İlgili etkinlikler (aynı kategoriden farklı etkinlikler)
  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return events
      .filter((e) => e.category === event.category && e.id !== event.id)
      .slice(0, 3);
  }, [event]);

  // Bulunamazsa listeye geri yönlendir
  if (!event) {
    return <Navigate to="/etkinlikler" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title={event.title}
        subtitle={`${event.date} • ${event.location}`}
        breadcrumbs={[
          { label: 'Etkinlikler', path: '/etkinlikler' },
          { label: event.title },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Ana İçerik */}
            <div className="lg:col-span-2">
              {/* Görsel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden shadow-elegant mb-8"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[300px] md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Üst etiketler */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      event.status === 'upcoming'
                        ? 'bg-green-500 text-white'
                        : 'bg-secondary-500 text-white'
                    }`}
                  >
                    {event.status === 'upcoming' ? 'Yaklaşan' : 'Tamamlandı'}
                  </span>
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-secondary-700">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {event.category}
                  </span>
                </div>
              </motion.div>

              {/* Başlık ve açıklama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
                  {event.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-secondary-600 mb-8 pb-8 border-b border-secondary-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-primary-500 mb-4">
                    Etkinlik Hakkında
                  </h2>
                  <p className="text-secondary-600 text-lg leading-relaxed mb-6">
                    {event.description}
                  </p>
                  <p className="text-secondary-600 text-lg leading-relaxed mb-6">
                    Derneğimizin düzenlediği bu özel etkinlikte sizleri de aramızda
                    görmekten mutluluk duyacağız. Etkinlik süresince çeşitli ikramlar,
                    sohbet ortamı ve hemşehri dayanışması bir arada olacak.
                  </p>

                  <h3 className="text-xl font-bold text-primary-500 mt-8 mb-4">
                    Neler Olacak?
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Açılış konuşması ve etkinlik tanıtımı',
                      'Hemşehri sohbeti ve tanışma bölümü',
                      'Yöresel ikramlar ve Erzurum mutfağından lezzetler',
                      'Kültürel program ve müzik dinletisi',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-secondary-700"
                      >
                        <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Kenar Çubuğu */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Bilgi Kartı */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-3xl p-6 md:p-8 shadow-elegant">
                <h3 className="text-xl font-bold mb-6">Etkinlik Bilgileri</h3>
                <div className="space-y-5">
                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">
                      Tarih
                    </div>
                    <div className="font-semibold">{event.date}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">
                      Saat
                    </div>
                    <div className="font-semibold">{event.time}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">
                      Yer
                    </div>
                    <div className="font-semibold">{event.location}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">
                      Kategori
                    </div>
                    <div className="font-semibold">{event.category}</div>
                  </div>
                </div>

              </div>

              {/* Paylaş */}
              <div className="bg-secondary-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-secondary-700 font-semibold mb-3">
                  <Share2 className="w-5 h-5" />
                  Etkinliği Paylaş
                </div>
                <p className="text-secondary-500 text-sm">
                  Bu etkinliği hemşehrilerinize duyurun, onları da aramızda
                  görelim.
                </p>
              </div>

              {/* Geri Dön */}
              <Link
                to="/etkinlikler"
                className="flex items-center gap-2 text-primary-500 hover:text-primary-700 font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Tüm Etkinliklere Dön
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* İlgili Etkinlikler */}
      {relatedEvents.length > 0 && (
        <section className="section-padding bg-secondary-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary-500 mb-10 text-center">
              Benzer Etkinlikler
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((rel, index) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/etkinlikler/${rel.id}`}
                    className="block bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 rounded-full text-xs font-medium text-secondary-700">
                        {rel.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-secondary-500 mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {rel.date}
                      </div>
                      <h3 className="font-bold text-secondary-800 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default EtkinlikDetay;
