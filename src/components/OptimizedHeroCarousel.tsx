/**
 * Optimized HeroCarousel Component
 * - Removes Framer Motion dependency (~200KB savings)
 * - Uses lightweight CSS animations
 * - Optimized image loading with srcset and fetchpriority
 * - Prevents layout shifts with explicit dimensions
 * - Mobile-first responsive design
 * - Reduced DOM complexity
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Shield, Award } from './icons';
import { animationClasses, createCarouselTransition } from '../utils/lightweight-animations';

interface SlideContent {
  id: number;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  image: string;
  imageSources: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  ctaLink: string;
}

interface OptimizedHeroCarouselProps {
  slides: SlideContent[];
  isArabic?: boolean;
  getLocalizedUrl: (url: string) => string;
}

const OptimizedHeroCarousel: React.FC<OptimizedHeroCarouselProps> = ({
  slides,
  isArabic = false,
  getLocalizedUrl
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Preload critical first image
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

  // Auto-play functionality with cleanup
  useEffect(() => {
    if (isAutoPlaying && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  // Optimized slide transition
  const goToSlide = useCallback((index: number) => {
    if (index !== currentSlide && containerRef.current) {
      setCurrentSlide(index);
      const slidesContainer = containerRef.current.querySelector('.slides-container') as HTMLElement;
      if (slidesContainer) {
        createCarouselTransition(slidesContainer, index, slides.length);
      }
    }
  }, [currentSlide, slides.length]);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }, [currentSlide, slides.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (!slides.length) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      style={{ height: 'clamp(70vh, 85vh, 95vh)' }} // Responsive height without layout shift
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Optimized slides container */}
      <div 
        className="slides-container flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="flex-shrink-0 w-full h-full relative">
            {/* Optimized responsive image with explicit dimensions */}
            <picture>
              <source 
                media="(max-width: 640px)" 
                srcSet={slide.imageSources.mobile}
                width="640"
                height="480"
              />
              <source 
                media="(max-width: 1024px)" 
                srcSet={slide.imageSources.tablet}
                width="1024"
                height="768"
              />
              <source 
                media="(min-width: 1025px)" 
                srcSet={slide.imageSources.desktop}
                width="1920"
                height="1080"
              />
              <img 
                src={slide.image} 
                alt={slide.title[isArabic ? 'ar' : 'en']} 
                className="w-full h-full object-cover"
                width="1920"
                height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                onLoad={() => index === 0 && setIsLoaded(true)}
                style={{ aspectRatio: '16/9' }}
              />
            </picture>
            
            {/* Optimized overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40" />
            <div className={`absolute inset-0 bg-gradient-to-r ${
              isArabic ? 'from-transparent via-black/30 to-black/80' : 'from-black/80 via-black/30 to-transparent'
            }`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Content overlay */}
            {index === currentSlide && (
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-4 w-full">
                  <div className={`max-w-2xl ${isArabic ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                    {/* Animated content with CSS classes */}
                    <div className={`${animationClasses.fadeInUp} animation-delay-200`}>
                      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent ${isArabic ? 'font-arabic' : ''}`}>
                        {slide.title[isArabic ? 'ar' : 'en']}
                      </h1>
                    </div>
                    
                    <div className={`${animationClasses.fadeInUp} animation-delay-400`}>
                      <p className={`text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-lg ${isArabic ? 'font-arabic' : ''}`}>
                        {slide.subtitle[isArabic ? 'ar' : 'en']}
                      </p>
                    </div>
                    
                    {/* Trust indicators */}
                    <div className={`${animationClasses.fadeInUp} animation-delay-600 flex items-center gap-6 mb-8 ${isArabic ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Star size={20} className="fill-current" />
                        <span className="text-white text-sm font-medium">4.9/5</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <Shield size={20} />
                        <span className="text-white text-sm font-medium">
                          {isArabic ? 'مضمون' : 'Guaranteed'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Award size={20} />
                        <span className="text-white text-sm font-medium">
                          {isArabic ? 'معتمد' : 'Certified'}
                        </span>
                      </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className={`${animationClasses.fadeInUp} animation-delay-800 flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <a 
                        href={getLocalizedUrl(slide.ctaLink)}
                        className={`inline-flex items-center justify-center px-8 py-4 bg-[#e32636] text-white font-semibold rounded-lg shadow-xl hover:bg-red-700 transition-all duration-300 border border-[#e32636] ${animationClasses.scaleHover}`}
                      >
                        {isArabic ? 'اكتشف المزيد' : 'Discover More'}
                      </a>
                      <a 
                        href={getLocalizedUrl('/contact')}
                        className={`inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-gradient-to-br hover:from-slate-800/95 hover:via-slate-700/90 hover:to-slate-800/95 hover:border-red-500 transition-all duration-300 shadow-xl ${animationClasses.scaleHover}`}
                      >
                        {isArabic ? 'تواصل معنا' : 'Contact Us'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Optimized navigation controls */}
      {slides.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'} z-30 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-200 ${animationClasses.scaleHover}`}
            aria-label={isArabic ? 'الشريحة السابقة' : 'Previous slide'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={isArabic ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"}/>
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'left-4' : 'right-4'} z-30 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-all duration-200 ${animationClasses.scaleHover}`}
            aria-label={isArabic ? 'الشريحة التالية' : 'Next slide'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={isArabic ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}/>
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-[#e32636] scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`${isArabic ? 'اذهب إلى الشريحة' : 'Go to slide'} ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Loading indicator for first paint */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-40">
          <div className="w-8 h-8 border-2 border-[#e32636] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedHeroCarousel;
