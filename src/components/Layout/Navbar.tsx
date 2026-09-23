import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Anchor, ShieldCheck, FileText, Award, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCorporateDropdownOpen, setIsCorporateDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCorporateDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80' : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-sky-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors uppercase font-heading">
                SONGUR MARİN
              </span>
              <span className="text-[10px] text-blue-600 tracking-widest font-bold uppercase">
                Makine & Ekipman San.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            <Link
              to="/"
              className={`transition-colors hover:text-blue-600 ${isActive('/') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navHome')}
            </Link>

            {/* Corporate Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setIsCorporateDropdownOpen(true)}
              onMouseLeave={() => setIsCorporateDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 ${
                  ['/kurumsal/hakkimizda', '/kurumsal/misyon-vizyon', '/referanslar', '/kvkk'].includes(location.pathname)
                    ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5'
                    : 'text-slate-700'
                }`}
              >
                <span>{t('navCorporate')}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Dropdown Menu */}
              {isCorporateDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/kurumsal/hakkimizda"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-all text-xs font-semibold"
                  >
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>{t('navAboutUs')}</span>
                  </Link>
                  <Link
                    to="/kurumsal/misyon-vizyon"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-all text-xs font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{t('navMissionVision')}</span>
                  </Link>
                  <Link
                    to="/referanslar"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-all text-xs font-semibold"
                  >
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>{t('navReferences')}</span>
                  </Link>
                  <Link
                    to="/kvkk"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-all text-xs font-semibold"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{t('navKvkk')}</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/markalar"
              className={`transition-colors hover:text-blue-600 ${isActive('/markalar') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navBrands')}
            </Link>

            <Link
              to="/urunler"
              className={`transition-colors hover:text-blue-600 ${isActive('/urunler') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navProducts')}
            </Link>

            <Link
              to="/hizmetler"
              className={`transition-colors hover:text-blue-600 ${isActive('/hizmetler') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navServices')}
            </Link>

            <Link
              to="/galeri"
              className={`transition-colors hover:text-blue-600 ${isActive('/galeri') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navGallery')}
            </Link>

            <Link
              to="/iletisim"
              className={`transition-colors hover:text-blue-600 ${isActive('/iletisim') ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-700'}`}
            >
              {t('navContact')}
            </Link>
          </nav>

          {/* Action Button: Get Quote */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
            >
              {t('requestQuote')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-blue-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navHome')}
          </Link>

          {/* Mobile Corporate Accordion */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              {t('navCorporate')}
            </div>
            <Link
              to="/kurumsal/hakkimizda"
              onClick={closeMobileMenu}
              className="block px-6 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              {t('navAboutUs')}
            </Link>
            <Link
              to="/kurumsal/misyon-vizyon"
              onClick={closeMobileMenu}
              className="block px-6 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              {t('navMissionVision')}
            </Link>
            <Link
              to="/referanslar"
              onClick={closeMobileMenu}
              className="block px-6 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              {t('navReferences')}
            </Link>
            <Link
              to="/kvkk"
              onClick={closeMobileMenu}
              className="block px-6 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              {t('navKvkk')}
            </Link>
          </div>

          <Link
            to="/markalar"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/markalar') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navBrands')}
          </Link>

          <Link
            to="/urunler"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/urunler') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navProducts')}
          </Link>

          <Link
            to="/hizmetler"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/hizmetler') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navServices')}
          </Link>

          <Link
            to="/galeri"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/galeri') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navGallery')}
          </Link>

          <Link
            to="/iletisim"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-lg font-semibold ${isActive('/iletisim') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
          >
            {t('navContact')}
          </Link>

          <div className="pt-2">
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenQuoteModal();
              }}
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md"
            >
              {t('requestQuote')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
