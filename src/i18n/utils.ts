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
    partners: {
      title: 'Proudly Partnered With'
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
      connect: 'Connect With Us',
      cta: {
        title: 'Ready to Protect Your Car?',
        subtitle: 'Premium protection solutions for your vehicle',
        button: 'Book a Free Consultation'
      },
      links: {
        services: 'Services',
        about: 'About',
        careers: 'Careers',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        support: 'Support'
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
      description: 'وجهتكم الأولى للعناية الاستثنائية بالسيارات الفاخرة'
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن سوباكوتو',
      services: 'خدماتنا المتميزة',
      locations: 'فروعنا',
      offers: 'العروض الحصرية',
      faq: 'استفسارات شائعة',
      contact: 'تواصل معنا'
    },
    hero: {
      welcome: 'أهلاً بكم في',
      tagline: 'عالم من الرفاهية والتميز لسياراتكم الفاخرة',
      experience: 'ارتقوا بتجربة قيادتكم معنا',
      description: 'نقدم لكم باقة من الخدمات الاستثنائية المصممة خصيصاً لتتجاوز توقعاتكم وترتقي بتجربة قيادتكم إلى آفاق جديدة من الرفاهية.',
      services: 'استكشفوا خدماتنا',
      contact: 'تواصلوا معنا'
    },
    features: {
      premium: {
        title: 'خدمات استثنائية',
        description: 'نفخر بتقديم أرقى مستويات العناية بسياراتكم الفاخرة بأيدي خبراء متخصصين.',
        link: 'المزيد من التفاصيل'
      },
      locations: {
        title: 'فروع راقية',
        description: 'نتواجد في أرقى المواقع الاستراتيجية في مختلف أنحاء المنطقة لنكون دائماً في خدمتكم.',
        link: 'الفرع الأقرب إليكم'
      },
      offers: {
        title: 'عروض حصرية',
        description: 'استمتعوا بباقة من العروض الحصرية والمزايا الاستثنائية المصممة خصيصاً لعملائنا المميزين.',
        link: 'العروض الحالية'
      }
    },
    partners: {
      title: 'نفتخر بشراكتنا مع'
    },
    cta: {
      title: 'هل تتطلعون لتجربة استثنائية؟',
      description: 'تواصلوا معنا اليوم لاكتشاف عالم من الخدمات الراقية لسياراتكم الفاخرة.',
      enquire: 'طلب استشارة',
      whatsapp: 'محادثة مباشرة'
    },
    footer: {
      company: 'نقدم لكم أرقى خدمات العناية بالسيارات الفاخرة بمعايير عالمية وخبرات استثنائية.',
      copyright: '© {year} سوباكوتو. جميع الحقوق محفوظة.',
      connect: 'تابعونا',
      cta: {
        title: 'حافظوا على رونق سياراتكم الفاخرة',
        subtitle: 'حلول حماية متطورة بتقنيات عالمية',
        button: 'احجزوا استشارة مجانية'
      },
      links: {
        services: 'خدماتنا',
        about: 'عن سوباكوتو',
        careers: 'انضموا إلينا',
        contact: 'تواصلوا معنا',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        support: 'الدعم الفني'
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
  const supportedLocales = ['en', 'ar'];
  
  // Handle empty path
  if (!path || path === '/') {
    return targetLocale === defaultLocale ? '/' : `/${targetLocale}/`;
  }
  
  // Remove leading slash if present
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if path already has a locale prefix
  for (const loc of supportedLocales) {
    if (cleanPath.startsWith(`${loc}/`) || cleanPath === loc) {
      // Remove the existing locale prefix
      cleanPath = cleanPath === loc ? '' : cleanPath.substring(loc.length + 1);
      break;
    }
  }
  
  // For default locale, don't add prefix unless it's the root path
  if (targetLocale === defaultLocale) {
    return cleanPath ? `/${cleanPath}` : '/';
  }
  
  // For other locales, add prefix
  return cleanPath ? `/${targetLocale}/${cleanPath}` : `/${targetLocale}/`;
}
