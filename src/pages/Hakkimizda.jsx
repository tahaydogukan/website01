import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Gift } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import { boardMembers } from '../data/boardMembers';

const values = [
  {
    icon: Heart,
    title: 'Sevgi',
    description: 'Hemşehrilerimize ve kültürümüze duyduğumuz derin sevgi, tüm faaliyetlerimizin temelini oluşturur.',
  },
  {
    icon: Users,
    title: 'Birlik',
    description: 'Birlikte daha güçlü olduğumuza inanıyor, dayanışma içinde hareket ediyoruz.',
  },
  {
    icon: Award,
    title: 'Saygı',
    description: 'Geleneklerimize, büyüklerimize ve tüm değerlerimize saygı ile yaklaşıyoruz.',
  },
  {
    icon: Gift,
    title: 'Yardımlaşma',
    description: 'İhtiyaç sahiplerine el uzatmak ve destek olmak en önemli görevimizdir.',
  },
];

const Hakkimizda = () => {
  const president = boardMembers.find((member) => member.title === 'Başkan');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Hakkımızda"
        subtitle="Erzurum sevgisiyle bir araya gelen, kültürümüzü yaşatan ve dayanışmayı güçlendiren bir aileyiz."
        breadcrumbs={[{ label: 'Hakkımızda' }]}
      />

      {/* Kuruluş Amacı */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
                Kuruluş Amacımız
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                Neden Kurulduk?
              </h2>
              <p className="text-secondary-600 text-lg leading-relaxed mb-6">
                Derneğimiz; toplumun ihtiyaçlarına duyarlı, ortak değerler etrafında bir araya
                gelen bireylerin bilgi, deneyim ve gönüllülük gücünü birleştirerek kalıcı
                çözümler üretmek amacıyla 1992 yılında kurulmuştur.
              </p>
              <p className="text-secondary-600 text-lg leading-relaxed">
                Toplumsal dayanışmayı güçlendirmek; eğitim, kültür, sanat ve sosyal gelişime katkı
                sunmak; dezavantajlı grupların yanında olmak ve ortak fayda sağlayan projeler
                geliştirmek temel kuruluş nedenlerimiz arasındadır. İnsan odaklı, şeffaf ve
                katılımcı bir anlayışla gönüllülük kültürünü gelecek nesillere aktarmayı hedefliyoruz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800"
                alt="Dernek toplantısı"
                className="rounded-2xl shadow-elegant w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-6 rounded-2xl shadow-elegant">
                <div className="text-4xl font-bold">1992</div>
                <div className="text-sm">Kuruluş Yılı</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-card"
            >
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500 mb-4">Misyonumuz</h3>
              <p className="text-secondary-600 leading-relaxed">
                Toplumsal dayanışmayı güçlendirmek; sosyal, kültürel ve eğitsel alanlarda
                sürdürülebilir projeler üretmek; bireylerin kişisel ve toplumsal gelişimine katkı
                sağlamak. Katılımcılık, şeffaflık, eşitlik ve gönüllülük ilkeleri doğrultusunda
                toplumun her kesimine fayda sağlayan çalışmalar yürütmek ve ortak değerler
                etrafında güçlü bir dayanışma kültürü oluşturmak temel misyonumuzdur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-card"
            >
              <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-500 mb-4">Vizyonumuz</h3>
              <p className="text-secondary-600 leading-relaxed">
                Ulusal ve uluslararası düzeyde örnek gösterilen, güvenilir, yenilikçi ve
                sürdürülebilir projeler geliştiren; toplumsal gelişime öncülük eden, gönüllülük
                bilincini yaygınlaştıran ve insanların yaşam kalitesini artıran öncü bir sivil
                toplum kuruluşu olmak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Başkan Mesajı */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            >
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="w-48 aspect-[4/5] mx-auto rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-lg overflow-hidden">
                    {president?.image ? (
                      <img src={president.image} alt={president.name} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: president.imagePosition || 'center' }} />
                    ) : (
                      <span className="text-5xl font-bold">MK</span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">Başkan Mesajı</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Kıymetli hemşehrilerim; Erzurum'un köklü kültürünü, birlik ve dayanışma ruhunu
                    İstanbul - Pendik Kaynarca'da yaşatmak ve gelecek nesillere aktarmak en büyük
                    sorumluluğumuzdur. Derneğimiz, yalnızca hemşehrilerimizi bir araya getiren bir
                    çatı değil; dostluğun, paylaşmanın ve ortak değerlerimizin yaşatıldığı güçlü bir
                    aile olmayı hedeflemektedir. Birlik ve beraberlik içinde gerçekleştireceğimiz her
                    çalışma, hem toplumumuza hem de gençlerimize kalıcı değerler kazandıracaktır. Tüm
                    hemşehrilerimizi bu büyük dayanışmanın bir parçası olmaya davet ediyor, sevgi ve
                    saygılarımı sunuyorum.
                  </p>
                  <div>
                    <div className="font-bold text-lg">{president?.name}</div>
                    <div className="text-white/70">{president?.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <SectionTitle
            title="Değerlerimiz"
            subtitle="Faaliyetlerimize yön veren temel değerlerimiz"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-3">{value.title}</h3>
                  <p className="text-secondary-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yönetim Kurulu */}
      <section id="yonetim-kurulu" className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Yönetim Kurulu"
            subtitle="Derneğimizi yöneten değerli ekibimiz"
          />

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {boardMembers.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                className="min-w-0"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-soft">
                  <div className="aspect-[4/5] overflow-hidden bg-primary-50 flex items-center justify-center">
                    {member.image ? (
                      <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: member.imagePosition || 'center' }} />
                    ) : (
                      <span className="text-5xl font-bold text-primary-500/60" aria-hidden="true">
                        {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-5 text-center">
                    <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${member.title === 'Başkan' ? 'text-accent-700' : 'text-secondary-500'}`}>
                      {member.title}
                    </p>
                    <h3 className="text-sm sm:text-lg font-bold text-secondary-800 mt-2">{member.name}</h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hakkimizda;
