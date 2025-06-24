import type { Region } from '../data/regions';

/**
 * Gets the appropriate localized content based on current locale and region
 * 
 * @param content Object containing localized content
 * @param locale Current locale code (en/ar)
 * @returns The localized content string
 */
export function getLocalizedContent(
  content: { en: string; ar: string },
  locale: 'en' | 'ar' = 'en'
): string {
  return content[locale] || content.en; // Fallback to English if translation not available
}

/**
 * Formats a price according to the region's currency and locale
 * 
 * @param price The price value
 * @param currency Currency code (e.g., 'EGP', 'AED')
 * @param locale Current locale (en/ar)
 * @returns Formatted price string
 */
export function formatRegionalPrice(
  price: number,
  currency: string,
  locale: 'en' | 'ar' = 'en'
): string {
  const formatter = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );
  
  return formatter.format(price);
}

/**
 * Gets region-specific social media links
 * 
 * @param region Current region
 * @returns Promise resolving to social media links for the region
 */
export async function getRegionalSocialLinks(region: Region) {
  try {
    const socialData = await import('../data/socialLinks.json');
    return socialData[region] || socialData.egypt; // Fallback to Egypt if region not found
  } catch (error) {
    console.error('Error loading social links:', error);
    return null;
  }
}

/**
 * Gets region-specific offers
 * 
 * @param region Current region
 * @param limit Maximum number of offers to return
 * @returns Promise resolving to offers for the region
 */
export async function getRegionalOffers(region: Region, limit?: number) {
  try {
    const offersData = await import('../data/offers.json');
    const offers = offersData[region] || [];
    
    return limit ? offers.slice(0, limit) : offers;
  } catch (error) {
    console.error('Error loading offers:', error);
    return [];
  }
}
