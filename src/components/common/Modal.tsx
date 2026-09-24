import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  maxWidth = '3xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container - Pure Crisp White Theme */}
      <div
        className={`relative w-full ${maxWidthClasses} bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 transition-all transform animate-in zoom-in-95 duration-200`}
      >
        {/* Bright White & Ocean Blue Header */}
        <div className="bg-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-slate-100 text-slate-900 shrink-0">
          <div className="flex items-center gap-3.5">
            {icon && (
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
              ESC
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150 focus:outline-none"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Pure White Background */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 text-xs sm:text-sm custom-scrollbar bg-white">
          {children}
        </div>

        {/* Sticky Footer */}
        {footer && (
          <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
