import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-blue-950 text-slate-200 text-xs py-2 px-4 border-b border-blue-900/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left Side: Contact details */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
          <a href="tel:+902161234567" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('phone')}</span>
          </a>
          <a href="mailto:info@songulmarin.com" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors font-medium">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('email')}</span>
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('addressHeader')}</span>
          </div>
        </div>

        {/* Right Side: Working hours & Language toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('workingHours')}</span>
          </div>

          <div className="h-3.5 w-px bg-blue-800 hidden sm:block"></div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-blue-900/80 p-1 rounded-full border border-blue-700/80">
            <Globe className="w-3.5 h-3.5 text-sky-400 ml-1" />
            <button
              onClick={() => setLanguage('tr')}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                language === 'tr'
                  ? 'bg-sky-400 text-blue-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              TR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                language === 'en'
                  ? 'bg-sky-400 text-blue-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
