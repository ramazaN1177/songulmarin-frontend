import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Mail, Phone, Building, X } from 'lucide-react';
import { apiService } from '../../api/client';
import type { FormSubmission } from '../../types';

export const AdminForms: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await apiService.getFormSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu mesaj kaydını silmek istediğinize emin misiniz?')) return;
    try {
      await apiService.deleteFormSubmission(id);
      setSubmissions(submissions.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    } catch {
      setSubmissions(submissions.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 font-heading">Gelen Teklif & İletişim Talepleri</h1>
        <p className="text-xs text-slate-500 mt-0.5">Web sitesinden iletilen müşteri teklif ve iletişim formları</p>
      </div>

      {/* Submissions List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Henüz gelen form bulunmuyor.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Ad Soyad & Firma</th>
                  <th className="py-3.5 px-4">İletişim</th>
                  <th className="py-3.5 px-4">İlgilenilen Ürün / Konu</th>
                  <th className="py-3.5 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{sub.fullName}</span>
                      <span className="text-[10px] text-slate-500 block">{sub.companyName || 'Bireysel'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-700 font-medium block">{sub.email}</span>
                      <span className="text-[10px] text-slate-500 block">{sub.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-sky-50 text-blue-700 font-bold text-[10px] border border-sky-200 line-clamp-1">
                        {sub.productOrService || 'Genel İletişim'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors"
                          title="Detay Oku"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">Teklif Talebi Detayı</h3>
              <button onClick={() => setSelectedSubmission(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <span>{selectedSubmission.fullName}</span>
                </div>
                {selectedSubmission.companyName && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Firma: {selectedSubmission.companyName}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <a href={`mailto:${selectedSubmission.email}`} className="hover:underline">{selectedSubmission.email}</a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <a href={`tel:${selectedSubmission.phone}`} className="hover:underline">{selectedSubmission.phone}</a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 block">Talep Edilen Ürün / Konu:</span>
                <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  {selectedSubmission.productOrService || 'Genel Bilgi Talebi'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 block">Müşteri Mesajı:</span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 leading-relaxed text-slate-800 font-normal">
                  {selectedSubmission.message}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => handleDelete(selectedSubmission.id)}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs"
              >
                Talebi Sil
              </button>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
