import { create } from 'zustand';
import { AlertStore } from '@/types/common';

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: '',
  show: (message: string) => {
    set({ isOpen: true, message });
  },
  close: () => set({ isOpen: false, message: '' }),
}));

export const alert = (message: string) => {
  const store = useAlertStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 alert 닫고
  }
  store.show(message); // 새 alert를 열기
};
