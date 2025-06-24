import React, { useEffect, useState } from 'react';
import { useRegion } from '../context/RegionContext';

// Define offer type
interface Offer {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  discountPrice: number;
  currency: string;
  image: string;
  validUntil: string;
}

interface RegionalOffersProps {
  className?: string;
  limit?: number;
  showDiscount?: boolean;
}

/**
 * RegionalOffers Component
 * 
 * Displays offers specific to the current selected region.
 * Loads data from offers.json and filters based on current region.
 * 
 * @param {string} className - Additional CSS classes
 * @param {number} limit - Maximum number of offers to display
 * @param {boolean} showDiscount - Whether to show discount information
 */
const RegionalOffers: React.FC<RegionalOffersProps> = ({
  className = '',
  limit = 3,
  showDiscount = true
}) => {
  const { currentRegion, regionConfig } = useRegion();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocale, setCurrentLocale] = useState<'en' | 'ar'>('en');
  const [isRTL, setIsRTL] = useState(false);
  
  // Detect language and direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlDir = document.documentElement.dir;
      setIsRTL(htmlDir === 'rtl');
      setCurrentLocale(htmlDir === 'rtl' ? 'ar' : 'en');
    }
  }, []);
  
  // Load offers based on current region
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        // In a real app, you might want to use a dynamic import or fetch API
        const offersData = await import('../data/offers.json');
        const regionOffers = offersData[currentRegion] || [];
        setOffers(regionOffers.slice(0, limit));
      } catch (error) {
        console.error('Error loading offers:', error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOffers();
  }, [currentRegion, limit]);
  
  // Format price with currency
  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat(currentLocale === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return formatter.format(price);
  };
  
  // Calculate discount percentage
  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };
  
  if (loading) {
    return (
      <div className={`grid place-items-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (offers.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500">
          {currentLocale === 'ar' ? 'لا توجد عروض متاحة حاليًا' : 'No offers available at the moment'}
        </p>
      </div>
    );
  }
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {offers.map((offer) => (
        <div 
          key={offer.id}
          className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Offer Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={offer.image} 
              alt={offer.title[currentLocale]} 
              className="w-full h-full object-cover"
            />
            
            {/* Discount Badge */}
            {showDiscount && offer.discountPrice < offer.price && (
              <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg rtl:rounded-bl-none rtl:rounded-br-lg font-medium text-sm">
                {currentLocale === 'ar' 
                  ? `خصم ${calculateDiscount(offer.price, offer.discountPrice)}٪`
                  : `${calculateDiscount(offer.price, offer.discountPrice)}% OFF`
                }
              </div>
            )}
          </div>
          
          {/* Offer Content */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-card-foreground mb-2">
              {offer.title[currentLocale]}
            </h3>
            
            <p className="text-muted-foreground mb-4">
              {offer.description[currentLocale]}
            </p>
            
            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              {offer.discountPrice < offer.price ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(offer.discountPrice, offer.currency)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    {formatPrice(offer.price, offer.currency)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(offer.price, offer.currency)}
                </span>
              )}
            </div>
            
            {/* CTA Button */}
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors duration-300">
              {currentLocale === 'ar' ? 'احجز الآن' : 'Book Now'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionalOffers;
