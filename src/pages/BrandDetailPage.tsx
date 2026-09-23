import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import type { Brand } from '../types';

interface BrandDetailPageProps {
  onOpenQuoteModal: (productTitle?: string) => void;
}

export const BrandDetailPage: React.FC<BrandDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const { getField } = useLanguage();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await apiService.getBrandBySlug(slug);
      setBrand(data);
      setLoading(false);
    };
    fetchBrand();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Marka detayları yükleniyor...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="py-32 text-center text-slate-900 space-y-4">
        <h2 className="text-2xl font-bold font-heading">Marka Bulunamadı</h2>
        <p className="text-slate-600">Aradığınız marka bulunamadı.</p>
      </div>
    );
  }

  const description = getField(brand, 'description');

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Brand Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Temsil Edilen Marka</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">{brand.name}</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">{description}</p>
        </div>

        {/* Brand Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 font-heading">{brand.name} Ürün Kataloğu</h2>
          
          {brand.products && brand.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brand.products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{getField(prod, 'title')}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{getField(prod, 'summary')}</p>
                  </div>
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <Link
                      to={`/urunler/${prod.slug}`}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      <span>İncele</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(getField(prod, 'title'))}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 hover:bg-blue-700 hover:text-white transition-all"
                    >
                      Teklif Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Bu markaya ait henüz kayıtlı ürün bulunmamaktadır. Özel projelendirme ve teklif için bizimle iletişime geçebilirsiniz.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
