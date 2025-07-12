import React from 'react';
import { useTranslations } from '../i18n/client';

interface WorkItem {
  id: number;
  title: string;
  image: string;
  description?: string;
}

interface SimpleLatestWorkProps {
  isArabic?: boolean;
  currentLocale?: string;
}

const SimpleLatestWork: React.FC<SimpleLatestWorkProps> = ({ 
  isArabic = false,
  currentLocale 
}) => {
  const t = useTranslations(currentLocale || (isArabic ? 'ar' : 'en'));
  
  const defaultSlides: WorkItem[] = [
    {
      id: 1,
      title: 'G63 Matte PPF',
      image: '/work/work1.webp',
      description: 'Full vehicle paint protection film'
    },
    {
      id: 2,
      title: 'Urus Full Wrap',
      image: '/work/work2.webp',
      description: 'Custom color change wrap'
    },
    {
      id: 3,
      title: 'Bentley Detailing',
      image: '/work/work3.webp',
      description: 'Premium ceramic coating'
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 text-center">
          {t('latest_work.title') || 'Our Latest Work'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultSlides.map((slide) => (
            <div key={slide.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                <p className="text-gray-300">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleLatestWork;
