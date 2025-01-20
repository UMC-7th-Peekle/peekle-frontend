import { create } from 'zustand';
import { ReactNode } from 'react';
import { ConfirmStore } from '@/types/common';

export const useConfirmStore = create<ConfirmStore>((set) => ({
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

export const confirm = (content: ReactNode) => {
  const store = useConfirmStore.getState();
  if (store.isOpen) {
    store.close(); // 이전 confirm 닫고
  }
  store.show(content); // 새 confirm을 열기
};
