import React, { useState, useEffect } from 'react';
import { 
  Heading, Type, List, Sparkles, 
  Plus, Trash2, AlignLeft, Globe
} from 'lucide-react';

interface StructuredData {
  heading: string;
  subheading: string;
  bodyText: string;
  bulletPoints: string[];
  calloutNote: string;
}

interface RichContentEditorProps {
  value?: string;
  onChange?: (htmlContent: string) => void;
  valueTr?: string;
  valueEn?: string;
  onChangeTr?: (htmlContent: string) => void;
  onChangeEn?: (htmlContent: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

const parseHtmlToStructured = (html: string | undefined): StructuredData => {
  if (!html) return { heading: '', subheading: '', bodyText: '', bulletPoints: [], calloutNote: '' };
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const heading = tempDiv.querySelector('h2')?.textContent || '';
  const subheading = tempDiv.querySelector('.lead, h3, .subheading, p.text-lg')?.textContent || '';
  
  const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
    .map(p => p.textContent || '')
    .filter(t => t.trim().length > 0 && !t.startsWith('•') && t !== subheading);

  const bulletPoints = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent || '');
  const calloutNote = tempDiv.querySelector('.highlight, blockquote, .callout, div.bg-blue-50')?.textContent || '';

  return {
    heading,
    subheading,
    bodyText: paragraphs.join('\n\n'),
    bulletPoints,
    calloutNote: calloutNote.trim()
  };
};

const buildHtmlFromStructured = (data: StructuredData): string => {
  let html = '';

  if (data.heading.trim()) {
    html += `<h2 className="text-2xl font-bold text-slate-900 font-heading mb-4">${data.heading.trim()}</h2>\n`;
  }

  if (data.subheading.trim()) {
    html += `<p className="text-lg font-medium text-blue-700 font-sans mb-6 leading-relaxed">${data.subheading.trim()}</p>\n`;
  }

  if (data.bodyText.trim()) {
    const paras = data.bodyText.split('\n\n').filter(p => p.trim());
    paras.forEach(p => {
      html += `<p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">${p.trim()}</p>\n`;
    });
  }

  const validBullets = data.bulletPoints.filter(b => b.trim());
  if (validBullets.length > 0) {
    html += `<ul className="space-y-2.5 my-6 pl-2">\n`;
    validBullets.forEach(item => {
      html += `  <li className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base"><span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>${item.trim()}</span></li>\n`;
    });
    html += `</ul>\n`;
  }

  if (data.calloutNote.trim()) {
    html += `<div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border-l-4 border-blue-600 text-blue-900 text-sm font-medium my-6 shadow-xs leading-relaxed">\n  ${data.calloutNote.trim()}\n</div>\n`;
  }

  return html.trim();
};

export const RichContentEditor: React.FC<RichContentEditorProps> = ({
  value,
  onChange,
  valueTr,
  valueEn,
  onChangeTr,
  onChangeEn,
  label = 'Detaylı İçerik Editörü',
  helperText = 'Metin, madde listeleri ve vurgu kutularını Türkçe ve İngilizce olarak doldurun.',
  className = '',
}) => {
  const [activeLang, setActiveLang] = useState<'tr' | 'en'>('tr');

  const [dataTr, setDataTr] = useState<StructuredData>(() => parseHtmlToStructured(valueTr || value));
  const [dataEn, setDataEn] = useState<StructuredData>(() => parseHtmlToStructured(valueEn));

  useEffect(() => {
    if (valueTr !== undefined || value !== undefined) {
      setDataTr(parseHtmlToStructured(valueTr || value));
    }
  }, [valueTr, value]);

  useEffect(() => {
    if (valueEn !== undefined) {
      setDataEn(parseHtmlToStructured(valueEn));
    }
  }, [valueEn]);

  const currentData = activeLang === 'tr' ? dataTr : dataEn;

  const updateCurrentData = (updated: StructuredData) => {
    if (activeLang === 'tr') {
      setDataTr(updated);
      const html = buildHtmlFromStructured(updated);
      if (onChangeTr) onChangeTr(html);
      if (onChange) onChange(html);
    } else {
      setDataEn(updated);
      const html = buildHtmlFromStructured(updated);
      if (onChangeEn) onChangeEn(html);
    }
  };

  const handleFieldChange = (field: keyof StructuredData, val: any) => {
    const updated = { ...currentData, [field]: val };
    updateCurrentData(updated);
  };

  const addBulletPoint = () => {
    const updatedBullets = [...currentData.bulletPoints, ''];
    handleFieldChange('bulletPoints', updatedBullets);
  };

  const updateBulletPoint = (index: number, val: string) => {
    const updatedBullets = [...currentData.bulletPoints];
    updatedBullets[index] = val;
    handleFieldChange('bulletPoints', updatedBullets);
  };

  const removeBulletPoint = (index: number) => {
    const updatedBullets = currentData.bulletPoints.filter((_, i) => i !== index);
    handleFieldChange('bulletPoints', updatedBullets);
  };

  const currentPreviewHtml = buildHtmlFromStructured(currentData);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header & Language Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <label className="block text-xs font-bold text-slate-900">
            {label}
          </label>
          {helperText && (
            <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>
          )}
        </div>

        {/* TR / EN Language Toggle Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveLang('tr')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeLang === 'tr'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇹🇷 Türkçe (TR)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeLang === 'en'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇬🇧 English (EN)</span>
          </button>
        </div>
      </div>

      {/* STRUCTURED FORM INPUTS */}
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 text-xs">
        
        {/* Language Indicator Banner */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
          {activeLang === 'tr' ? (
            <span className="text-blue-700">🇹🇷 Türkçe içerik alanlarını düzenliyorsunuz:</span>
          ) : (
            <span className="text-blue-700">🇬🇧 İngilizce (English) içerik alanlarını düzenliyorsunuz:</span>
          )}
        </div>

        {/* Main Heading Input */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <Heading className="w-4 h-4 text-blue-600" />
            {activeLang === 'tr' ? 'Ana Başlık Metni (TR)' : 'Main Heading Text (EN)'}
          </label>
          <input
            type="text"
            value={currentData.heading}
            onChange={(e) => handleFieldChange('heading', e.target.value)}
            placeholder={activeLang === 'tr' ? 'Örn: Marina ve İmalat Çözümlerimiz' : 'e.g., Marine & Shipyard Solutions'}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        {/* Subheading Input */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-blue-600" />
            {activeLang === 'tr' ? 'Alt Başlık / Özet Girişi (TR)' : 'Subheading / Lead Summary (EN)'}
          </label>
          <input
            type="text"
            value={currentData.subheading}
            onChange={(e) => handleFieldChange('subheading', e.target.value)}
            placeholder={activeLang === 'tr' ? 'Örn: Yüksek kapasiteli ağır yük taşıma altyapısı' : 'e.g., Heavy-duty mobile boat hoist infrastructure'}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        {/* Paragraphs Input */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <AlignLeft className="w-4 h-4 text-blue-600" />
            {activeLang === 'tr' ? 'Ana Açıklama Metni (Paragraflar)' : 'Main Description Text (Paragraphs)'}
          </label>
          <textarea
            rows={5}
            value={currentData.bodyText}
            onChange={(e) => handleFieldChange('bodyText', e.target.value)}
            placeholder={activeLang === 'tr' ? 'Açıklama paragrafını buraya yazın. İki satır boşluk bıraktığınızda yeni paragraf oluşturulur.' : 'Enter description paragraphs. Leave an empty line between paragraphs.'}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 leading-relaxed text-xs"
          />
        </div>

        {/* Bullet Points Input List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <List className="w-4 h-4 text-blue-600" />
              {activeLang === 'tr' ? 'Önemli Özellikler / Madde Listesi' : 'Key Features / Bullet Points List'}
            </label>
            <button
              type="button"
              onClick={addBulletPoint}
              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {activeLang === 'tr' ? 'Madde Ekle' : 'Add Bullet'}
            </button>
          </div>

          {currentData.bulletPoints.length === 0 ? (
            <p className="text-xs text-slate-400 italic bg-white p-3 rounded-xl border border-slate-200">
              {activeLang === 'tr' ? 'Henüz madde eklenmedi. Yukarıdaki "Madde Ekle" butonuna basarak ekleyebilirsiniz.' : 'No bullet items added yet. Click "Add Bullet" above.'}
            </p>
          ) : (
            <div className="space-y-2">
              {currentData.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateBulletPoint(index, e.target.value)}
                    placeholder={activeLang === 'tr' ? `Madde ${index + 1}` : `Bullet point ${index + 1}`}
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Callout / Highlight Box */}
        <div className="space-y-1 pt-2 border-t border-slate-200">
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {activeLang === 'tr' ? 'Vurgulanan Önemli Not Kutusu (Opsiyonel)' : 'Highlight Note Box (Optional)'}
          </label>
          <input
            type="text"
            value={currentData.calloutNote}
            onChange={(e) => handleFieldChange('calloutNote', e.target.value)}
            placeholder={activeLang === 'tr' ? 'Örn: Tüm ekipmanlarımız 2 Yıl Uluslararası Garanti kapsamındadır.' : 'e.g., Covered under 2-Year International Warranty.'}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

      </div>

      {/* LIVE PREVIEW FRAME */}
      {currentPreviewHtml && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-blue-900 text-white text-xs font-bold">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>
                {activeLang === 'tr' ? 'Web Sitesi Canlı Türkçe Önizlemesi' : 'Live English Preview'}
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-b-2xl p-6 shadow-sm text-slate-800 text-sm leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: currentPreviewHtml }} />
          </div>
        </div>
      )}
    </div>
  );
};
