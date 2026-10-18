export const siteConfig = {
  name: 'Dyt. Ayşe Örnek',
  shortName: 'Ayşe Örnek',
  title: 'Diyetisyen Ayşe Örnek | İstanbul',
  description: 'İstanbul\'da uzman diyetisyen Ayşe Örnek ile sağlıklı beslenme danışmanlığı. Kişiye özel beslenme programları ve online diyet danışmanlığı.',
  url: 'https://www.diyetisyenayseornek.com', // placeholder
  city: 'İstanbul',
  address: 'Örnek Mah. Sağlık Cad. No: 42/3, Kadıköy, İstanbul',
  phone: '+90 (555) 123 45 67',
  email: 'info@diyetisyenayseornek.com',
  workingHours: {
    weekdays: '09:00 – 18:00',
    saturday: '10:00 – 14:00',
    sunday: 'Kapalı',
  },
  social: {
    instagram: 'https://instagram.com/diyetisyenayseornek', // placeholder
    youtube: 'https://youtube.com/@diyetisyenayseornek', // placeholder
  },
  about: {
    shortBio: 'Sağlıklı ve sürdürülebilir beslenme alışkanlıkları kazanmanızda yanınızdayım.',
    // NOTE: Generic example text, no fake certifications
    fullBio: `Beslenme ve Diyetetik alanında lisans eğitimimi tamamladıktan sonra, bireylerin sağlıklı yaşam hedeflerine ulaşmalarına yardımcı olmak amacıyla çalışmalarıma başladım.\n\nHer danışanımın kendine özgü ihtiyaçlarını ve yaşam tarzını dikkate alarak, uygulanabilir ve sürdürülebilir beslenme planları oluşturuyorum. Amacım sadece kısa vadeli sonuçlar değil, uzun vadede sağlığınızı destekleyen alışkanlıklar kazanmanıza yardımcı olmaktır.\n\nDanışmanlık sürecinde bilimsel kanıtlara dayalı, kişiye özel yaklaşımlar benimsiyorum.`,
  },
} as const;
