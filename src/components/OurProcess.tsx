import React from 'react';
import { Search, ClipboardList, Wand2, CheckCircle } from 'lucide-react';

interface OurProcessProps {
  currentLocale: string;
  isRTL: boolean;
}

const processSteps = [
  {
    icon: Search,
    title: {
      en: '1. Consultation & Assessment',
      ar: '1. الاستشارة والتقييم',
    },
    description: {
      en: 'We begin with a thorough evaluation of your vehicle and discuss your specific needs and desired outcomes.',
      ar: 'نبدأ بتقييم شامل لسيارتك ونناقش احتياجاتك الخاصة والنتائج المرجوة.',
    },
  },
  {
    icon: ClipboardList,
    title: {
      en: '2. Meticulous Preparation',
      ar: '2. التحضير الدقيق',
    },
    description: {
      en: 'Our team meticulously decontaminates and prepares every surface, ensuring a pristine foundation for a flawless application.',
      ar: 'يقوم فريقنا بتطهير وتحضير كل سطح بدقة، مما يضمن أساسًا نقيًا لتطبيق لا تشوبه شائبة.',
    },
  },
  {
    icon: Wand2,
    title: {
      en: '3. Expert Installation',
      ar: '3. التركيب الاحترافي',
    },
    description: {
      en: 'Using state-of-the-art tools and precision techniques, our certified technicians apply the chosen protection or treatment.',
      ar: 'باستخدام أحدث الأدوات والتقنيات الدقيقة، يقوم الفنيون المعتمدون لدينا بتطبيق الحماية أو المعالجة المختارة.',
    },
  },
  {
    icon: CheckCircle,
    title: {
      en: '4. Quality Assurance & Delivery',
      ar: '4. ضمان الجودة والتسليم',
    },
    description: {
      en: 'A final, multi-point inspection guarantees perfection before we proudly present your vehicle back to you.',
      ar: 'يضمن الفحص النهائي متعدد النقاط الكمال قبل أن نقدم سيارتك بفخر إليك مرة أخرى.',
    },
  },
];

const OurProcess: React.FC<OurProcessProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'Our Proven Process',
    ar: 'عمليتنا الموثوقة',
  };

  const sectionSubtitle = {
    en: 'We follow a meticulous, step-by-step process to ensure flawless results every time.',
    ar: 'نحن نتبع عملية دقيقة وخطوة بخطوة لضمان نتائج لا تشوبها شائبة في كل مرة.',
  };

  return (
    <div className={`py-16 md:py-24 text-white ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 animate-fadeInUp ${isArabic ? 'font-arabic' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {sectionTitle[isArabic ? 'ar' : 'en']}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            {sectionSubtitle[isArabic ? 'ar' : 'en']}
          </p>
        </div>
        <div className="relative">
          {/* The connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col items-center text-center animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-5 z-10 flex items-center justify-center w-20 h-20 rounded-full bg-neutral-900 border-2 border-rose-500 shadow-[0_0_15px_rgba(255,0,92,0.3)]">
                  <step.icon className="w-10 h-10 text-rose-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {step.title[isArabic ? 'ar' : 'en']}
                </h3>
                <p className={`text-neutral-400 leading-relaxed max-w-xs ${isArabic ? 'font-arabic' : ''}`}>
                  {step.description[isArabic ? 'ar' : 'en']}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
