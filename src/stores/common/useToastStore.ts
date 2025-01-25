import { create } from 'zustand';
import { ToastStore } from '@/types/common';

const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  message: '',
  show: (message: string) => {
    set({ isOpen: true, message });
  },
  close: () => set({ isOpen: false, message: '' }),
}));

export default useToastStore;
