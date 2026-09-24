import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@songurmarin.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('E-posta adresi veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 border border-white/10 shadow-inner">
            <img src="/songurmarinlogo.png" alt="Songur Marin Logo" className="h-12 w-auto object-contain" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white font-heading tracking-wide">
              YÖNETİCİ GİRİŞİ
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Songur Marin Makine İç Yönetim Portalı
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">E-Posta Adresi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@songurmarin.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Şifre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Giriş Yapılıyor...</span>
            ) : (
              <>
                <span>Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Badge */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Demo: admin@songurmarin.com / admin123</span>
          </div>
        </div>

      </div>
    </div>
  );
};
