import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
// This addresses the common issue with marker icons not displaying
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Branch {
  id: string;
  name: { en: string; ar: string };
  coordinates: [number, number]; // [lat, lng]
  address: { en: string; ar: string };
  phone: string;
  whatsapp: string;
  hours: { en: string; ar: string };
}

interface BranchMapProps {
  branches: Branch[];
  currentLocale: string;
  t: (key: string) => string;
}

const BranchMap: React.FC<BranchMapProps> = ({ branches, currentLocale, t }) => {
  // Default center position (can be adjusted based on branches)
  const defaultCenter: [number, number] = branches.length > 0 
    ? branches[0].coordinates 
    : [25.276987, 55.296249]; // Default to Dubai if no branches
  
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        {/* Dark-themed map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {branches.map((branch) => (
          <Marker 
            key={branch.id} 
            position={branch.coordinates}
          >
            <Popup className="branch-popup">
              <div className="text-gray-800">
                <h3 className="font-bold text-lg">{branch.name[currentLocale as keyof typeof branch.name]}</h3>
                <p className="mt-1">{branch.address[currentLocale as keyof typeof branch.address]}</p>
                <p className="mt-2">
                  <a 
                    href={`tel:${branch.phone}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {branch.phone}
                  </a>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BranchMap;
