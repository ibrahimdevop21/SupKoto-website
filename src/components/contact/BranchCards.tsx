import React from 'react';

interface Branch {
  id: string;
  name: { en: string; ar: string };
  coordinates: [number, number]; // [lat, lng]
  address: { en: string; ar: string };
  phone: string;
  whatsapp: string;
  hours: { en: string; ar: string };
}

interface BranchCardsProps {
  branches: Branch[];
  currentLocale: string;
  t: (key: string) => string;
}

const BranchCards: React.FC<BranchCardsProps> = ({ branches, currentLocale, t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {branches.map((branch) => (
        <div 
          key={branch.id} 
          className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:border-gray-600 transition-all"
        >
          <h3 className="text-xl font-bold text-white mb-3">
            {branch.name[currentLocale as keyof typeof branch.name]}
          </h3>
          
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <div>
                <div className="text-gray-400 text-sm mb-1">{t('contact.branch.address')}</div>
                <span className="text-gray-300">
                  {branch.address[currentLocale as keyof typeof branch.address]}
                </span>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <div>
                <div className="text-gray-400 text-sm mb-1">{t('contact.branch.phone')}</div>
                <a 
                  href={`tel:${branch.phone}`} 
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {branch.phone}
                </a>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" 
                />
              </svg>
              <div>
                <a 
                  href={`https://wa.me/${branch.whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {t('contact.branch.whatsapp')}
                </a>
              </div>
            </div>
            
            {/* Hours */}
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <div>
                <div className="text-gray-400 text-sm mb-1">{t('contact.branch.hours')}</div>
                <span className="text-gray-300 whitespace-pre-line">
                  {branch.hours[currentLocale as keyof typeof branch.hours]}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchCards;
