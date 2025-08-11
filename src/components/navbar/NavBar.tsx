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

  useEffect(() => {
    // Add scroll event listener to enhance glass effect on scroll
    const handleScroll = () => {
      const navbar = document.querySelector('header.navbar-glass');
      if (window.scrollY > 50) {
        navbar?.classList.add('navbar-scrolled');
      } else {
        navbar?.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="navbar-glass w-full h-14 md:h-16 border-b border-foreground/10 bg-background/70 backdrop-blur-lg transition-all duration-300 sticky top-0 z-50">
      <div className="relative z-20 flex items-center justify-between h-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo */}
        <a href={getLocalizedUrl('')} className="flex items-center group" aria-label="Supakoto Home">
          <img src="/assets/logo.svg" alt="Supakoto Logo" className="h-6 md:h-7 transform transition-transform duration-300 group-hover:scale-105" width="auto" height="28" />
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
