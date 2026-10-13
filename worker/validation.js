import { HttpError } from './security.js';

const fields = {
  adi: 80, soyadi: 80, babaAdi: 80, anneAdi: 80, dogumYeri: 100,
  dogumTarihi: 10, tcKimlik: 11, meslegi: 100, kanGrubu: 8,
  evTelefonu: 30, isTelefonu: 30, cepTelefonu: 30, eposta: 254,
  ogrenimDurumu: 30, il: 80, ilce: 80, mahalle: 100, adres: 1000,
};
const required = ['adi', 'soyadi', 'babaAdi', 'anneAdi', 'dogumYeri', 'dogumTarihi', 'tcKimlik', 'meslegi', 'kanGrubu', 'cepTelefonu', 'eposta', 'ogrenimDurumu', 'mahalle', 'adres'];

export function validateApplication(input, now = new Date()) {
  const data = {};
  for (const [name, max] of Object.entries(fields)) {
    if (input[name] !== undefined && typeof input[name] !== 'string') throw new HttpError(400, 'Form bilgilerini kontrol edin.');
    data[name] = (input[name] || '').trim();
    if (data[name].length > max) throw new HttpError(400, 'Bazı form alanları çok uzun.');
  }
  if (required.some((field) => !data[field])) throw new HttpError(400, 'Zorunlu alanların tamamını doldurun.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.eposta)) throw new HttpError(400, 'Geçerli bir e-posta adresi yazın.');
  if (!/^\+?[\d\s()-]{10,30}$/.test(data.cepTelefonu)) throw new HttpError(400, 'Cep telefonu numaranızı kontrol edin.');
  if (!/^[1-9]\d{10}$/.test(data.tcKimlik)) throw new HttpError(400, 'T.C. kimlik numarası 11 rakamdan oluşmalıdır.');
  if (!['A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', '0 Rh+', '0 Rh-'].includes(data.kanGrubu)) throw new HttpError(400, 'Kan grubu seçimini kontrol edin.');
  if (!['İlkokul', 'Ortaokul', 'Lise', 'Önlisans', 'Lisans', 'Yüksek Lisans', 'Doktora'].includes(data.ogrenimDurumu)) throw new HttpError(400, 'Öğrenim durumu seçimini kontrol edin.');
  const birth = new Date(`${data.dogumTarihi}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.dogumTarihi) || !Number.isFinite(birth.getTime()) || birth.toISOString().slice(0, 10) !== data.dogumTarihi || birth.getUTCFullYear() < 1900) throw new HttpError(400, 'Doğum tarihinizi kontrol edin.');
  const threshold = new Date(now);
  threshold.setUTCFullYear(threshold.getUTCFullYear() - 18);
  if (birth > threshold) throw new HttpError(400, 'Üyelik başvurusu için 18 yaşını doldurmuş olmalısınız.');
  data.eposta = data.eposta.toLowerCase();
  return data;
}

export function csvCell(value) {
  let text = String(value ?? '');
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
