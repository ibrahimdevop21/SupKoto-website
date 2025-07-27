import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { branches } from '../../data/branches';
import type { Branch } from '../../data/branches';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Phone, Clock, MapPin, Search, Navigation, Star, Users, Car } from '../icons';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isArabic = currentLocale === 'ar';

  const sectionTitle = {
    en: 'Find Our Locations',
    ar: 'اعثر على فروعنا',
  };

  const sectionSubtitle = {
    en: 'Visit any of our branches for premium automotive services',
    ar: 'قم بزيارة أي من فروعنا للحصول على خدمات السيارات المتميزة',
  };

  const searchPlaceholder = {
    en: 'Search by city or area...',
    ar: 'البحث بالمدينة أو المنطقة...',
  };

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) {
    return (
      <div className="h-[800px] w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-48 mx-auto mb-2"></div>
          <div className="h-3 bg-slate-700 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-white relative ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
          {sectionTitle[isArabic ? 'ar' : 'en']}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          {sectionSubtitle[isArabic ? 'ar' : 'en']}
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={searchPlaceholder[isArabic ? 'ar' : 'en']}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Branch List */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {isArabic ? 'الفروع المتاحة' : 'Available Branches'}
              </h3>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                {filteredBranches.length} {isArabic ? 'فرع' : 'branches'}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredBranches.map((branch, index) => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  onMouseEnter={() => setHoveredBranch(branch.id)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  className={`group p-5 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm transform hover:scale-[1.02] ${
                    selectedBranch.id === branch.id 
                      ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50 shadow-lg shadow-red-500/20' 
                      : 'bg-slate-800/30 hover:bg-slate-700/50 border-slate-600/30 hover:border-red-500/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Branch Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors duration-300">
                        {branch.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">{branch.rating} • Google Review</span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedBranch.id === branch.id ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-600'
                    }`} />
                  </div>

                  {/* Branch Details */}
                  <div className="space-y-2">
                    <div className="flex items-start text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-red-400" />
                      <span className="text-sm leading-relaxed">{branch.address}</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      <Phone className="w-4 h-4 mr-3 flex-shrink-0 text-green-400" />
                      <span className="text-sm">{branch.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      <Clock className="w-4 h-4 mr-3 flex-shrink-0 text-blue-400" />
                      <span className="text-sm">{branch.workingHours[isArabic ? 'ar' : 'en']}</span>
                    </div>
                  </div>

                  {/* Services Preview */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-600/30">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-xs text-gray-400">
                        <Car className="w-3 h-3 mr-1" />
                        <span>{isArabic ? 'صيانة' : 'Service'}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{isArabic ? 'استشارة' : 'Consult'}</span>
                      </div>
                    </div>
                    <Navigation className={`w-4 h-4 transition-all duration-300 ${
                      hoveredBranch === branch.id ? 'text-red-400 transform rotate-45' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
              ))}
              
              {filteredBranches.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {isArabic ? 'لم يتم العثور على فروع' : 'No branches found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="xl:col-span-3">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Map Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{selectedBranch.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedBranch.address}</p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${selectedBranch.phone}`}
                    className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Map Container */}
            <div className="h-[600px] relative">
              <MapContainer 
                center={[selectedBranch.coordinates.lat, selectedBranch.coordinates.lng]} 
                zoom={15} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <ChangeView center={[selectedBranch.coordinates.lat, selectedBranch.coordinates.lng]} zoom={15} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {filteredBranches.map((branch) => (
                  <Marker 
                    key={branch.id}
                    position={[branch.coordinates.lat, branch.coordinates.lng]}
                    eventHandlers={{
                      click: () => setSelectedBranch(branch),
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2">
                        <h4 className="font-bold text-lg mb-2">{branch.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{branch.address}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Phone className="w-3 h-3 mr-2" />
                          {branch.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-2" />
                          {branch.workingHours[isArabic ? 'ar' : 'en']}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default BranchLocator;
