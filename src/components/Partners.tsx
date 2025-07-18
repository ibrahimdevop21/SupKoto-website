import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '../i18n/react';
import '../styles/partners-animations.css';

interface Partner {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

interface PartnersProps {
  isArabic?: boolean;
  currentLocale?: string;
}

const Partners: React.FC<PartnersProps> = ({ isArabic = false, currentLocale }) => {
  // Determine if RTL based on locale or isArabic prop
  const rtl = isArabic || currentLocale === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  const t = useTranslations((currentLocale || (isArabic ? 'ar' : 'en')) as 'en' | 'ar');
  
  // Partner data
  const partners: Partner[] = [
    {
      name: 'Jetour',
      logo: '/partners/jetour.svg',
      alt: 'Jetour logo - Automotive partner',
      website: 'https://jetour.com'
    },
    {
      name: 'Skoda',
      logo: '/partners/skoda.svg',
      alt: 'Skoda logo - Automotive partner',
      website: 'https://skoda.com'
    },
    {
      name: 'Citroen',
      logo: '/partners/citroen.svg',
      alt: 'Citroen logo - Automotive partner',
      website: 'https://citroen.com'
    },
    {
      name: 'Auto Samer Rayan',
      logo: '/partners/samer.webp',
      alt: 'Samer logo - Automotive partner',
      website: 'https://samer.com'
    }
  ];
  
  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <>
      
      <section 
        ref={sectionRef} 
        className={`overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-labelledby="partners-heading"
      >
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Enhanced section heading */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-block">
              <h2 
                id="partners-heading"
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 ${isArabic ? 'font-arabic' : ''} bg-gradient-to-r from-white via-[#ffd9dc] to-white bg-clip-text text-transparent`}
              >
                {t('partners.title')}
              </h2>
              
              {/* Animated decorative line */}
              <div className={`flex justify-center items-center ${rtl ? 'space-x-reverse space-x-4' : 'space-x-4'} mb-4`}>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="relative">
                  <div className="h-1 w-20 bg-[#bf1e2e] rounded-full"></div>
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"></div>
                </div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/30 to-transparent"></div>
              </div>
              
              <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
                {t('partners.subtitle') || 'Trusted by leading automotive brands worldwide'}
              </p>
            </div>
          </div>
          
          {/* Premium partners grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 ${rtl ? 'partners-grid-rtl' : ''}`}>
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className={`group relative ${rtl ? 'rtl-partner' : ''} ${
                  isVisible ? `animate-slideInScale stagger-${index + 1}` : 'opacity-0'
                }`}
              >
                <a 
                  href={partner.website || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-[#bf1e2e]/10 to-[#bf1e2e]/30 hover-lift group-hover:border-[#bf1e2e]/70">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-[#bf1e2e]/20 to-black/20 animate-rotateGradient opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Floating glow orbs */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#bf1e2e]/40 rounded-full blur-lg animate-floatGlow"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#bf1e2e]/30 rounded-full blur-md animate-floatGlow" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Partner logo with enhanced effects */}
                    <div className="relative z-10 h-full flex items-center justify-center p-8">
                      <div className="logo-container w-full h-full flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.alt}
                          className={`h-16 md:h-18 max-w-[90%] object-contain mx-auto filter drop-shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 ${rtl ? 'rtl-flip-none' : ''}`}
                          loading="lazy"
                          width="auto"
                          height="72"
                        />
                      </div>
                    </div>
                    
                    {/* Hover overlay with enhanced effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#bf1e2e]/30 via-[#bf1e2e]/10 to-[#bf1e2e]/20 transition-opacity duration-500"></div>
                    
                    {/* Bottom gradient overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#bf1e2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Partner name with smooth reveal */}
                    <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <div className="text-center">
                        <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-md">
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Subtle border animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#bf1e2e]/20 group-hover:border-[#bf1e2e]/50 transition-all duration-500"></div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;