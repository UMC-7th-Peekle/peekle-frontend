import { create } from 'zustand';
import { ReactNode } from 'react';
import { ConfirmStore } from '@/types/common';

const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  content: null,
  show: (content: ReactNode) => {
    set({
      isOpen: true,
      content,
    });
  },
  close: () => set({ isOpen: false, content: null }),
}));

export default useConfirmStore;
