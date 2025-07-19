import React from 'react';
import { Gem, ShieldCheck, Zap } from 'lucide-react';

interface OurPhilosophyProps {
  currentLocale: string;
  isRTL: boolean;
}

const philosophies = [
  {
    icon: Gem,
    title: { en: 'The Pursuit of Precision', ar: 'السعي نحو الدقة' },
    description: { en: 'Inspired by Japanese Takumi, we treat every application as a work of art. Millimeter-perfect alignment and flawless finishes are our standard.', ar: 'مستوحون من "تاكومي" اليابانية، نتعامل مع كل تطبيق كعمل فني. المحاذاة المثالية بالمليمتر والتشطيبات الخالية من العيوب هي معيارنا.' },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Uncompromising Quality', ar: 'جودة لا تقبل المساومة' },
    description: { en: 'We use only the most advanced, rigorously tested materials. Our films provide superior protection without sacrificing your vehicle’s original beauty.', ar: 'نحن نستخدم فقط المواد الأكثر تقدمًا والتي تم اختبارها بصرامة. توفر أفلامنا حماية فائقة دون التضحية بالجمال الأصلي لسيارتك.' },
  },
  {
    icon: Zap,
    title: { en: 'Relentless Innovation', ar: 'الابتكار المتواصل' },
    description: { en: 'Our commitment to R&D means we are always at the forefront of protection technology, constantly improving to deliver the best to our clients.', ar: 'التزامنا بالبحث والتطوير يعني أننا دائمًا في طليعة تكنولوجيا الحماية، ونتحسن باستمرار لتقديم الأفضل لعملائنا.' },
  },
];

const OurPhilosophy: React.FC<OurPhilosophyProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'The Spirit of Takumi',
    ar: 'روح التاكومي',
  };
  const sectionSubtitle = {
    en: 'Our work is guided by the Japanese principle of master craftsmanship.',
    ar: 'عملنا يسترشد بالمبدأ الياباني للحرفية المتقنة.',
  };

  return (
    <section className={`py-16 md:py-24 bg-neutral-900 text-white ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {sectionTitle[isArabic ? 'ar' : 'en']}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            {sectionSubtitle[isArabic ? 'ar' : 'en']}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <div 
              key={index} 
              className="bg-neutral-800/50 p-8 rounded-2xl border border-neutral-700 text-center flex flex-col items-center animate-fadeInUp shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30">
                <item.icon className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {item.title[isArabic ? 'ar' : 'en']}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {item.description[isArabic ? 'ar' : 'en']}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophy;
