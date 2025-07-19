import React from 'react';

interface ContactHeroProps {
  currentLocale: string;
  isRTL: boolean;
}

const ContactHero: React.FC<ContactHeroProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const title = {
    en: 'Get in Touch',
    ar: 'تواصل معنا',
  };

  const subtitle = {
    en: 'We are here to help. Whether you have a question about our services or want to discuss a partnership, we look forward to hearing from you.',
    ar: 'نحن هنا للمساعدة. سواء كان لديك سؤال حول خدماتنا أو ترغب في مناقشة شراكة، فإننا نتطلع إلى الاستماع منك.',
  };

  return (
    <section className={`py-16 md:py-24 text-center text-white bg-neutral-900 ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4 animate-fadeInUp">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          {title[isArabic ? 'ar' : 'en']}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 leading-relaxed">
          {subtitle[isArabic ? 'ar' : 'en']}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
