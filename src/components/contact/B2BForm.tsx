import React, { useState } from 'react';

interface B2BFormProps {
  currentLocale: string;
  isRTL: boolean;
}

const B2BForm: React.FC<B2BFormProps> = ({ currentLocale, isRTL }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    inquiryType: 'fleet-services',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isArabic = currentLocale === 'ar';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('B2B Form Submitted:', formData);
    setIsSubmitted(true);
  };

  const t = (key: string) => {
    const translations = {
      title: { en: 'For Business & Partnerships', ar: 'للشركات والشراكات' },
      subtitle: { en: 'We offer tailored solutions for fleets, showrooms, and car clubs. Fill out the form below to connect with our B2B team.', ar: 'نحن نقدم حلولاً مخصصة للأساطيل وصالات العرض ونوادي السيارات. املأ النموذج أدناه للتواصل مع فريق B2B لدينا.' },
      companyName: { en: 'Company/Organization Name', ar: 'اسم الشركة / المنظمة' },
      contactPerson: { en: 'Your Name', ar: 'اسمك' },
      email: { en: 'Email Address', ar: 'البريد الإلكتروني' },
      phone: { en: 'Phone Number', ar: 'رقم الهاتف' },
      inquiryType: { en: 'Type of Inquiry', ar: 'نوع الاستفسار' },
      fleetServices: { en: 'Fleet Services', ar: 'خدمات الأساطيل' },
      showroomPartnership: { en: 'Showroom Partnership', ar: 'شراكة صالة العرض' },
      carClubEvent: { en: 'Car Club Event', ar: 'فعالية نادي السيارات' },
      other: { en: 'Other', ar: 'أخرى' },
      message: { en: 'Your Message', ar: 'رسالتك' },
      submit: { en: 'Submit Inquiry', ar: 'إرسال الاستفسار' },
      successMessage: { en: 'Thank you! Your inquiry has been sent. Our team will contact you shortly.', ar: 'شكرًا لك! تم إرسال استفسارك. سيتصل بك فريقنا قريبًا.' },
    };
    return translations[key][isArabic ? 'ar' : 'en'];
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-12 bg-green-500/10 rounded-lg border border-green-500/30">
        <p className="text-xl text-white">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <section className={`py-16 md:py-24 ${isArabic ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t('title')}</h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" name="companyName" placeholder={t('companyName')} onChange={handleChange} required className="bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none" />
            <input type="text" name="contactPerson" placeholder={t('contactPerson')} onChange={handleChange} required className="bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none" />
            <input type="email" name="email" placeholder={t('email')} onChange={handleChange} required className="bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none" />
            <input type="tel" name="phone" placeholder={t('phone')} onChange={handleChange} className="bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-400 mb-2">{t('inquiryType')}</label>
            <select name="inquiryType" onChange={handleChange} value={formData.inquiryType} className="w-full bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none">
              <option value="fleet-services">{t('fleetServices')}</option>
              <option value="showroom-partnership">{t('showroomPartnership')}</option>
              <option value="car-club-event">{t('carClubEvent')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>
          <div className="mb-6">
            <textarea name="message" placeholder={t('message')} rows={6} onChange={handleChange} required className="w-full bg-neutral-800 text-white p-4 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-rose-500 outline-none"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-rose-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-rose-700 shadow-lg">
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default B2BForm;
