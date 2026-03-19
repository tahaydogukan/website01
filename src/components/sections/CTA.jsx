import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Erzurum Ailesinin Bir Parçası Olun
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Kültürümüzü birlikte yaşatalım, dayanışmamızı büyütelim.
              Aramıza katılın, birlikte daha güçlü olalım!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                to="/uyelik"
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Hemen Üye Ol
              </Button>
              <Button
                to="/iletisim"
                variant="ghost"
                size="lg"
                className="text-white border-2 border-white/30 hover:bg-white/10"
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
              >
                Bize Ulaşın
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
