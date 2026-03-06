import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-xl shadow-xl border-2 border-green-500 p-4 flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-[#1a3a52] font-semibold flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-[#8b9db0] hover:text-[#1a3a52] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
