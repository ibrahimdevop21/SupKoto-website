import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '../i18n/react';
import { OptimizedImage } from './OptimizedImage';
import './testimonials.css'; // Import for continuous scroll animations

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  
  // Control continuous scrolling animation
  useEffect(() => {
    // Only start animation once images are loaded
    if (!imagesLoaded || !startAnimation) return;
    
    if (scrollTrackRef.current) {
      // Add the animate-scroll class from testimonials.css
      // The RTL direction will be handled automatically by the CSS in testimonials.css
      // which uses [dir="rtl"] selector to apply the right animation
      scrollTrackRef.current.classList.add('animate-scroll');
    }
    
    // Add event listener to pause on hover
    const scrollContainer = scrollContainerRef.current;
    const scrollTrack = scrollTrackRef.current;
    
    if (scrollContainer && scrollTrack) {
      const handleMouseEnter = () => {
        scrollTrack.style.animationPlayState = 'paused';
      };
      
      const handleMouseLeave = () => {
        scrollTrack.style.animationPlayState = 'running';
      };
      
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isArabic, imagesLoaded, startAnimation]);
  
  // Preload images to avoid glitchy appearance
  useEffect(() => {
    // Create array of all work images
    const imageUrls = slides.map(slide => slide.image);
    let loadedCount = 0;
    
    // Preload all images
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          // All images loaded, mark as ready
          setImagesLoaded(true);
          // Start animation after a short delay for smoother transition
          setTimeout(() => {
            setStartAnimation(true);
          }, 100);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
          setTimeout(() => {
            setStartAnimation(true);
          }, 100);
        }
      };
      img.src = url;
    });
  }, [slides]);
  
  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('scroll-active');
          } else {
            entry.target.classList.remove('scroll-active');
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

  // Triple the slides for continuous scroll effect
  const tripleSlides = [...slides, ...slides, ...slides];
  
  return (
    <section 
      ref={sectionRef} 
      className={`w-full overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      aria-labelledby="latest-work-heading"
      dir={isArabic ? 'rtl' : 'ltr'}
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
        
        {/* Continuous Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="relative w-full overflow-hidden" 
          style={{ opacity: imagesLoaded && startAnimation ? 1 : 0, transition: 'opacity 500ms ease-in-out' }}
        >
          <div 
            ref={scrollTrackRef}
            className="flex"
          >
            {tripleSlides.map((slide, index) => (
              <div 
                key={`${slide.id}-${index}`} 
                className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3"
              >
                <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:border-red-500/60 cursor-pointer">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
                  
                  {/* Image Container */}
                  <div className="relative h-full overflow-hidden rounded-2xl">
                    <OptimizedImage
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      width={480}
                      height={360}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Subtle bottom gradient for text readability - only at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Text overlay - only appears on hover at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-xl font-bold mb-2 tracking-wide drop-shadow-lg">{slide.title}</h3>
                      {slide.description && (
                        <p className="text-gray-200 text-sm leading-relaxed opacity-90 drop-shadow-md">{slide.description}</p>
                      )}
                      <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

export default LatestWorkCarousel;