import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { branches } from '../../data/branches';
import type { Branch } from '../../data/branches';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Phone, Clock, MapPin } from 'lucide-react';

// Fix for default marker icon issue with bundlers like Vite/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

interface BranchLocatorProps {
  currentLocale: string;
  isRTL: boolean;
}

const BranchLocator: React.FC<BranchLocatorProps> = ({ currentLocale, isRTL }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'Our Locations',
    ar: 'فروعنا',
  };

  if (!isClient) {
    return <div className="h-[700px] w-full bg-neutral-800 rounded-lg animate-pulse"></div>;
  }

  return (
    <section className={`py-16 md:py-24 bg-neutral-900 text-white ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight animate-fadeInUp">
          {sectionTitle[isArabic ? 'ar' : 'en']}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 h-[700px] overflow-y-auto pr-4 space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            {branches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border ${selectedBranch.id === branch.id ? 'bg-rose-500/10 border-rose-500' : 'bg-neutral-800/50 hover:bg-neutral-700/50 border-neutral-800'}`}>
                <h3 className="font-bold text-xl mb-2 text-white">{branch.name}</h3>
                <p className="flex items-start text-neutral-400 mb-2">
                  <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                  <span>{branch.address}</span>
                </p>
                <p className="flex items-center text-neutral-400 mb-2">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{branch.phone}</span>
                </p>
                <p className="flex items-center text-neutral-400">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>{branch.workingHours[isArabic ? 'ar' : 'en']}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 h-[700px] rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
            <MapContainer center={[selectedBranch.coordinates.lat, selectedBranch.coordinates.lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', backgroundColor: '#171717' }}>
              <ChangeView center={[selectedBranch.coordinates.lat, selectedBranch.coordinates.lng]} zoom={13} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[selectedBranch.coordinates.lat, selectedBranch.coordinates.lng]}>
                <Popup>
                  <div className="font-sans">
                    <h4 className="font-bold">{selectedBranch.name}</h4>
                    <p>{selectedBranch.address}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocator;
