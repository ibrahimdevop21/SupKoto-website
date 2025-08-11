import React, { useEffect, useRef, useState } from 'react';
import './testimonials.css'; // Import for shared animations

// Types
interface PartnerDescription {
  en: string;
  ar: string;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  description: PartnerDescription;
}

interface ModernTrustedByProps {
  currentLocale: 'en' | 'ar';
  translations: {
    title: string;
    description: string;
  };
  partners: Partner[];
}

const ModernTrustedBy: React.FC<ModernTrustedByProps> = ({ 
  currentLocale, 
  translations,
  partners 
}) => {
  const isRTL = currentLocale === 'ar';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  // Control continuous scrolling animation
  useEffect(() => {
    // Only start animation once images are loaded
    if (!imagesLoaded || !startAnimation) return;
    
    if (scrollTrackRef.current) {
      // Add the animate-scroll class from testimonials.css
      scrollTrackRef.current.classList.add('animate-scroll');
    }
    
    // Optional: add event listener to pause on hover if desired
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
  }, [isRTL, imagesLoaded, startAnimation]);
  
  // Preload images to avoid glitchy appearance
  useEffect(() => {
    // Create array of all partner logos
    const logoUrls = partners.map(partner => partner.logo);
    let loadedCount = 0;
    
    // Preload all logos
    logoUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === logoUrls.length) {
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
        if (loadedCount === logoUrls.length) {
          setImagesLoaded(true);
          setTimeout(() => {
            setStartAnimation(true);
          }, 100);
        }
      };
      img.src = url;
    });
  }, [partners]);
  
  // Enhanced scroll effect when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-active');
          } else {
            entry.target.classList.remove('scroll-active');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      if (scrollContainerRef.current) {
        observer.unobserve(scrollContainerRef.current);
      }
    };
  }, []);

  // Duplicate the partners array to ensure continuous flow
const duplicatePartners = [...partners, ...partners, ...partners];

return (
    <section className="trusted-by-section w-full overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight ${
              isRTL ? 'font-arabic' : ''
            }`}>
              {translations.title}
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <p className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed ${
            isRTL ? 'font-arabic' : ''
          }`}>
            {translations.description}
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

        {/* Partners Continuous Scroll */}
        <div 
          ref={scrollContainerRef}
          className="testimonial-scroll-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Scroll Track */}
          <div 
            ref={scrollTrackRef}
            className={`testimonial-scroll-track flex ${!imagesLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
          >
            {/* Three sets of partners to ensure continuous scrolling with enough logos */}
            {duplicatePartners.map((partner, index) => (
              <PartnerCard 
                key={`partner-${partner.id}-${index}`} 
                partner={partner} 
                currentLocale={currentLocale} 
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">12+</div>
              <div className={`text-sm lg:text-base text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'علامة تجارية' : 'Brands'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className={`text-sm lg:text-base text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'سيارة تم خدمتها' : 'Cars Serviced'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
              <div className={`text-sm lg:text-base text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'رضا العملاء' : 'Satisfaction'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
              <div className={`text-sm lg:text-base text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'سنوات خبرة' : 'Years Experience'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Partner Card Component
interface PartnerCardProps {
  partner: Partner;
  currentLocale: 'en' | 'ar';
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, currentLocale }) => {
  return (
    <div 
      className="partner-card flex-none min-w-[250px] w-[250px] sm:min-w-[280px] sm:w-[280px] md:min-w-[300px] md:w-[300px] mx-4"
    >
      <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:border-red-500/60 cursor-pointer h-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
        
        {/* Inner content container */}
        <div className="relative h-full bg-gradient-to-br from-white/5 to-white/2 rounded-2xl">
          {/* Partner Logo Container */}
          <div className="p-8 sm:p-10 h-full flex items-center justify-center relative z-10">
            <img 
              src={partner.logo}
              alt={partner.alt}
              className="max-w-full max-h-[80px] object-contain transition-all duration-700 group-hover:scale-110 filter brightness-90 contrast-90 group-hover:brightness-100 group-hover:contrast-100"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Partner Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/95 via-slate-800/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm">
          {/* Add subtle glowing line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          <h3 className="text-white font-semibold text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300 transform -translate-y-2 group-hover:translate-y-0">{partner.name}</h3>
          <p className="text-slate-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-300 transform -translate-y-2 group-hover:translate-y-0">{partner.description[currentLocale]}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernTrustedBy;
