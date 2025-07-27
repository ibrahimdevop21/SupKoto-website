import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import MobileMenu from "./MobileMenu";
import { useTranslations, useLocalizedUrl } from "../../i18n/react";
import LanguageSwitcher from "../LanguageSwitcher";

import { type Locale } from "../../i18n";

interface NavBarProps {
  currentLocale: string;
  isRTL: boolean;
}

export default function NavBar({ currentLocale, isRTL }: NavBarProps) {
  // Cast string to Locale type (en|ar) for type safety
  const locale = currentLocale as Locale;
  const t = useTranslations(locale);
  const getLocalizedUrl = useLocalizedUrl(locale);
  
  // Navigation links with translations
  const navLinks = [
    { href: getLocalizedUrl(''), text: t('nav.home') },
    { href: getLocalizedUrl('services'), text: t('nav.services') },
    { href: getLocalizedUrl('gallery'), text: t('nav.gallery') },
    { href: getLocalizedUrl('about'), text: t('nav.about') },
    { href: getLocalizedUrl('contact'), text: t('nav.contact') },
  ];

  // Get current path for highlighting active link
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <header className="w-full h-16 md:h-20 border-b border-gray-200/20 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="relative z-20 flex items-center justify-between h-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo */}
        <a href={getLocalizedUrl('')} className="flex items-center group" aria-label="Supakoto Home">
          <img src="/assets/logo.svg" alt="Supakoto Logo" className="h-7 md:h-8 transform transition-transform duration-300 group-hover:scale-105" width="auto" height="32" />
        </a>

        {/* Desktop Links */}
        <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 md:space-x-6`}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.text} 
              href={link.href} 
              label={link.text} 
              isActive={currentPath === link.href}
            />
          ))}
          <Button className="rounded-xl px-4 py-1.5 text-xs md:text-sm font-medium">{t('cta.enquire')}</Button>
        </nav>

        {/* Language Switcher (Desktop) */}
        <div className="hidden lg:block">
          <LanguageSwitcher currentLocale={currentLocale} currentPath={currentPath} />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden gap-2">
          <LanguageSwitcher currentLocale={currentLocale} currentPath={currentPath} />
          <MobileMenu 
            navLinks={navLinks} 
            currentPath={currentPath} 
            isRTL={isRTL} 
            enquireText={t('cta.enquire')} 
          />
        </div>
      </div>
    </header>
  );
}
