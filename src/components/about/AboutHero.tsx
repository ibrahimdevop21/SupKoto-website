import React from 'react';

interface AboutHeroProps {
  currentLocale: string;
  isRTL: boolean;
}

const AboutHero: React.FC<AboutHeroProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const title = {
    en: 'Pioneering Perfection in Automotive Protection',
    ar: 'الريادة في إتقان حماية السيارات',
  };

  const subtitle = {
    en: 'Since 2018, Supakoto has been the market leader in Japanese paint protection film, blending ancient craftsmanship with modern innovation.',
    ar: 'منذ عام 2018، كانت سوباكوتو رائدة في سوق أفلام حماية الطلاء اليابانية، حيث تمزج بين الحرفية القديمة والابتكار الحديث.',
  };

  return (
    <section className={`relative h-[70vh] flex items-center justify-center text-center text-white overflow-hidden ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/about-hero-bg.webp" 
          alt="Abstract Japanese background" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 animate-fadeInUp">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight ${isArabic ? 'font-arabic' : ''}`}>
          {title[isArabic ? 'ar' : 'en']}
        </h1>
        <p className={`max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 ${isArabic ? 'font-arabic' : ''}`}>
          {subtitle[isArabic ? 'ar' : 'en']}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
