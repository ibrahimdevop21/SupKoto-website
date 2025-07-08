import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppButton from './ui/AppButton';
import { getLocalizedUrl } from '../i18n/utils';

interface SlideContent {
  id: number;
  image: string;
  imageSources: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  ctaLink: string;
}

interface HeroCarouselProps {
  currentLocale: string;
  isRTL: boolean;
}

// Define image sources with multiple resolutions for responsive loading
interface ImageSources {
  mobile: string;  // Small screens (up to 768px)
  tablet: string;  // Medium screens (768px-1024px)
  desktop: string; // Large screens (1024px+)
}

const slides: SlideContent[] = [
  {
    id: 1,
    image: "/images/hero.webp",
    imageSources: {
      mobile: "/images/optimized/hero-mobile.webp",
      tablet: "/images/optimized/hero-tablet.webp",
      desktop: "/images/optimized/hero-desktop.webp"
    },
    title: {
      en: "Up to 15 Years of Guaranteed Protection",
      ar: "ضمان حماية حتى ١٥ سنة"
    },
    description: {
      en: "Drive worry-free for over a decade with extreme resistance to heat and UV damage.",
      ar: "استمتع بالقيادة بدون قلق لأكثر من ١٠ سنوات مع مقاومة فائقة للحرارة وأشعة الشمس."
    },
    ctaLink: "services"
  },
  {
    id: 2,
    image: "/images/ceramic-coating.webp",
    imageSources: {
      mobile: "/images/optimized/ceramic-coating-mobile.webp",
      tablet: "/images/optimized/ceramic-coating-tablet.webp",
      desktop: "/images/optimized/ceramic-coating-desktop.webp"
    },
    title: {
      en: "Gloss or Matte — You Choose the Finish",
      ar: "لمعة أو مط؟ أنت تختار"
    },
    description: {
      en: "Customize your car's look with a wide selection of PPF colors and finishes.",
      ar: "غيّر مظهر سيارتك بمجموعة واسعة من ألوان وتشطيبات أفلام الحماية."
    },
    ctaLink: "services"
  },
  {
    id: 3,
    image: "/images/luxury-detailing.webp",
    imageSources: {
      mobile: "/images/optimized/luxury-detailing-mobile.webp",
      tablet: "/images/optimized/luxury-detailing-tablet.webp",
      desktop: "/images/optimized/luxury-detailing-desktop.webp"
    },
    title: {
      en: "Self-Healing & Scratch-Resistant",
      ar: "طبقة ذاتية الإصلاح ومقاومة للخدوش"
    },
    description: {
      en: "Enjoy long-term shine and protection thanks to advanced self-repair features.",
      ar: "استمتع بلمعان يدوم وحماية قوية مع خاصية الإصلاح الذاتي."
    },
    ctaLink: "contact"
  }
];

export default function HeroCarousel({ currentLocale, isRTL }: HeroCarouselProps) {
  const isArabic = isRTL;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => {
      if (index < 0) return totalSlides - 1;
      if (index >= totalSlides) return 0;
      return index;
    });
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition duration
  }, [totalSlides, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Setup autoplay
  useEffect(() => {
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 seconds interval
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };

    startAutoPlay();

    // Pause autoplay when user interacts with carousel
    const handleInteraction = () => {
      stopAutoPlay();
      // Restart after a delay
      setTimeout(startAutoPlay, 10000);
    };

    const carouselElement = document.querySelector('.hero-carousel');
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', stopAutoPlay);
      carouselElement.addEventListener('mouseleave', startAutoPlay);
      carouselElement.addEventListener('touchstart', handleInteraction, { passive: true });
    }

    return () => {
      stopAutoPlay();
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoPlay);
        carouselElement.removeEventListener('mouseleave', startAutoPlay);
        carouselElement.removeEventListener('touchstart', handleInteraction);
      }
    };
  }, [nextSlide]);

  return (
    <div className="w-full relative min-h-screen hero-carousel overflow-hidden">
      {/* Slides container */}
      <div 
        className="h-screen relative transition-transform duration-500 ease-in-out"
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(${isArabic ? '' : '-'}${currentSlide * (100 / totalSlides)}%)`
        }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="absolute top-0 h-full"
            style={{
              width: `${100 / totalSlides}%`,
              left: `${index * (100 / totalSlides)}%`
            }}
          >
            <div className="relative h-full w-full">
              {/* Responsive container with proper aspect ratios */}
              <div className="absolute inset-0 w-full h-full">
                <picture>
                  {/* Mobile source */}
                  <source
                    media="(max-width: 640px)"
                    srcSet={slide.imageSources.mobile}
                    width="640"
                    height="360"
                  />
                  {/* Tablet source */}
                  <source
                    media="(min-width: 641px) and (max-width: 1023px)"
                    srcSet={slide.imageSources.tablet}
                    width="1024"
                    height="576"
                  />
                  {/* Desktop source */}
                  <source
                    media="(min-width: 1024px)"
                    srcSet={slide.imageSources.desktop}
                    width="1920"
                    height="1080"
                  />
                  {/* Fallback image */}
                  <img
                    src={slide.image}
                    alt={slide.title[isArabic ? 'ar' : 'en']}
                    className="absolute inset-0 w-full h-full md:object-cover object-fills"
                    width="1280"
                    height="720"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    {...(index === 0 ? { 'fetchpriority': 'high' } : {})}
                  />
                </picture>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-background/90 to-transparent' : 'from-background/90 to-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-2xl text-white w-full md:w-3/4 lg:w-1/2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight text-white">
                      {slide.title[isArabic ? 'ar' : 'en']}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                      {slide.description[isArabic ? 'ar' : 'en']}
                    </p>
                    <div className={`flex flex-row gap-2 sm:gap-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                      <a href={getLocalizedUrl(slide.ctaLink)}>
                        <AppButton>
                          {isArabic ? 'تصفح خدماتنا' : 'Our Services'}
                          <svg className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </AppButton>
                      </a>
                      <a href={getLocalizedUrl('contact')}>
                        <AppButton variant="outline" className="text-secondary-foreground bg-secondary/80 border-secondary hover:bg-secondary/90">
                          {isArabic ? 'تواصل معنا' : 'Contact Us'}
                          <svg className={`w-5 h-5 ${isArabic ? 'mr-2' : 'ml-2'}`} fill="none" stroke="black" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </AppButton>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Navigation Buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute z-10 left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-background/50 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute z-10 right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-background/50 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
