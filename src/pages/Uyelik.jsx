import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Heart,
  Award,
  CheckCircle,
  Send,
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Turnstile from '../components/ui/Turnstile';

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

const KAN_GRUPLARI = [
  'A Rh+', 'A Rh-',
  'B Rh+', 'B Rh-',
  'AB Rh+', 'AB Rh-',
  '0 Rh+', '0 Rh-',
];

const OGRENIM_DURUMLARI = [
  'İlkokul',
  'Ortaokul',
  'Lise',
  'Önlisans',
  'Lisans',
  'Yüksek Lisans',
  'Doktora',
];

const Uyelik = () => {
  const [formData, setFormData] = useState({
    adi: '',
    soyadi: '',
    babaAdi: '',
    anneAdi: '',
    dogumYeri: '',
    dogumTarihi: '',
    tcKimlik: '',
    meslegi: '',
    kanGrubu: '',
    evTelefonu: '',
    isTelefonu: '',
    cepTelefonu: '',
    eposta: '',
    ogrenimDurumu: '',
    il: 'İSTANBUL',
    ilce: 'PENDİK',
    mahalle: '',
    adres: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [publicConfig, setPublicConfig] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [website, setWebsite] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/public-config').then((response) => {
      if (!response.ok || !response.headers.get('Content-Type')?.includes('application/json')) throw new Error();
      return response.json();
    }).then((config) => { if (!cancelled) setPublicConfig(config); })
      .catch(() => { if (!cancelled) setPublicConfig({ acceptingApplications: false }); });
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publicConfig?.acceptingApplications || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken, website }),
      });
      if (!response.headers.get('Content-Type')?.includes('application/json')) throw new Error('Başvuru sistemiyle bağlantı kurulamadı.');
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error(result.error || 'Başvurunuz kaydedilemedi. Lütfen yeniden deneyin.');
      setReference(result.reference);
      setIsSubmitted(true);
    } catch (problem) {
      setSubmitError(problem.message);
    } finally {
      setIsSubmitting(false);
      setTurnstileToken('');
      setAttempt((value) => value + 1);
    }
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
                <p className="mt-5 font-semibold text-green-800">Başvuru numaranız: {reference}</p>
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
                {!publicConfig?.acceptingApplications && <p role="status" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{publicConfig === null ? 'Başvuru sistemi kontrol ediliyor…' : 'Online başvuru sistemi henüz kullanıma açılmadı. Üyelik için dernek merkezimizle iletişime geçebilirsiniz.'}</p>}
                <div hidden aria-hidden="true"><label htmlFor="membership-website">Web sitesi</label><input id="membership-website" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
                {/* Kişisel Bilgiler */}
                <h3 className="text-lg font-bold text-primary-500 mb-4 pb-2 border-b border-secondary-200">
                  Kişisel Bilgiler
                </h3>
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label htmlFor="uyelik-adi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Adı *
                    </label>
                    <input
                      type="text"
                      id="uyelik-adi" name="adi"
                      value={formData.adi}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Adınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-soyadi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Soyadı *
                    </label>
                    <input
                      type="text"
                      id="uyelik-soyadi" name="soyadi"
                      value={formData.soyadi}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-babaAdi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Baba Adı *
                    </label>
                    <input
                      type="text"
                      id="uyelik-babaAdi" name="babaAdi"
                      value={formData.babaAdi}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Baba adı"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-anneAdi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Anne Adı *
                    </label>
                    <input
                      type="text"
                      id="uyelik-anneAdi" name="anneAdi"
                      value={formData.anneAdi}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Anne adı"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-dogumYeri" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Doğum Yeri *
                    </label>
                    <input
                      type="text"
                      id="uyelik-dogumYeri" name="dogumYeri"
                      value={formData.dogumYeri}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Doğum yeriniz"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-dogumTarihi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Doğum Tarihi *
                    </label>
                    <input
                      type="text"
                      id="uyelik-dogumTarihi" name="dogumTarihi"
                      value={formData.dogumTarihi}
                      onChange={handleChange}
                      required
                      pattern="\d{2}\.\d{2}\.\d{4}"
                      maxLength={10}
                      className="input-field"
                      placeholder="gg.aa.yyyy"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-tcKimlik" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      T.C. Kimlik No *
                    </label>
                    <input
                      type="text"
                      id="uyelik-tcKimlik" name="tcKimlik"
                      value={formData.tcKimlik}
                      onChange={handleChange}
                      required
                      pattern="\d{11}"
                      maxLength={11}
                      inputMode="numeric"
                      className="input-field"
                      placeholder="11 haneli T.C. Kimlik No"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-meslegi" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Mesleği *
                    </label>
                    <input
                      type="text"
                      id="uyelik-meslegi" name="meslegi"
                      value={formData.meslegi}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Mesleğiniz"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-kanGrubu" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Kan Grubu *
                    </label>
                    <select
                      id="uyelik-kanGrubu" name="kanGrubu"
                      value={formData.kanGrubu}
                      onChange={handleChange}
                      required
                      className="input-field bg-white"
                    >
                      <option value="">Seçiniz...</option>
                      {KAN_GRUPLARI.map((grup) => (
                        <option key={grup} value={grup}>
                          {grup}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="uyelik-ogrenimDurumu" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Öğrenim Durumu *
                    </label>
                    <select
                      id="uyelik-ogrenimDurumu" name="ogrenimDurumu"
                      value={formData.ogrenimDurumu}
                      onChange={handleChange}
                      required
                      className="input-field bg-white"
                    >
                      <option value="">Seçiniz...</option>
                      {OGRENIM_DURUMLARI.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* İletişim Bilgileri */}
                <h3 className="text-lg font-bold text-primary-500 mb-4 pb-2 border-b border-secondary-200">
                  İletişim Bilgileri
                </h3>
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label htmlFor="uyelik-cepTelefonu" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Cep Telefonu *
                    </label>
                    <input
                      type="tel"
                      id="uyelik-cepTelefonu" name="cepTelefonu"
                      value={formData.cepTelefonu}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="0__________"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-eposta" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      id="uyelik-eposta" name="eposta"
                      value={formData.eposta}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-evTelefonu" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Ev Telefonu{' '}
                      <span className="text-secondary-400 normal-case font-normal">
                        (zorunlu değil)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="uyelik-evTelefonu" name="evTelefonu"
                      value={formData.evTelefonu}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="0__________"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-isTelefonu" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      İş Telefonu{' '}
                      <span className="text-secondary-400 normal-case font-normal">
                        (zorunlu değil)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="uyelik-isTelefonu" name="isTelefonu"
                      value={formData.isTelefonu}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="0__________"
                    />
                  </div>
                </div>

                {/* Adres Bilgileri */}
                <h3 className="text-lg font-bold text-primary-500 mb-4 pb-2 border-b border-secondary-200">
                  Adres Bilgileri
                </h3>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="uyelik-il" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      İl
                    </label>
                    <input
                      type="text"
                      id="uyelik-il" name="il"
                      value={formData.il}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="İSTANBUL"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-ilce" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      İlçe
                    </label>
                    <input
                      type="text"
                      id="uyelik-ilce" name="ilce"
                      value={formData.ilce}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="PENDİK"
                    />
                  </div>

                  <div>
                    <label htmlFor="uyelik-mahalle" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                      Mahalle veya Köy *
                    </label>
                    <input
                      type="text"
                      id="uyelik-mahalle" name="mahalle"
                      value={formData.mahalle}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Mahalle veya köy"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="uyelik-adres" className="block text-secondary-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Açık Adres *
                  </label>
                  <textarea
                    id="uyelik-adres" name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Cadde, sokak, bina ve daire bilgileri"
                  />
                  <p className="text-xs text-secondary-500 mt-2">
                    Başvuru tarihi, bilgileriniz kaydedildiğinde otomatik oluşturulur.
                  </p>
                </div>

                {publicConfig?.acceptingApplications && <Turnstile siteKey={publicConfig.turnstileSiteKey} onVerify={setTurnstileToken} attempt={attempt} />}
                {submitError && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{submitError}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-8"
                  disabled={isSubmitting || !publicConfig?.acceptingApplications || !turnstileToken}
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
