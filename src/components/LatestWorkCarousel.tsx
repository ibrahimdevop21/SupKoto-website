import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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
  const [isVisible, setIsVisible] = useState(false);
  
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  
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
      className={`overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="latest-work-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 
            id="latest-work-heading"
            className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isArabic ? 'font-arabic' : ''}`}
          >
            {isArabic ? 'أحدث أعمالنا' : 'Latest Work'}
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-400"></div>
            <div className="h-1 w-16 bg-red-500 rounded-full animate-pulse"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-400"></div>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex -ml-6">
              {slides.map((slide) => (
                <div 
                  key={slide.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6"
                >
                  <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-800">
                    {/* Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold">{slide.title}</h3>
                      {slide.description && (
                        <p className="text-neutral-300 mt-2">{slide.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-300 ${
              prevBtnEnabled 
                ? 'opacity-100 hover:bg-black/70' 
                : 'opacity-30 cursor-not-allowed'
            } ${isArabic ? 'rotate-180' : ''}`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-300 ${
              nextBtnEnabled 
                ? 'opacity-100 hover:bg-black/70' 
                : 'opacity-30 cursor-not-allowed'
            } ${isArabic ? 'rotate-180' : ''}`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestWorkCarousel;
