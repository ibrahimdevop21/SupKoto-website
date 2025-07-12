import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import AppButton from "../ui/AppButton";
import MobileMenu from "./MobileMenu";
import { useTranslations, useLocalizedUrl } from "../../i18n/client";

interface NavBarProps {
  currentLocale: string;
  isRTL: boolean;
}

export default function NavBar({ currentLocale, isRTL }: NavBarProps) {
  const t = useTranslations(currentLocale);
  const getLocalizedUrl = useLocalizedUrl(currentLocale);
  
  // Navigation links with translations
  const navLinks = [
    { href: getLocalizedUrl(''), text: t('nav.home') },
    { href: getLocalizedUrl('services'), text: t('nav.services') },
    { href: getLocalizedUrl('about'), text: t('nav.about') },
    { href: getLocalizedUrl('contact'), text: t('nav.contact') },
  ];

  // Get current path for highlighting active link
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md border-b border-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
        {/* Logo */}
        <a href={getLocalizedUrl('')} className="flex items-center group" aria-label="Supakoto Home">
          <img src="/assets/logo.svg" alt="Supakoto Logo" className="h-8 md:h-10 transform transition-transform duration-300 group-hover:scale-105" width="auto" height="36" />
        </a>

        {/* Desktop Links */}
        <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.text} 
              href={link.href} 
              label={link.text} 
              isActive={currentPath === link.href}
            />
          ))}
          <AppButton>{t('cta.enquire')}</AppButton>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu 
          navLinks={navLinks} 
          currentPath={currentPath} 
          isRTL={isRTL} 
          enquireText={t('cta.enquire')} 
        />
      </div>
    </header>
  );
}
