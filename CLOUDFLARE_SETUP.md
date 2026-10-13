# Yönetim paneli ve yayın kurulumu

Panel adresi `/yonetim`. Şimdilik yalnızca bir yönetici desteklenir. Panel başvuruları listeler, arar, durumuna göre süzer, ayrıntılarını gösterir, not ve onay/ret kararını kaydeder ve CSV indirir. Karar değişikliklerinin tarih ve yönetici kaydı tutulur.

## Şu an yerelde

`npm run dev -- --host 127.0.0.1 --port 5174` ile site açılır. `/yonetim` sayfasındaki **Paneli örnek verilerle incele** düğmesi yalnızca geliştirme ortamında görünür. Örnek bilgiler bellektedir; gerçek başvuru değildir ve yenilemede sıfırlanır. Yerel önizlemede üyelik gönderimi kapalıdır. Üretim ortamında önizleme giriş kapısı yoktur.

## Cloudflare hesabı açıldıktan sonra

1. Domaini Cloudflare hesabına ekleyin, DNS yönlendirmesini tamamlayın. Cloudflare hesabı için iki aşamalı doğrulamayı açın.
2. Bilgisayarda `npx wrangler login` ile kendi hesabınıza giriş yapın.
3. `npx wrangler d1 create dernek-basvurular` ile veritabanını oluşturun. Çıkan `database_id` değerini `wrangler.jsonc` içindeki yer tutucu yerine yazın.
4. Aynı dosyaya `routes` alanını ekleyin: `[{ "pattern": "secilen-domain.tld", "custom_domain": true }]`. Örnek domaini gerçek domainle değiştirin. `workers_dev` ve `preview_urls` kapalı kalmalıdır.
5. Zero Trust → Access bölümünde **tek bir Self-hosted uygulama** oluşturun. Aynı uygulamaya domain üzerindeki `/yonetim`, `/yonetim/*`, `/api/admin` ve `/api/admin/*` yollarını ekleyin. Böylece hepsi aynı uygulama AUD değerini kullanır. Site geneli ve `/api/applications` açık kalmalıdır.
6. Giriş yöntemi olarak e-postaya tek kullanımlık kodu seçin. Allow politikası yalnızca yöneticinin **tam e-posta adresini** içersin. Everyone, tüm e-posta domaini veya Bypass politikası eklemeyin. Oturum süresini örneğin bir saat seçin. E-posta hesabında da iki aşamalı doğrulama kullanın.
7. `wrangler.jsonc` → `vars` içinde `ADMIN_EMAIL`, `ACCESS_TEAM_DOMAIN` (örnek: `ekip.cloudflareaccess.com`) ve uygulamanın `ACCESS_AUD` değerini girin. Tek yönetici adresi yazılır; liste kabul edilmez.
8. Turnstile widget oluşturun; yalnızca gerçek domaini izinli hostname yapın. Site anahtarını `TURNSTILE_SITE_KEY` alanına yazın. Gizli anahtarı `npx wrangler secret put TURNSTILE_SECRET_KEY` ile kaydedin; kaynak koduna veya `VITE_` değişkenlerine koymayın. İlk Worker oluşumu gerekirse boş yapılandırmayla dashboard üzerinden oluşturulabilir; herkese açık statik admin yayımlamayın.
9. `npm run db:migrate:remote` ile tabloları oluşturun; ardından `npm test` ve `npm run deploy` çalıştırın. Yayın komutu eksik yapılandırmayı engeller. Access politikası ve secret ayrıca dashboard üzerinde kontrol edilmelidir.
10. Yetkili e-posta ile giriş ve çıkışı deneyin. Gizli pencerede panel/API erişiminin engellendiğini, farklı bir e-postanın reddedildiğini, gerçek form başvurusunun panelde göründüğünü ve kararın yenileme sonrası korunduğunu kontrol edin.

Başvuru kayıtları D1 içindedir. Site ve API aynı Worker üzerinden sunulur. Gizli anahtarlar `.dev.vars` dosyasında yerelde tutulabilir; dosya Git'e eklenmez. Gerçek panel için sunucu Cloudflare imzasını, token süresini, uygulama kimliğini ve tek yönetici e-postasını her istekte doğrular. Sadece linki bilen kişi kayıtları okuyamaz. Yapılandırma eksikken erişim kapalıdır.

Bu sürüm üyelik başvurularını yönetir. Haber, galeri, reklam ve sayfa içeriklerini panelden düzenleme henüz kapsamda değildir. Üyelik formundaki kişisel veriler için derneğin uygun aydınlatma metni ve saklama/silme süreci canlı başvuru açılmadan hazırlanmalıdır.

## Kontroller

`npm test`: imzalı giriş doğrulaması, yetkisiz erişim, gerçek SQLite üzerinde kayıt/filtre/karar, istek kaynağı, form doğrulama ve CSV güvenliği.

`npm run db:migrate:local`: Cloudflare hesabı olmadan yerel D1 tablolarını oluşturur. `npm run dev:cloudflare` gerçek Worker davranışını yerelde çalıştırır; kimlik kontrolünü devre dışı bırakmaz.

Resmi kaynaklar: [Access uygulama tokenı](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/), [Worker ve statik dosya yönlendirmesi](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [Turnstile sunucu doğrulaması](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
