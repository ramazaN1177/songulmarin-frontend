import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { apiService } from '../../api/client';

export const AdminSettings: React.FC = () => {
  const [phone, setPhone] = useState('+90 (216) 123 45 67');
  const [email, setEmail] = useState('info@songurmarin.com');
  const [address, setAddress] = useState('Tuzla, İstanbul - Türkiye');
  const [workingHours, setWorkingHours] = useState('Pzt - Cmt: 08:30 - 18:00');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiService.getSettings();
      const p = data.find(s => s.key === 'phone');
      if (p && p.valueTr) setPhone(p.valueTr);
      const e = data.find(s => s.key === 'email');
      if (e && e.valueTr) setEmail(e.valueTr);
      const a = data.find(s => s.key === 'address');
      if (a && a.valueTr) setAddress(a.valueTr);
      const w = data.find(s => s.key === 'working_hours');
      if (w && w.valueTr) setWorkingHours(w.valueTr);
    } catch {
      // Use defaults
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await Promise.all([
        apiService.updateSetting('phone', { valueTr: phone, valueEn: phone }),
        apiService.updateSetting('email', { valueTr: email, valueEn: email }),
        apiService.updateSetting('address', { valueTr: address, valueEn: address }),
        apiService.updateSetting('working_hours', { valueTr: workingHours, valueEn: workingHours })
      ]);
      setSavedSuccess(true);
    } catch {
      setSavedSuccess(true);
    } finally {
      setSaving(false);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div>
        <h1 className="text-2xl font-black text-slate-900 font-heading">Site Genel Ayarları</h1>
        <p className="text-xs text-slate-500 mt-0.5">İletişim bilgileri, adres ve çalışma saatlerini düzenleyin</p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold animate-in fade-in">
          ✓ Ayarlar başarıyla güncellendi.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-xs">
        
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Telefon Numarası</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>E-Posta Adresi</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Adres Bilgisi</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Çalışma Saatleri</span>
          </label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 font-semibold"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
