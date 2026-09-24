import React, { useState, useEffect } from 'react';
import { 
  Heading, Type, List, Sparkles, Code, 
  Plus, Trash2, Bold, Italic, AlignLeft, Globe
} from 'lucide-react';

interface RichContentEditorProps {
  value: string;
  onChange: (htmlContent: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

export const RichContentEditor: React.FC<RichContentEditorProps> = ({
  value,
  onChange,
  label = 'Sayfa / Detay İçeriği',
  helperText = 'Metinlerinizi ayrı alanlara yazarak otomatik biçimlendirin veya zengin içerik araçlarını kullanın.',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'toolbar' | 'code'>('structured');

  // Structured Form States
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [calloutNote, setCalloutNote] = useState('');

  // Helper to parse incoming HTML string into structured fields if possible
  useEffect(() => {
    if (!value) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;

    const h2 = tempDiv.querySelector('h2')?.textContent || '';
    const h3Lead = tempDiv.querySelector('.lead, h3, .subheading')?.textContent || '';
    
    // Extract paragraphs
    const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
      .map(p => p.textContent || '')
      .filter(t => t.trim().length > 0 && !t.startsWith('•'));
    
    // Extract bullets
    const bullets = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent || '');
    
    // Extract callout
    const callout = tempDiv.querySelector('.highlight, blockquote, .callout')?.textContent || '';

    if (h2) setHeading(h2);
    if (h3Lead) setSubheading(h3Lead);
    if (paragraphs.length > 0) setBodyText(paragraphs.join('\n\n'));
    if (bullets.length > 0) setBulletPoints(bullets);
    if (callout) setCalloutNote(callout);
  }, []);

  // Generate clean HTML string matching corporate website styles
  const buildHtmlFromStructured = (
    h: string, 
    sub: string, 
    body: string, 
    bullets: string[], 
    callout: string
  ) => {
    let html = '';

    if (h.trim()) {
      html += `<h2 className="text-2xl font-bold text-slate-900 font-heading mb-4">${h.trim()}</h2>\n`;
    }

    if (sub.trim()) {
      html += `<p className="text-lg font-medium text-blue-700 font-sans mb-6 leading-relaxed">${sub.trim()}</p>\n`;
    }

    if (body.trim()) {
      const paras = body.split('\n\n').filter(p => p.trim());
      paras.forEach(p => {
        html += `<p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">${p.trim()}</p>\n`;
      });
    }

    const validBullets = bullets.filter(b => b.trim());
    if (validBullets.length > 0) {
      html += `<ul className="space-y-2.5 my-6 pl-2">\n`;
      validBullets.forEach(item => {
        html += `  <li className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base"><span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></span><span>${item.trim()}</span></li>\n`;
      });
      html += `</ul>\n`;
    }

    if (callout.trim()) {
      html += `<div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border-l-4 border-blue-600 text-blue-900 text-sm font-medium my-6 shadow-xs leading-relaxed">\n  ${callout.trim()}\n</div>\n`;
    }

    return html.trim();
  };

  const handleStructuredChange = (
    newHeading = heading,
    newSub = subheading,
    newBody = bodyText,
    newBullets = bulletPoints,
    newCallout = calloutNote
  ) => {
    setHeading(newHeading);
    setSubheading(newSub);
    setBodyText(newBody);
    setBulletPoints(newBullets);
    setCalloutNote(newCallout);

    const generatedHtml = buildHtmlFromStructured(newHeading, newSub, newBody, newBullets, newCallout);
    onChange(generatedHtml);
  };

  const addBulletPoint = () => {
    const updated = [...bulletPoints, ''];
    handleStructuredChange(heading, subheading, bodyText, updated, calloutNote);
  };

  const updateBulletPoint = (index: number, val: string) => {
    const updated = [...bulletPoints];
    updated[index] = val;
    handleStructuredChange(heading, subheading, bodyText, updated, calloutNote);
  };

  const removeBulletPoint = (index: number) => {
    const updated = bulletPoints.filter((_, i) => i !== index);
    handleStructuredChange(heading, subheading, bodyText, updated, calloutNote);
  };

  // Quick HTML insertion helper for Toolbar mode
  const insertTag = (startTag: string, endTag: string) => {
    const textarea = document.getElementById('rich-textarea-code') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || 'Örnek Metin';
    const replacement = `${startTag}${selected}${endTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Label & Tab Toggle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <label className="block text-xs font-bold text-slate-900">
            {label}
          </label>
          {helperText && (
            <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>
          )}
        </div>

        {/* Bright Light-Themed Tab Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('structured')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'structured'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Kolay Form Modu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('toolbar')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'toolbar'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span>Metin & Şablon</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Ham HTML</span>
          </button>
        </div>
      </div>

      {/* TAB 1: STRUCTURED FORM INPUTS (Crisp Light Theme) */}
      {activeTab === 'structured' && (
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Main Heading Input */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Heading className="w-4 h-4 text-blue-600" />
              Ana Başlık Metni
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => handleStructuredChange(e.target.value, subheading, bodyText, bulletPoints, calloutNote)}
              placeholder="Örn: Marina ve İmalat Çözümlerimiz"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Subheading Input */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-blue-600" />
              Alt Başlık / Özet Girişi
            </label>
            <input
              type="text"
              value={subheading}
              onChange={(e) => handleStructuredChange(heading, e.target.value, bodyText, bulletPoints, calloutNote)}
              placeholder="Örn: Yüksek kapasiteli ağır yük taşıma ve marin vinç altyapısı."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Paragraphs Input */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4 text-blue-600" />
              Ana Açıklama Metni (Paragraflar)
            </label>
            <textarea
              rows={5}
              value={bodyText}
              onChange={(e) => handleStructuredChange(heading, subheading, e.target.value, bulletPoints, calloutNote)}
              placeholder="Açıklama paragrafını buraya yazın. İki satır boşluk bıraktığınızda yeni paragraf oluşturulur."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 leading-relaxed text-xs"
            />
          </div>

          {/* Bullet Points Input List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <List className="w-4 h-4 text-blue-600" />
                Önemli Özellikler / Madde Listesi
              </label>
              <button
                type="button"
                onClick={addBulletPoint}
                className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Madde Ekle
              </button>
            </div>

            {bulletPoints.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-white p-3 rounded-xl border border-slate-200">Henüz madde eklenmedi. Yukarıdaki "Madde Ekle" butonuna basarak ekleyebilirsiniz.</p>
            ) : (
              <div className="space-y-2">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      placeholder={`Madde ${index + 1}`}
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
              Vurgulanan Önemli Not Kutusu (Opsiyonel)
            </label>
            <input
              type="text"
              value={calloutNote}
              onChange={(e) => handleStructuredChange(heading, subheading, bodyText, bulletPoints, e.target.value)}
              placeholder="Örn: Tüm ekipmanlarımız 2 Yıl Uluslararası Üretici Garantisi kapsamındadır."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

        </div>
      )}

      {/* TAB 2: TOOLBAR QUICK FORMATTING BUTTONS */}
      {activeTab === 'toolbar' && (
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 space-y-3 text-xs">
          
          {/* Format Toolbar */}
          <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => insertTag('<h2>', '</h2>')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold flex items-center gap-1 border border-slate-200"
              title="Başlık Ekle (H2)"
            >
              <Heading className="w-3.5 h-3.5" />
              Başlık
            </button>
            <button
              type="button"
              onClick={() => insertTag('<p>', '</p>')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium flex items-center gap-1 border border-slate-200"
              title="Paragraf Ekle (P)"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              Paragraf
            </button>
            <button
              type="button"
              onClick={() => insertTag('<strong>', '</strong>')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold flex items-center gap-1 border border-slate-200"
              title="Kalın Metin"
            >
              <Bold className="w-3.5 h-3.5" />
              Kalın
            </button>
            <button
              type="button"
              onClick={() => insertTag('<em>', '</em>')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 italic flex items-center gap-1 border border-slate-200"
              title="İtalik Metin"
            >
              <Italic className="w-3.5 h-3.5" />
              İtalik
            </button>
            <button
              type="button"
              onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium flex items-center gap-1 border border-slate-200"
              title="Liste Ekle"
            >
              <List className="w-3.5 h-3.5" />
              Liste
            </button>
            <button
              type="button"
              onClick={() => insertTag('<div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-600 font-bold text-blue-900">\n  ', '\n</div>')}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold flex items-center gap-1 border border-amber-200"
              title="Vurgu Kutusu"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Vurgu Kutusu
            </button>
          </div>

          <textarea
            id="rich-textarea-code"
            rows={8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>
      )}

      {/* TAB 3: RAW HTML CODE */}
      {activeTab === 'code' && (
        <div className="space-y-2">
          <textarea
            rows={8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="<html> veya metin içeriğinizi girin..."
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>
      )}

      {/* LIVE WEBSITE PREVIEW FRAME */}
      {value && (
        <div className="mt-6 space-y-2">
          {/* Preview Header Banner */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-t-2xl bg-blue-900 text-white border border-blue-900 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Web Sitesi Canlı Önizlemesi (Müşterilerin Göreceği Birebir Görünüm)</span>
            </div>
            <span className="text-[10px] font-mono text-blue-200 bg-white/10 px-2 py-0.5 rounded border border-white/20">
              songurmarin.com
            </span>
          </div>

          {/* Exact Replica of Corporate Page Content Body Card */}
          <div className="bg-white border border-slate-200 rounded-b-2xl p-6 sm:p-10 shadow-sm text-slate-800 text-base leading-relaxed space-y-6">
            <div 
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: value }} 
            />
          </div>
        </div>
      )}

    </div>
  );
};
