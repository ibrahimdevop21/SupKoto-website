import React, { useState, useEffect, useCallback } from 'react';
import { useLocalizedUrl } from '../i18n/react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, PrevButton, NextButton } from './shared/EmblaCarouselArrowsDotsButtons';
import { Star, Shield, Award } from './icons';

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
  features: Array<{
    icon: React.ComponentType<any>;
    text: {
      en: string;
      ar: string;
    };
  }>;
}

interface HeroCarouselProps {
  currentLocale: string;
  isRTL: boolean;
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
      ar: "حماية مضمونة حتى ١٥ سنة"
    },
    description: {
      en: "Premium Japanese films with self-healing and hydrophobic technology — engineered to protect for years.",
      ar: "أفلام يابانية فاخرة بتقنية الشفاء الذاتي وخصائص طاردة للماء، مصممة لحماية تدوم لسنوات."
    },
    ctaLink: "/services",
    features: [
      { icon: Shield, text: { en: "Self-Healing Film", ar: "فيلم شفاء ذاتي" } },
      { icon: Award, text: { en: "Japanese Quality", ar: "جودة يابانية" } },
      { icon: Star, text: { en: "Hydrophobic Layer", ar: "طبقة طاردة للماء" } }
    ]
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
      en: "Expert Installation & Surface Perfection",
      ar: "تركيب احترافي ولمسة نهائية مثالية"
    },
    description: {
      en: "Trusted by enthusiasts and professionals for flawless application and showroom-level finish.",
      ar: "موثوق من قبل المحترفين وعشاق السيارات بفضل التركيب المتقن واللمسة النهائية بمعايير صالات العرض."
    },
    ctaLink: "/about",
    features: [
      { icon: Award, text: { en: "Certified Installers", ar: "فنيون معتمدون" } },
      { icon: Shield, text: { en: "Scratch Recovery", ar: "إزالة الخدوش تلقائيًا" } },
      { icon: Star, text: { en: "15,000+ Detailed Cars", ar: "أكثر من ١٥,٠٠٠+ سيارة تم تنفيذها باحتراف" } }
    ]
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
      en: "Japanese Technology. Flawless Finish.",
      ar: "تقنية يابانية ولمسة نهائية مثالية"
    },
    description: {
      en: "Engineered with next-gen Japanese materials for ultra-clear finish, heat resistance, and water-repellent protection.",
      ar: "مصمم بأحدث المواد اليابانية لشفافية عالية، ومقاومة للحرارة، وطبقة طاردة للماء."
    },
    ctaLink: "/offers",
    features: [
      { icon: Shield, text: { en: "Hydrophobic Coating", ar: "طلاء طارد للماء" } },
      { icon: Award, text: { en: "Made in Japan", ar: "صناعة يابانية" } },
      { icon: Star, text: { en: "Self-Healing Tech", ar: "تقنية الشفاء الذاتي" } }
    ]
  }
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }
  },
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ currentLocale, isRTL }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: isRTL ? 'rtl' : 'ltr' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  
    // Preload first hero image for better LCP
    useEffect(() => {
      if (slides.length > 0) {
        const firstSlide = slides[0];
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = firstSlide.image;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    }, [slides]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getLocalizedUrl = useLocalizedUrl(currentLocale as 'en' | 'ar');
  const isArabic = isRTL;

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isAutoPlaying) return;
    
    const autoPlay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(autoPlay);
  }, [emblaApi, isAutoPlaying]);

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden h-[85vh] md:h-[90vh] lg:h-[95vh]" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide flex-shrink-0 min-w-0 relative w-full h-full">
              <div className="relative w-full h-full">
                <picture>
                  <source media="(max-width: 640px)" srcSet={slide.imageSources.mobile} />
                  <source media="(max-width: 1024px)" srcSet={slide.imageSources.tablet} />
                  <source media="(min-width: 1025px)" srcSet={slide.imageSources.desktop} />
                  <img 
                    src={slide.image} 
                    alt={slide.title[isArabic ? 'ar' : 'en']} 
                    className="w-full h-full object-cover"
                    width="1920"
                    height="1080"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                    fetchPriority={slide.id === 1 ? "high" : "low"}
                    decoding="async"
                  />
                </picture>
                
                {/* Enhanced overlays for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40" />
                <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? 'from-transparent via-black/30 to-black/80' : 'from-black/80 via-black/30 to-transparent'}`} />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#e32636]/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#e32636]/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                  <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-4 w-full">
                    <div className={`max-w-2xl ${isArabic ? 'ml-auto text-right' : 'mr-auto text-left'}`}>


                      <h1 
                        className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2 mb-6 ${isArabic ? 'font-arabic' : ''} drop-shadow-2xl relative z-30`}
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}
                      >
                        {slide.title[isArabic ? 'ar' : 'en']}
                      </h1>
                      
                      <p 
                        className={`text-lg md:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed ${isArabic ? 'font-arabic' : ''} bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 shadow-2xl relative z-30`}
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
                      >
                        {slide.description[isArabic ? 'ar' : 'en']}
                      </p>
                      
                      <div className={`flex flex-wrap gap-4 mb-8 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                        {slide.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-md rounded-xl px-5 py-4 text-white border border-red-500/40 shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 relative z-30 transition-all duration-300 hover:scale-105"
                          >
                            <feature.icon className="w-6 h-6 mr-3 text-[#e32636]" />
                            <span className={`text-sm font-medium ${isArabic ? 'font-arabic' : ''}`} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                              {feature.text[isArabic ? 'ar' : 'en']}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className={`flex flex-col sm:flex-row gap-4 relative z-30 ${isArabic ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <a 
                          href={getLocalizedUrl(slide.ctaLink)}
                          className="inline-flex items-center justify-center px-8 py-4 bg-[#e32636] text-white font-semibold rounded-lg shadow-xl hover:bg-red-700 transition-all duration-300 border border-[#e32636] hover:scale-105 transition-all duration-300 hover:scale-105"
                          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
                        >
                          {isArabic ? 'اكتشف المزيد' : 'Discover More'}
                        </a>
                        <a 
                          href={getLocalizedUrl('/contact')}
                          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-gradient-to-br hover:from-slate-800/95 hover:via-slate-700/90 hover:to-slate-800/95 hover:border-red-500 transition-all duration-300 shadow-xl hover:scale-105 transition-all duration-300 hover:scale-105"
                          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
                        >
                          {isArabic ? 'تواصل معنا' : 'Contact Us'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/70 to-transparent" />
                <div className={`absolute top-1/2 ${isRTL ? 'left-8' : 'right-8'} transform -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-[#e32636] to-[#e32636]/80 rounded-full opacity-60 shadow-lg shadow-[#e32636]/30`} />
                
                {/* Corner accent */}
                <div className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} w-16 h-16 border-2 border-[#e32636]/30 rounded-full opacity-40`} />
                <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} w-12 h-12 border border-white/20 rounded-full opacity-30`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Side navigation arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} isRTL={isRTL} />
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} isRTL={isRTL} />
      </div>
      
      {/* Slide counter */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-red-500/20">
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="font-medium">{String(selectedIndex + 1).padStart(2, '0')}</span>
            <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#e32636] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="font-medium text-white/60">{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom dots navigation */}
      <div className="embla__dots absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-sm rounded-full px-4 py-2 z-10 border border-red-500/20">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
