import React, { useEffect, useState } from 'react';
import { Award, Calendar, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import type { Reference } from '../types';

export const ReferencesPage: React.FC = () => {
  const { t, getField } = useLanguage();
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferences = async () => {
      setLoading(true);
      const data = await apiService.getReferences();
      setReferences(data);
      setLoading(false);
    };
    fetchReferences();
  }, []);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-blue-700" />
            <span>{t('navReferences')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Güçlü Referanslarımız & Tamamlanan Projeler
          </h1>
          <p className="text-slate-600 text-base font-light">
            Türkiye ve dünya genelinde önde gelen marinalar, tersaneler ve liman işletmeleri ile yürüttüğümüz başarılı projeler.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Referanslar yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading">{ref.clientName}</h3>
                    </div>
                    {ref.projectYear && (
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        <Calendar className="w-3.5 h-3.5" />
                        {ref.projectYear}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{getField(ref, 'title')}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{getField(ref, 'description')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
