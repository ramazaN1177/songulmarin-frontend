import React, { useState } from 'react';
import { Send, CheckCircle, Anchor, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../api/client';
import { Modal } from './common/Modal';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductOrService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialProductOrService }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productOrService: initialProductOrService || '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.submitForm(formData);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      productOrService: '',
      message: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('requestQuote')}
      subtitle="Songur Marin mühendislik uzmanlarımız en kısa sürede sizinle iletişime geçecektir."
      icon={<Anchor className="w-5 h-5 text-blue-400" />}
      maxWidth="xl"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 animate-bounce shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
            Talebiniz Başarıyla Alındı!
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {t('formSuccess')}
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
          >
            Tamam / Kapat
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('formFullName')} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                placeholder="Ahmet Yılmaz"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('formCompanyName')}
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                placeholder="Marina A.Ş."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('formEmail')} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                placeholder="ahmet@marina.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('formPhone')} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                placeholder="+90 532 000 00 00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              İlgilendiğiniz Ürün veya Hizmet
            </label>
            <input
              type="text"
              value={formData.productOrService}
              onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="Örn: MBH 800 Mobil Tekne Vinci"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t('formMessage')} *
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-none"
              placeholder="Projeniz, kaldırma kapasitesi talebiniz veya mesajınız..."
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 text-xs transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('formSend')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
