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
                Erzurumlular Derneği, 1999 yılında İstanbul'da yaşayan Erzurumlu hemşehrilerimizi
                bir araya getirmek, memleketimizin zengin kültürünü yaşatmak ve nesiller arası
                bağı güçlendirmek amacıyla kurulmuştur.
              </p>
              <p className="text-secondary-600 text-lg leading-relaxed">
                Kuruluşumuzdan bu yana binlerce hemşehrimize ulaştık, yüzlerce etkinlik düzenledik
                ve ihtiyaç sahiplerine destek olduk. Erzurum'un dadaşlık ruhunu İstanbul'da
                yaşatmaya devam ediyoruz.
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
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm">Yıllık Tecrübe</div>
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
                Erzurum kültürünü yaşatmak, hemşehrilerimiz arasında dayanışmayı güçlendirmek,
                sosyal yardımlaşma faaliyetleri yürütmek ve gençlerimize değerlerimizi aktarmak.
                Toplumsal sorumluluk bilinciyle hareket ederek, ihtiyaç sahiplerine destek olmak
                ve kültürel mirasımızı gelecek nesillere taşımak temel misyonumuzdur.
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
                Türkiye genelinde ve dünyada Erzurum kültürünün en güçlü temsilcisi olmak,
                hemşehrilerimiz için güvenilir bir dayanışma merkezi haline gelmek. Teknoloji
                ve gelenekleri harmanlayarak, modern çağda kültürel değerlerimizi yaşatan
                öncü bir sivil toplum kuruluşu olmayı hedefliyoruz.
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
                  <img
                    src={boardMembers[0].image}
                    alt={boardMembers[0].name}
                    className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">Başkan Mesajı</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    "Değerli Hemşehrilerim, Erzurumlular Derneği olarak 25 yıldır büyük bir aile
                    olmanın gururunu yaşıyoruz. Kültürümüzü yaşatmak, dayanışmamızı güçlendirmek
                    ve gençlerimize değerlerimizi aktarmak için var gücümüzle çalışıyoruz.
                    Birlik ve beraberlik içinde nice 25 yıllara birlikte yürümeyi diliyorum.
                    Kapımız her zaman tüm Erzurumlu hemşehrilerimize açıktır."
                  </p>
                  <div>
                    <div className="font-bold text-lg">{boardMembers[0].name}</div>
                    <div className="text-white/70">{boardMembers[0].title}</div>
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Yönetim Kurulu"
            subtitle="Derneğimizi yöneten değerli ekibimiz"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 mx-auto rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-accent-500 text-white text-sm font-medium rounded-full whitespace-nowrap">
                      {member.title}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 mt-4 mb-2">{member.name}</h3>
                  <p className="text-secondary-600 text-sm">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hakkimizda;
