import { motion } from 'framer-motion';
import { Clock, Milestone, BookOpen, Sparkles } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';

// Tarihçe içeriği daha sonra eklenecek. Şimdilik yer tutucu / placeholder
// yapı hazırlandı. Gerçek içerik geldiğinde bu diziye eklenebilir.
const timeline = [
  {
    year: '1999',
    title: 'Kuruluş',
    description:
      'Erzurumlular Derneği, İstanbul\'da yaşayan hemşehrilerimizi bir araya getirmek amacıyla kuruldu.',
  },
  {
    year: '2005',
    title: 'İlk Büyük Etkinlik',
    description:
      'Derneğimizin ilk büyük kültürel etkinliği düzenlendi ve yüzlerce hemşehrimiz bir araya geldi.',
  },
  {
    year: '2012',
    title: 'Yeni Yönetim Binası',
    description:
      'Derneğimize bugünkü kalıcı adresimiz olan yönetim binamız kazandırıldı.',
  },
  {
    year: '2020',
    title: 'Dijital Dönüşüm',
    description:
      'Üyelerimize daha iyi hizmet sunabilmek adına dijital altyapımızı güçlendirdik.',
  },
  {
    year: '2024',
    title: 'Bugün',
    description:
      '1500\'ü aşkın aktif üyemizle Erzurum kültürünü yaşatmaya devam ediyoruz.',
  },
];

const Tarihce = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Tarihçe"
        subtitle="Geçmişten günümüze Erzurumlular Derneği'nin hikayesi."
        breadcrumbs={[{ label: 'Tarihçe' }]}
      />

      {/* Giriş Bölümü */}
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
                <BookOpen className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                Köklerimizden Günümüze
              </h2>
              <p className="text-secondary-600 text-lg leading-relaxed">
                Erzurumlular Derneği, dadaşlık ruhunu yaşatmak, hemşehrilerimiz arasında
                dayanışmayı güçlendirmek ve kültürümüzü gelecek nesillere aktarmak amacıyla
                kurulmuş köklü bir sivil toplum kuruluşudur. Yıllar içinde büyüyerek bugünkü
                gücüne ulaşmıştır.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zaman Çizelgesi */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <SectionTitle
            title="Zaman Çizelgesi"
            subtitle="Derneğimizin yolculuğundaki önemli dönüm noktaları"
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Dikey çizgi */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Nokta */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-white shadow-md md:-translate-x-1/2 z-10" />

                  {/* Boş taraf */}
                  <div className="hidden md:block w-1/2" />

                  {/* İçerik Kartı */}
                  <div className="pl-12 md:pl-0 md:w-1/2 md:px-8">
                    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-elegant transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                          <Milestone className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-primary-500">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Yakında Bölümü */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Detaylı Tarihçemiz Çok Yakında
              </h3>
              <p className="text-white/90 leading-relaxed">
                Derneğimizin kuruluşundan günümüze uzanan detaylı tarihçesi,
                arşiv fotoğrafları ve önemli belgeleriyle birlikte çok yakında
                burada yayında olacaktır. Bizi takip etmeye devam edin.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Tarihce;
