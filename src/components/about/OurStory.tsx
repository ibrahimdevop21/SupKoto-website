import React from 'react';

interface OurStoryProps {
  currentLocale: string;
  isRTL: boolean;
}

const OurStory: React.FC<OurStoryProps> = ({ currentLocale, isRTL }) => {
  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'The Supakoto Legacy: A Fusion of Tradition and Technology',
    ar: 'إرث سوباكوتو: اندماج بين التقاليد والتكنولوجيا',
  };

  const storyContent = {
    en: [
      'Founded in 2018, Supakoto was born from a singular vision: to bring the legendary precision and artistry of Japanese manufacturing to the world of automotive protection. We saw a market saturated with generic solutions and knew we could offer something more—a product built on a philosophy of excellence.',
      'Our journey began with an intensive research and development phase in Japan, collaborating with master craftsmen and polymer scientists. The result was our flagship paint protection film, a revolutionary material that offers unparalleled clarity, durability, and a self-healing surface. It is more than just a film; it is a shield forged from a commitment to perfection.',
      'Today, Supakoto is recognized as the undisputed leader in the market, trusted by discerning car enthusiasts and professional detailers worldwide. Our story is one of relentless innovation, unwavering quality, and a deep respect for the art of the automobile.',
    ],
    ar: [
      'تأسست سوباكوتو في عام 2018، وقد ولدت من رؤية فريدة: جلب الدقة والبراعة الفنية الأسطورية للصناعة اليابانية إلى عالم حماية السيارات. رأينا سوقًا مشبعًا بالحلول العامة وعرفنا أنه يمكننا تقديم شيء أكثر - منتج مبني على فلسفة التميز.',
      'بدأت رحلتنا بمرحلة بحث وتطوير مكثفة في اليابان، بالتعاون مع الحرفيين المهرة وعلماء البوليمرات. وكانت النتيجة فيلم حماية الطلاء الرائد لدينا، وهو مادة ثورية توفر وضوحًا ومتانة لا مثيل لهما وسطحًا ذاتي الشفاء. إنه أكثر من مجرد فيلم؛ إنه درع مصقول من الالتزام بالكمال.',
      'اليوم، تُعرف سوباكوتو بأنها الشركة الرائدة بلا منازع في السوق، ويثق بها عشاق السيارات المميزون والمحترفون في جميع أنحاء العالم. قصتنا هي قصة ابتكار لا هوادة فيه، وجودة لا تتزعزع، واحترام عميق لفن السيارات.',
    ],
  };

  return (
    <section className={`py-16 md:py-24 bg-neutral-900 text-white ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <img 
              src="/images/about-story.webp" 
              alt="Supakoto workshop crafting process" 
              className="rounded-2xl shadow-2xl object-cover w-full h-full"
            />
          </div>
          <div className="animate-slideInRight">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              {sectionTitle[isArabic ? 'ar' : 'en']}
            </h2>
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              {storyContent[isArabic ? 'ar' : 'en'].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
