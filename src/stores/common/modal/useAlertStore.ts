import { create } from 'zustand';
import { AlertStore } from '@/types/common';

const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  message: '',
  show: (message: string) => {
    set({ isOpen: true, message });
  },
  close: () => set({ isOpen: false, message: '' }),
}));

export default useAlertStore;
