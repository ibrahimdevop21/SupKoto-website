import React from 'react';
import { useTranslations } from '../i18n/react';
import '../styles/partners-animations.css';

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

interface PartnersProps {
  isArabic?: boolean;
  currentLocale?: string;
}

const Partners: React.FC<PartnersProps> = ({ currentLocale }) => {
  const t = useTranslations((currentLocale || 'en') as 'en' | 'ar');

  const partners: Partner[] = [
    { name: 'Jetour', logo: '/partners/jetour.svg', alt: 'Jetour Logo' },
    { name: 'Skoda', logo: '/partners/skoda.svg', alt: 'Skoda Logo' },
    { name: 'Citroen', logo: '/partners/citroen.svg', alt: 'Citroen Logo' },
    { name: 'Auto Samer Rayan', logo: '/partners/samer.webp', alt: 'Auto Samer Rayan Logo' },
    { name: 'Michelin', logo: '/partners/michelin.svg', alt: 'Michelin Logo' },
    { name: 'Bosch', logo: '/partners/bosch.svg', alt: 'Bosch Logo' },
    { name: 'Total Energies', logo: '/partners/total.svg', alt: 'Total Energies Logo' },
  ];

  // Duplicate partners for a seamless loop
  const extendedPartners = [...partners, ...partners];

  return (
    <div className="bg-neutral-900/70 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none text-center mb-12">
          <h2 className="text-lg font-semibold leading-8 text-primary">
            {t('partners.title')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('partners.subtitle')}
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute inset-0 before:absolute before:inset-0 before:w-1/4 before:bg-gradient-to-r before:from-neutral-900/70 before:to-transparent before:z-10 after:absolute after:inset-0 after:left-auto after:w-1/4 after:bg-gradient-to-l after:from-neutral-900/70 after:to-transparent after:z-10"></div>
          <div
            className="marquee-container relative flex overflow-hidden"
          >
            <div className="marquee-track flex min-w-full flex-shrink-0 items-center justify-around gap-x-8 sm:gap-x-12 lg:gap-x-16">
              {extendedPartners.map((partner, index) => (
                <img
                  key={`partner-${index}`}
                  className="marquee-item col-span-2 max-h-12 w-full object-contain lg:col-span-1 transition-all duration-300 ease-in-out"
                  src={partner.logo}
                  alt={partner.alt}
                  width={158}
                  height={48}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;