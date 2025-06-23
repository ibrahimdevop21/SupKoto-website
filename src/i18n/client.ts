import { useState, useEffect } from 'react';
// Import translations directly to avoid TypeScript errors
import type { AstroGlobal } from 'astro';

// Define translation dictionaries - duplicated from utils.ts for client-side use
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
    cta: {
      enquire: 'Enquire Now',
      contact: 'Contact Us',
      learn: 'Learn More'
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
    cta: {
      enquire: 'استفسر الآن',
      contact: 'اتصل بنا',
      learn: 'اعرف المزيد'
    }
  }
};

// Type for the translations dictionary
type TranslationDictionary = Record<string, string | Record<string, string | Record<string, string>>>;

// Hook to get translations in React components
export function useTranslations(locale: string = 'en') {
  return (key: string, params?: Record<string, string | number>): string => {
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
  };
}

// Hook to check if the current locale is RTL
export function useIsRTL(locale: string = 'en') {
  return ['ar', 'he', 'fa', 'ur'].includes(locale);
}

// Hook to get localized URL
export function useLocalizedUrl(locale: string = 'en') {
  return (path: string, targetLocale?: string): string => {
    const finalLocale = targetLocale || locale;
    const defaultLocale = 'en';
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // For default locale, don't add prefix
    if (finalLocale === defaultLocale) {
      return `/${cleanPath}`;
    }
    
    // For other locales, add prefix
    return `/${finalLocale}/${cleanPath}`;
  };
}
