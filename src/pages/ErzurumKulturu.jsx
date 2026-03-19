import { motion } from 'framer-motion';
import {
  Landmark,
  Utensils,
  Music,
  Mountain,
  History,
  Palette,
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';

const historicalInfo = {
  title: 'Tarihi Geçmişi',
  content: `Erzurum, tarihi M.Ö. 4000 yıllarına kadar uzanan kadim bir şehirdir. Urartular, Sasaniler, Selçuklular ve Osmanlılar dönemlerinde önemli bir merkez olmuştur. 1071 Malazgirt Zaferinden sonra Türk yurdu haline gelen şehir, 1829'a kadar Osmanlı hakimiyetinde kalmıştır.

23 Temmuz 1919'da toplanan Erzurum Kongresi, Türk Kurtuluş Savaşı'nın temellerinin atıldığı tarihi bir olaydır. Bu kongre ile Erzurum, Türk tarihinde önemli bir yere sahiptir. Şehir, Dadaşların yurdu olarak bilinir ve kahramanlık sembolüdür.`,
};

const foods = [
  {
    name: 'Cağ Kebabı',
    description: 'Kuzu etinin özel yöntemle pişirilmesiyle hazırlanan, Erzurum\'un dünyaca ünlü lezzeti.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
  },
  {
    name: 'Kadayıf Dolması',
    description: 'Ceviz ile doldurulan kadayıfın şerbetlenerek servis edildiği geleneksel tatlı.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
  },
  {
    name: 'Kesme Çorbası',
    description: 'El açması hamur ile hazırlanan, kış aylarının vazgeçilmez sıcak çorbası.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
  },
  {
    name: 'Su Böreği',
    description: 'İnce açılan hamur katlarıyla hazırlanan, peynirli geleneksel börek.',
    image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=600',
  },
];

const dances = [
  {
    name: 'Bar Oyunları',
    description: 'UNESCO Somut Olmayan Kültürel Miras Listesi\'nde yer alan, Erzurum\'un gururu olan halk oyunlarıdır. Erkek ve kadın barları olmak üzere ikiye ayrılır.',
    details: ['Erkek Barı', 'Kadın Barı', 'Karşılama Barı', 'Tikveş Barı'],
  },
];

const naturalBeauties = [
  {
    name: 'Palandöken Dağları',
    description: 'Türkiye\'nin en önemli kayak merkezlerinden biri. 3176 metre yüksekliğe sahip, Avrupa\'nın en uzun kayak pistlerine ev sahipliği yapar.',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600',
  },
  {
    name: 'Tortum Şelalesi',
    description: '48 metre yükseklikten dökülen, Türkiye\'nin en büyük şelalelerinden biri. Doğa harikası bir güzellik.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600',
  },
  {
    name: 'Çoruh Vadisi',
    description: 'Rafting ve doğa sporları için ideal, eşsiz manzaralara sahip vadi.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
  },
];

const culturalHeritage = [
  {
    name: 'Çifte Minareli Medrese',
    description: '1253 yılında inşa edilen, Selçuklu mimarisinin en güzel örneklerinden biri.',
    icon: Landmark,
  },
  {
    name: 'Yakutiye Medresesi',
    description: '1310 yılında İlhanlılar döneminde yapılmış, görkemli taş işçiliğiyle ünlü.',
    icon: Landmark,
  },
  {
    name: 'Lala Mustafa Paşa Camii',
    description: 'Mimar Sinan\'ın eseri olduğu düşünülen, klasik Osmanlı mimarisinin örneği.',
    icon: Landmark,
  },
  {
    name: 'Erzurum Kalesi',
    description: 'Bizans döneminden kalma, şehrin tarihi siluetinin vazgeçilmez parçası.',
    icon: Landmark,
  },
  {
    name: 'Oltu Taşı',
    description: 'Dünyada sadece Erzurum\'da çıkarılan, siyah kehribar olarak bilinen değerli taş.',
    icon: Palette,
  },
  {
    name: 'Ehram Dokumacılığı',
    description: 'Geleneksel el dokumacılığıyla üretilen, kadın giyiminde kullanılan örtü.',
    icon: Palette,
  },
];

const ErzurumKulturu = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Erzurum Kültürü"
        subtitle="Dadaşların diyarı Erzurum'un zengin kültürel mirasını keşfedin."
        breadcrumbs={[{ label: 'Erzurum Kültürü' }]}
      />

      {/* Tarih Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
                <span className="text-primary-600 font-medium">Tarih</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                {historicalInfo.title}
              </h2>
              <div className="text-secondary-600 leading-relaxed space-y-4">
                {historicalInfo.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800"
                alt="Erzurum tarihi"
                className="rounded-2xl shadow-elegant w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white p-6 rounded-2xl shadow-elegant">
                <div className="text-4xl font-bold">1919</div>
                <div className="text-sm">Erzurum Kongresi</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Yöresel Yemekler */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <SectionTitle
            title="Yöresel Lezzetler"
            subtitle="Erzurum'un damak çatlatan geleneksel yemekleri"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food, index) => (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card padding="none" className="overflow-hidden h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center space-x-2 mb-2">
                      <Utensils className="w-5 h-5 text-accent-500" />
                      <h3 className="text-lg font-bold text-secondary-800">{food.name}</h3>
                    </div>
                    <p className="text-secondary-600 text-sm">{food.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Halk Oyunları */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/80 font-medium">Halk Oyunları</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {dances[0].name}
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                {dances[0].description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {dances[0].details.map((detail, index) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <span className="font-medium">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800"
                alt="Erzurum bar oyunları"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doğal Güzellikler */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Doğal Güzellikler"
            subtitle="Erzurum'un nefes kesen doğal manzaraları"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {naturalBeauties.map((beauty, index) => (
              <motion.div
                key={beauty.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card padding="none" className="overflow-hidden h-full">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={beauty.image}
                      alt={beauty.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Mountain className="w-5 h-5" />
                        <h3 className="text-xl font-bold">{beauty.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-secondary-600">{beauty.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kültürel Miras */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <SectionTitle
            title="Kültürel Miras"
            subtitle="Tarihi yapılar ve el sanatları"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalHeritage.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-800 mb-2">{item.name}</h3>
                      <p className="text-secondary-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 bg-primary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-6xl mb-6">"</div>
            <p className="text-2xl md:text-3xl font-display italic leading-relaxed mb-6">
              Erzurum, bir şehir değil, bir duruştur.
              Dadaşlık, bir kimlik değil, bir onurdur.
            </p>
            <div className="text-white/70">- Erzurum Atasözü</div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ErzurumKulturu;
