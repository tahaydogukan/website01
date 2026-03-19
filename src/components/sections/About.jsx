import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const features = [
  'Kültürel mirasımızı yaşatmak',
  'Hemşehrilerimizi bir araya getirmek',
  'Dayanışma ve yardımlaşmayı güçlendirmek',
  'Gençlerimize değerlerimizi aktarmak',
];

const About = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                alt="Dernek üyeleri bir arada"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-elegant max-w-xs hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-600">25</span>
                </div>
                <div>
                  <div className="font-bold text-secondary-800">Yıllık Tecrübe</div>
                  <div className="text-sm text-secondary-500">1999'dan beri hizmet veriyoruz</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-accent-500/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
              Hakkımızda
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-500 mb-6 leading-tight">
              Erzurum Sevgisi ile
              <span className="block text-secondary-700">Birleşen Gönüller</span>
            </h2>
            <p className="text-secondary-600 text-lg leading-relaxed mb-8">
              Erzurumlular Derneği olarak, memleketimizin zengin kültürünü yaşatmak,
              hemşehrilerimiz arasındaki dayanışmayı güçlendirmek ve gelecek nesillere
              değerlerimizi aktarmak için var gücümüzle çalışıyoruz. 25 yıllık köklü
              geçmişimizle binlerce hemşehrimize ulaştık.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0" />
                  <span className="text-secondary-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              to="/hakkimizda"
              variant="primary"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Daha Fazla Bilgi
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
