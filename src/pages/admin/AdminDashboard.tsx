import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, ShieldCheck, Inbox, Image as ImageIcon, ArrowRight, 
  Layers, Eye 
} from 'lucide-react';
import { apiService } from '../../api/client';
import type { FormSubmission } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    brandsCount: 0,
    heroSlidesCount: 0,
    servicesCount: 0,
    submissionsCount: 0
  });

  const [recentSubmissions, setRecentSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const [prods, brands, slides, servs, forms] = await Promise.all([
        apiService.getProducts(),
        apiService.getBrands(),
        apiService.getHeroSlides(),
        apiService.getServices(),
        apiService.getFormSubmissions()
      ]);

      setStats({
        productsCount: prods.length,
        brandsCount: brands.length,
        heroSlidesCount: slides.length,
        servicesCount: servs.length,
        submissionsCount: forms.length
      });

      setRecentSubmissions(forms.slice(0, 5));
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading">Gösterge Paneli</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Songur Marin Makine içerik ve talep durum özeti
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Yeni Ürün Ekle</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:border-blue-500 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Tüm Ürünler</span>
            <span className="text-3xl font-black text-slate-900 font-heading">{loading ? '...' : stats.productsCount}</span>
            <span className="text-[11px] text-blue-600 block font-semibold pt-1">Katalog Ekipmanları</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Markalar</span>
            <span className="text-3xl font-black text-slate-900 font-heading">{loading ? '...' : stats.brandsCount}</span>
            <span className="text-[11px] text-emerald-600 block font-semibold pt-1">Temsil Edilen Üreticiler</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:border-amber-500 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Hero Slaytları</span>
            <span className="text-3xl font-black text-slate-900 font-heading">{loading ? '...' : stats.heroSlidesCount}</span>
            <span className="text-[11px] text-amber-600 block font-semibold pt-1">Ana Sayfa Manşetleri</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:border-purple-500 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Teklif Talepleri</span>
            <span className="text-3xl font-black text-slate-900 font-heading">{loading ? '...' : stats.submissionsCount}</span>
            <span className="text-[11px] text-purple-600 block font-semibold pt-1">Gelen Formlar</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Submissions & Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Submissions */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Son Gelen Teklif Talepleri</h3>
              <p className="text-xs text-slate-500">Müşterilerin form üzerinden ilettiği son mesajlar</p>
            </div>
            <Link
              to="/admin/forms"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              Henüz gelen teklif talebi bulunmuyor.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">{sub.fullName}</span>
                    <span className="text-[11px] text-slate-500 block">
                      {sub.companyName ? `${sub.companyName} • ` : ''}{sub.email} • {sub.phone}
                    </span>
                    <span className="text-[11px] text-blue-600 block font-medium italic line-clamp-1">
                      "{sub.productOrService || sub.message}"
                    </span>
                  </div>
                  <Link
                    to="/admin/forms"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors shrink-0"
                    title="Detay İncele"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
            <h3 className="text-base font-bold font-heading relative z-10">Hızlı İşlem Kısayolları</h3>
            
            <div className="space-y-2 relative z-10">
              <Link
                to="/admin/hero-slides"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-sky-400" />
                  <span>Hero Manşetlerini Düzenle</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/admin/brands"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Marka Listesini Güncelle</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Galeri Görseli Ekle</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
