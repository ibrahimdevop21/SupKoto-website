import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from '../i18n/react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  description?: string;
}

interface PartnersCarouselProps {
  isArabic?: boolean;
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  {
    id: 1,
    name: 'Jetour',
    logo: '/partners/jetour.svg',
    alt: 'Jetour Logo',
    description: 'Premium Automotive Partner'
  },
  {
    id: 2,
    name: 'Skoda',
    logo: '/partners/skoda.svg',
    alt: 'Skoda Logo',
    description: 'European Excellence'
  },
  {
    id: 3,
    name: 'Citroen',
    logo: '/partners/citroen.svg',
    alt: 'Citroen Logo',
    description: 'French Innovation'
  },
  {
    id: 4,
    name: 'Hyundai',
    logo: '/partners/hyundai.svg',
    alt: 'Hyundai Logo',
    description: 'Korean Quality'
  },
  {
    id: 5,
    name: 'Kia',
    logo: '/partners/kia.svg',
    alt: 'Kia Logo',
    description: 'Modern Design'
  },
  {
    id: 6,
    name: 'Peugeot',
    logo: '/partners/peugeot.svg',
    alt: 'Peugeot Logo',
    description: 'French Heritage'
  },
  {
    id: 7,
    name: 'Renault',
    logo: '/partners/renault.svg',
    alt: 'Renault Logo',
    description: 'Innovation Leader'
  },
  {
    id: 8,
    name: 'Volkswagen',
    logo: '/partners/volkswagen.svg',
    alt: 'Volkswagen Logo',
    description: 'German Engineering'
  },
  {
    id: 9,
    name: 'Audi',
    logo: '/partners/audi.svg',
    alt: 'Audi Logo',
    description: 'Luxury Performance'
  },
  {
    id: 10,
    name: 'BMW',
    logo: '/partners/bmw.svg',
    alt: 'BMW Logo',
    description: 'Ultimate Driving'
  },
  {
    id: 11,
    name: 'Mercedes',
    logo: '/partners/mercedes.svg',
    alt: 'Mercedes Logo',
    description: 'Luxury Standard'
  },
  {
    id: 12,
    name: 'Toyota',
    logo: '/partners/toyota.svg',
    alt: 'Toyota Logo',
    description: 'Reliability Leader'
  }
];

const Partners: React.FC<PartnersCarouselProps> = ({ 
  isArabic = false,
  partners = defaultPartners 
}) => {
  const t = useTranslations();
  const [viewportRef, embla] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    direction: isArabic ? 'rtl' : 'ltr'
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // In RTL mode, we need to swap the scroll direction to maintain visual consistency
  const scrollPrev = useCallback(() => embla && (isArabic ? embla.scrollNext() : embla.scrollPrev()), [embla, isArabic]);
  const scrollNext = useCallback(() => embla && (isArabic ? embla.scrollPrev() : embla.scrollNext()), [embla, isArabic]);
  
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, onSelect]);
  
  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
    <section 
      ref={sectionRef} 
      className="overflow-hidden opacity-100"
      aria-labelledby="partners-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 
            id="partners-heading"
            className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${isArabic ? 'font-arabic' : ''}`}
          >
            {isArabic ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border"></div>
            <div className="h-1 w-16 bg-primary rounded-full animate-pulse"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border"></div>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex -ml-6">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-6"
                >
                  <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-red-600/20 via-black/40 to-red-900/30 backdrop-blur-sm border border-red-500/20 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 hover:border-red-500/40">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Partner Logo Container */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <img
                        src={partner.logo}
                        alt={partner.alt}
                        className="max-w-full max-h-full object-contain filter brightness-110 contrast-110 group-hover:brightness-125 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-lg font-bold">{partner.name}</h3>
                      {partner.description && (
                        <p className="text-gray-300 mt-1 text-sm">{partner.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center border border-border transition-all duration-300 ${
              isArabic ? nextBtnEnabled : prevBtnEnabled 
                ? 'opacity-100 hover:bg-black/70' 
                : 'opacity-30 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={isArabic ? !nextBtnEnabled : !prevBtnEnabled}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center border border-border transition-all duration-300 ${
              isArabic ? prevBtnEnabled : nextBtnEnabled 
                ? 'opacity-100 hover:bg-black/70' 
                : 'opacity-30 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={isArabic ? !prevBtnEnabled : !nextBtnEnabled}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;