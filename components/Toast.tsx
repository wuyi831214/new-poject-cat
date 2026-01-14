import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type?: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onClose
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm z-[9999] transition-all duration-300 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className={`${typeStyles[type]} rounded-lg shadow-lg p-4 flex items-center gap-3`}>
        <span className="material-symbols-outlined">{icons[type]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    message: string;
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={5000}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

// Hook for using toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    message: string;
  }>>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev: Array<{ id: string; type: ToastType; message: string }>) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev: Array<{ id: string; type: ToastType; message: string }>) => prev.filter((t: { id: string; type: ToastType; message: string }) => t.id !== id));
  };

  return {
    toasts,
    removeToast,
    success: (message: string) => showToast('success', message),
    error: (message: string) => showToast('error', message),
    warning: (message: string) => showToast('warning', message),
    info: (message: string) => showToast('info', message)
  };
};
