import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from '../i18n/react';

interface WorkItem {
  id: number;
  title: string;
  image: string;
  description?: string;
}

interface LatestWorkCarouselProps {
  isArabic?: boolean;
  slides?: WorkItem[];
}

const defaultSlides: WorkItem[] = [
  {
    id: 1,
    title: 'G63 Matte PPF',
    image: '/work/work1.webp',
    description: 'Full vehicle paint protection film'
  },
  {
    id: 2,
    title: 'Urus Full Wrap',
    image: '/work/work2.webp',
    description: 'Custom color change wrap'
  },
  {
    id: 3,
    title: 'Bentley Detailing',
    image: '/work/work3.webp',
    description: 'Premium ceramic coating'
  },
  {
    id: 4,
    title: 'Range Rover Interior',
    image: '/work/work4.webp',
    description: 'Complete interior restoration'
  },
  {
    id: 5,
    title: 'Porsche Custom Work',
    image: '/work/work5.webp',
    description: 'Performance upgrades and styling'
  }
];

const LatestWorkCarousel: React.FC<LatestWorkCarouselProps> = ({ 
  isArabic = false,
  slides = defaultSlides 
}) => {
  const t = useTranslations(isArabic ? 'ar' : 'en');
  const [viewportRef, embla] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    skipSnaps: false,
    direction: isArabic ? 'rtl' : 'ltr'
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Autoplay configuration
  const AUTOPLAY_DELAY = 3500; // 3.5 seconds for latest work
  
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
    setTimeout(() => resumeAutoplay(), 1200);
  }, [embla, isArabic, pauseAutoplay, resumeAutoplay]);
  
  const scrollNext = useCallback(() => {
    pauseAutoplay();
    embla && (isArabic ? embla.scrollPrev() : embla.scrollNext());
    // Resume autoplay after manual interaction
    setTimeout(() => resumeAutoplay(), 1200);
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
      aria-labelledby="latest-work-heading"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative">
            <h2 
              id="latest-work-heading"
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight ${isArabic ? 'font-arabic' : ''}`}
            >
              {t('latestWork.title')}
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            {t('latestWork.description')}
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
              {slides.map((slide) => (
                <div 
                  key={slide.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-2 sm:pl-4 md:pl-6"
                >
                  <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:border-red-500/60 cursor-pointer transition-all duration-300 hover:scale-105">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm transition-all duration-300 hover:scale-105" />
                    
                    {/* Image Container */}
                    <div className="relative h-full overflow-hidden rounded-2xl">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 transition-all duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Subtle bottom gradient for text readability - only at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transition-all duration-300 hover:scale-105" />
                      
                      {/* Text overlay - only appears on hover at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 transition-all duration-300 hover:scale-105">
                        <h3 className="text-white text-xl font-bold mb-2 tracking-wide drop-shadow-lg">{slide.title}</h3>
                        {slide.description && (
                          <p className="text-gray-200 text-sm leading-relaxed opacity-90 drop-shadow-md">{slide.description}</p>
                        )}
                        <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transition-all duration-300 hover:scale-105" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Premium Navigation Buttons */}
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-4 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md flex items-center justify-center border border-slate-600/50 shadow-xl transition-all duration-500 group ${
              isArabic ? nextBtnEnabled : prevBtnEnabled 
                ? 'opacity-100 hover:bg-gradient-to-br hover:from-red-600/90 hover:to-red-700/90 hover:border-red-500/60 hover:shadow-red-500/25 hover:scale-110' 
                : 'opacity-40 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={isArabic ? !nextBtnEnabled : !prevBtnEnabled}
            aria-label="Previous slide"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm transition-all duration-300 hover:scale-105" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300 transition-all duration-300 hover:scale-105">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-4 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md flex items-center justify-center border border-slate-600/50 shadow-xl transition-all duration-500 group ${
              isArabic ? prevBtnEnabled : nextBtnEnabled 
                ? 'opacity-100 hover:bg-gradient-to-br hover:from-red-600/90 hover:to-red-700/90 hover:border-red-500/60 hover:shadow-red-500/25 hover:scale-110' 
                : 'opacity-40 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={isArabic ? !prevBtnEnabled : !nextBtnEnabled}
            aria-label="Next slide"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm transition-all duration-300 hover:scale-105" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300 transition-all duration-300 hover:scale-105">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestWorkCarousel;