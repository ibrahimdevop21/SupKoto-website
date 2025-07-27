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
    name: 'Nissan',
    logo: '/partners/nissan-6.svg',
    alt: 'Nissan Logo',
    description: 'Japanese Quality'
  },
  {
    id: 5,
    name: 'Kia',
    logo: '/partners/kia-4.svg',
    alt: 'Kia Logo',
    description: 'Modern Design'
  },
  {
    id: 6,
    name: 'Peugeot',
    logo: '/partners/peugeot-8.svg',
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
    name: 'Audi',
    logo: '/partners/audi-7.svg',
    alt: 'Audi Logo',
    description: 'Luxury Performance'
  },
  {
    id: 9,
    name: 'BMW',
    logo: '/partners/bmw-7.svg',
    alt: 'BMW Logo',
    description: 'Ultimate Driving'
  },
  {
    id: 10,
    name: 'Mercedes-Benz',
    logo: '/partners/mercedes-benz-9.svg',
    alt: 'Mercedes-Benz Logo',
    description: 'Luxury Standard'
  },
  {
    id: 11,
    name: 'Lexus',
    logo: '/partners/lexus.svg',
    alt: 'Lexus Logo',
    description: 'Japanese Luxury'
  },
  {
    id: 12,
    name: 'Porsche',
    logo: '/partners/porsche-6.svg',
    alt: 'Porsche Logo',
    description: 'Sports Car Excellence'
  },
  {
    id: 13,
    name: 'Ferrari',
    logo: '/partners/ferrari-4.svg',
    alt: 'Ferrari Logo',
    description: 'Italian Supercar'
  },
  {
    id: 14,
    name: 'Lamborghini',
    logo: '/partners/lamborghini.svg',
    alt: 'Lamborghini Logo',
    description: 'Italian Power'
  },
  {
    id: 15,
    name: 'Bentley',
    logo: '/partners/bentley-2.svg',
    alt: 'Bentley Logo',
    description: 'British Luxury'
  },
  {
    id: 16,
    name: 'Rolls-Royce',
    logo: '/partners/rolls-royce.svg',
    alt: 'Rolls-Royce Logo',
    description: 'Ultimate Luxury'
  },
  {
    id: 17,
    name: 'Tesla',
    logo: '/partners/tesla-motors.svg',
    alt: 'Tesla Logo',
    description: 'Electric Innovation'
  },
  {
    id: 18,
    name: 'Toyota',
    logo: '/partners/toyota-tile.svg',
    alt: 'Toyota Logo',
    description: 'Reliability Leader'
  },
  {
    id: 19,
    name: 'Volkswagen',
    logo: '/partners/volkswagen-10.svg',
    alt: 'Volkswagen Logo',
    description: 'German Engineering'
  }
];

const Partners: React.FC<PartnersCarouselProps> = ({ 
  isArabic = false,
  partners = defaultPartners 
}) => {
  const t = useTranslations(isArabic ? 'ar' : 'en');
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Autoplay configuration
  const AUTOPLAY_DELAY = 3000; // 3 seconds
  
  // Autoplay control functions
  const startAutoplay = useCallback(() => {
    if (!embla || !isAutoPlaying) return;
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    autoplayRef.current = setInterval(() => {
      if (embla && isAutoPlaying) {
        embla.scrollNext();
      }
    }, AUTOPLAY_DELAY);
  }, [embla, isAutoPlaying, AUTOPLAY_DELAY]);
  
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);
  
  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false);
    stopAutoplay();
  }, [stopAutoplay]);
  
  const resumeAutoplay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);
  
  // In RTL mode, we need to swap the scroll direction to maintain visual consistency
  const scrollPrev = useCallback(() => {
    pauseAutoplay();
    embla && (isArabic ? embla.scrollNext() : embla.scrollPrev());
    // Resume autoplay after manual interaction
    setTimeout(() => resumeAutoplay(), 1000);
  }, [embla, isArabic, pauseAutoplay, resumeAutoplay]);
  
  const scrollNext = useCallback(() => {
    pauseAutoplay();
    embla && (isArabic ? embla.scrollPrev() : embla.scrollNext());
    // Resume autoplay after manual interaction
    setTimeout(() => resumeAutoplay(), 1000);
  }, [embla, isArabic, pauseAutoplay, resumeAutoplay]);
  
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
  
  // Initialize and manage autoplay
  useEffect(() => {
    if (embla && isAutoPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    
    return () => stopAutoplay();
  }, [embla, isAutoPlaying, startAutoplay, stopAutoplay]);
  
  // Cleanup autoplay on component unmount
  useEffect(() => {
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);
  
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
      className="w-full overflow-hidden opacity-100"
      aria-labelledby="partners-heading"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative">
            <h2 
              id="partners-heading"
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight ${isArabic ? 'font-arabic' : ''}`}
            >
              {t('partners.title')}
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            {t('partners.description')}
          </p>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
            <div className="relative">
              <div className="h-2 w-20 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full"></div>
              <div className="absolute inset-0 h-2 w-20 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full animate-pulse opacity-75"></div>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-red-500/50 to-transparent"></div>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Embla Viewport */}
          <div className="w-full overflow-hidden" ref={viewportRef}>
            <div className="flex -ml-2 sm:-ml-4 md:-ml-6">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-2 sm:pl-4 md:pl-6"
                >
                  <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:border-red-500/60 cursor-pointer w-full">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
                    
                    {/* Inner content container */}
                    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/2 rounded-2xl">
                      {/* Partner Logo Container */}
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="relative transform transition-transform duration-700 group-hover:scale-105">
                          <img
                            src={partner.logo}
                            alt={partner.alt}
                            className="max-w-full max-h-full object-contain filter brightness-95 contrast-105 group-hover:brightness-110 group-hover:contrast-120 transition-all duration-700 drop-shadow-lg"
                            loading="lazy"
                          />
                          {/* Logo glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-xl" />
                        </div>
                      </div>
                      
                      {/* Premium overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-white text-xl font-bold mb-2 tracking-wide">{partner.name}</h3>
                          {partner.description && (
                            <p className="text-gray-300 text-sm leading-relaxed opacity-90">{partner.description}</p>
                          )}
                          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                        </div>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Premium Navigation Buttons */}
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md flex items-center justify-center border border-slate-600/50 shadow-xl transition-all duration-500 group ${
              isArabic ? nextBtnEnabled : prevBtnEnabled 
                ? 'opacity-100 hover:bg-gradient-to-br hover:from-red-600/90 hover:to-red-700/90 hover:border-red-500/60 hover:shadow-red-500/25 hover:scale-110' 
                : 'opacity-40 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={isArabic ? !nextBtnEnabled : !prevBtnEnabled}
            aria-label="Previous slide"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md flex items-center justify-center border border-slate-600/50 shadow-xl transition-all duration-500 group ${
              isArabic ? prevBtnEnabled : nextBtnEnabled 
                ? 'opacity-100 hover:bg-gradient-to-br hover:from-red-600/90 hover:to-red-700/90 hover:border-red-500/60 hover:shadow-red-500/25 hover:scale-110' 
                : 'opacity-40 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={isArabic ? !prevBtnEnabled : !nextBtnEnabled}
            aria-label="Next slide"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;