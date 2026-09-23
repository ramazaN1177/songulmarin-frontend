import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, ShieldCheck, Award, Wrench, 
  ArrowRight, Play, Eye, CheckCircle2, PhoneCall 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import type { HeroSlide, Brand, Product, Service, GalleryItem } from '../types';
import { LightboxModal } from '../components/LightboxModal';

interface HomePageProps {
  onOpenQuoteModal: (productTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  const { t, getField } = useLanguage();

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [sData, bData, pData, servData, gData] = await Promise.all([
        apiService.getHeroSlides(),
        apiService.getBrands(),
        apiService.getProducts(),
        apiService.getServices(),
        apiService.getGallery()
      ]);
      setSlides(sData);
      setBrands(bData);
      setProducts(pData);
      setServices(servData);
      setGalleryItems(gData.slice(0, 4));
    };
    fetchData();
  }, []);

  // Hero slider auto-advance
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-0 bg-slate-50">
      
      {/* HERO SLIDER (Executive Marine Dark Blue for visual impact) */}
      <section className="relative min-h-[560px] lg:min-h-[640px] bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 flex items-center justify-center overflow-hidden">
        {slides.length > 0 && currentSlide && (
          <div className="absolute inset-0 z-0">
            <img
              src={currentSlide.imageUrl}
              alt={getField(currentSlide, 'title') || 'Hero Image'}
              className="w-full h-full object-cover opacity-30 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-transparent to-blue-950/80"></div>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Marine & Heavy Crane Solutions</span>
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-heading drop-shadow-md">
              {currentSlide ? getField(currentSlide, 'title') : 'Denizcilik Sektöründe Güvenilir Çözüm Ortağınız'}
            </h1>

            {/* Slide Subtitle */}
            <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl">
              {currentSlide ? getField(currentSlide, 'subtitle') : 'Marina, liman ve tersane projeleriniz için dünya standartlarında mobil vinç ve bot taşıyıcı sistemleri.'}
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onOpenQuoteModal()}
                className="bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-blue-950 font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-sky-500/25 transition-all text-base flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>{t('requestQuote')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/urunler"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 text-base backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>{t('viewAllProducts')}</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Slide Controls */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2.5 rounded-full bg-blue-950/80 border border-blue-800 text-slate-300 hover:text-white transition-colors backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-300 tracking-widest font-mono">
              0{currentSlideIndex + 1} / 0{slides.length}
            </span>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}
              className="p-2.5 rounded-full bg-blue-950/80 border border-blue-800 text-slate-300 hover:text-white transition-colors backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* STATS BAR (Light Ice Blue) */}
      <section className="bg-blue-50 border-y border-blue-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-blue-200/80">
            
            <div className="pt-4 lg:pt-0 lg:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-heading">25+ Yıl</span>
              <p className="text-sm font-bold text-slate-900">{t('expYears')}</p>
              <p className="text-xs text-slate-600">{t('expYearsSub')}</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-heading">500+</span>
              <p className="text-sm font-bold text-slate-900">{t('projectsCount')}</p>
              <p className="text-xs text-slate-600">{t('projectsCountSub')}</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-heading">1000 Ton</span>
              <p className="text-sm font-bold text-slate-900">Maks. Kaldırma Kapasitesi</p>
              <p className="text-xs text-slate-600">Cimolai Technology Hoist</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-heading">7/24</span>
              <p className="text-sm font-bold text-slate-900">{t('support247')}</p>
              <p className="text-xs text-slate-600">{t('support247Sub')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SUMMARY TEASER (Clean White) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80"
                  alt="Songur Marin Makine"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white border border-blue-200 p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">Temsilcilik & Distribütörlük</h4>
                    <p className="text-xs text-slate-500">Cimolai Technology S.p.A.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <span>Songur Marin Makine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading leading-tight">
                Marina & Tersaneler İçin Uçtan Uca Mühendislik Çözümleri
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                25 yılı aşkın tecrübemizle, marin vinçleri, mobil boat hoist, bot taşıyıcılar ve ağır sanayi kaldırma ekipmanlarında Türkiye ve çevre coğrafyanın öncü firması olarak hizmet veriyoruz.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Satış Öncesi Projelendirme:</strong> Rıhtım ölçüleri ve havuz yapısına uygun vinç seçimi.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Orijinal Yedek Parça:</strong> Stoktan hızlı yedek parça temini ve garanti.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Sertifikalı Yük Testi:</strong> Yıllık SWL ağırlık testi ve periyodik bakım raporlaması.</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/kurumsal/hakkimizda"
                  className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/referanslar"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-colors"
                >
                  <span>{t('navReferences')}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* BRANDS SHOWCASE (Light Gray background) */}
      <section className="py-20 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">{t('sectionBrandsTitle')}</h2>
            <p className="text-sm sm:text-base text-slate-600">{t('sectionBrandsSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-16 flex items-center">
                    <span className="text-2xl font-black text-blue-900 font-heading tracking-wider border-b-2 border-blue-600 pb-1">
                      {brand.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {getField(brand, 'description')}
                  </p>
                </div>

                <Link
                  to={`/markalar/${brand.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors group"
                >
                  <span>Marka Ürünlerini Gör</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS (Clean White background) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">{t('sectionProductsTitle')}</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t('sectionProductsSub')}</p>
            </div>
            <Link
              to="/urunler"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{t('viewAllProducts')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <img
                      src={prod.primaryImage || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80'}
                      alt={getField(prod, 'title')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-blue-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Cimolai
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-700 transition-colors line-clamp-2">
                      {getField(prod, 'title')}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {getField(prod, 'summary')}
                    </p>

                    {/* Specs snippet */}
                    {prod.specsJson && (
                      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(prod.specsJson).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-slate-400 block text-[10px]">{k}</span>
                            <span className="font-bold text-slate-800">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                  <Link
                    to={`/urunler/${prod.slug}`}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1"
                  >
                    <span>{t('viewDetails')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenQuoteModal(getField(prod, 'title'))}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white text-xs font-bold transition-all border border-blue-200"
                  >
                    Teklif Al
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (Ice Blue background) */}
      <section className="py-20 bg-blue-50/60 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">{t('sectionServicesTitle')}</h2>
            <p className="text-sm sm:text-base text-slate-600">{t('sectionServicesSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((serv) => (
              <div
                key={serv.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{getField(serv, 'title')}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{getField(serv, 'summary')}</p>
                </div>

                <Link
                  to={`/hizmetler/${serv.slug}`}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 group"
                >
                  <span>Detaylı Bilgi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW (Clean White) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">{t('sectionGalleryTitle')}</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t('sectionGallerySub')}</p>
            </div>
            <Link
              to="/galeri"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{t('navGallery')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((gItem) => (
              <div
                key={gItem.id}
                onClick={() => setSelectedMedia(gItem)}
                className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl hover:border-blue-500 transition-all"
              >
                <img
                  src={gItem.thumbnailUrl || gItem.mediaUrl}
                  alt={getField(gItem, 'title') || 'Gallery Item'}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  {gItem.type === 'VIDEO' ? (
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 text-white border border-white/50 flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-white line-clamp-2">{getField(gItem, 'title')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER (Rich Executive Marine Blue) */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading">{t('sectionCtaTitle')}</h2>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-light">
            {t('sectionCtaSub')}
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-sky-400 hover:bg-sky-300 text-blue-950 font-bold px-8 py-4 rounded-xl shadow-xl text-base transition-all hover:scale-105"
            >
              {t('requestQuote')}
            </button>
            <a
              href="tel:+902161234567"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 text-base transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <PhoneCall className="w-5 h-5 text-sky-400" />
              <span>+90 (216) 123 45 67</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </div>
  );
};
