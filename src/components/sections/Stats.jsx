import { motion } from 'framer-motion';
import { CalendarDays, Heart, Scale, Users } from 'lucide-react';

const stats = [
  { icon: CalendarDays, title: '1992', label: 'Kuruluş Yılı' },
  { icon: Users, title: 'Katılımcılık', label: 'Ortak akılla yönetim' },
  { icon: Scale, title: 'Şeffaflık', label: 'Güvene dayalı hizmet' },
  { icon: Heart, title: 'Gönüllülük', label: 'Dayanışmayla güçlenen toplum' },
];

const Stats = () => (
  <section className="py-16 bg-secondary-50">
    <div className="container-custom">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-2xl mb-4">
              <stat.icon className="w-8 h-8 text-primary-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary-500 mb-2">{stat.title}</div>
            <div className="text-secondary-600 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
