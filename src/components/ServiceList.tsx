import React from 'react';
import { Shield, Gem, Wind, Star } from 'lucide-react';

interface ServiceListProps {
  currentLocale: string;
  isRTL: boolean;
}

const services = [
  {
    icon: Shield,
    title: {
      en: 'Paint Protection Film',
      ar: 'فيلم حماية الطلاء',
    },
    description: {
      en: 'Virtually invisible film that protects your car’s paint from scratches, chips, and environmental damage.',
      ar: 'فيلم غير مرئي فعليًا يحمي طلاء سيارتك من الخدوش والضربات والأضرار البيئية.',
    },
  },
  {
    icon: Gem,
    title: {
      en: 'Ceramic Coating',
      ar: 'الطلاء السيراميكي',
    },
    description: {
      en: 'A liquid polymer that bonds with the factory paint, creating a durable layer of hydrophobic protection and incredible gloss.',
      ar: 'بوليمر سائل يترابط مع طلاء المصنع، مما يخلق طبقة متينة من الحماية المقاومة للماء واللمعان المذهل.',
    },
  },
  {
    icon: Wind,
    title: {
      en: 'Window Tinting',
      ar: 'تظليل النوافذ',
    },
    description: {
      en: 'High-performance window films that provide UV protection, heat rejection, and enhanced privacy and style.',
      ar: 'أفلام نوافذ عالية الأداء توفر حماية من الأشعة فوق البنفسجية ورفضًا للحرارة وخصوصية وأناقة معززة.',
    },
  },
  {
    icon: Star,
    title: {
      en: 'Luxury Detailing',
      ar: 'التلميع الفاخر',
    },
    description: {
      en: 'Meticulous interior and exterior cleaning, restoration, and finishing to bring your car to a show-ready standard.',
      ar: 'تنظيف داخلي وخارجي دقيق وترميم وتشطيب لإيصال سيارتك إلى مستوى جاهز للعرض.',
    },
  },
];

const ServiceList: React.FC<ServiceListProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'Our Premium Automotive Services',
    ar: 'خدماتنا المتميزة للسيارات',
  };

  const sectionSubtitle = {
    en: 'From flawless protection to concours-level detailing, we provide a comprehensive suite of services to keep your vehicle in pristine condition.',
    ar: 'من الحماية الخالية من العيوب إلى التلميع على مستوى المسابقات، نقدم مجموعة شاملة من الخدمات للحفاظ على سيارتك في حالة ممتازة.',
  };

  return (
    <div className={`py-16 md:py-24 text-white ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 animate-fadeInUp ${isArabic ? 'font-arabic' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {sectionTitle[isArabic ? 'ar' : 'en']}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {sectionSubtitle[isArabic ? 'ar' : 'en']}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 text-center transition-all duration-300 hover:bg-neutral-800/70 hover:border-rose-500/50 hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20">
                <service.icon className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 text-white ${isArabic ? 'font-arabic' : ''}`}>
                {service.title[isArabic ? 'ar' : 'en']}
              </h3>
              <p className={`text-neutral-400 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                {service.description[isArabic ? 'ar' : 'en']}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
