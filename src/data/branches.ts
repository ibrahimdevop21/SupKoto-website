export interface Branch {
  id: string;
  country: 'Egypt' | 'UAE';
  name: string;
  address: string;
  phone: string;
  workingHours: {
    en: string;
    ar: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const branches: Branch[] = [
  {
    id: 'cairo-main',
    country: 'Egypt',
    name: 'Supakoto Cairo (Main Branch)',
    address: '123 Nile Corniche, Downtown, Cairo, Egypt',
    phone: '+20 2 2579 8888',
    workingHours: {
      en: 'Sat - Thu, 9:00 AM - 7:00 PM',
      ar: 'السبت - الخميس، 9:00 ص - 7:00 م',
    },
    coordinates: { lat: 30.0444, lng: 31.2357 },
  },
  {
    id: 'alexandria',
    country: 'Egypt',
    name: 'Supakoto Alexandria',
    address: '456 Stanley Bridge Rd, Alexandria, Egypt',
    phone: '+20 3 544 7777',
    workingHours: {
      en: 'Sat - Thu, 10:00 AM - 8:00 PM',
      ar: 'السبت - الخميس، 10:00 ص - 8:00 م',
    },
    coordinates: { lat: 31.2459, lng: 29.9626 },
  },
  {
    id: 'giza',
    country: 'Egypt',
    name: 'Supakoto Giza',
    address: '789 Pyramids Ave, Giza, Egypt',
    phone: '+20 2 3385 6666',
    workingHours: {
      en: 'Sat - Thu, 9:00 AM - 7:00 PM',
      ar: 'السبت - الخميس، 9:00 ص - 7:00 م',
    },
    coordinates: { lat: 29.9792, lng: 31.1342 },
  },
  {
    id: 'sharm-el-sheikh',
    country: 'Egypt',
    name: 'Supakoto Sharm El Sheikh',
    address: '101 Naama Bay, Sharm El Sheikh, Egypt',
    phone: '+20 69 360 5555',
    workingHours: {
      en: 'Sun - Fri, 11:00 AM - 9:00 PM',
      ar: 'الأحد - الجمعة، 11:00 ص - 9:00 م',
    },
    coordinates: { lat: 27.9143, lng: 34.3295 },
  },
  {
    id: 'dubai',
    country: 'UAE',
    name: 'Supakoto Dubai',
    address: 'Sheikh Zayed Rd, Al Quoz, Dubai, UAE',
    phone: '+971 4 333 0000',
    workingHours: {
      en: 'Sun - Fri, 10:00 AM - 8:00 PM',
      ar: 'الأحد - الجمعة، 10:00 ص - 8:00 م',
    },
    coordinates: { lat: 25.1802, lng: 55.2414 },
  },
];
