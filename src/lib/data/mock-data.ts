import { Service, FaqItem, BlogPost, Testimonial, AppointmentRequest } from '@/lib/types';

export const mockServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Bireysel Beslenme Danışmanlığı',
    shortDescription: 'Günlük yaşam ritminize, sağlık geçmişinize ve besin tercihlerinize özel sürdürülebilir beslenme planlaması.',
    fullDescription: 'Bireysel danışmanlık sürecinde, katı kısıtlamalar yerine yaşam boyu sürdürülebilecek doğru beslenme alışkanlıkları kazanmanıza odaklanıyoruz. Kan tahlili değerlendirmesi, haftalık takip ve porsiyon yönetimi eğitimi dahildir.',
    iconName: 'UserCheck',
    features: ['Ayrıntılı beslenme analizi', 'Haftalık online/yüz yüze takip', 'Kişiye özel tarif önerileri', 'Sürekli WhatsApp desteği'],
    order: 1,
    isActive: true,
  },
  {
    id: 'srv-2',
    title: 'Online Diyet Danışmanlığı',
    shortDescription: 'Mekandan bağımsız, esnek randevu saatleriyle konforlu dijital beslenme takibi.',
    fullDescription: 'Şehir dışında veya yoğun tempoda olan danışanlarımız için görüntülü görüşmeler, dijital takip formu ve anlık mesajlaşma desteğiyle kesintisiz rehberlik sunuyoruz.',
    iconName: 'Laptop',
    features: ['Görüntülü seanslar', 'Mobil uyumlu dijital takip', 'Haftalık menü revizyonları', 'Pratik ofis ve seyahat alternatifleri'],
    order: 2,
    isActive: true,
  },
  {
    id: 'srv-3',
    title: 'Kilo Yönetimi (Kilo Alma / Verme)',
    shortDescription: 'Aç kalmadan, kas kütlesini koruyarak sağlıklı beden kompozisyonuna ulaşma süreci.',
    fullDescription: 'Metabolik hızınızı, günlük enerji harcamanızı ve hormonal dengenizi dikkate alarak hedeflenen kiloya güvenli ve dengeli adımlarla ulaşmanızı sağlıyoruz.',
    iconName: 'Scale',
    features: ['Vücut kompozisyonu analizi', 'Metabolizmaya uygun kalori dengesi', 'Duygusal yeme farkındalığı', 'Hedefe ulaşıldığında kilo koruma programı'],
    order: 3,
    isActive: true,
  },
  {
    id: 'srv-4',
    title: 'Gebelikte & Emzirme Döneminde Beslenme',
    shortDescription: 'Anne ve bebeğin tüm besin öğesi gereksinimlerini karşılayan güvenli beslenme rehberliği.',
    fullDescription: 'Gebelik haftalarına göre değişen makro ve mikro besin ihtiyaçları, bulantı/mide hassasiyeti yönetimi ve emzirme döneminde süt verimini destekleyici dengeli beslenme yaklaşımı.',
    iconName: 'HeartHandshake',
    features: ['Trimester bazlı beslenme planı', 'Gebelikte güvenli kilo artış takibi', 'Sindirim hassasiyetine özel öneriler', 'Emzirme dostu besin sepeti'],
    order: 4,
    isActive: true,
  },
  {
    id: 'srv-5',
    title: 'Sporcu Beslenmesi',
    shortDescription: 'Antrenman verimini, toparlanma hızını ve performansı maksimize eden makro planlama.',
    fullDescription: 'Branşınıza, antrenman yoğunluğunuza ve müsabaka takviminize göre optimize edilmiş öğün zamanlamaları, hidrasyon stratejisi ve destek ürün değerlendirmesi.',
    iconName: 'Activity',
    features: ['Antrenman öncesi ve sonrası öğünler', 'Glikojen depolarını yenileme planı', 'Hidrasyon takibi', 'Performans odaklı makro dağılımı'],
    order: 5,
    isActive: true,
  },
  {
    id: 'srv-6',
    title: 'Hastalıklarda Tıbbi Beslenme Tedavisi',
    shortDescription: 'İnsülin direnci, PCOS, tiroid ve sindirim rahatsızlıklarında hekim tedavisine destek beslenme.',
    fullDescription: 'Hekiminizin belirlediği medikal tedaviyle tam uyumlu, laboratuvar bulgularına ve semptomlara yönelik bilimsel beslenme protokolleri.',
    iconName: 'ShieldAlert',
    features: ['Kan bulgularına özel diyet', 'GİS / Bağırsak dostu eliminasyon yaklaşımları', 'İnsülin duyarlılığını artıran öğünler', 'Tıbbi takiple paralel izlem'],
    order: 6,
    isActive: true,
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'İlk görüşmede neler yapılıyor?',
    answer: 'İlk seansta mevcut beslenme alışkanlıklarınız, sağlık geçmişiniz, günlük rutininiz ve hedefleriniz detaylıca dinlenir. Varsa son kan tahlilleriniz incelenir ve yaşam tarzınıza en uygun beslenme yol haritası birlikte belirlenir.',
    order: 1,
    isActive: true,
  },
  {
    id: 'faq-2',
    question: 'Online diyet görüşmeleri nasıl gerçekleşiyor?',
    answer: 'Online seanslar Google Meet veya WhatsApp görüntülü arama üzerinden yapılmaktadır. Seans öncesinde ölçümlerinizi paylaşabileceğiniz form iletilir ve görüşme sonrasında kişisel beslenme planınız PDF olarak dijital ortamda teslim edilir.',
    order: 2,
    isActive: true,
  },
  {
    id: 'faq-3',
    question: 'Görüşmeye gelmeden önce kan tahlili yaptırmalı mıyım?',
    answer: 'Son 6 ay içinde yapılmış açlık kan şekeri, insülin, tiroid paneli, hemogram, karaciğer enzimleri ve vitamin düzeylerini (D vitamini, B12, ferritin) gösteren tahlilleriniz varsa çok faydalı olur. Yoksa ilk görüşmede hekiminize danışmanız için gerekli parametreler listelenir.',
    order: 3,
    isActive: true,
  },
  {
    id: 'faq-4',
    question: 'Listeler çok katı mı, sevdiğim yiyecekleri bırakmak zorunda mıyım?',
    answer: 'Hayır. Yasakçı ve katı kısıtlamalar yerine, porsiyon kontrolü ve alternatif dengeleme prensiplerini uyguluyoruz. Amacımız sosyal yaşamınızı kısıtlamadan sürdürülebilir alışkanlıklar inşa etmektir.',
    order: 4,
    isActive: true,
  },
  {
    id: 'faq-5',
    question: 'Görüşmeler ne sıklıkla yapılıyor?',
    answer: 'Standart süreçte görüşmeler haftada bir gün, belirlenen sabit saatte gerçekleştirilir. Haftalık kontrollerde kilo/ölçüm değişimi değerlendirilir ve menü ihtiyaca göre güncellenir.',
    order: 5,
    isActive: true,
  },
  {
    id: 'faq-6',
    question: 'Hafta içi seans aralarında soru sorabiliyor muyum?',
    answer: 'Evet, aktif danışanlarımız hafta içi mesai saatleri (09:00 - 18:00) içerisinde acil durumlar veya menü alternatifleri için WhatsApp üzerinden danışabilirler.',
    order: 6,
    isActive: true,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'surdurulebilir-beslenme-aliskanliklari',
    title: 'Katı Diyetler Yerine Sürdürülebilir Beslenme Alışkanlıkları',
    excerpt: 'Hızlı kilo verdiren şok diyetlerin neden geri tepki yarattığını ve kalıcı sağlığın sırrının nasıl küçük adımlarda yattığını inceledik.',
    content: `## Şok Diyetlerin Kısır Döngüsü

Birçok insan hızlı sonuç alma arzusuyla çok düşük kalorili ve tek tip beslenmeye dayalı programlara yönelir. Ancak vücut bu durumu bir **kıtlık sinyali** olarak algılar ve metabolizma hızını yavaşlatır.

### Neden Sürdürülebilirlik Önemlidir?
- **Kas Kütlesinin Korunması:** Hızlı kilo kayıplarında giden çoğunlukla su ve kas dokusudur.
- **Duygusal İlişki:** Yasaklanan besinler zihinde daha çekici hale gelir ve sonrasında kontrolsüz yeme ataklarına yol açabilir.
- **Sosyal Yaşam:** Katı listeler dışarıda arkadaşlarınızla ya da ailenizle yemek yemeyi stres kaynağına dönüştürür.

> Sağlıklı beslenme bir varış noktası değil, yaşam boyu size enerji ve zindelik veren bir yolculuktur.

### Atabileceğiniz 3 Pratik Adım
1. **Tabağınızı Renklendirin:** Her ana öğünde tabağınızın en az yarısını mevsim sebzeleriyle doldurun.
2. **Yeterli Su Tüketimi:** Susuzluk hissi sıklıkla açlıkla karıştırılır. Günlük 2-2.5 litre suyu düzenli tüketin.
3. **Yavaş ve Farkındalıkla Çiğneyin:** Beyne tokluk sinyali yaklaşık 20 dakikada ulaşır. Lokmalarınızın tadını çıkarın.
`,
    category: 'Beslenme Rehberi',
    readingTimeMinutes: 4,
    publishedAt: '2026-09-15',
    isPublished: true,
    coverImage: '/images/blog-sustainable-diet.jpg',
  },
  {
    id: 'post-2',
    slug: 'ofis-calisanlari-icin-pratik-ara-ogunler',
    title: 'Masa Başı Çalışanlar İçin Enerji Veren Pratik Ara Öğünler',
    excerpt: 'İkindi saatlerinde gelen tatlı krizleri ve halsizlikle baş etmenizi sağlayacak, ofiste kolayca tüketilebilecek sağlıklı alternatifler.',
    content: `## Öğleden Sonra Gelen Enerji Düşüklüğü

Öğle yemeğinden birkaç saat sonra kan şekerinde yaşanan dalgalanmalar, çalışma verimini düşürür ve çikolata/bisküvi gibi basit şekerlere yönelimi artırır.

### Çantanızda veya Çekmecenizde Bulundurabileceğiniz 4 Sağlıklı Seçenek

1. **Çiğ Kuruyemiş & Kuru Meyve:** 10-12 adet çiğ badem ve 2 adet kuru kayısı veya hurma, hem sağlıklı yağ hem de lif sağlar.
2. **Yoğurt / Kefir & Yulaf:** 1 kase sade probiyotik yoğurda 2 yemek kaşığı yulaf ve tarçın ekleyerek kan şekerinizi dengeleyebilirsiniz.
3. **Elma Dilimleri & Fıstık Ezmesi:** 1 orta boy yeşil elma dilimleri üzerine 1 tatlı kaşığı şekersiz fıstık ezmesi.
4. **Haşlanmış Nohut / Edamame:** Fırınlanmış baharatlı nohut, kıtır cips ihtiyacını mükemmel şekilde karşılar.

> **Püf Noktası:** Kahve tüketiminizi günde 2-3 fincanla sınırlayın ve her kahvenin yanında mutlaka bir büyük bardak su için.
`,
    category: 'Pratik Tarifler',
    readingTimeMinutes: 3,
    publishedAt: '2026-09-28',
    isPublished: true,
    coverImage: '/images/blog-office-snacks.jpg',
  },
  {
    id: 'post-3',
    slug: 'su-tuketimi-ve-metabolizma',
    title: 'Su Tüketiminin Metabolizma ve Sindirim Üzerindeki Etkileri',
    excerpt: 'Yeterli su içmenin sadece susuzluğu gidermekle kalmayıp, toksin atımı ve hücresel enerji üretimi için neden vazgeçilmez olduğunu keşfedin.',
    content: `## Suyun Bedenimizdeki Rolü

İnsan bedeninin yaklaşık %60'ı sudan oluşur. Hücrelerimizin besinleri taşıyabilmesi, böbreklerin atıkları süzebilmesi ve sindirim enzimlerinin etkin çalışması doğrudan hidrasyon düzeyine bağlıdır.

### Günlük Ne Kadar Su İçmeliyiz?
Genel kural olarak **kilonuz x 30-35 ml** su tüketimi önerilir. Örneğin 70 kg ağırlığındaki bir birey için bu miktar ortalama 2.1 - 2.4 litredir.

### Su İçmeyi Alışkanlık Haline Getirmenin İpuçları
- Sabah uyanır uyanmaz oda sıcaklığında 1 büyük bardak su için.
- Çalışma masanızda sürekli dolu bir cam sürahi veya matara bulundurun.
- Suyunuzu taze nane, limon dilimi veya çubuk tarçınla lezzetlendirebilirsiniz.
`,
    category: 'Sağlıklı Yaşam',
    readingTimeMinutes: 3,
    publishedAt: '2026-10-05',
    isPublished: true,
    coverImage: '/images/blog-hydration.jpg',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Örnek Danışan 1',
    feedback: 'Kişiye özel yaklaşımı ve katı kısıtlamalar koymadan günlük hayatıma uyarladığı beslenme önerileri sayesinde çok rahat bir süreç geçirdim. Sürekli iletişimde olması ve motivasyon desteği harikaydı.',
    serviceCategory: 'Bireysel Danışmanlık',
    isApproved: true,
    createdAt: '2026-08-10',
  },
  {
    id: 't-2',
    clientName: 'Örnek Danışan 2',
    feedback: 'Online danışmanlık konusunda ilk başta çekincelerim vardı fakat haftalık düzenli görüntülü takipler ve pratik menüler sayesinde ofis tempomda hiç zorlanmadan hedeflerime ulaştım.',
    serviceCategory: 'Online Diyet',
    isApproved: true,
    createdAt: '2026-09-02',
  },
];

export const mockAppointmentRequests: AppointmentRequest[] = [
  {
    id: 'req-1',
    fullName: 'Örnek Başvuru 1',
    phone: '+90 555 111 22 33',
    email: 'ornek1@example.com',
    target: 'Kilo yönetimi ve sağlıklı beslenme alışkanlığı kazanmak istiyorum.',
    kvkkConsent: true,
    status: 'yeni',
    note: 'Hafta içi öğleden sonra aranmak istiyor.',
    createdAt: '2026-10-14T10:30:00Z',
  },
  {
    id: 'req-2',
    fullName: 'Örnek Başvuru 2',
    phone: '+90 555 444 55 66',
    email: 'ornek2@example.com',
    target: 'Online diyet danışmanlığı hakkında bilgi almak istiyorum.',
    kvkkConsent: true,
    status: 'arandi',
    note: 'İlk ön görüşme yapıldı, kan tahlili sonuçları bekleniyor.',
    createdAt: '2026-10-12T14:15:00Z',
  },
];
