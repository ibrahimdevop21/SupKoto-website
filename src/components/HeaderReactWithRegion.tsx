import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import RegionToggle from './RegionToggle';
import { useRegion } from '../context/RegionContext';

interface HeaderReactWithRegionProps {
  currentLocale: string;
  isRTL: boolean;
}

export default function HeaderReactWithRegion({ currentLocale, isRTL }: HeaderReactWithRegionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  const regionButtonRef = useRef<HTMLButtonElement>(null);
  
  // Get region context
  const { currentRegion, regionConfig } = useRegion();
  
  // Get translations based on locale
  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      locations: 'Locations',
      offers: 'Offers',
      contact: 'Contact',
      enquire: 'Enquire Now',
      region: 'Region'
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      locations: 'المواقع',
      offers: 'العروض',
      contact: 'اتصل بنا',
      enquire: 'استفسر الآن',
      region: 'المنطقة'
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
        // Handle mobile menu
        if (
          menuRef.current && 
          buttonRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node) && 
          isOpen
        ) {
          setIsOpen(false);
        }
        
        // Handle region dropdown
        if (
          regionDropdownRef.current && 
          regionButtonRef.current && 
          !regionDropdownRef.current.contains(event.target as Node) && 
          !regionButtonRef.current.contains(event.target as Node) && 
          showRegionDropdown
        ) {
          setShowRegionDropdown(false);
        }
      };
      
      // Close menu when pressing escape key
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (isOpen) setIsOpen(false);
          if (showRegionDropdown) setShowRegionDropdown(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, showRegionDropdown, isMounted]);
  
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
    if (showRegionDropdown) setShowRegionDropdown(false);
  };
  
  // Toggle region dropdown
  const toggleRegionDropdown = () => {
    setShowRegionDropdown(!showRegionDropdown);
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
    if (typeof window !== 'undefined') {
      path = window.location.pathname;
      
      // If we're on the default locale (en) without a prefix
      if (currentLocale === 'en' && !path.startsWith('/ar/')) {
        return `/${alternateLocale}${path}`;
      }
      
      // If we're on a localized path
      if (path.startsWith(currentLocalePath)) {
        // Replace the locale prefix
        return path.replace(currentLocalePath, `/${alternateLocale}/`);
      }
      
      // Fallback for any other case
      return `/${alternateLocale}${path}`;
    }
    
    // Fallback for server-side rendering
    return `/${alternateLocale}`;
  };
  
  return (
    <header className="bg-background/90 backdrop-blur-md fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
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
              className={`transition text-sm font-medium px-2.5 py-1.5 rounded hover:bg-primary/10 ${currentPath === link.href 
                ? 'text-primary font-semibold' 
                : 'text-muted-foreground hover:text-foreground'}`}
            >
              {link.text}
            </a>
          ))}
          
          {/* Region Selector - Desktop */}
          <div className="relative">
            <button
              ref={regionButtonRef}
              onClick={toggleRegionDropdown}
              className="flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-foreground"
            >
              <MapPin size={16} />
              <span>{regionConfig.name}</span>
            </button>
            
            {showRegionDropdown && (
              <div 
                ref={regionDropdownRef}
                className="absolute top-full mt-1 right-0 bg-popover rounded-md shadow-lg py-2 min-w-[120px] z-50"
              >
                <div className="px-3 py-2">
                  <RegionToggle variant="switch" />
                </div>
              </div>
            )}
          </div>
          
          <a 
            href={getLocalizedUrl('contact')} 
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
          >
            {translations[currentLocale as keyof typeof translations].enquire}
          </a>
          
          {/* Language Switcher for Desktop */}
          <a 
            href={isMounted ? getLanguageSwitchUrl() : `/${getAlternateLocale()}`} 
            className="ml-3 text-foreground p-2 rounded hover:bg-primary/10 flex items-center"
            aria-label="Switch language"
          >
            <Globe size={18} />
            <span className="ml-1 text-sm">{getAlternateLocale().toUpperCase()}</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden relative flex items-center gap-4">
          {/* Region Selector - Mobile */}
          <button
            ref={regionButtonRef}
            onClick={toggleRegionDropdown}
            className="text-white p-2 rounded hover:bg-white/10 flex items-center"
            aria-label="Select region"
          >
            <MapPin size={20} />
          </button>
          
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
            className="text-foreground p-2 rounded hover:bg-primary/10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div 
              ref={menuRef}
              className="fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-md shadow-lg z-[100] border-b border-border max-h-[calc(100vh-60px)] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`transition text-base font-medium px-3 py-2.5 rounded hover:bg-primary/10 ${currentPath === link.href 
                        ? 'text-primary font-semibold' 
                        : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {link.text}
                    </a>
                  ))}
                  <div className="pt-3">
                    <a 
                      href={getLocalizedUrl('contact')} 
                      onClick={handleLinkClick}
                      className="w-full inline-flex justify-center items-center px-4 py-3 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                    >
                      {translations[currentLocale as keyof typeof translations].enquire}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Region Dropdown - Mobile */}
          {showRegionDropdown && (
            <div 
              ref={regionDropdownRef}
              className="fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-md shadow-lg z-[100] border-b border-border"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <h3 className="text-white text-lg font-medium mb-3">
                  {translations[currentLocale as keyof typeof translations].region}
                </h3>
                <RegionToggle variant="switch" className="w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
