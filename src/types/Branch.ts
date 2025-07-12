export interface Branch {
  id: string;
  name: { 
    en: string; 
    ar: string 
  };
  coordinates: [number, number]; // [lat, lng]
  address: { 
    en: string; 
    ar: string 
  };
  phone: string;
  whatsapp: string;
  hours: { 
    en: string; 
    ar: string 
  };
}
