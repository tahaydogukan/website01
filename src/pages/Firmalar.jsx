import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, MapPin, Phone, Globe, Award } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import { firms, firmCategories } from '../data/firms';

const Firmalar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredFirms = firms.filter(
    (firm) => selectedCategory === 'Tümü' || firm.category === selectedCategory
  );

  // Marquee için firmaları iki defa listeleyerek sonsuz akış efekti oluşturuyoruz
  const marqueeFirms = [...firms, ...firms];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Firmalar"
        subtitle="Derneğimiz üyelerine özel indirim ve avantajlar sunan anlaşmalı firmalarımız."
        breadcrumbs={[{ label: 'Firmalar' }]}
      />

      {/* Kayar Logo Şeridi */}
      <section className="bg-white py-8 border-b border-secondary-100">
        <div className="container-custom">
          <p className="text-center text-secondary-500 text-sm font-medium uppercase tracking-wider mb-4">
            Anlaşmalı Firmalarımız
          </p>

          {/* Marquee container - container-custom içinde, ekran kenarına yayılmaz */}
          <div className="relative overflow-hidden mx-auto max-w-6xl">
            {/* Sol kenar fade (beyaza doğru) */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Sağ kenar fade (beyaza doğru) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap">
              {marqueeFirms.map((firm, index) => (
                <div
                  key={`${firm.id}-${index}`}
                  className="mx-6 flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={firm.logo}
                    alt={firm.name}
                    className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-xl grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tanıtım Bölümü */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                Üyelerimize Özel Avantajlar
              </h2>
              <p className="text-secondary-600 text-lg leading-relaxed">
                Derneğimiz üyelerine çeşitli sektörlerdeki anlaşmalı firmalarımızda
                özel indirim ve avantajlar sunuyoruz. Üyelik kartınızı göstererek
                bu fırsatlardan yararlanabilirsiniz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Firma Listesi */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <SectionTitle
            title="Anlaşmalı Firmalarımız"
            subtitle="Farklı sektörlerde sizlere hizmet veren güvenilir firmalarımız"
          />

          {/* Kategori Filtresi */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {firmCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Firmalar Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFirms.map((firm, index) => (
                <motion.div
                  key={firm.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group"
                >
                  {/* Üst görsel */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={firm.image}
                      alt={firm.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* İndirim Etiketi */}
                    <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {firm.discount} İndirim
                    </div>

                    {/* Logo */}
                    <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center">
                      <img
                        src={firm.logo}
                        alt={`${firm.name} logo`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6 pt-10">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-medium">
                        {firm.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary-800 mb-2">
                      {firm.name}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {firm.description}
                    </p>

                    {/* İletişim Bilgileri */}
                    <div className="space-y-2 pt-4 border-t border-secondary-100">
                      <div className="flex items-center gap-2 text-sm text-secondary-600">
                        <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span>{firm.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary-600">
                        <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <a
                          href={`tel:${firm.phone.replace(/[^0-9+]/g, '')}`}
                          className="hover:text-primary-500 transition-colors"
                        >
                          {firm.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary-600">
                        <Globe className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span>{firm.website}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredFirms.length === 0 && (
            <div className="text-center py-12 text-secondary-500">
              Bu kategoride henüz firma bulunmuyor.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Firmanız da Anlaşmalı Olmak İster Mi?
            </h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Derneğimiz üyelerine özel indirim ve avantajlar sunarak
              anlaşmalı firma ağımıza katılabilirsiniz. Detaylı bilgi için
              bizimle iletişime geçin.
            </p>
            <a
              href="/iletisim"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-secondary-50 transition-colors duration-200"
            >
              İletişime Geç
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Firmalar;
