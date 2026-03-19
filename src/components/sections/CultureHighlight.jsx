import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Utensils, Music, Landmark } from 'lucide-react';
import Button from '../ui/Button';

const cultureItems = [
  {
    icon: Mountain,
    title: 'Palandöken Dağları',
    description: 'Türkiye\'nin en önemli kayak merkezlerinden biri',
    color: 'bg-blue-500',
  },
  {
    icon: Utensils,
    title: 'Cağ Kebabı',
    description: 'Dünyaca ünlü geleneksel Erzurum lezzeti',
    color: 'bg-orange-500',
  },
  {
    icon: Music,
    title: 'Bar Oyunları',
    description: 'UNESCO kültürel miras listesindeki halk oyunları',
    color: 'bg-purple-500',
  },
  {
    icon: Landmark,
    title: 'Tarihi Eserler',
    description: 'Çifte Minareli Medrese ve tarihi yapılar',
    color: 'bg-emerald-500',
  },
];

const CultureHighlight = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              Erzurum'u Keşfedin
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Dadaşların Diyarı
              <span className="block text-accent-400">Erzurum</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Erzurum, Türkiye'nin doğusunda tarihi ve kültürel zenginlikleriyle öne çıkan
              kadim bir şehirdir. Eşsiz doğal güzellikleri, zengin mutfağı ve köklü
              gelenekleriyle binlerce yıllık bir medeniyetin izlerini taşır.
            </p>

            {/* Quote */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="absolute -top-3 -left-2 text-6xl text-accent-400 font-serif">"</div>
              <p className="text-white italic pl-8">
                Erzurum, kahramanlığın, fedakarlığın ve yiğitliğin simgesidir.
                Dadaşların memleketi, tarihin her döneminde önemini korumuştur.
              </p>
            </div>

            <Button
              to="/erzurum-kulturu"
              variant="white"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Erzurum'u Keşfet
            </Button>
          </motion.div>

          {/* Culture Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {cultureItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CultureHighlight;
