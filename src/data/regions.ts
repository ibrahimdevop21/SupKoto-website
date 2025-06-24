// Define available regions
export type Region = 'egypt' | 'dubai';

export interface RegionConfig {
  id: Region;
  name: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  defaultLanguage: 'en' | 'ar';
}

// Region configurations
export const regions: Record<Region, RegionConfig> = {
  egypt: {
    id: 'egypt',
    name: 'Egypt',
    currency: 'EGP',
    currencySymbol: 'ج.م',
    phoneCode: '+20',
    defaultLanguage: 'ar'
  },
  dubai: {
    id: 'dubai',
    name: 'Dubai',
    currency: 'AED',
    currencySymbol: 'د.إ',
    phoneCode: '+971',
    defaultLanguage: 'en'
  }
};

export const defaultRegion: Region = 'egypt';

// Helper function to get region from localStorage or default
export function getStoredRegion(): Region {
  if (typeof window === 'undefined') return defaultRegion;
  
  const storedRegion = localStorage.getItem('userRegion') as Region;
  return storedRegion && regions[storedRegion] ? storedRegion : defaultRegion;
}

// Helper function to store region in localStorage
export function storeRegion(region: Region): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userRegion', region);
}
