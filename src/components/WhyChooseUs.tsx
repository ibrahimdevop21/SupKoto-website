import React from 'react';
import { Award, Users, ThumbsUp } from 'lucide-react';

interface WhyChooseUsProps {
  currentLocale: string;
  isRTL: boolean;
}

const benefits = [
  {
    icon: Award,
    title: {
      en: 'Certified Technicians',
      ar: 'فنيون معتمدون',
    },
    description: {
      en: 'Our team consists of industry-certified experts who are passionate about perfection and trained in the latest techniques.',
      ar: 'يتألف فريقنا من خبراء معتمدين في الصناعة وشغوفين بالكمال ومدربين على أحدث التقنيات.',
    },
  },
  {
    icon: ThumbsUp,
    title: {
      en: 'World-Class Materials',
      ar: 'مواد عالمية المستوى',
    },
    description: {
      en: 'We use only the highest-grade films, coatings, and products from leading global brands to ensure lasting quality.',
      ar: 'نحن نستخدم فقط أجود أنواع الأفلام والطلاءات والمنتجات من العلامات التجارية العالمية الرائدة لضمان جودة تدوم طويلاً.',
    },
  },
  {
    icon: Users,
    title: {
      en: 'Unmatched Warranty',
      ar: 'ضمان لا مثيل له',
    },
    description: {
      en: 'We stand behind our work with a comprehensive warranty for your peace of mind, covering both materials and labor.',
      ar: 'نحن ندعم عملنا بضمان شامل لراحة بالك، يغطي المواد والعمالة على حد سواء.',
    },
  },
];

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'Why Choose Supakoto',
    ar: 'لماذا تختار سوباكوتو',
  };

  const sectionSubtitle = {
    en: 'Experience the difference that true craftsmanship and dedication to quality can make.',
    ar: 'جرب الفرق الذي يمكن أن تحدثه الحرفية الحقيقية والتفاني في الجودة.',
  };

  return (
    <div className={`py-16 md:py-24 bg-neutral-900/60 rounded-3xl my-16 border border-neutral-800 ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 animate-fadeInUp ${isArabic ? 'font-arabic' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            {sectionTitle[isArabic ? 'ar' : 'en']}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {sectionSubtitle[isArabic ? 'ar' : 'en']}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-neutral-800/70 to-neutral-900/50 border border-neutral-700/80 rounded-2xl p-8 text-left transition-all duration-300 hover:bg-neutral-800 animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <benefit.icon className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className={`text-2xl font-bold text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {benefit.title[isArabic ? 'ar' : 'en']}
                </h3>
              </div>
              <p className={`text-neutral-400 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                {benefit.description[isArabic ? 'ar' : 'en']}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
