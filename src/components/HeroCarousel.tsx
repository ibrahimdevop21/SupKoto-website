import React from 'react';
import { Button } from './ui/button';
import { getLocalizedUrl } from '../i18n/utils';
import EmblaCarousel from './shared/EmblaCarousel';
import CarouselSlide from './shared/CarouselSlide';

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
  return (
    <div className="relative overflow-hidden hero-carousel">
      <EmblaCarousel
        options={{ 
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr'
        }}
        isRTL={isRTL}
        showNavButtons={true}
        showDots={true}
        className="h-[70vh] md:h-[80vh]"
      >
        {slides.map((slide) => (
          <CarouselSlide key={slide.id} className="w-full h-full">
            <div className="relative w-full h-full">
              {/* Responsive image with srcset */}
              <picture>
                <source media="(max-width: 640px)" srcSet={slide.imageSources.mobile} />
                <source media="(max-width: 1024px)" srcSet={slide.imageSources.tablet} />
                <source media="(min-width: 1025px)" srcSet={slide.imageSources.desktop} />
                <img 
                  src={slide.image} 
                  alt={slide.title[isArabic ? 'ar' : 'en']} 
                  className="w-full h-full object-cover"
                  loading={slide.id === 1 ? "eager" : "lazy"}
                />
              </picture>
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
                  <h2 
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl ${isArabic ? 'font-arabic' : ''}`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    {slide.title[isArabic ? 'ar' : 'en']}
                  </h2>
                  <p 
                    className={`text-lg md:text-xl text-white/90 mb-8 max-w-2xl ${isArabic ? 'font-arabic' : ''}`}
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    {slide.description[isArabic ? 'ar' : 'en']}
                  </p>
                  <Button 
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                    asChild
                  >
                    <a href={getLocalizedUrl(slide.ctaLink, currentLocale)}>
                      {isArabic ? 'اكتشف المزيد' : 'Learn More'}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </EmblaCarousel>
    </div>
  );
}
