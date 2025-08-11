import React from 'react';
import { createTranslator } from '../../i18n/index';
import { Award, Shield, Star, CheckCircle } from '../icons/LightweightIcons';

interface TrustAssuranceProps {
  currentLocale: string;
  isRTL: boolean;
}

const TrustAssurance: React.FC<TrustAssuranceProps> = ({ currentLocale, isRTL }) => {
  const t = createTranslator(currentLocale as 'en' | 'ar');

  // Sample testimonials - would be pulled from existing testimonial component data
  const testimonials = [
    {
      text: t('services.trust.testimonial1.text'),
      author: t('services.trust.testimonial1.author'),
      rating: 5
    },
    {
      text: t('services.trust.testimonial2.text'),
      author: t('services.trust.testimonial2.author'),
      rating: 5
    }
  ];

  const certifications = [
    {
      icon: Award,
      title: t('services.trust.cert1.title'),
      description: t('services.trust.cert1.description')
    },
    {
      icon: Shield,
      title: t('services.trust.cert2.title'),
      description: t('services.trust.cert2.description')
    },
    {
      icon: CheckCircle,
      title: t('services.trust.cert3.title'),
      description: t('services.trust.cert3.description')
    }
  ];

  const partners = [
    { name: 'Takai', logo: '/images/partners/takai-logo.png' },
    { name: 'Ceramic Pro', logo: '/images/partners/ceramic-pro-logo.png' },
    { name: 'XPEL', logo: '/images/partners/xpel-logo.png' },
    { name: '3M', logo: '/images/partners/3m-logo.png' }
  ];

  return (
    <div className={`${isRTL ? 'rtl font-arabic' : 'ltr'}`}>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-white ${isRTL ? 'font-arabic' : ''}`}>
          {t('services.trust.title')}
        </h2>
        <p className={`text-lg text-gray-300 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
          {t('services.trust.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Testimonials & Warranty */}
        <div className="space-y-8">
          {/* Testimonials */}
          <div>
            <h3 className={`text-xl font-semibold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.testimonials')}
            </h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className={`text-gray-300 text-sm leading-relaxed mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <p className={`text-gray-400 text-xs ${isRTL ? 'font-arabic' : ''}`}>
                    — {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Warranty Badge */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Shield size={32} className="text-white" />
            </div>
            <h4 className={`text-lg font-semibold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.warranty.title')}
            </h4>
            <p className={`text-green-300 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.warranty.description')}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
              <CheckCircle size={14} className="text-green-400" />
              <span className={`text-xs text-green-300 ${isRTL ? 'font-arabic' : ''}`}>
                {t('services.trust.warranty.backed')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Certifications & Partners */}
        <div className="space-y-8">
          {/* Certifications */}
          <div>
            <h3 className={`text-xl font-semibold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.certifications')}
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold text-white mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {cert.title}
                      </h4>
                      <p className={`text-xs text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Partner Logos */}
          <div>
            <h3 className={`text-xl font-semibold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.partners')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="aspect-[3/2] bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/30 rounded-xl flex items-center justify-center hover:border-slate-600/50 transition-colors"
                >
                  {/* Placeholder for partner logos */}
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-gray-400 to-gray-500 rounded"></div>
                    <span className={`text-xs text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Statement */}
          <div className="bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4">
            <p className={`text-sm text-gray-300 text-center leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {t('services.trust.statement')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustAssurance;
