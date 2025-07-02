import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '../i18n/client';

interface Partner {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

interface PartnersProps {
  isArabic?: boolean;
}

const Partners: React.FC<PartnersProps> = ({ isArabic = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const t = useTranslations(isArabic ? 'ar' : 'en');
  
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
      name: 'Samer',
      logo: '/partners/samer.webp',
      alt: 'Samer logo - Automotive partner',
      website: 'https://samer.com'
    }
  ];
  
  // Staggered animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            partners.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
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
    <section className="relative py-20 overflow-hidden" aria-labelledby="partners-heading">
      {/* Subtle vertical gradient that blends with page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d] to-transparent"></div>
        {/* Subtle bottom fade for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Very subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Content container - seamlessly integrated */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className="max-w-full">
          {/* Clean, premium section heading */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 
                id="partners-heading"
                className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isArabic ? 'font-arabic' : ''}`}
              >
                {t('partners.title')}
              </h2>
              <div className="flex justify-center items-center space-x-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-400"></div>
                <div className="h-1 w-16 bg-primary rounded-full"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-400"></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced partners grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className={`group relative transform transition-all duration-700 ease-out ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Premium card with subtle effects */}
                <div className="relative bg-neutral-800/80 backdrop-blur-sm rounded-xl p-8 h-40 flex items-center justify-center
                            border border-neutral-700/50 shadow-lg
                            hover:bg-neutral-800 hover:border-neutral-600 hover:shadow-xl
                            transition-all duration-500 ease-out
                            hover:scale-105 hover:-translate-y-1">
                  
                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  {/* Partner logo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="h-12 md:h-16 max-w-[85%] object-contain transition-all duration-500 ease-out
                               group-hover:scale-110"
                      loading="lazy"
                      width="auto"
                      height="64"
                    />
                  </div>
                  
                  {/* Subtle inner shadow */}
                  <div className="absolute inset-0 rounded-xl shadow-inner opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                
                {/* Clean, minimal tooltip */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-0
                              opacity-0 group-hover:opacity-100 group-hover:translate-y-2
                              transition-all duration-300 ease-out pointer-events-none z-20">
                  <div className="bg-black/90 text-white text-xs px-3 py-1 rounded-full shadow-lg
                                border border-neutral-800 whitespace-nowrap">
                    <div className="font-medium">{partner.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
