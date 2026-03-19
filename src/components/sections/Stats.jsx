import { motion } from 'framer-motion';
import { Users, Calendar, Heart, Award } from 'lucide-react';
import Counter from '../ui/Counter';

const stats = [
  {
    icon: Users,
    value: 1500,
    label: 'Aktif Üye',
    suffix: '+',
  },
  {
    icon: Calendar,
    value: 250,
    label: 'Etkinlik Düzenlendi',
    suffix: '+',
  },
  {
    icon: Heart,
    value: 500,
    label: 'Aileye Yardım',
    suffix: '+',
  },
  {
    icon: Award,
    value: 25,
    label: 'Yıllık Tecrübe',
    suffix: '',
  },
];

const Stats = () => {
  return (
    <section className="py-16 bg-secondary-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8 text-primary-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-secondary-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
