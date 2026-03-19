import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Heart,
  Award,
  CheckCircle,
  Send,
  User,
  Phone,
  Mail,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const benefits = [
  {
    icon: Calendar,
    title: 'Etkinliklere Öncelikli Katılım',
    description: 'Tüm dernek etkinliklerine öncelikli katılım hakkı ve özel indirimler.',
  },
  {
    icon: Users,
    title: 'Geniş Hemşehri Ağı',
    description: 'Binlerce Erzurumlu hemşehri ile tanışma ve iletişim kurma imkanı.',
  },
  {
    icon: Heart,
    title: 'Sosyal Destek',
    description: 'Zor günlerde dayanışma ve yardımlaşma ağının bir parçası olma.',
  },
  {
    icon: Award,
    title: 'Kültürel Faaliyetler',
    description: 'Erzurum kültürünü yaşatan özel etkinlik ve programlara erişim.',
  },
];

const requirements = [
  '18 yaşını doldurmuş olmak',
  'Erzurum ili veya ilçelerinden birinden olmak ya da Erzurum\'a gönül vermiş olmak',
  'Dernek tüzüğünü ve değerlerini benimsemek',
  'Yıllık üyelik aidatını düzenli ödemek',
];

const Uyelik = () => {
  const [formData, setFormData] = useState({
    adSoyad: '',
    telefon: '',
    eposta: '',
    meslek: '',
    mesaj: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Üyelik"
        subtitle="Erzurum ailesinin bir parçası olun, birlikte daha güçlü olalım."
        breadcrumbs={[{ label: 'Üyelik' }]}
      />

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Üyelik Avantajları"
            subtitle="Derneğimize üye olarak birçok avantajdan yararlanabilirsiniz"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-3">{benefit.title}</h3>
                  <p className="text-secondary-600 text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Üyelik Şartları
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                Nasıl Üye Olabilirsiniz?
              </h2>
              <p className="text-secondary-600 text-lg leading-relaxed mb-8">
                Derneğimize üye olmak için aşağıdaki şartları karşılamanız gerekmektedir.
                Başvurunuz yönetim kurulu tarafından değerlendirildikten sonra üyeliğiniz
                onaylanacaktır.
              </p>

              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-secondary-700">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                alt="Dernek üyeleri"
                className="rounded-2xl shadow-elegant w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Üyelik Başvurusu"
            subtitle="Aşağıdaki formu doldurarak üyelik başvurunuzu yapabilirsiniz"
          />

          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Başvurunuz Alındı!
                </h3>
                <p className="text-green-700">
                  Üyelik başvurunuz başarıyla alınmıştır. Yönetim kurulumuz başvurunuzu
                  inceledikten sonra sizinle iletişime geçecektir. Teşekkür ederiz.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-elegant p-8 md:p-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Ad Soyad */}
                  <div>
                    <label className="block text-secondary-700 font-medium mb-2">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type="text"
                        name="adSoyad"
                        value={formData.adSoyad}
                        onChange={handleChange}
                        required
                        className="input-field pl-12"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="block text-secondary-700 font-medium mb-2">
                      Telefon *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type="tel"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleChange}
                        required
                        className="input-field pl-12"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                  </div>

                  {/* E-posta */}
                  <div>
                    <label className="block text-secondary-700 font-medium mb-2">
                      E-posta *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type="email"
                        name="eposta"
                        value={formData.eposta}
                        onChange={handleChange}
                        required
                        className="input-field pl-12"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  {/* Meslek */}
                  <div>
                    <label className="block text-secondary-700 font-medium mb-2">
                      Meslek
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                      <input
                        type="text"
                        name="meslek"
                        value={formData.meslek}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="Mesleğiniz"
                      />
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div className="md:col-span-2">
                    <label className="block text-secondary-700 font-medium mb-2">
                      Mesaj
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-secondary-400" />
                      <textarea
                        name="mesaj"
                        value={formData.mesaj}
                        onChange={handleChange}
                        rows={4}
                        className="input-field pl-12 resize-none"
                        placeholder="Eklemek istediğiniz bilgiler..."
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-8"
                  disabled={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Uyelik;
