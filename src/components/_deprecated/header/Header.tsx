import { useState, useEffect, useRef } from 'react';
import RegionToggle from './RegionToggle';
import { useRegion } from '../../context/RegionContext';

/**
 * Header React Component
 * Handles navigation, region selection, translations, and responsive logic.
 * Receives currentLocale and isRTL as props from Astro wrapper.
 */
interface HeaderProps {
  currentLocale: string;
  isRTL: boolean;
}

export default function Header({ currentLocale, isRTL }: HeaderProps) {
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
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
        if (
          regionDropdownRef.current &&
          !regionDropdownRef.current.contains(event.target as Node) &&
          regionButtonRef.current &&
          !regionButtonRef.current.contains(event.target as Node)
        ) {
          setShowRegionDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', text: translations[currentLocale]?.home || 'Home' },
    { href: '/about', text: translations[currentLocale]?.about || 'About' },
    { href: '/services', text: translations[currentLocale]?.services || 'Services' },
    { href: '/locations', text: translations[currentLocale]?.locations || 'Locations' },
    { href: '/offers', text: translations[currentLocale]?.offers || 'Offers' },
    { href: '/contact', text: translations[currentLocale]?.contact || 'Contact' }
  ];

  return (
    <header className="w-full bg-background/90 backdrop-blur-md border-b border-border fixed top-0 left-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <span className="sr-only">Supakoto</span>
          <img src="/logo.svg" alt="Supakoto Logo" className="h-10 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center rtl:flex-row-reverse">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={
                'px-3 py-2.5 rounded-md text-sm font-medium transition-colors ' +
                (currentPath === link.href ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10 text-foreground')
              }
            >
              {link.text}
            </a>
          ))}
          <a
            href="/contact"
            className="ml-6 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors rtl:ml-0 rtl:mr-6"
          >
            {translations[currentLocale]?.enquire || 'Enquire Now'}
          </a>
          <div className="ml-4 rtl:ml-0 rtl:mr-4">
            <RegionToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden p-2 rounded hover:bg-primary/10 text-foreground"
          aria-label="Open menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-8 space-y-5 shadow-lg absolute top-16 left-0 w-full z-50">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={
                'block px-3 py-2 rounded-md text-base font-medium transition-colors ' +
                (currentPath === link.href ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10 text-foreground')
              }
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </a>
          ))}
          <a
            href="/contact"
            className="block mt-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {translations[currentLocale]?.enquire || 'Enquire Now'}
          </a>
          <div className="mt-4">
            <RegionToggle />
          </div>
        </div>
      )}
    </header>
  );
}

