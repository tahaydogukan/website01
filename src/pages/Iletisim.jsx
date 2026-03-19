import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    details: ['Atatürk Caddesi No: 123', 'Kadıköy, İstanbul 34710'],
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['(0212) 123 45 67', '(0532) 123 45 67'],
  },
  {
    icon: Mail,
    title: 'E-posta',
    details: ['info@erzurumlulardernegi.org', 'iletisim@erzurumlulardernegi.org'],
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    details: ['Pazartesi - Cuma: 09:00 - 18:00', 'Cumartesi: 10:00 - 14:00'],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: Youtube, href: '#', label: 'Youtube', color: 'hover:bg-red-600' },
];

const Iletisim = () => {
  const [formData, setFormData] = useState({
    adSoyad: '',
    eposta: '',
    konu: '',
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
        title="İletişim"
        subtitle="Bizimle iletişime geçin, sorularınızı yanıtlayalım."
        breadcrumbs={[{ label: 'İletişim' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-primary-500 mb-6">
                İletişim Bilgileri
              </h2>
              <p className="text-secondary-600 mb-8">
                Sorularınız, önerileriniz veya üyelik başvurunuz için bizimle
                iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary-800 mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-secondary-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-bold text-secondary-800 mb-4">Sosyal Medya</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600 transition-all duration-200 ${social.color} hover:text-white`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    Mesajınız Gönderildi!
                  </h3>
                  <p className="text-green-700">
                    Mesajınız başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.
                    Teşekkür ederiz.
                  </p>
                </motion.div>
              ) : (
                <Card padding="lg" className="h-full">
                  <h2 className="text-2xl font-bold text-primary-500 mb-6">
                    Bize Yazın
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                    </div>

                    <div>
                      <label className="block text-secondary-700 font-medium mb-2">
                        Konu *
                      </label>
                      <input
                        type="text"
                        name="konu"
                        value={formData.konu}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Mesajınızın konusu"
                      />
                    </div>

                    <div>
                      <label className="block text-secondary-700 font-medium mb-2">
                        Mesaj *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-secondary-400" />
                        <textarea
                          name="mesaj"
                          value={formData.mesaj}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="input-field pl-12 resize-none"
                          placeholder="Mesajınızı buraya yazın..."
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                      icon={<Send className="w-5 h-5" />}
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-secondary-50">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary-200 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center"
          >
            {/* Google Maps Placeholder */}
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary-600 mb-2">
                Harita Alanı
              </h3>
              <p className="text-secondary-500">
                Google Maps entegrasyonu için bu alana harita eklenebilir.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Iletisim;
