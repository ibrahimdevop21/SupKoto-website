
import { lazy, Suspense } from 'react';

// Lazy load heavy components
export const LazyCarGallery = lazy(() => import('./CarGallery'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyLatestWorkCarousel = lazy(() => import('./LatestWorkCarousel'));
export const LazyBranchLocator = lazy(() => import('./contact/BranchLocator'));

// Loading fallback component
export const ComponentLoader = ({ children, fallback = null }) => (
  <Suspense fallback={fallback || <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>}>
    {children}
  </Suspense>
);
