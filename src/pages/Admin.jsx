import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle, ChevronLeft, ChevronRight, Clock, Download, FileText, Inbox, LockKeyhole, LogOut, RefreshCw, Search, ShieldCheck, X, XCircle } from 'lucide-react';

const statusLabels = { pending: 'Bekliyor', approved: 'Onaylandı', rejected: 'Reddedildi' };
const statusStyles = { pending: 'bg-amber-50 text-amber-800 border-amber-200', approved: 'bg-emerald-50 text-emerald-800 border-emerald-200', rejected: 'bg-rose-50 text-rose-800 border-rose-200' };
const fieldLabels = { adi: 'Adı', soyadi: 'Soyadı', eposta: 'E-posta', cepTelefonu: 'Cep telefonu', dogumTarihi: 'Doğum tarihi', dogumYeri: 'Doğum yeri', tcKimlik: 'T.C. kimlik numarası', babaAdi: 'Baba adı', anneAdi: 'Anne adı', meslegi: 'Meslek', ogrenimDurumu: 'Öğrenim durumu', kanGrubu: 'Kan grubu', il: 'İl', ilce: 'İlçe', mahalle: 'Mahalle / köy', adres: 'Adres', evTelefonu: 'Ev telefonu', isTelefonu: 'İş telefonu' };
const dateFormat = (value) => new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeZone: 'Europe/Istanbul' }).format(new Date(value));

function makeExamples() {
  return ['pending', 'pending', 'approved', 'pending', 'rejected'].map((status, i) => ({
    id: `example-${i}`, reference: `ÖRNEK-00${i + 1}`, name: `Örnek Başvuru ${i + 1}`, email: `basvuru${i + 1}@example.invalid`, phone: 'Örnek telefon',
    status, notes: '', created_at: new Date(Date.now() - i * 86400000).toISOString(),
    payload: { adi: 'Örnek', soyadi: `Başvuru ${i + 1}`, eposta: `basvuru${i + 1}@example.invalid`, cepTelefonu: 'Örnek telefon', il: 'İstanbul', ilce: 'Pendik', adres: 'Bu kayıt yalnızca paneli incelemek içindir.' },
  }));
}

async function api(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', redirect: 'error', ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers } });
  if (!response.headers.get('Content-Type')?.includes('application/json')) {
    const error = new Error('Yönetici bağlantısı henüz yapılandırılmadı.');
    error.code = 'setup_required';
    throw error;
  }
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.error || 'İşlem tamamlanamadı.');
    error.code = body.code;
    throw error;
  }
  return body;
}

function Status({ status }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [gateError, setGateError] = useState(null);
  const [preview, setPreview] = useState(false);
  const [examples, setExamples] = useState(makeExamples);
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState('pending');
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const detailsHeading = useRef(null);
  const canPreview = import.meta.env.DEV;
  const params = new URLSearchParams({ status, q: search, page: String(page) });

  useEffect(() => {
    document.title = 'Yönetim Paneli · Pendik Kaynarca Erzurumlular Derneği';
    return () => { document.title = 'Pendik Kaynarca Erzurumlular Kültür ve Dayanışma Derneği'; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setChecking(true);
    api('/api/admin/session').then((result) => { if (!cancelled) { setSession(result); setGateError(null); } })
      .catch((problem) => { if (!cancelled) setGateError(problem); })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!session && !preview) return;
    let cancelled = false;
    setError('');
    if (preview) {
      const needle = search.toLocaleLowerCase('tr-TR');
      const filtered = examples.filter((item) => (status === 'all' || status === item.status) && `${item.name} ${item.email} ${item.reference}`.toLocaleLowerCase('tr-TR').includes(needle));
      setApplications(filtered.slice((page - 1) * 20, page * 20));
      setTotal(filtered.length);
      setCounts(Object.fromEntries(Object.keys(statusLabels).map((key) => [key, examples.filter((item) => item.status === key).length])));
      return;
    }
    setLoading(true);
    api(`/api/admin/applications?${new URLSearchParams({ status, q: search, page: String(page) })}`).then((result) => {
      if (!cancelled) { setApplications(result.applications); setCounts(result.counts); setTotal(result.total); }
    }).catch((problem) => { if (!cancelled) { setApplications([]); setError(problem.message); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [session, preview, examples, status, search, page, refresh]);

  useEffect(() => { if (selected) detailsHeading.current?.focus(); }, [selected?.id]);

  async function openApplication(item) {
    setError(''); setMessage('');
    try {
      const detail = preview ? item : await api(`/api/admin/applications/${item.id}`);
      setSelected(detail); setNotes(detail.notes || ''); setDecision(detail.status);
    } catch (problem) { setError(problem.message); }
  }

  async function saveDecision(event) {
    event.preventDefault();
    setSaving(true); setError(''); setMessage('');
    try {
      if (preview) setExamples((items) => items.map((item) => item.id === selected.id ? { ...item, status: decision, notes } : item));
      else await api(`/api/admin/applications/${selected.id}`, { method: 'PATCH', body: JSON.stringify({ status: decision, notes }) });
      setSelected((item) => ({ ...item, status: decision, notes }));
      setRefresh((value) => value + 1);
      setMessage(preview ? 'Örnek kayıt güncellendi. Bu değişiklik yalnızca önizleme oturumunda geçerli.' : 'Başvuru güncellendi.');
    } catch (problem) { setError(problem.message); }
    finally { setSaving(false); }
  }

  async function exportApplications() {
    if (preview) { setMessage('Dışa aktarma gerçek başvurularla kullanıma açılacak.'); return; }
    setExporting(true); setError('');
    try {
      const response = await fetch(`/api/admin/applications/export?${params}`, { credentials: 'same-origin', redirect: 'error' });
      if (!response.ok || !response.headers.get('Content-Type')?.includes('text/csv')) throw new Error('Başvurular dışa aktarılamadı.');
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a'); link.href = objectUrl; link.download = 'basvurular.csv'; link.click();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (problem) { setError(problem.message); }
    finally { setExporting(false); }
  }

  const header = <header className="border-b border-secondary-200 bg-white"><div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-20 flex items-center justify-between gap-4"><Link to="/" className="flex items-center gap-3 min-w-0"><img src="/images/dernek-logo.png" alt="Dernek logosu" className="w-12 h-12 shrink-0" /><div className="min-w-0"><p className="font-semibold text-primary-500 text-sm sm:text-base">Pendik Kaynarca</p><p className="text-xs text-secondary-500 mt-0.5">Dernek yönetimi</p></div></Link><Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-secondary-600 hover:text-primary-500"><ArrowLeft className="h-4 w-4" />Siteye dön</Link></div></header>;

  if (!session && !preview) return <div className="min-h-screen bg-secondary-50">{header}<main className="max-w-xl mx-auto px-4 py-14 sm:py-20"><div className="bg-white border border-secondary-200 rounded-3xl p-7 sm:p-10 shadow-soft"><div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6"><LockKeyhole className="w-7 h-7 text-primary-500" /></div><p className="text-xs uppercase tracking-widest font-semibold text-accent-700 mb-3">Yetkili erişimi</p><h1 className="text-3xl font-bold text-primary-500 mb-4">Yönetim Paneli</h1><p className="text-secondary-600 leading-relaxed">Üyelik başvurularını incelemek ve değerlendirmek için yönetici hesabınızla giriş yapın.</p><div className="mt-7 rounded-xl bg-secondary-50 border border-secondary-200 p-4 text-sm text-secondary-600" role="status">{checking ? 'Giriş durumu kontrol ediliyor…' : gateError?.code === 'setup_required' ? 'Yönetici girişi henüz etkinleştirilmedi. Cloudflare kurulumu tamamlandığında yetkili e-posta adresinize gelen kodla giriş yapabileceksiniz.' : 'Bu sayfa yalnızca yetkili yöneticiye açıktır. Girişinizi yenileyin veya site sorumlusuyla iletişime geçin.'}</div><button type="button" onClick={() => window.location.reload()} className="mt-6 inline-flex items-center justify-center gap-2 min-h-11 w-full rounded-xl bg-primary-500 px-5 py-3 font-semibold text-white hover:bg-primary-600" disabled={checking}><ShieldCheck className="w-4 h-4" />{checking ? 'Kontrol ediliyor…' : 'Yönetici girişini aç'}</button>{canPreview && <button type="button" onClick={() => setPreview(true)} className="mt-3 inline-flex items-center justify-center gap-2 min-h-11 w-full rounded-xl border border-secondary-300 px-5 py-3 font-semibold text-primary-500 hover:bg-secondary-50">Paneli örnek verilerle incele <ArrowRight className="w-4 h-4" /></button>}<p className="mt-5 flex items-start gap-2 text-xs text-secondary-500 leading-relaxed"><ShieldCheck className="w-4 h-4 shrink-0" />Giriş bağlantısını bilmek erişim yetkisi vermez. Başvuru bilgileri yetkilendirme kontrolüyle korunur.</p></div></main></div>;

  const allCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const cards = [{ title: 'Toplam başvuru', value: allCount, icon: FileText, filter: 'all', color: 'text-primary-500 bg-primary-50' }, { title: 'Değerlendirilecek', value: counts.pending || 0, icon: Clock, filter: 'pending', color: 'text-amber-700 bg-amber-50' }, { title: 'Onaylanan', value: counts.approved || 0, icon: CheckCircle, filter: 'approved', color: 'text-emerald-700 bg-emerald-50' }, { title: 'Reddedilen', value: counts.rejected || 0, icon: XCircle, filter: 'rejected', color: 'text-rose-700 bg-rose-50' }];

  return <div className="min-h-screen bg-secondary-50">{header}<div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
    {preview && <div className="mb-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex flex-wrap items-center justify-between gap-3"><span><strong>Önizleme modu.</strong> Kayıtlar örnektir; değişiklikler bu oturumda kalır.</span><button type="button" onClick={() => { setPreview(false); setSelected(null); }} className="underline font-semibold min-h-11">Önizlemeden çık</button></div>}
    <div className="flex flex-wrap items-start justify-between gap-5 mb-8"><div><p className="text-xs uppercase tracking-widest font-semibold text-accent-700 mb-2">Yönetim paneli</p><h1 className="text-3xl sm:text-4xl font-bold text-primary-500">Üyelik Başvuruları</h1><p className="text-secondary-500 mt-3">Başvuruları inceleyin, değerlendirin ve durumlarını takip edin.</p></div><div className="flex items-center gap-3"><span className="hidden sm:block text-xs text-secondary-500">{preview ? 'Örnek yönetici' : session.email}</span>{!preview && <a href="/cdn-cgi/access/logout" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-secondary-200 bg-white px-4 py-2 text-sm text-secondary-600"><LogOut className="h-4 w-4" />Çıkış</a>}</div></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">{cards.map((card) => <button key={card.filter} type="button" aria-pressed={status === card.filter} onClick={() => { setStatus(card.filter); setPage(1); }} className={`rounded-2xl border bg-white p-4 sm:p-6 text-left transition-shadow hover:shadow-soft ${status === card.filter ? 'border-primary-500 ring-1 ring-primary-500' : 'border-secondary-200'}`}><div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color}`}><card.icon className="h-5 w-5" /></div><p className="text-3xl font-semibold text-primary-500">{card.value}</p><p className="text-xs sm:text-sm text-secondary-500 mt-2">{card.title}</p></button>)}</div>
    {message && <p role="status" className="mb-5 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800"><Check className="w-4 h-4 shrink-0 mt-0.5" />{message}</p>}
    {error && <p role="alert" className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800">{error}</p>}
    <div className={`grid gap-6 ${selected ? 'xl:grid-cols-[minmax(0,1fr)_380px]' : ''}`}><main className="min-w-0 rounded-2xl border border-secondary-200 bg-white overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-secondary-200 flex flex-wrap items-center gap-3"><form className="flex flex-1 min-w-[200px] gap-2" onSubmit={(event) => { event.preventDefault(); setSearch(query); setPage(1); }}><div className="relative flex-1"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" /><input aria-label="Başvurularda ara" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="İsim, e-posta veya başvuru no" className="input-field pl-10 text-sm" maxLength={100} /></div><button type="submit" className="rounded-lg bg-primary-500 px-4 text-white text-sm font-semibold min-h-11">Ara</button></form><label className="sr-only" htmlFor="application-status-filter">Başvuru durumu</label><select id="application-status-filter" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="input-field w-auto text-sm"><option value="all">Tüm durumlar</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button type="button" onClick={() => setRefresh((value) => value + 1)} aria-label="Başvuruları yenile" disabled={loading} className="h-11 w-11 rounded-lg border border-secondary-200 flex items-center justify-center text-secondary-600"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button><button type="button" onClick={exportApplications} disabled={exporting} className="min-h-11 rounded-lg border border-secondary-200 px-3 flex items-center gap-2 text-sm font-medium text-secondary-600"><Download className="w-4 h-4" />{exporting ? 'Hazırlanıyor…' : 'Dışa aktar'}</button></div>
      <div className="divide-y divide-secondary-100">{loading ? <p role="status" className="p-12 text-center text-secondary-500">Başvurular yükleniyor…</p> : applications.length === 0 ? <div className="p-12 text-center"><Inbox className="mx-auto w-10 h-10 text-secondary-300 mb-4" /><h2 className="font-bold text-primary-500 text-lg">{search || status !== 'all' ? 'Bu filtreye uygun başvuru yok' : 'Henüz başvuru yok'}</h2><p className="text-sm text-secondary-500 mt-2">{search || status !== 'all' ? 'Arama veya durum filtresini değiştirin.' : 'Üyelik formundan gelen başvurular burada görünecek.'}</p></div> : applications.map((item) => <button type="button" key={item.id} onClick={() => openApplication(item)} aria-label={`${item.name} başvurusunu incele`} className={`w-full text-left p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center gap-4 hover:bg-secondary-50 transition-colors ${selected?.id === item.id ? 'bg-primary-50/50' : ''}`}><div className="hidden sm:flex w-10 h-10 rounded-full bg-primary-50 items-center justify-center text-primary-500 font-semibold shrink-0" aria-hidden="true">{item.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</div><div className="flex-1 min-w-0"><p className="text-sm font-semibold text-primary-500">{item.name}</p><p className="text-xs text-secondary-500 mt-1 break-all">{item.email}</p></div><div className="text-xs text-secondary-500"><p>{dateFormat(item.created_at)}</p><p className="mt-1">{item.reference}</p></div><Status status={item.status} /><ChevronRight className="w-4 h-4 text-secondary-400 shrink-0" /></button>)}</div>
      <div className="p-4 sm:p-5 border-t border-secondary-200 flex items-center justify-between gap-3 text-sm text-secondary-500"><span>{total} başvuru · Sayfa {page}</span><div className="flex gap-2"><button type="button" aria-label="Önceki sayfa" onClick={() => setPage((value) => value - 1)} disabled={page <= 1 || loading} className="w-10 h-10 border border-secondary-200 rounded-lg flex items-center justify-center disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button><button type="button" aria-label="Sonraki sayfa" onClick={() => setPage((value) => value + 1)} disabled={page * 20 >= total || loading} className="w-10 h-10 border border-secondary-200 rounded-lg flex items-center justify-center disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button></div></div>
    </main>
    {selected && <aside className="rounded-2xl border border-secondary-200 bg-white p-5 sm:p-6 self-start"><div className="flex items-start justify-between gap-3 mb-5"><div><p className="text-xs text-secondary-500 mb-1">{selected.reference}</p><h2 ref={detailsHeading} tabIndex={-1} className="text-2xl font-bold text-primary-500">Başvuru Detayı</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Başvuru detayını kapat" className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-secondary-50 text-secondary-500"><X className="w-5 h-5" /></button></div><p className="font-semibold text-primary-500 mb-2">{selected.name}</p><div className="flex flex-wrap items-center gap-3 mb-6"><Status status={selected.status} /><span className="text-xs text-secondary-500">{dateFormat(selected.created_at)}</span></div><dl className="space-y-4 border-y border-secondary-100 py-5 mb-6">{Object.entries(fieldLabels).filter(([key]) => selected.payload?.[key]).map(([key, label]) => <div key={key}><dt className="text-xs text-secondary-500 mb-1">{label}</dt><dd className="text-sm text-secondary-800 break-words whitespace-pre-wrap">{selected.payload[key]}</dd></div>)}</dl><form onSubmit={saveDecision}><label htmlFor="application-decision" className="block text-sm font-semibold text-primary-500 mb-2">Değerlendirme durumu</label><select id="application-decision" value={decision} onChange={(event) => setDecision(event.target.value)} className="input-field text-sm mb-5">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><label htmlFor="application-notes" className="block text-sm font-semibold text-primary-500 mb-2">Yönetici notu</label><textarea id="application-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} maxLength={2000} placeholder="Başvuru hakkında iç değerlendirme…" className="input-field text-sm resize-y" /><p className="text-xs text-secondary-500 mt-2">Bu not yalnızca yönetici tarafından görülebilir.</p><button type="submit" disabled={saving} className="mt-5 w-full min-h-11 rounded-xl bg-primary-500 text-white py-3 font-semibold disabled:opacity-50">{saving ? 'Kaydediliyor…' : 'Değerlendirmeyi kaydet'}</button></form></aside>}
    </div><p className="mt-7 flex items-center justify-center gap-2 text-xs text-secondary-400"><ShieldCheck className="w-4 h-4" />Yalnızca yetkili yönetici erişimi</p>
  </div></div>;
}
