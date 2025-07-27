import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from '../i18n/react';
import './testimonials.css'; // Import for custom animations

interface Testimonial {
  id: number;
  name: string;
  branch: string;
  content: string;
  image?: string;
  rating: number;
}

interface TestimonialsProps {
  currentLocale?: 'en' | 'ar';
}

const Testimonials = ({ currentLocale = 'en' }: TestimonialsProps): JSX.Element => {
  const isArabic = currentLocale === 'ar';
  const t = useTranslations(currentLocale);

  // Embla carousel setup
  const [viewportRef, embla] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    skipSnaps: false,
    direction: isArabic ? 'rtl' : 'ltr'
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);
  const [expandedTestimonials, setExpandedTestimonials] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Autoplay configuration
  const AUTOPLAY_DELAY = 4000; // 4 seconds for testimonials
  
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
  
  // Carousel navigation functions
  // In RTL mode, we need to swap the scroll direction to maintain visual consistency
  const scrollPrev = useCallback(() => {
    pauseAutoplay();
    embla && (isArabic ? embla.scrollNext() : embla.scrollPrev());
    // Resume autoplay after manual interaction
    setTimeout(() => resumeAutoplay(), 1500);
  }, [embla, isArabic, pauseAutoplay, resumeAutoplay]);
  
  const scrollNext = useCallback(() => {
    pauseAutoplay();
    embla && (isArabic ? embla.scrollPrev() : embla.scrollNext());
    // Resume autoplay after manual interaction
    setTimeout(() => resumeAutoplay(), 1500);
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

  // Function to toggle expanded state of a testimonial
  const toggleExpand = (id: number) => {
    setExpandedTestimonials(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Set screen width on client side only
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced testimonial content with read more/less toggle
  const renderTestimonialContent = (testimonial: Testimonial) => {
    // Default truncation length for server-side rendering
    const defaultMaxLength = 150;
    // Use screenWidth only on client-side
    const maxLength = screenWidth === 0 ? defaultMaxLength : (screenWidth < 768 ? 120 : 180);
    const isExpanded = expandedTestimonials.includes(testimonial.id);
    const needsTruncation = testimonial.content.length > maxLength;
    
    return (
      <div className="mb-4">
        <div className="overflow-hidden transition-all duration-500 ease-in-out">
          <p className="text-foreground/90 text-sm sm:text-base mb-4 leading-relaxed">
            {needsTruncation && !isExpanded ? `${testimonial.content.substring(0, maxLength)}...` : testimonial.content}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {needsTruncation && (
            <button
              onClick={() => toggleExpand(testimonial.id)}
              className="text-primary hover:text-primary/90 text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md transition-all duration-300 hover:scale-105"
            >
              {isExpanded ? t('testimonials.readLess') : t('testimonials.readMore')}
            </button>
          )}
        </div>
      </div>
    );
  };

  // Sample testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Michaelangelo D\'Sa',
      branch: 'Dubai Al Quoz',
      content: "I had done a month of research, which included reading about PPF and the options I had here in Dubai. I even visited the 3 companies shortlisted for the job. I decided to use Supakoto purely due to the fact that Japan quality goes without question, and moreover, I managed to get the Ramadan deal that was on offer. This also included complete window tinting. After meeting up with Mr Hisham, I was convinced that I would not be disappointed. On the day I received my 2025 Lexus nx350h from the showroom, I drove directly to Al quoz and handed my car to Mr Hisham. It took almost a week, but the final outcome was nice.",
      image: '/reviews/michaelangelo-dsa.webp',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mahmoud Fathy',
      branch: 'Al Sheikh Zayed',
      content: "انا سعيد بتجربتي مع سوباكوتو … ان شاءالله تتكرر في السيارات القادمة … مستوى عالي من الاحترافية والمهنية في التعامل و الدقة في المواعيد والاسعار مناسبة جدا وكذلك المصداقية في المنتج من خلال التاكيد على انه اصلي بالسريال من الشركة المصنعة و كذلك المتابعة وخدمة ما بعد البيع …. كل شئ كان ممتازت",
      image: '',
      rating: 5
    },
    {
      id: 3,
      name: 'Ahmed Ali',
      branch: 'Maadi, Inside Skoda Center',
      content: "I recently had a protection Film for 2 Cars in New Cairo Branch.They really have an excellent Professional Team and a very good customer service. A very good after sale follow up. I am very satisfied with their provided service. A big thank you to Mr Mohamed - The Branch Manager for handling all the issues.",
      rating: 5,
      image: '',
    },
    {
      id: 4,
      name: 'Alber Wadea',
      branch: 'Al Sheikh Zayed',
      content: "I recently had a PPF installed on my vehicle, and I couldn’t be more impressed with the quality of service and the final result. From start to finish, the team demonstrated top-tier professionalism, attention to detail, and deep product knowledge. The consultation was clear and informative—they explained the different film options, coverage areas, and long-term benefits, helping me choose the best package for my needs. The installation itself was meticulous. The film was applied seamlessly, with no bubbles, visible edges, or imperfections. You can barely tell it’s there, but the protection is immediately noticeable. What truly stood out was the pride the team took in their work. They treated my car with care as if it were their own. I was also impressed with the turnaround time and the follow-up instructions to ensure the film cures properly.",
      image: '',
      rating: 5
    },
    {
      id: 5,
      name: 'Amel Fathy',
      branch: 'Maadi, Inside Skoda Center',
      content: "I had a protection film as well as internal protection 3 months ago. I was really impressed by the quality of the products and the professionality of the staff.The results were outstanding. And what is really special is their after sale follow up every now and then to check on the film and if I have any comments ❤️comments ❤️ To sum up, I am totally satisfied with the service and I highly recommend them to everyone.",
      image: '',
      rating: 5
    },
    {
      id: 6,
      name: 'Mohamed Samy',
      branch: 'New Cairo, 5th Settlement',
      content: "من أحسن التجارب اللي مريت بيها بصراحة بعد مقارنة بين كذا شركة. اخترت شركة Supa Koto بناءً على ترشيحات كتير وفعلاً كانوا قد التوقعات. فريق العمل محترم جدًا وملتزم من أول ما تواصلت معاهم لحد ما استلمت العربية، كل حاجة كانت ماشية بسلاسة ومنظمة جدًا. خامات ممتازة حسيت إني واخد قيمة حقيقية مقابل اللي دفعتُه. الأستاذ محمد سويلم قمة في الذوق والرُقي وخلاني مرتاح جدًا في التعامل معاهم. استلمت العربية قبل الميعاد وده خلاني أحترمهم أكتر. تجربة محترمة وأنصح أي حد بيهم.",
      image: '',
      rating: 5
    },
  ];

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // When section is visible, animate each testimonial with a delay
            testimonials.forEach((testimonial) => {
              setTimeout(() => {
                setVisibleTestimonials(prev => [...prev, testimonial.id]);
              }, testimonial.id * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [testimonials]);

  return (
    <section 
      ref={sectionRef} 
      className="w-full overflow-hidden opacity-100"
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative">
            <h2 
              id="testimonials-heading"
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight ${isArabic ? 'font-arabic' : ''}`}
            >
              {t('testimonials.subtitle')}
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            {t('testimonials.description')}
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
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-2 sm:pl-4 md:pl-6"
                >
                  <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:border-red-500/60 cursor-pointer h-full transition-all duration-300 hover:scale-105">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transition-all duration-300 hover:scale-105" />
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm transition-all duration-300 hover:scale-105" />
                    
                    {/* Inner content container */}
                    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/2 rounded-2xl">
                      {/* Testimonial Card */}
                      <div className="p-8 sm:p-10 h-full flex flex-col relative z-10">
                      {/* Rating stars */}
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-neutral-600'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Quote mark */}
                      <div className="absolute top-0 right-0 sm:-top-2 sm:-right-2 text-red-500 opacity-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      
                      {/* Testimonial text */}
                      <div className="flex-grow">
                        {renderTestimonialContent(testimonial)}
                      </div>
                      
                      {/* Client info */}
                      <div className="mt-4 flex items-center">
                        {testimonial.image && (
                          <div className="mr-3 flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-red-500/50">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-neutral-300 text-xs sm:text-sm">
                            <span className="text-red-400 flex items-center branch-location">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {t('testimonials.location')}: {testimonial.branch}
                            </span>
                          </p>
                        </div>
                        </div>
                      </div>
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
            aria-label="Previous testimonial"
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
            aria-label="Next testimonial"
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

export default Testimonials;
