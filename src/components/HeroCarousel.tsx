import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AppButton from './ui/AppButton';
import { getLocalizedUrl } from '../i18n/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SlideContent {
  id: number;
  image: string;
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

const slides: SlideContent[] = [
  {
    id: 1,
    image: "/images/hero.webp",
    title: {
      en: "Premium Paint Protection Film",
      ar: "فيلم حماية الطلاء الممتاز"
    },
    description: {
      en: "Protect your vehicle with our Japanese-made PPF technology, offering unmatched clarity and durability",
      ar: "احمِ سيارتك بتقنية فيلم الحماية الياباني، الذي يوفر وضوحًا ومتانة لا مثيل لهما"
    },
    ctaLink: "services"
  },
  {
    id: 2,
    image: "/images/ceramic-coating.webp",
    title: {
      en: "Ceramic Coating Excellence",
      ar: "التميز في الطلاء السيراميك"
    },
    description: {
      en: "Our professional ceramic coating provides long-lasting protection and a mirror-like finish",
      ar: "يوفر طلاء السيراميك الاحترافي لدينا حماية طويلة الأمد ولمسة نهائية تشبه المرآة"
    },
    ctaLink: "services"
  },
  {
    id: 3,
    image: "/images/luxury-detailing.webp",
    title: {
      en: "Luxury Auto Detailing",
      ar: "تفاصيل السيارات الفاخرة"
    },
    description: {
      en: "Experience the ultimate in automotive care with our premium detailing services",
      ar: "استمتع بأقصى درجات العناية بالسيارات مع خدمات التفاصيل المتميزة لدينا"
    },
    ctaLink: "contact"
  }
];

export default function HeroCarousel({ currentLocale, isRTL }: HeroCarouselProps) {
  const isArabic = isRTL;

  return (
    <div className="w-full relative min-h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-screen"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title[isArabic ? 'ar' : 'en']}
                className="absolute inset-0 w-full h-full object-cover"
                loading={slide.id === 1 ? "eager" : "lazy"}
                fetchPriority={slide.id === 1 ? "high" : "auto"}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${isArabic ? 'from-black/80 to-transparent' : 'from-black/80 to-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-2xl text-white w-full md:w-3/4 lg:w-1/2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                      {slide.title[isArabic ? 'ar' : 'en']}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
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
                        <AppButton variant="outline" className="text-black bg-white/80 border-white hover:bg-white/90">
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className={`swiper-button-prev absolute z-10 left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all duration-300 ${isArabic ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className={`swiper-button-next absolute z-10 right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all duration-300 ${isArabic ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
