import React, { createContext, useState, useEffect, useContext } from 'react';
import { regions, defaultRegion, getStoredRegion, storeRegion } from '../data/regions';
import type { Region } from '../data/regions';

// Define the context type
interface RegionContextType {
  currentRegion: Region;
  setRegion: (region: Region) => void;
  regionConfig: typeof regions.egypt;
}

// Create the context with default values
const RegionContext = createContext<RegionContextType>({
  currentRegion: defaultRegion,
  setRegion: () => {},
  regionConfig: regions[defaultRegion]
});

// Custom hook for using the region context
export const useRegion = () => useContext(RegionContext);

interface RegionProviderProps {
  children: React.ReactNode;
  initialRegion?: Region;
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ 
  children, 
  initialRegion 
}) => {
  // Initialize state with stored region or provided initial region
  const [currentRegion, setCurrentRegion] = useState<Region>(
    initialRegion || defaultRegion
  );
  
  // Effect to initialize region from localStorage on client-side
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const storedRegion = getStoredRegion();
    
    // If no region is stored and we have geolocation API, try to detect region
    if (!storedRegion && navigator.geolocation) {
      // This is a simplified example - in a real app you would use a geolocation service API
      // For demo purposes, we'll just use a mock implementation
      detectRegionByIP().then(detectedRegion => {
        if (detectedRegion) {
          setCurrentRegion(detectedRegion);
          storeRegion(detectedRegion);
        }
      });
    } else {
      setCurrentRegion(storedRegion);
    }
  }, []);
  
  // Function to update region and store in localStorage
  const setRegion = (region: Region) => {
    setCurrentRegion(region);
    storeRegion(region);
  };
  
  return (
    <RegionContext.Provider 
      value={{ 
        currentRegion, 
        setRegion,
        regionConfig: regions[currentRegion] 
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

// Mock function to simulate IP-based geolocation
// In a real app, you would use a geolocation API service
async function detectRegionByIP(): Promise<Region | null> {
  // This is a placeholder for a real geolocation API call
  // Example: const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY');
  
  // For demo purposes, we'll just return a random region
  return Math.random() > 0.5 ? 'egypt' : 'dubai';
}

export default RegionContext;
