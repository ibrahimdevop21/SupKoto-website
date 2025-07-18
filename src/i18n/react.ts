// React hooks for Astro's native i18n
import { createTranslator, type Locale } from './index';

// Translation hook for React components
export function useTranslations(locale: Locale = 'en') {
  return createTranslator(locale);
}

// RTL detection hook for React components
export function useIsRTL(locale: Locale = 'en') {
  return locale === 'ar';
}

// URL generation hook for React components
export function useLocalizedUrl(locale: Locale = 'en') {
  return (path: string) => {
    // Remove leading slash for consistency
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Always include the language prefix to match Astro's configuration
    return `/${locale}/${cleanPath}`;
  };
}

// Switch path hook for React components (used in language switcher)
export function useSwitchLocalePath() {
  return (currentPath: string, targetLocale: Locale) => {
    // Extract the path without locale prefix
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}\//, '');
    
    // Return new path with target locale
    return `/${targetLocale}/${pathWithoutLocale}`;
  };
}
