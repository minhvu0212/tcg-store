import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let borderClass = 'border-[#282E40]';
        let icon = <Info className="w-4 h-4 text-blue-400" />;

        if (toast.type === 'gold') {
          borderClass = 'border-[#D9B45B]/60 shadow-gold-glow';
          icon = <Sparkles className="w-4 h-4 text-[#D9B45B]" />;
        } else if (toast.type === 'success') {
          borderClass = 'border-emerald-500/60';
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/60';
          icon = <AlertCircle className="w-4 h-4 text-rose-400" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl bg-[#111522]/95 backdrop-blur-xl border ${borderClass} shadow-2xl flex items-start space-x-3 text-left transition-all animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white leading-tight">{toast.title}</div>
              <div className="text-[11px] text-[#9CA3B5] mt-0.5 leading-snug">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#656D82] hover:text-white p-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
