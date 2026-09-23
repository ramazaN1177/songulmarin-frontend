import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import type { Page } from '../types';
import { ShieldCheck, Layers, FileText } from 'lucide-react';

export const CorporatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getField } = useLanguage();
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      const targetSlug = slug || 'hakkimizda';
      const page = await apiService.getPageBySlug(targetSlug);
      setPageData(page);
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Sayfa yükleniyor...</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="py-32 text-center text-slate-800 space-y-4">
        <h2 className="text-2xl font-bold font-heading">Sayfa Bulunamadı</h2>
        <p className="text-slate-600">Aradığınız kurumsal sayfa bulunamadı veya henüz eklenmedi.</p>
      </div>
    );
  }

  const title = getField(pageData, 'title');
  const summary = getField(pageData, 'summary');
  const content = getField(pageData, 'content');

  const getIcon = () => {
    if (slug === 'misyon-vizyon') return <ShieldCheck className="w-6 h-6 text-blue-700" />;
    if (slug === 'kvkk') return <FileText className="w-6 h-6 text-blue-700" />;
    return <Layers className="w-6 h-6 text-blue-700" />;
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Header */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            {getIcon()}
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">{title}</h1>
          {summary && <p className="text-lg text-slate-600 font-light leading-relaxed">{summary}</p>}
        </div>

        {/* Hero Image if present */}
        {pageData.imageUrl && (
          <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <img src={pageData.imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content body */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm text-slate-800 text-base leading-relaxed space-y-6">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

      </div>
    </div>
  );
};
