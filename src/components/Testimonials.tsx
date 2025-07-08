import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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
  isArabic?: boolean;
}

const Testimonials = ({ isArabic = false }: TestimonialsProps): JSX.Element => {
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
  const [isVisible, setIsVisible] = useState(false);
  
  // Carousel navigation functions
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
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  // Mock translation function - replace with your actual implementation
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
      'testimonials.subtitle': 'What Our Clients Say',
      'testimonials.description': 'Read what our clients have to say about their experience with our services.',
      'testimonials.readMore': 'Read More',
      'testimonials.readLess': 'Read Less',
    };
    return translations[key] || key;
  };

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
          <p className="text-white/90 text-sm sm:text-base mb-4 leading-relaxed">
            {needsTruncation && !isExpanded ? `${testimonial.content.substring(0, maxLength)}...` : testimonial.content}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {needsTruncation && (
            <button
              onClick={() => toggleExpand(testimonial.id)}
              className="text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-md"
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
      content: "انا سعيد بتجربتي مع سوباكوتو … وان شاءالله تتكرر في السيارات القادمة … مستوى عالي من الاحترافية والمهنية في التعامل و الدقة في المواعيد والاسعار مناسبة جدا وكذلك المصداقية في المنتج من خلال التاكيد على انه اصلي بالسريال من الشركة المصنعة و كذلك المتابعة وخدمة ما بعد البيع …. كل شئ كان ممتازت",
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
      className={`overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 
            id="testimonials-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 text-white ${isArabic ? 'font-arabic' : ''}`}
          >
            Client Testimonials
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-400"></div>
            <div className="h-1 w-16 bg-red-500 rounded-full animate-pulse"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-400"></div>
          </div>
          <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg mb-8">
            {t('testimonials.description')}
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex -ml-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6"
                >
                  <div className="group relative rounded-xl overflow-hidden bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 h-full">
                    {/* Testimonial Card */}
                    <div className="p-6 sm:p-8 h-full flex flex-col">
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
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {testimonial.branch}
                            </span>
                          </p>
                        </div>
                      </div>
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
            aria-label="Previous testimonial"
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
            aria-label="Next testimonial"
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

export default Testimonials;
