import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { TopBar } from './components/Layout/TopBar';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { HomePage } from './pages/HomePage';
import { CorporatePage } from './pages/CorporatePage';
import { ReferencesPage } from './pages/ReferencesPage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailPage } from './pages/BrandDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// Auto scroll to top on route navigation
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductOrService, setSelectedProductOrService] = useState<string | undefined>();

  const handleOpenQuoteModal = (productTitle?: string) => {
    setSelectedProductOrService(productTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopOnRouteChange />
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
          <TopBar />
          <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/kurumsal/:slug" element={<CorporatePage />} />
              <Route path="/referanslar" element={<ReferencesPage />} />
              <Route path="/kvkk" element={<CorporatePage />} />
              <Route path="/markalar" element={<BrandsPage />} />
              <Route path="/markalar/:slug" element={<BrandDetailPage onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/urunler" element={<ProductsPage onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/urunler/:slug" element={<ProductDetailPage onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/hizmetler" element={<ServicesPage />} />
              <Route path="/hizmetler/:slug" element={<ServiceDetailPage onOpenQuoteModal={handleOpenQuoteModal} />} />
              <Route path="/galeri" element={<GalleryPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating Back to Top Button */}
          <ScrollToTopButton />

          <QuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            initialProductOrService={selectedProductOrService}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
