import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Link as LinkIcon, FileImage } from 'lucide-react';
import { apiService } from '../../api/client';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Görsel Seç / Yükle',
  helperText = 'PNG, JPG, WEBP, SVG veya GIF (Max 10MB)',
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP, SVG vb.)');
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const res = await apiService.uploadFile(file);
      onChange(res.url);
    } catch (err) {
      console.error('File upload error:', err);
      setErrorMessage('Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:underline"
        >
          {showUrlInput ? (
            <>
              <FileImage className="w-3.5 h-3.5" />
              Dosya Yükleme Moduna Geç
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              URL ile Ekle
            </>
          )}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/gorsel.jpg veya /uploads/gorsel.jpg"
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200 hover:bg-rose-50 transition-colors"
              title="Temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 overflow-hidden flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border border-slate-200 bg-white overflow-hidden shrink-0 flex items-center justify-center p-1">
                <img
                  src={value}
                  alt="Yüklenen Görsel"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Görsel+Yok';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {value.startsWith('data:') ? 'Yerel Yüklenen Görsel' : value.split('/').pop()}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {value}
                </p>

                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Görseli Değiştir
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-blue-50/40 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/60 text-blue-700'
                  : 'border-slate-200 hover:border-blue-400 text-slate-600'
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center py-2">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Görsel Yükleniyor...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Tıklayarak Bilgisayarınızdan Görsel Seçin <span className="font-normal text-slate-500">veya buraya sürükleyin</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {helperText}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-xs text-rose-500 font-semibold mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
