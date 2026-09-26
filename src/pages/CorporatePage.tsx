import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import type { Page } from '../types';
import { ShieldCheck, Layers, FileText, ChevronRight, Award, Anchor } from 'lucide-react';

import aboutSectionImg from '../assets/sections/about.jpg';

export const CorporatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getField, t } = useLanguage();
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
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-bold text-slate-600">Sayfa yükleniyor...</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="py-32 text-center text-slate-800 space-y-4">
        <h2 className="text-2xl font-bold font-heading">Sayfa Bulunamadı</h2>
        <p className="text-slate-600">Aradığınız kurumsal sayfa bulunamadı veya henüz eklenmedi.</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-blue-700 text-white font-bold rounded-xl text-xs">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const title = getField(pageData, 'title');
  const summary = getField(pageData, 'summary');
  const content = getField(pageData, 'content');
  const imageSrc = pageData.imageUrl || aboutSectionImg;

  const getIcon = () => {
    if (slug === 'misyon-vizyon') return <ShieldCheck className="w-5 h-5 text-blue-600" />;
    if (slug === 'kvkk') return <FileText className="w-5 h-5 text-blue-600" />;
    return <Layers className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link to="/" className="hover:text-white transition-colors">{t('navHome')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300">{t('navCorporate')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400 font-bold">{title}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-400 shrink-0">
              {getIcon()}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">{title}</h1>
          </div>
          {summary && (
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-light leading-relaxed pt-1">
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Layout — Left Image, Right Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Image Showcase & Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white relative group">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white border border-blue-100 p-5 rounded-2xl shadow-xl max-w-xs flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-xs">SONGUR MARİN MAKİNE</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Uluslararası Temsilcilik & Servis</p>
                </div>
              </div>
            </div>

            {/* Sub-Badges Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-700 font-extrabold text-sm">
                  <Anchor className="w-4 h-4 text-blue-600" />
                  <span>25+ Yıl</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Saha & Mühendislik Tecrübesi</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-700 font-extrabold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>100% Garanti</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Orijinal Ekipman & Servis</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Description & Rich Content (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
            {content ? (
              <div 
                className="space-y-4 prose max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-slate-500 italic">Sayfa içeriği hazırlanmaktadır.</p>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
