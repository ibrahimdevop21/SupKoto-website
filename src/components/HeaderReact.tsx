import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';

interface HeaderReactProps {
  currentLocale: string;
  isRTL: boolean;
}

export default function HeaderReact({ currentLocale, isRTL }: HeaderReactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Get translations based on locale
  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      locations: 'Locations',
      offers: 'Offers',
      contact: 'Contact',
      enquire: 'Enquire Now'
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      locations: 'المواقع',
      offers: 'العروض',
      contact: 'اتصل بنا',
      enquire: 'استفسر الآن'
    }
  };
  
  // Set isMounted to true when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current path for highlighting active link and set up event listeners
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      
      // Close menu when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current && 
          buttonRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node) && 
          isOpen
        ) {
          setIsOpen(false);
        }
      };
      
      // Close menu when pressing escape key
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, isMounted]);
  
  // Get localized URL
  const getLocalizedUrl = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // For default locale, don't add prefix
    if (currentLocale === 'en') {
      return `/${cleanPath}`;
    }
    
    // For other locales, add prefix
    return `/${currentLocale}/${cleanPath}`;
  };
  
  // Navigation links with translations
  const navLinks = [
    { href: getLocalizedUrl(''), text: translations[currentLocale as keyof typeof translations].home },
    { href: getLocalizedUrl('about'), text: translations[currentLocale as keyof typeof translations].about },
    { href: getLocalizedUrl('services'), text: translations[currentLocale as keyof typeof translations].services },
    { href: getLocalizedUrl('locations'), text: translations[currentLocale as keyof typeof translations].locations },
    { href: getLocalizedUrl('offers'), text: translations[currentLocale as keyof typeof translations].offers },
    { href: getLocalizedUrl('contact'), text: translations[currentLocale as keyof typeof translations].contact },
  ];
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle link click in mobile menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  // Get alternate locale for language switcher
  const getAlternateLocale = () => {
    return currentLocale === 'ar' ? 'en' : 'ar';
  };
  
  // Get URL for language switching
  const getLanguageSwitchUrl = () => {
    // Default values for server-side rendering
    let path = '';
    const alternateLocale = getAlternateLocale();
    const currentLocalePath = `/${currentLocale}/`;
    
    // Only access window on client side
    if (typeof window !== 'undefined' && isMounted) {
      path = window.location.pathname;
      
      // If we're at the root
      if (path === '/' || path === '/en/' || path === '/ar/') {
        return alternateLocale === 'en' ? '/en/' : '/ar/';
      }
      
      // If we're on a localized path
      if (path.startsWith(currentLocalePath)) {
        return path.replace(currentLocalePath, `/${alternateLocale}/`);
      }
      
      // Default case
      return `/${alternateLocale}${path}`;
    }
    
    // Safe fallback for server-side rendering
    return alternateLocale === 'en' ? '/en/' : '/ar/';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-gray-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
        {/* Logo */}
        <a href={getLocalizedUrl('')} className="flex items-center group" aria-label="Supakoto Home">
          <img src="/assets/logo.svg" alt="Supakoto Logo" className="h-8 md:h-10 transform transition-transform duration-300 group-hover:scale-105" width="auto" height="36" />
        </a>

        {/* Desktop Links */}
        <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
          {navLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className={`transition text-sm font-medium px-2.5 py-1.5 rounded hover:bg-white/10 ${currentPath === link.href 
                ? 'text-blue-400 font-semibold' 
                : 'text-gray-300 hover:text-white'}`}
            >
              {link.text}
            </a>
          ))}
          <a 
            href={getLocalizedUrl('contact')} 
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            {translations[currentLocale as keyof typeof translations].enquire}
          </a>
          
          {/* Language Switcher for Desktop */}
          <a 
            href={isMounted ? getLanguageSwitchUrl() : `/${getAlternateLocale()}`} 
            className="ml-3 text-white p-2 rounded hover:bg-white/10 flex items-center"
            aria-label="Switch language"
          >
            <Globe size={18} />
            <span className="ml-1 text-sm">{getAlternateLocale().toUpperCase()}</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden relative flex items-center gap-4">
          {/* Language Switcher for Mobile */}
          <a 
            href={isMounted ? getLanguageSwitchUrl() : `/${getAlternateLocale()}`} 
            className="text-white p-2 rounded hover:bg-white/10 flex items-center"
            aria-label="Switch language"
          >
            <Globe size={20} />
            <span className="ml-1 text-sm">{getAlternateLocale().toUpperCase()}</span>
          </a>
          
          <button 
            ref={buttonRef}
            type="button"
            onClick={toggleMenu}
            className="text-white p-2 rounded hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div 
              ref={menuRef}
              className="fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-md shadow-lg z-[100] border-b border-gray-800/50 max-h-[calc(100vh-60px)] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`transition text-base font-medium px-3 py-2.5 rounded hover:bg-white/10 ${currentPath === link.href 
                        ? 'text-blue-400 font-semibold' 
                        : 'text-gray-300 hover:text-white'}`}
                    >
                      {link.text}
                    </a>
                  ))}
                  <div className="pt-3">
                    <a 
                      href={getLocalizedUrl('contact')} 
                      onClick={handleLinkClick}
                      className="w-full inline-flex justify-center items-center px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                      {translations[currentLocale as keyof typeof translations].enquire}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
