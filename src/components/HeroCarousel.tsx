import React, { useState, useEffect, useCallback } from 'react';
import { useLocalizedUrl } from '../i18n/react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, PrevButton, NextButton } from './shared/EmblaCarouselArrowsDotsButtons';
import CarouselSlide from './shared/CarouselSlide';
import { motion, type Variants } from 'framer-motion';
import { Star, Shield, Award } from 'lucide-react';

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
      ar: "ضمان حماية حتى ١٥ سنة"
    },
    description: {
      en: "Professional waterproofing solutions for your home and business with industry-leading warranties",
      ar: "حلول عزل مائي احترافية لمنزلك وعملك مع ضمانات رائدة في الصناعة"
    },
    ctaLink: "/services",
    features: [
      { icon: Shield, text: { en: "Guaranteed Protection", ar: "حماية مضمونة" } },
      { icon: Award, text: { en: "Premium Quality", ar: "جودة عالية" } },
      { icon: Star, text: { en: "5-Star Service", ar: "خدمة ٥ نجوم" } }
    ]
  },
  {
    id: 2,
    image: "/images/hero.webp",
    imageSources: {
      mobile: "/images/optimized/hero-mobile.webp",
      tablet: "/images/optimized/hero-tablet.webp",
      desktop: "/images/optimized/hero-desktop.webp"
    },
    title: {
      en: "Expert Installation & Maintenance",
      ar: "تركيب وصيانة احترافية"
    },
    description: {
      en: "Trusted by thousands of customers across the region with certified professionals and proven results",
      ar: "موثوق من قبل آلاف العملاء في المنطقة مع محترفين معتمدين ونتائج مثبتة"
    },
    ctaLink: "/about",
    features: [
      { icon: Award, text: { en: "Certified Team", ar: "فريق معتمد" } },
      { icon: Shield, text: { en: "Insured Work", ar: "عمل مؤمن" } },
      { icon: Star, text: { en: "1000+ Projects", ar: "١٠٠٠+ مشروع" } }
    ]
  },
  {
    id: 3,
    image: "/images/hero.webp",
    imageSources: {
      mobile: "/images/optimized/hero-mobile.webp",
      tablet: "/images/optimized/hero-tablet.webp",
      desktop: "/images/optimized/hero-desktop.webp"
    },
    title: {
      en: "Premium Quality Materials",
      ar: "مواد عالية الجودة"
    },
    description: {
      en: "Using only the finest imported materials and cutting-edge technology for lasting protection",
      ar: "نستخدم أجود المواد المستوردة والتكنولوجيا المتطورة لحماية دائمة"
    },
    ctaLink: "/offers",
    features: [
      { icon: Shield, text: { en: "Imported Quality", ar: "جودة مستوردة" } },
      { icon: Award, text: { en: "Latest Technology", ar: "أحدث التقنيات" } },
      { icon: Star, text: { en: "Eco-Friendly", ar: "صديق للبيئة" } }
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

const itemVariants: Variants = {
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  return (
    <div className="relative overflow-hidden bg-[#0e0e0f]">
      <div className="overflow-hidden h-[85vh] md:h-[90vh] lg:h-[95vh]" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <CarouselSlide key={slide.id} className="w-full h-full">
              <div className="relative w-full h-full">
                <picture>
                  <source media="(max-width: 640px)" srcSet={slide.imageSources.mobile} />
                  <source media="(max-width: 1024px)" srcSet={slide.imageSources.tablet} />
                  <source media="(min-width: 1025px)" srcSet={slide.imageSources.desktop} />
                  <motion.img 
                    src={slide.image} 
                    alt={slide.title[isArabic ? 'ar' : 'en']} 
                    className="w-full h-full object-cover"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </picture>
                
                <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? 'from-transparent via-[#0e0e0f]/70 to-[#0e0e0f]' : 'from-[#0e0e0f] via-[#0e0e0f]/70 to-transparent'}`} />
                
                <div className="absolute inset-0 flex items-center">
                  <motion.div 
                    className="max-w-7xl mx-auto px-4 md:px-12 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className={`max-w-2xl ${isArabic ? 'mr-auto text-right' : 'ml-0 text-left'}`}>
                      <motion.div variants={itemVariants}>
                        <span className="text-lg font-semibold text-[#e32636] tracking-widest">卓越の保護</span>
                      </motion.div>

                      <motion.h1 
                        variants={itemVariants}
                        className={`text-3xl md:text-5xl font-bold tracking-tight text-white mt-2 mb-4 ${isArabic ? 'font-arabic' : ''}`}
                      >
                        {slide.title[isArabic ? 'ar' : 'en']}
                      </motion.h1>
                      
                      <motion.p 
                        variants={itemVariants}
                        className={`text-base md:text-lg text-gray-400 mb-8 max-w-xl ${isArabic ? 'font-arabic' : ''}`}
                      >
                        {slide.description[isArabic ? 'ar' : 'en']}
                      </motion.p>
                      
                      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                        {slide.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center bg-[#1a1a1c]/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white border border-[#2e2e30]">
                            <feature.icon className="w-5 h-5 mr-2 text-[#e32636]" />
                            <span className={`text-sm font-medium ${isArabic ? 'font-arabic' : ''}`}>
                              {feature.text[isArabic ? 'ar' : 'en']}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <motion.a 
                          href={getLocalizedUrl(slide.ctaLink)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center px-6 py-3 bg-[#e32636] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                        >
                          {isArabic ? 'اكتشف المزيد' : 'Discover More'}
                        </motion.a>
                        <motion.a 
                          href={getLocalizedUrl('/contact')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#2e2e30] text-white font-semibold rounded-lg hover:bg-[#1a1a1c] hover:border-[#e32636] transition-colors duration-300"
                        >
                          {isArabic ? 'تواصل معنا' : 'Contact Us'}
                        </motion.a>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-1/2 ${isRTL ? 'left-8' : 'right-8'} transform -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-[#e32636] to-[#e32636]/80 rounded-full opacity-60`} />
              </div>
            </CarouselSlide>
          ))}
        </div>
      </div>
      
      <div className="embla__controls absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <div className="embla__dots flex items-center space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  );
};

export default HeroCarousel;
