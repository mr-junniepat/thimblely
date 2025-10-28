import { useState } from 'react';

export interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom';
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
    duration: 3000,
    position: 'top',
  });

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 3000
  ) => {
    setToast({ visible: true, message, type, duration, position: 'top' });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
