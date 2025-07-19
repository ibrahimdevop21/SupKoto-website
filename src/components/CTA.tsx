import React from 'react';

interface CTAProps {
  currentLocale: string;
  isRTL: boolean;
  contactUrl: string;
}

const CTA: React.FC<CTAProps> = ({ currentLocale, isRTL, contactUrl }) => {
  const isArabic = currentLocale === 'ar';

  const headline = {
    en: 'Ready for the Ultimate Protection?',
    ar: 'هل أنت مستعد للحماية القصوى؟',
  };

  const subheadline = {
    en: 'Let our experts provide a free, no-obligation quote for your vehicle. Elevate your ride today.',
    ar: 'دع خبرائنا يقدمون عرض أسعار مجانيًا وغير ملزم لسيارتك. ارتقِ بسيارتك اليوم.',
  };

  const buttonText = {
    en: 'Get a Free Quote',
    ar: 'احصل على عرض أسعار مجاني',
  };

  return (
    <div className={`py-16 md:py-24 my-16 ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-rose-600 to-rose-800 rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-rose-500/20 animate-fadeInUp">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            {headline[isArabic ? 'ar' : 'en']}
          </h2>
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            {subheadline[isArabic ? 'ar' : 'en']}
          </p>
          <a
            href={contactUrl}
            className="inline-block bg-white text-rose-700 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-rose-50 shadow-lg"
          >
            {buttonText[isArabic ? 'ar' : 'en']}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
