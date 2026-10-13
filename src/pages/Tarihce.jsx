import { motion } from 'framer-motion';
import { BookOpen, Flag, Users, ArrowRight } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';

const Tarihce = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Tarihçemiz"
        subtitle="1992'den bugüne birlik, kültür ve dayanışmayla büyüyen hikâyemiz."
        breadcrumbs={[{ label: 'Tarihçemiz' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary-500" />
              </div>
              <span className="inline-block px-4 py-2 bg-accent-500/10 text-accent-700 rounded-full text-sm font-semibold mb-4">
                1992'den beri
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500">
                Köklerimizden Geleceğe
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-secondary-600 text-lg leading-relaxed"
            >
              <p>
                Pendik Kaynarca Erzurumlular Kültür ve Dayanışma Derneği, 1992 yılında
                kurucu başkan Fikri Bayır'ın öncülüğünde; Erzurumlu hemşehriler arasında
                birlik, beraberlik ve dayanışmayı güçlendirmek, kültürel değerleri yaşatmak
                ve gelecek nesillere aktarmak amacıyla kurulmuştur.
              </p>
              <p>
                Kurulduğu günden bu yana derneğimiz, hemşehrilerimizin bir araya geldiği,
                sosyal dayanışmanın güçlendiği ve ortak kültürümüzün yaşatıldığı önemli bir
                buluşma noktası olmuştur. Gerçekleştirdiği sosyal, kültürel ve dayanışma
                odaklı faaliyetlerle yalnızca üyelerine değil, yaşadığı çevreye de katkı
                sunmayı ilke edinmiştir.
              </p>
              <p>
                Kurucumuz Fikri Bayır'ın ortaya koyduğu birlik ve hizmet anlayışı bugün de
                derneğimizin en önemli yol göstericisi olmaya devam etmektedir. Bu köklü
                mirası devralan Dernek Başkanımız Mehdi Kaya'nın liderliğinde çalışmalarımız
                aynı değer ve hedefler doğrultusunda kararlılıkla sürdürülmektedir.
              </p>
              <p>
                Geçmişinden aldığı güçle geleceğe güvenle yürüyen derneğimiz; Erzurum'un
                köklü kültürünü, Dadaşlık ruhunu ve yardımlaşma geleneğini yaşatmaya, birlik
                ve beraberlik içinde toplumumuza hizmet etmeye devam etmektedir.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { icon: Flag, title: '1992', text: 'Fikri Bayır öncülüğünde kuruluş' },
              { icon: Users, title: 'Bugün', text: 'Mehdi Kaya başkanlığında güçlü dayanışma' },
              { icon: ArrowRight, title: 'Gelecek', text: 'Kültürümüzü yeni nesillere aktarma hedefi' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-secondary-50 p-6 text-center border border-secondary-100"
              >
                <item.icon className="w-8 h-8 text-accent-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary-500 mb-2">{item.title}</h3>
                <p className="text-secondary-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Tarihce;
