# Uzman Diyetisyen Tanıtım ve Randevu Sitesi

Kişiye özel beslenme danışmanlığı, online diyet ve randevu yönetimi için geliştirilmiş, yüksek performanslı, mobil öncelikli, erişilebilir ve modern bir web uygulaması.

---

## 📸 Ekran Görüntüleri

| Ana Sayfa | Yönetim Paneli |
| :---: | :---: |
| ![Ana Sayfa](public/screenshots/home.png) | ![Yönetim Paneli](public/screenshots/admin.png) |

---

## 🚀 Özellikler

### Public Web Sitesi
- **Hero Bölümü**: Değer önerisi, kademeli giriş animasyonu (60–80ms gecikme), "Randevu Al" ve "Hizmetleri İncele" butonları.
- **Hakkımda**: Diyetisyen profil kartı, biyografi metni, yaklaşım felsefesi ve [BİLGİ GEREKLİ] alanları.
- **Hizmetler**: 6 adet uzmanlık alanı, Lucide ikonlar, özellik maddeleri ve `translateY(-4px)` CSS hover efekti.
- **Danışmanlık Süreci**: 4 adımlı şeffaf süreç akışı (İlk Görüşme, Kişisel Plan, Uygulama & Takip, Hedef Değerlendirme).
- **Blog & Tarifler**: Ana sayfada son yazılar önizlemesi, `/blog` listesi ve `react-markdown` + `remark-gfm` ile render edilen `/blog/[slug]` tekil yazı sayfaları.
- **Danışan Yorumları**: Yalnızca yönetici tarafından onaylanan yorumlar gösterilir; onaylı yorum yoksa bölüm otomatik gizlenir.
- **Sıkça Sorulan Sorular**: Tam erişilebilir, klavye uyumlu Akordeon (`aria-expanded`, `aria-controls`, `role="region"`).
- **Randevu & İletişim Formu**:
  - Çift katmanlı Zod doğrulaması (istemci + Server Action).
  - Türkiye telefon formatı regex kontrolü.
  - Honeypot (`website_url`) ile görünmez bot koruması.
  - Zorunlu KVKK onayı.
  - Yapay 600ms gecikme ve başarı durum ekranı.
  - **Gizlilik**: Hiçbir kişisel veri loglanmaz (`console.log` dahi bulunmaz).
- **KVKK Aydınlatma Metni**: `/kvkk` sayfasında standart bilgilendirme metni.
- **SEO & Performans**:
  - `Physician` ve `Dietetics` JSON-LD yapılandırılmış veri şeması.
  - Dinamik `sitemap.xml` ve `robots.txt` (admin yolları disallow).
  - Sayfa geçişlerinde basit ve performanslı CSS fade-in (`template.tsx`).
  - `prefers-reduced-motion` tercihlerine tam uyum.
  - Kontrast kuralı: Altın (`#D4A853`) asla metin rengi olarak kullanılmamıştır; altın zeminlerde koyu metin (`neutral-900`) garantilenmiştir.

### Yönetim Paneli (`/admin`)
- **noindex**: Arama motoru dizinlerine kesinlikle kapatılmıştır.
- **Demo Giriş Ekranı**: Gerçekçi tasarım, şifre göster/gizle, herhangi bir sahte banner içermeyen profesyonel arayüz.
- **İstemci Store (Zustand + `localStorage`)**:
  - Sayfa yenilense dahi durumlar, notlar ve içerikler tarayıcıda kalır.
- **Randevu Talepleri Yönetimi**:
  - Durum sekmeleri (`Tümü`, `Yeni`, `Arandı`, `Randevu Verildi`, `İptal`) ve sayaçlar.
  - Canlı arama kutusu (isim, telefon, e-posta, hedef).
  - Durum güncelleme ve not ekleme/düzenleme modalı.
  - Yanlışlıkla silinmeyi önleyen silme onay modalı.
  - Boş durum (empty state) tasarımı.
- **İçerik Yönetimi**:
  - Hizmetler: Ekle, düzenle, yayından kaldır, sil.
  - SSS: Ekle, düzenle, sırala, yayından kaldır, sil.
  - Danışan Yorumları: Tek tıkla onaylama/onayı kaldırma, ekle, sil.
  - Blog & Tarifler: Sekmeli Markdown editör + anlık canlı önizleme, Türkçe karakter uyumlu otomatik slug üretimi.

---

## 🛠️ Teknoloji Yığını

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS v4 (`@theme inline` token mimarisi)
- **Tipografi**: Playfair Display (başlıklar) + Inter (gövde) — `next/font/google`
- **Animasyon**: Framer Motion (yalnızca `transform` ve `opacity`, CLS ≈ 0)
- **Form & Doğrulama**: Zod
- **İstemci Durum Yönetimi**: Zustand + `persist` (`localStorage`)
- **İkonlar**: Lucide React + Inline SVG
- **Markdown**: `react-markdown` + `remark-gfm`

---

## 📦 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18.18 veya üzeri
- npm, pnpm veya yarn

### 1. Depoyu İndirin ve Bağımlılıkları Kurun
```bash
cd diyetisyen
npm install
```

### 2. Ortam Değişkenleri
Kök dizindeki `.env.example` dosyasını `.env.local` olarak kopyalayın:
```bash
cp .env.example .env.local
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.
Admin paneline erişmek için: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Prodüksiyon Derlemesi ve Testi
```bash
npm run build
npm run start
```

---

## ☁️ Vercel'e Dağıtım (Deployment)

1. Projeyi bir GitHub / GitLab deposuna push'layın.
2. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin ve **"Add New Project"** seçeneğini tıklayın.
3. Proje deposunu içe aktarın (Import).
4. **Environment Variables** bölümüne:
   - `NEXT_PUBLIC_SITE_URL`: `https://sitenizin-adi.vercel.app` (veya özel alan adınız)
5. **Deploy** butonuna basın. Uygulama otomatik olarak optimize edilip yayınlanacaktır.

---

## 🗄️ Supabase'e Geçiş Kılavuzu (Adım Adım)

Bu prototip, tüm veri erişim işlemlerini tek bir katmanın arkasında toplar: [`src/lib/data/index.ts`](file:///src/lib/data/index.ts).
Gerçek bir veritabanına geçmek, arayüz bileşenlerini değiştirmeyi **gerektirmez**; sadece bu dosyanın içindeki mock fonksiyonlarını Supabase istemcisiyle değiştirmek yeterlidir.

### 1. Supabase Projesi Oluşturma
- [supabase.com](https://supabase.com) adresinden yeni bir proje oluşturun.
- API anahtarlarınızı `.env.local` dosyasına ekleyin:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://proje-id.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key-buraya
  SUPABASE_SERVICE_ROLE_KEY=service-role-key-buraya
  ```

### 2. SQL Tablo Şemalarını Oluşturma
Supabase SQL Editor'da aşağıdaki tabloları çalıştırın:

```sql
-- 1. Randevu Talepleri Tablosu
create type appointment_status as enum ('yeni', 'arandi', 'randevu_verildi', 'iptal');

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  target text not null,
  kvkk_consent boolean not null default true,
  status appointment_status not null default 'yeni',
  note text,
  created_at timestamptz default now()
);

-- 2. Hizmetler Tablosu
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  short_description text not null,
  full_description text not null,
  icon_name text not null,
  features text[] not null default '{}',
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- 3. SSS Tablosu
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- 4. Danışan Yorumları Tablosu
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  feedback text not null,
  service_category text not null,
  is_approved boolean not null default false,
  created_at timestamptz default now()
);

-- 5. Blog Yazıları Tablosu
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  reading_time_minutes int not null default 3,
  is_published boolean not null default false,
  published_at date default current_date,
  created_at timestamptz default now()
);
```

### 3. Supabase İstemcisini Kurma
```bash
npm install @supabase/supabase-js
```
`src/lib/supabase.ts` dosyasını oluşturun:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 4. `src/lib/data/index.ts` Fonksiyonlarını Bağlama
Örnek olarak `getServices` ve `createAppointmentRequest` fonksiyonlarını güncelleyin:

```typescript
import { supabase } from '@/lib/supabase';

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAppointmentRequest(payload: any) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 5. Kimlik Doğrulama (Admin Auth) ve RLS
- Supabase Auth kullanarak `/admin/login` sayfasını `supabase.auth.signInWithPassword()` fonksiyonuna bağlayın.
- Tablolarda Row Level Security (RLS) etkinleştirin:
  - `appointments` tablosunu `INSERT` için herkese (anon), `SELECT/UPDATE/DELETE` için sadece giriş yapmış yöneticiye açın.
  - `services`, `faqs`, `blog_posts`, `testimonials` tablolarını `SELECT` için herkese (aktif olanlar), düzenleme için yöneticiye açın.

---

## 🔒 Güvenlik Notları
- Bu sürüm prototip aşamasındadır; admin paneli istemci tabanlı simüle oturumla çalışır. Canlı ortama alınmadan önce mutlaka gerçek kimlik doğrulama (Supabase Auth / NextAuth) ve RLS kuralları eklenmelidir.
- Form alanlarında honeypot ve Zod doğrulaması mevcuttur; hiçbir kişisel veri sunucu konsoluna basılmaz.
