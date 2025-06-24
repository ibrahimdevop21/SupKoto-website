import React from 'react';
import { useRegion } from '../context/RegionContext';
import { regions } from '../data/regions';
import type { Region } from '../data/regions';

interface RegionToggleProps {
  className?: string;
  variant?: 'dropdown' | 'switch';
}

/**
 * RegionToggle Component
 * 
 * A component that allows users to switch between different regions.
 * Supports both dropdown and switch variants.
 * 
 * @param {string} className - Additional CSS classes
 * @param {string} variant - 'dropdown' or 'switch' UI variant
 */
const RegionToggle: React.FC<RegionToggleProps> = ({ 
  className = '', 
  variant = 'dropdown' 
}) => {
  const { currentRegion, setRegion } = useRegion();
  
  // Handle region change
  const handleRegionChange = (region: Region) => {
    setRegion(region);
  };
  
  // For dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={currentRegion}
          onChange={(e) => handleRegionChange(e.target.value as Region)}
          className="appearance-none bg-card text-card-foreground border border-border rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rtl:pl-10 rtl:pr-3"
          aria-label="Select region"
        >
          {Object.entries(regions).map(([id, config]) => (
            <option key={id} value={id}>
              {config.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 rtl:right-auto rtl:left-0">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
  
  // For switch variant
  return (
    <div className={`inline-flex rounded-md shadow-sm ${className}`} role="group">
      {Object.entries(regions).map(([id, config]) => (
        <button
          key={id}
          type="button"
          onClick={() => handleRegionChange(id as Region)}
          className={`
            px-4 py-2 text-sm font-medium
            ${id === Object.keys(regions)[0] ? 'rounded-l-md rtl:rounded-l-none rtl:rounded-r-md' : ''}
            ${id === Object.keys(regions)[Object.keys(regions).length - 1] ? 'rounded-r-md rtl:rounded-r-none rtl:rounded-l-md' : ''}
            ${currentRegion === id 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-card text-card-foreground hover:bg-card/80'
            }
            border border-border
            focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-200
          `}
        >
          {config.name}
        </button>
      ))}
    </div>
  );
};

export default RegionToggle;
