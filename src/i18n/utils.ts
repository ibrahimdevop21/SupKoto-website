// Import Astro's i18n utilities
import type { AstroGlobal } from 'astro';

// Define translation dictionaries
const translations = {
  en: {
    site: {
      title: 'Supakoto',
      description: 'Your premier destination for luxury automotive services and solutions'
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      locations: 'Locations',
      offers: 'Offers',
      faq: 'FAQ',
      contact: 'Contact'
    },
    hero: {
      welcome: 'Welcome to',
      tagline: 'Your premier destination for luxury automotive services and solutions',
      experience: 'Experience Automotive Excellence',
      description: 'Discover our range of premium automotive services designed to exceed your expectations and elevate your driving experience.',
      services: 'Our Services',
      contact: 'Contact Us'
    },
    features: {
      premium: {
        title: 'Premium Services',
        description: 'We pride ourselves on delivering top-notch automotive services that exceed your expectations.',
        link: 'Learn more'
      },
      locations: {
        title: 'Luxury Locations',
        description: 'Find us at premium, convenient locations across the region to serve your automotive needs.',
        link: 'Find nearest'
      },
      offers: {
        title: 'Exclusive Offers',
        description: 'Take advantage of our limited-time luxury automotive service offers and promotions.',
        link: 'View offers'
      }
    },
    cta: {
      title: 'Ready to Experience Luxury?',
      description: 'Contact us today to learn more about our premium automotive services.',
      enquire: 'Enquire Now',
      whatsapp: 'Chat on WhatsApp'
    },
    footer: {
      company: 'Your premier destination for luxury automotive services and solutions. We\'re dedicated to providing exceptional experiences.',
      copyright: '© {year} Supakoto. All rights reserved.',
      links: {
        services: 'Services',
        about: 'About',
        careers: 'Careers',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    },
    language: {
      en: 'English',
      ar: 'العربية'
    }
  },
  ar: {
    site: {
      title: 'سوباكوتو',
      description: 'وجهتك المميزة لخدمات وحلول السيارات الفاخرة'
    },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      locations: 'المواقع',
      offers: 'العروض',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا'
    },
    hero: {
      welcome: 'مرحبًا بك في',
      tagline: 'وجهتك المميزة لخدمات وحلول السيارات الفاخرة',
      experience: 'اختبر التميز في عالم السيارات',
      description: 'اكتشف مجموعة خدماتنا المتميزة للسيارات المصممة لتتجاوز توقعاتك وترتقي بتجربة القيادة لديك.',
      services: 'خدماتنا',
      contact: 'اتصل بنا'
    },
    features: {
      premium: {
        title: 'خدمات متميزة',
        description: 'نفتخر بتقديم خدمات سيارات عالية الجودة تتجاوز توقعاتك.',
        link: 'اعرف المزيد'
      },
      locations: {
        title: 'مواقع فاخرة',
        description: 'تجدنا في مواقع متميزة ومريحة في جميع أنحاء المنطقة لتلبية احتياجات سيارتك.',
        link: 'ابحث عن الأقرب'
      },
      offers: {
        title: 'عروض حصرية',
        description: 'استفد من عروضنا وترويجاتنا المحدودة لخدمات السيارات الفاخرة.',
        link: 'مشاهدة العروض'
      }
    },
    cta: {
      title: 'هل أنت مستعد لتجربة الفخامة؟',
      description: 'اتصل بنا اليوم لمعرفة المزيد عن خدمات السيارات المتميزة لدينا.',
      enquire: 'استفسر الآن',
      whatsapp: 'تواصل عبر واتساب'
    },
    footer: {
      company: 'وجهتك المميزة لخدمات وحلول السيارات الفاخرة. نحن ملتزمون بتقديم تجارب استثنائية.',
      copyright: '© {year} سوباكوتو. جميع الحقوق محفوظة.',
      links: {
        services: 'الخدمات',
        about: 'من نحن',
        careers: 'وظائف',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      }
    },
    language: {
      en: 'English',
      ar: 'العربية'
    }
  }
};

// Get current locale
export function getCurrentLocale(Astro?: AstroGlobal) {
  return Astro?.currentLocale || 'en';
}

// Check if current locale is RTL
export function isRTL(Astro?: AstroGlobal) {
  return getCurrentLocale(Astro) === 'ar';
}

// Translation function
export function t(key: string, params?: Record<string, string | number>): string {
  const locale = getCurrentLocale();
  const keys = key.split('.');
  
  // Navigate through the translation object
  let result: any = translations[locale as keyof typeof translations];
  for (const k of keys) {
    if (!result || typeof result !== 'object') return key; // Return key if path doesn't exist
    result = result[k];
    if (result === undefined) return key;
  }
  
  // Handle string interpolation
  if (typeof result === 'string' && params) {
    let interpolatedString: string = result;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      interpolatedString = interpolatedString.replace(
        new RegExp(`{${paramKey}}`, 'g'), 
        String(paramValue)
      );
    });
    return interpolatedString;
  }
  
  return typeof result === 'string' ? result : key;
}

// Get URL for a different locale
export function getLocalizedUrl(path: string, locale?: string, Astro?: AstroGlobal) {
  const targetLocale = locale || getCurrentLocale(Astro);
  const defaultLocale = 'en';
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For default locale, don't add prefix
  if (targetLocale === defaultLocale) {
    return `/${cleanPath}`;
  }
  
  // For other locales, add prefix
  return `/${targetLocale}/${cleanPath}`;
}
